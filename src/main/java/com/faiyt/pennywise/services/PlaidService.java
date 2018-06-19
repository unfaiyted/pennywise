package com.faiyt.pennywise.services;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.InstitutionsSearchRequest;
import com.plaid.client.request.TransactionsGetRequest;
import okhttp3.logging.HttpLoggingInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PlaidService {

    private static final InstitutionsSearchRequest INSTITUTIONS_SEARCH_REQUEST = new InstitutionsSearchRequest("q");

    @Value("${plaid-public-key}")
    private String PUBLIC_KEY;
    @Value("${plaid-client-id}")
    private String CLIENT_ID;
    @Value("${plaid-secret-dev}")
    private String SECRET;

    private PlaidClient.Builder getPlaidClientBuilder() {
        return PlaidClient.newBuilder()
                .publicKey(PUBLIC_KEY) // optional. only needed to call endpoints that require a public key
                .clientIdAndSecret(CLIENT_ID, SECRET)
                .developmentBaseUrl() // or equivalent, depending on which environment you're calling into
                .logLevel(HttpLoggingInterceptor.Level.BODY);
    }


}
