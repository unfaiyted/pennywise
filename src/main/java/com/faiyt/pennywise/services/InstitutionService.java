package com.faiyt.pennywise.services;

import com.faiyt.pennywise.repositories.Accounts;
import com.faiyt.pennywise.repositories.Institutions;
import com.faiyt.pennywise.repositories.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service for stored banking institutions or other finance gathered from the Plaid API
 */
@Service
public class InstitutionService {
    private Institutions institutions;
    private Transactions transactions;
    private Accounts accounts;

    @Autowired
    public InstitutionService(Institutions institutions, Transactions transactions, Accounts accounts) {
        this.institutions = institutions;
        this.transactions = transactions;
        this.accounts =  accounts;
    }

    public Institutions getInstitutions() {
        return institutions;
    }

    public Transactions getTransactions() {
        return transactions;
    }

    public Accounts getAccounts() { return accounts; }



}
