package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.Income;
import com.faiyt.pennywise.models.finance.RecurringBill;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.repositories.Incomes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    private Incomes incomes;

    @Autowired
    public IncomeService(Incomes incomes) {
            this.incomes = incomes;
    }

    public Incomes getIncomes() {
        return incomes;
    }


    public Double getUserTotalMonthly(User owner) {
        List<Income> incomes = getIncomes().findAllByOwner(owner);

        Double total = 0D;

        for(Income income : incomes) {

                total += income.getEstimatedMonthly();
        }

        return total;
    }



}