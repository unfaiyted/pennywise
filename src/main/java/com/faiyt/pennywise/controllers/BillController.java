package com.faiyt.pennywise.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bill")
public class BillController {

    public BillController() {
    }


    @GetMapping("/add")
    public String addBill() {

        return "/bills/addBill";
    }


}
