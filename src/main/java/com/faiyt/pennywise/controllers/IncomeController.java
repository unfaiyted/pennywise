package com.faiyt.pennywise.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/income")
public class IncomeController {

    public IncomeController() {}


    @GetMapping("/view")
    public String viewIncome() {
        return "income/view";
    }



}
