package com.faiyt.pennywise.services;

import com.faiyt.pennywise.repositories.Incomes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}