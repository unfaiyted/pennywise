package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.repositories.LinkedInstitutions;
import com.faiyt.pennywise.repositories.Transactions;
import com.plaid.client.PlaidClient;
import com.plaid.client.request.*;
import com.plaid.client.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;


/**
 * Service to get date from Plaid.
 */
@Service
public class PlaidService {
    private PlaidClient plaidClient;

    @Autowired
    public PlaidService(PlaidClient plaidClient) {
        this.plaidClient = plaidClient;
    }


    public List<Transaction> getTransactions(String accessKey, Date fromDate, Date toDate) {

        Map<String, Object> data = new HashMap<>();

        List<Transaction> transactionList = new ArrayList<>();

        try {
            List<TransactionsGetResponse.Transaction> transactions =
                    getResponseTransactions(accessKey, fromDate, toDate, 250, 0);
            for(com.plaid.client.response.TransactionsGetResponse.Transaction transaction : transactions) {
                transactionList.add(new Transaction(transaction));
            }
        }
        catch(IOException e) {
            e.printStackTrace();
            return  null;
        }
        
        return transactionList;
    }

    // Default past 30 days
    public List<Transaction> getTransactions(String accessKey) throws IOException {

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -30);
        Date fromDate = cal.getTime();
        Date toDate = new Date();

        return getTransactions(accessKey, fromDate, toDate);

    }

    public TransactionsGetResponse
    getFullTransactionsResponse(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return this.plaidClient.service()
                .transactionsGet(new TransactionsGetRequest(accessKey, fromDate, toDate)
                        .withCount(maxReturn)
                        .withOffset(offset))
                .execute().body();
    }

    /* TRANSACTION RESPONSES */
    public List<com.plaid.client.response.TransactionsGetResponse.Transaction>
    getResponseTransactions(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getTransactions();
    }

    public List<com.plaid.client.response.Account>
    getResponseAccounts(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getAccounts();
    }

    public com.plaid.client.response.ItemStatus
    getResponseItems(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getItem();
    }


    /* AUTH RESPONSE DATA */
    public AuthGetResponse getFullAuthResponse(String accessKey) throws IOException {
        return this.plaidClient.service()
                .authGet(new AuthGetRequest(accessKey)).execute().body();
    }

    public List<Account> getAccountAuthResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getAccounts();
    }

    public ItemStatus getAuthItemResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getItem();
    }

    public AuthGetResponse.Numbers getAuthNumbersResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getNumbers();
    }


    /* ITEM RESPONSE DATA */
    public ItemStatus getItemResponse(String accessKey) throws IOException {
        return this.plaidClient.service()
                .itemGet(new ItemGetRequest(accessKey))
                .execute().body().getItem();
    }

    public List<Institution> getInstitutionList(String accessKey) throws IOException {
        return this.plaidClient.service().institutionsGet(
                new InstitutionsGetRequest(0,250)
        ).execute().body().getInstitutions();
    }

    public Institution getInstitutionById(String requestId) throws IOException {
        return this.plaidClient.service().institutionsGetById(
                new InstitutionsGetByIdRequest(requestId)
        ).execute().body().getInstitution();
    }


    public Institution getInstitutionFromItem(String accessKey) throws IOException {
        String id = getAuthItemResponse(accessKey).getInstitutionId();
        return getInstitutionById(id);
    }



}
