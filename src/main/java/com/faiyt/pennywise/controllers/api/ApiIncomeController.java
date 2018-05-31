package com.faiyt.pennywise.controllers.api;


import com.faiyt.pennywise.models.Response;
import com.faiyt.pennywise.models.ResponseError;
import com.faiyt.pennywise.services.IncomeService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/income")
public class ApiIncomeController {
    private IncomeService incomeDao;
    private UserService userDao;

    @Autowired
    public ApiIncomeController(IncomeService incomeDao, UserService userDao) {
        this.incomeDao = incomeDao;
        this.userDao = userDao;
    }


    @RequestMapping(
            value = "/delete",
            method= RequestMethod.POST,
            headers = "Accept=*/*",
            produces = "application/json",
            consumes="application/json")
    @ResponseBody
    public Response deleteIncome (@RequestBody String jsonStr) throws IOException {
        try {

            //TODO: check if income belongs to logged in user.

            JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
            JsonNode idNode = jsonObj.path("identifier");
            Long incomeId = idNode.asLong();

            incomeDao.getIncomes().deleteById(incomeId);

        } catch (IOException err) {
            // fill map with errors here
            return new ResponseError();
        }

        Response res = new Response();
        res.setSuccess(true);
        return res;

    }


}
