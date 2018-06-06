package com.faiyt.pennywise.controllers.api;


import com.faiyt.pennywise.models.Calendar;
import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.Response;
import com.faiyt.pennywise.models.finance.BillCalendarEvent;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.faiyt.pennywise.services.CalendarService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/calendar")
public class ApiCalendarController {
    private CalendarService calendarDao;
    private UserService userDao;

    @Autowired
    public ApiCalendarController(CalendarService calendarDao, UserService userDao) {
        this.calendarDao = calendarDao;
        this.userDao = userDao;
    }




    // Get Events
//    @RequestMapping(
//            value = "/events",
//            method= RequestMethod.POST, // Change to post
//            headers = "Accept=*/*",
//            produces = "application/json",
//            consumes="application/json")
    //@RequestBody String jsonStr
    @JsonView(View.Summary.class)
    @GetMapping("/events")
    @ResponseBody
    public List<CalendarEvent> getEvents () throws IOException {

        User user = userDao.getLoggedInUser();

//        JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
//        JsonNode start = jsonObj.path("start");
//        JsonNode end = jsonObj.path("end");

//       List<CalendarEvent> events =
//               calendarDao.getEventsInMonth(LocalDate.now(), user);
        List<CalendarEvent> billsWithDueDates =
                calendarDao.getBillsDueInMonthWithDate(LocalDate.now(), user);

        return billsWithDueDates;

    }

    @JsonView(View.Summary.class)
    @GetMapping("/events/{date}")
    public List<CalendarEvent> getEventsInMonth (@PathVariable(name= "date") String strDate) throws IOException {

        User user = userDao.getLoggedInUser();


        LocalDate date = LocalDate.parse(strDate);
//        JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
//        JsonNode start = jsonObj.path("start");
//        JsonNode end = jsonObj.path("end");

//       List<CalendarEvent> events =
//               calendarDao.getEventsInMonth(LocalDate.now(), user);
        List<CalendarEvent> billsWithDueDates =
                calendarDao.getBillsDueInMonthWithDate(date, user);

        return billsWithDueDates;

    }


    // Get Income Events



}
