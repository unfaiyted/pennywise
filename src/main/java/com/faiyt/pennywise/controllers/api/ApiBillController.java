package com.faiyt.pennywise.controllers.api;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.models.Response;
import com.faiyt.pennywise.models.ResponseError;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/bill")
public class ApiBillController {
    private BillService billDao;
    private AddressService addressDao;
    private UserService userDao;

    @Autowired
    public ApiBillController(BillService billDao, AddressService addressDao, UserService userDao) {
        this.billDao = billDao;
        this.addressDao = addressDao;
        this.userDao = userDao;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    //@GetMapping("/{id}")
    public Bill getBill(@PathVariable Long id) throws IllegalAccessException {

        User owner = userDao.getLoggedInUser();
        Bill bill = billDao.getBills().findById(id).get();


        if(bill.getOwner().getId().equals(owner.getId())) {
            return bill;
        } else {
            throw new IllegalAccessException("User does not have access to this");
        }
    }

    @RequestMapping(
            value = "/delete",
            method= RequestMethod.POST,
            headers = "Accept=*/*",
            produces = "application/json",
            consumes="application/json")
    @ResponseBody
    public Response deleteBill (@RequestBody String jsonStr) throws IOException {
        try {

           //TODO: check if bill belongs to logged in user.

            JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
            JsonNode idNode = jsonObj.path("identifier");
            Long billId = idNode.asLong();

            billDao.getBills().deleteById(billId);

        } catch (IOException err) {
            // fill map with errors here
            return new ResponseError();
        }

        Response res = new Response();
        res.setSuccess(true);
        return res;

    }


    @RequestMapping(
            value = "/pay",
            method= RequestMethod.POST,
            headers = "Accept=*/*",
            produces = "application/json",
            consumes="application/json")
    @ResponseBody
    public Response addPayment (@RequestBody String jsonStr) throws IOException {
        try {

            JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);

            Long billId = jsonObj.path("billId").asLong();
            Double payAmount =  jsonObj.path("payAmount").asDouble();

            Bill bill = billDao.getBills().findById(billId).get();

            billDao.addBillPayment(bill, payAmount);

        } catch (IOException err) {
            // fill map with errors here
            return new ResponseError();
        }

        Response res = new Response();
        res.setSuccess(true);
        return res;

    }


    @RequestMapping(
            value = "/payment/delete",
            method= RequestMethod.POST,
            headers = "Accept=*/*",
            produces = "application/json",
            consumes="application/json")
    @ResponseBody
    public Response deleteBillPayment (@RequestBody String jsonStr) throws IOException {
        try {

            //TODO: check if bill belongs to logged in user.

            JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
            JsonNode idNode = jsonObj.path("identifier");
            Long paymentId = idNode.asLong();

            billDao.getBills().deletePaymentById(paymentId);

        } catch (IOException err) {
            // fill map with errors here
            return new ResponseError();
        }

        Response res = new Response();
        res.setSuccess(true);
        return res;

    }

    // package json node mapping from string


    @GetMapping("/billsByCategory")
    public Chart generatePieChartData() {
       return  billDao.categoryTotalsAsChartData(userDao.getLoggedInUser());

    }


}
