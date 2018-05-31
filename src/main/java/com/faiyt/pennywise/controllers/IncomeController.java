package com.faiyt.pennywise.controllers;

import com.faiyt.pennywise.models.finance.Income;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.IncomeService;
import com.faiyt.pennywise.services.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/income")
public class IncomeController {
    UserService userDao;
    IncomeService incomeDao;


    public IncomeController(UserService userDao, IncomeService incomeDao) {
        this.userDao = userDao;
        this.incomeDao = incomeDao;
    }


    @GetMapping("/view")
    public String viewIncome(Model model) {

        User user = userDao.getLoggedInUser();

        model.addAttribute("incomes", incomeDao.getIncomes().findAllByOwner(user));
        model.addAttribute("payFreq", incomeDao.getIncomes().getPayFrequencies());
        model.addAttribute("income",new Income());
        return "income/view";
    }

    @PostMapping("/add")
    public String addIncome(@ModelAttribute Income income) {

        User user = userDao.getLoggedInUser();
        income.setOwner(user);

        incomeDao.getIncomes().save(income);

        return "redirect:/income/view";
    }



}
