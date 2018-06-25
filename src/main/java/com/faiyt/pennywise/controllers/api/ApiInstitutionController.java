package com.faiyt.pennywise.controllers.api;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.services.InstitutionService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("api/institution")
public class ApiInstitutionController {
    private InstitutionService institutionDao;

    //Daily Spending totals by Account ID

    public ApiInstitutionController(InstitutionService institutionDao) {
        this.institutionDao = institutionDao;

    }



    @RequestMapping(value="/account/daily/spending/",  method=POST,
            headers = "Accept=*/*",
            consumes= MediaType.APPLICATION_JSON_VALUE,
            produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getDailySpendingByAccount(@RequestBody String jsonStr) throws Exception {

        JsonNode jsonObj = StringToObject.toJsonNode(jsonStr);

        Long accId = jsonObj.path("acc_id").asLong();
//        Integer days = jsonObj.path("days").asInt();
//        String oldestTransaction = jsonObj.path("oldestTransaction").asText();
        

           Chart chartData =  institutionDao.getDailySpendingByAccount(accId);

       return ResponseEntity.ok(chartData);


    }






        // Monthly Spending by Category in a given Account


    // Positive net flow monthly into accounts


}
