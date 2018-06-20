package com.faiyt.pennywise.controllers;

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
    @RequestMapping(value="/institutions", method=GET)
    public String index(Model model) {

        User owner = userDao.getLoggedInUser();

        model.addAttribute("PLAID_PUBLIC_KEY", env.getProperty("PLAID_PUBLIC_KEY"));
        model.addAttribute("PLAID_ENV", env.getProperty("PLAID_ENV"));
        model.addAttribute("institutions", institutionDao.getInstitutions().findByOwner(owner));

        return "plaid/index";
    }


}




