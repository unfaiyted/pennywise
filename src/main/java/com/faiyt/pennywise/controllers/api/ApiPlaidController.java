package com.faiyt.pennywise.controllers.api;

import com.faiyt.pennywise.models.finance.Institution;
import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.models.finance.Account;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.InstitutionService;
import com.faiyt.pennywise.services.PlaidService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.plaid.client.PlaidClient;
import com.plaid.client.request.*;
import com.plaid.client.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import retrofit2.Response;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping("/api/plaid")
public class ApiPlaidController {


    private PlaidClient plaidClient;
    private PlaidService plaidService;
    private InstitutionService storageService;
    private UserService userDao;


    @Autowired
    public ApiPlaidController(PlaidClient plaidClient, PlaidService plaidService
            , InstitutionService storageService, UserService userDao) {
        this.plaidClient = plaidClient;
        this.plaidService = plaidService;
        this.storageService = storageService;
        this.userDao = userDao;
    }

    /**
     * Exchange link public token for access token.
     */
    @RequestMapping(
            value = "/get_access_token",
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

            Institution institution = new Institution(accessToken, itemId, owner);

            institution.setName(plaidService.getInstitutionFromItem(accessToken).getName());

            List<Account> accounts  = plaidService.convertAllToApplicationAccounts(
                    plaidService.getAccountAuthResponse(accessToken)
            );

            institution.setAccounts(accounts);

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
    @RequestMapping(value="/accounts", method=GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getAccount() throws Exception {

        User owner = userDao.getLoggedInUser();
        List<Institution> institutionList = storageService.getInstitutions().findByOwner(owner);


        if (institutionList == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getErrorResponseData("Not authorized"));
        }

        Map<String, Object> data = new HashMap<>();
        for(Institution institution : institutionList) {

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
    @RequestMapping(value="/item", method=POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getItem(@RequestBody String publicTokenJSON) throws Exception {

//        ItemGetResponse item = plaidService.getItemResponse(accessKey);
//
//        if (authService.getAccessToken() == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(getErrorResponseData("Not authorized"));
//        }
//
//        Response<ItemGetResponse> itemResponse = this.plaidClient.service()
//                .itemGet(new ItemGetRequest(this.authService.getAccessToken()))
//                .execute();
//
//        if (!itemResponse.isSuccessful()) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(getErrorResponseData("Unable to pull item information from the Plaid API."));
//        } else {
//            ItemStatus item = itemResponse.body().getItem();
//
//            Response<InstitutionsGetByIdResponse> institutionsResponse = this.plaidClient.service()
//                    .institutionsGetById(new InstitutionsGetByIdRequest(item.getInstitutionId()))
//                    .execute();
//
//            if (!institutionsResponse.isSuccessful()) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                        .body(getErrorResponseData("Unable to pull institution information from the Plaid API."));
//            } else {
//                Map<String, Object> data = new HashMap<>();
//                data.put("error", false);
//                data.put("item", item);
//                data.put("institution", institutionsResponse.body().getInstitution());
//                return ResponseEntity.ok(data);
//            }
//        }

        return null;
    }

    /**
     * Pull transactions for the Item for the last 30 days, default
     */
    @RequestMapping(value="/transactions", method=POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getTransactions() throws Exception {

        User owner = userDao.getLoggedInUser();
        List<Institution> institutionList = storageService.getInstitutions().findByOwner(owner);

        if (institutionList == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getErrorResponseData("Not authorized"));
        }

        List<Transaction> transactionList = new ArrayList<>();

        for(Institution institution : institutionList) {
            transactionList = plaidService.getTransactions(institution.getAccessToken());
            storageService.getTransactions().saveAll(transactionList);
        }

        return ResponseEntity.ok(transactionList);

    }


    @RequestMapping(value="/transactions/aged",  method=POST,
            headers = "Accept=*/*", consumes=MediaType.APPLICATION_JSON_VALUE,
            produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity getTransactions(@RequestBody String jsonStr) throws Exception {

        // Check Institution Id
        // Check offSet, check page
        JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);

        Long accId = jsonObj.path("acc_id").asLong();
        Integer days = jsonObj.path("days").asInt();
        String oldestTransaction = jsonObj.path("oldestTransaction").asText();


        User owner = userDao.getLoggedInUser();

        Account account = storageService.getAccounts().findById(accId).get();

        Institution institution = storageService.getInstitutions().findByAccount(account);

        List<Transaction> transactionList = new ArrayList<>();


        // Parsing Date and Subtracing the number of days specified for pull
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date parsedDate = sdf.parse(oldestTransaction);

        Calendar cal = GregorianCalendar.getInstance();

        cal.setTime(parsedDate);
        cal.add(Calendar.DATE, -1);
        Date toDate = cal.getTime();

        days = days * -1;

        cal.add(Calendar.DATE, days);
        Date fromDate = cal.getTime();


        transactionList = plaidService.getTransactions(institution.getAccessToken(), fromDate, toDate);

        transactionList = storageService.removeDuplicateTransactions(transactionList);

        storageService.getTransactions().saveAll(transactionList);

        return ResponseEntity.ok(transactionList);

    }



    private Map<String, Object> getErrorResponseData(String message) {
        Map<String, Object> data = new HashMap<>();
        data.put("error", false);
        data.put("message", message);
        return data;
    }
}




