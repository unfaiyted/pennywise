package com.faiyt.pennywise.controllers;


import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.Merchant;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bill")
public class BillController {
    private BillService billDao;
    private AddressService addressDao;

    @Autowired
    public BillController(BillService billDao, AddressService addressDao) {
        this.billDao = billDao;
        this.addressDao = addressDao;
    }


    @GetMapping("/add")
    public String addBill(Model model) {


        model.addAttribute("states", addressDao.getAddresses().getStates());

        model.addAttribute("payFreq", billDao.getBills().getPayFrequencies());
        model.addAttribute("categories", billDao.getBills().getCategories());


        model.addAttribute("bill", new Bill());
//        model.addAttribute("merchant", new Merchant());

        return "bills/addBill";
    }


    @PostMapping("/add")
    public String saveNewBill(@ModelAttribute Bill bill, Model model) {

        model.addAttribute("bill", bill);
        return "bills/addBill";

    }


}
