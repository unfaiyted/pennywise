package com.faiyt.pennywise.controllers.api;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.services.InstitutionService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("api/institution")
public class ApiInstitutionController {
    private InstitutionService institutionDao;

    //Daily Spending totals by Account ID

    public ApiInstitutionController(InstitutionService institutionDao) {
        this.institutionDao = institutionDao;

    }


    @RequestMapping(value="/account/daily/spending/{id}",  method=RequestMethod.GET,
            produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getDailySpendingByAccount(@PathVariable Long id)  {
           Chart chartData =  institutionDao.getDailySpendingByAccount(id);
       return ResponseEntity.ok(chartData);


    }




        // Monthly Spending by Category in a given Account


    // Positive net flow monthly into accounts


}
