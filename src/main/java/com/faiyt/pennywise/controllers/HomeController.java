package com.faiyt.pennywise.controllers;

import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.BillService;
import com.faiyt.pennywise.services.IncomeService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.Calculation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  private BillService billDao;
  private IncomeService incomeDao;
  private UserService userDao;

    @Autowired
    public HomeController(BillService billDao, IncomeService incomeDao, UserService userDao) {
        this.billDao = billDao;
        this.incomeDao = incomeDao;
        this.userDao = userDao;

    }

    @GetMapping("/")
    public String displayMainPage() {
        return "/index";
    }


    @GetMapping("/dashboard")
    public String viewDashboard(Model model) {

        User user = userDao.getLoggedInUser();

        // total income
        Double income = incomeDao.getUserTotalMonthly(user);

        // total bills
        Double bills = billDao.getUserTotalMonthly(user);

        // difference
        Double diff = income - bills;

        model.addAttribute("monthlyIncome", income);
        model.addAttribute("monthlyBills", bills);
        model.addAttribute("monthlyDifference", diff);
        model.addAttribute("ratio", Calculation.debtToIncomeRatio(bills, income));

        return "users/dashboard";
    }




}
