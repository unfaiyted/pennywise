package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.finance.LinkedInstitution;
import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.repositories.LinkedInstitutions;
import com.faiyt.pennywise.repositories.Transactions;
import com.plaid.client.PlaidClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaidLocalStorageService {
    private LinkedInstitutions institutions;
    private Transactions transactions;
    private PlaidService plaidService;

    @Autowired
    public PlaidLocalStorageService(LinkedInstitutions institutions, Transactions transactions) {
        this.institutions = institutions;
        this.transactions = transactions;
    }

    public LinkedInstitutions getInstitutions() {
        return institutions;
    }

    public Transactions getTransactions() {
        return transactions;
    }


}
