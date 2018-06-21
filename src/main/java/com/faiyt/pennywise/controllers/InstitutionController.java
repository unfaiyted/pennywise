package com.faiyt.pennywise.controllers;

import com.faiyt.pennywise.models.finance.Account;
import com.faiyt.pennywise.models.finance.Institution;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.InstitutionService;
import com.faiyt.pennywise.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * View and organize various institution data, provided by the Plaid API
 */
@Controller
@RequestMapping(value="/institutions")
public class InstitutionController {

    private Environment env;
    private InstitutionService institutionDao;
    private UserService userDao;

    @Autowired
    public InstitutionController(Environment env, InstitutionService institutionDao, UserService userDao) {
        this.env = env;
        this.institutionDao = institutionDao;
        this.userDao = userDao;
    }

    /**
     * Main Institutions Page.
     */
    @RequestMapping(value="", method=GET)
    public String index(Model model) {

        User owner = userDao.getLoggedInUser();

        model.addAttribute("PLAID_PUBLIC_KEY", env.getProperty("PLAID_PUBLIC_KEY"));
        model.addAttribute("PLAID_ENV", env.getProperty("PLAID_ENV"));
        model.addAttribute("institutions", institutionDao.getInstitutions().findByOwner(owner));
        return "plaid/index";
    }

    /**
     * Get Accounts associated with a given itemId
     */
    @RequestMapping(value="/account/{id}", method=GET)
    public String account(@PathVariable Long id, Model model) {

        User owner = userDao.getLoggedInUser();
        Account account = institutionDao.getAccounts().findById(id).get();


        model.addAttribute("PLAID_PUBLIC_KEY", env.getProperty("PLAID_PUBLIC_KEY"));
        model.addAttribute("PLAID_ENV", env.getProperty("PLAID_ENV"));

        model.addAttribute("account", account);
        model.addAttribute("transactions",
                institutionDao.getTransactions().findAllByAccountId(account.getAccountId()));

        return "plaid/account";
    }


    @RequestMapping(value="/account/analysis/{id}", method=GET)
    public String accountAnalysis(@PathVariable Long id, Model model) {

        User owner = userDao.getLoggedInUser();
        Account account = institutionDao.getAccounts().findById(id).get();


        // Add institutions and add other accounts, view all..later

        model.addAttribute("account", account);
        return "plaid/accountAnalysis";
    }

    /**
     * Takes in the id of the account and looks associated transactions
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value="/transactions/{id}", method=GET)
    public String transactions(@PathVariable Long id, Model model) {

        User owner = userDao.getLoggedInUser();
        Institution institution = institutionDao.getInstitutions().findById(id).get();

        model.addAttribute("PLAID_PUBLIC_KEY", env.getProperty("PLAID_PUBLIC_KEY"));
        model.addAttribute("PLAID_ENV", env.getProperty("PLAID_ENV"));

        model.addAttribute("institution", institution);

        return "plaid/transactions";


    }

}




