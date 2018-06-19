package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.repositories.LinkedInstitutions;
import com.faiyt.pennywise.repositories.Transactions;
import com.plaid.client.PlaidClient;
import com.plaid.client.request.AuthGetRequest;
import com.plaid.client.request.ItemGetRequest;
import com.plaid.client.request.TransactionsGetRequest;
import com.plaid.client.response.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import retrofit2.Response;
import java.io.IOException;
import java.util.*;

@Service
public class LinkedInstitutionService {
    private LinkedInstitutions institutions;
    private Transactions transactions;
    private PlaidClient plaidClient;


    @Autowired
    public LinkedInstitutionService(LinkedInstitutions institutions, Transactions transactions, PlaidClient plaidClient) {
        this.institutions = institutions;
        this.plaidClient = plaidClient;
        this.transactions = transactions;
    }

    public LinkedInstitutions getInstitutions() {
        return institutions;
    }

    public Transactions getStoredTransactions() {
        return transactions;
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

                  getStoredTransactions().saveAll(transactionList);
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

    TransactionsGetResponse
        getFullTransactionsResponse(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return this.plaidClient.service()
                .transactionsGet(new TransactionsGetRequest(accessKey, fromDate, toDate)
                        .withCount(maxReturn)
                        .withOffset(offset))
                .execute().body();
    }



    /* TRANSACTION RESPONSES */
    List<com.plaid.client.response.TransactionsGetResponse.Transaction>
    getResponseTransactions(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getTransactions();
    }

    List<com.plaid.client.response.Account>
    getResponseAccounts(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getAccounts();
    }

    com.plaid.client.response.ItemStatus
    getResponseItems(String accessKey, Date fromDate, Date toDate, Integer maxReturn, Integer offset) throws IOException {
        return getFullTransactionsResponse(accessKey, fromDate, toDate, maxReturn, offset).getItem();
    }


    /* AUTH RESPONSE DATA */
    AuthGetResponse getFullAuthResponse(String accessKey) throws IOException {
        return this.plaidClient.service()
                .authGet(new AuthGetRequest(accessKey)).execute().body();
    }

    List<Account> getAccountAuthResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getAccounts();
    }

    ItemStatus getAuthItemResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getItem();
    }

    AuthGetResponse.Numbers getAuthNumbersResponse(String accessKey) throws IOException {
        return getFullAuthResponse(accessKey).getNumbers();
    }


    ItemStatus getItemResponse(String accessKey) throws IOException {
        return this.plaidClient.service()
                .itemGet(new ItemGetRequest(accessKey))
                .execute().body().getItem();
    }



}
