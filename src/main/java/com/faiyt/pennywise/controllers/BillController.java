package com.faiyt.pennywise.controllers;


import com.faiyt.pennywise.models.Response;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillCategory;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
import com.faiyt.pennywise.services.user.UserService;
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
    private UserService userDao;

    @Autowired
    public BillController(BillService billDao, AddressService addressDao, UserService userDao) {
        this.billDao = billDao;
        this.addressDao = addressDao;
        this.userDao = userDao;
    }


    @GetMapping("/add")
    public String addBill(Model model) {


        model.addAttribute("states", addressDao.getAddresses().getStates());
        model.addAttribute("payFreq", billDao.getBills().getPayFrequencies());
        model.addAttribute("categories", billDao.getBills().getCategories());

        model.addAttribute("bill", new Bill());
        return "bills/addBill";
    }


    @PostMapping("/add")
    public String saveNewBill(@ModelAttribute Bill bill) {

        bill.setOwner(userDao.getLoggedInUser());
        billDao.getBills().save(bill);

       // model.addAttribute("bill", bill);
        return "redirect:/bill/view";

    }


    @GetMapping("/view")
    public String viewBills(Model model) {

        User user = userDao.getLoggedInUser();
        BillCategory category = billDao.getBills().getCategoryByName("Credit Card");

        model.addAttribute("bills",
                billDao.getBills().findAllByOwner(user));
        model.addAttribute("total",
                billDao.getUserTotalMonthly(user));
        model.addAttribute("totalCC",
                billDao.getUserBillsByCategory(user, category));

        return "bills/view";
    }



}
