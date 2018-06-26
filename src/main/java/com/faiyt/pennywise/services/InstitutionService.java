package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.models.ChartDataSet;
import com.faiyt.pennywise.models.finance.Account;
import com.faiyt.pennywise.models.finance.Transaction;
import com.faiyt.pennywise.repositories.Accounts;
import com.faiyt.pennywise.repositories.Institutions;
import com.faiyt.pennywise.repositories.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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


    public List<Transaction> removeDuplicateTransactions(List<Transaction> list) {
        List<Transaction> clean = new ArrayList<>();

        for(Transaction transaction : list) {
           if(getTransactions().findByTransactionId(transaction.getTransactionId()) == null) {
               clean.add(transaction);
            }
        }
        return clean;
    }



    public Chart getDailySpendingByAccounts(Long instId) {

        List<Account> accounts = getAccounts().findByInstitutionId(instId);

        ArrayList<ChartDataSet> dataSets = new ArrayList<>();

        for(Account account :  accounts)   {
            dataSets.add(
                    new ChartDataSet(account.getName(), getAccounts().getSpendingByDay(account.getAccountId())));
        }


      return new Chart(dataSets);
    }


}
