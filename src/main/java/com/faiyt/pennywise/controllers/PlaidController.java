package com.faiyt.pennywise.controllers;

import com.faiyt.pennywise.models.finance.LinkedInstitution;
import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.PlaidLocalStorageService;
import com.faiyt.pennywise.services.PlaidService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.plaid.client.PlaidClient;
import com.plaid.client.request.*;
import com.plaid.client.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import retrofit2.Response;

import java.io.IOException;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class PlaidController {

    private Environment env;
    private PlaidClient plaidClient;
    private PlaidService plaidService;
    private PlaidLocalStorageService storageService;
    private UserService userDao;


    @Autowired
    public PlaidController(Environment env, PlaidClient plaidClient, PlaidService plaidService
    , PlaidLocalStorageService storageService, UserService userDao) {
        this.env = env;
        this.plaidClient = plaidClient;
        this.plaidService = plaidService;
        this.storageService = storageService;
        this.userDao = userDao;
    }


    /**
     * Home page.
     */
    @RequestMapping(value="/plaid", method=GET)
    public String index(Model model) {
        model.addAttribute("PLAID_PUBLIC_KEY", env.getProperty("PLAID_PUBLIC_KEY"));
        model.addAttribute("PLAID_ENV", env.getProperty("PLAID_ENV"));

       // model.addAttribute("", institutionDao.);

        return "plaid/index";
    }

    /**
     * Exchange link public token for access token.
     */

            @RequestMapping(
                    value = "/api/plaid/get_access_token",
                    method= RequestMethod.POST,
                    headers = "Accept=*/*",
                    consumes="application/json")
            @ResponseBody
    public ResponseEntity getAccessToken(@RequestBody String publicTokenJSON) throws IOException {

                JsonNode jsonObj =  StringToObject.toJsonNode(publicTokenJSON);
               String public_token = jsonObj.path("public_token").asText();

                Response<ItemPublicTokenExchangeResponse> response = this.plaidClient.service()
                .itemPublicTokenExchange(new ItemPublicTokenExchangeRequest(public_token))
                .execute();

        if (response.isSuccessful()) {

            String accessToken = response.body().getAccessToken();
            String itemId = response.body().getItemId();
            User owner = userDao.getLoggedInUser();

            LinkedInstitution institution = new LinkedInstitution(accessToken, itemId, owner);

            institution.setName(.getInstitutionFromItem(accessToken).getName());

            this.storageService.getInstitutions().save(institution);

            Map<String, Object> data = new HashMap<>();
            data.put("error", false);

            return ResponseEntity.ok(data);
        } else {

            System.out.println("failed ");
            System.out.println(getErrorResponseData(response.errorBody().string()));

            return ResponseEntity.status(500).body(getErrorResponseData(response.errorBody().string()));
        }
    }

    /**
     * Retrieve high-level account information and account and routing numbers
     * for each account associated with the Item.
     */
    @RequestMapping(value="/api/plaid/accounts", method=GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getAccount() throws Exception {

        User owner = userDao.getLoggedInUser();
        List<LinkedInstitution> institutionList = storageService.getInstitutions().findByOwner(owner);


        if (institutionList == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getErrorResponseData("Not authorized"));
        }

        Map<String, Object> data = new HashMap<>();
        for(LinkedInstitution institution : institutionList) {

            Response<AuthGetResponse> response = this.plaidClient.service()
                    .authGet(new AuthGetRequest(institution.getAccessToken())).execute();

            // TODO: fix to return correct data on multiple accounts
            if (response.isSuccessful()) {
                data.put("error", false);
                data.put("accounts", response.body().getAccounts());
                data.put("numbers", response.body().getNumbers());
            } else {
                data.put("error", "Unable to pull accounts from the Plaid API.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(data);
            }

        }
            return ResponseEntity.ok(data);
    }

    /**
     * Pull the Item - this includes information about available products,
     * billed products, webhook information, and more.
     */
    @RequestMapping(value="/api/plaid/item", method=POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getItem() throws Exception {
        if (authService.getAccessToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getErrorResponseData("Not authorized"));
        }

        Response<ItemGetResponse> itemResponse = this.plaidClient.service()
                .itemGet(new ItemGetRequest(this.authService.getAccessToken()))
                .execute();

        if (!itemResponse.isSuccessful()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getErrorResponseData("Unable to pull item information from the Plaid API."));
        } else {
            ItemStatus item = itemResponse.body().getItem();

            Response<InstitutionsGetByIdResponse> institutionsResponse = this.plaidClient.service()
                    .institutionsGetById(new InstitutionsGetByIdRequest(item.getInstitutionId()))
                    .execute();

            if (!institutionsResponse.isSuccessful()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(getErrorResponseData("Unable to pull institution information from the Plaid API."));
            } else {
                Map<String, Object> data = new HashMap<>();
                data.put("error", false);
                data.put("item", item);
                data.put("institution", institutionsResponse.body().getInstitution());
                return ResponseEntity.ok(data);
            }
        }
    }

    /**
     * Pull transactions for the Item for the last 30 days.
     */
    @RequestMapping(value="/api/plaid/transactions", method=POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getTransactions() throws Exception {

        User owner = userDao.getLoggedInUser();
        List<LinkedInstitution> institutionList = storageService.getInstitutions().findByOwner(owner);

        if (institutionList == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getErrorResponseData("Not authorized"));
        }

        List<Transaction> transactionList = new ArrayList<>();

        for(LinkedInstitution institution : institutionList) {
            transactionList = plaidService.getTransactions(institution.getAccessToken());
            storageService.getTransactions().saveAll(transactionList);
        }

        return ResponseEntity.ok(transactionList);

    }




    private Map<String, Object> getErrorResponseData(String message) {
        Map<String, Object> data = new HashMap<>();
        data.put("error", false);
        data.put("message", message);
        return data;
    }
}




