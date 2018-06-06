package com.faiyt.pennywise.controllers;


import com.faiyt.pennywise.models.finance.BillCalendarEvent;

import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.CalendarService;
import com.faiyt.pennywise.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
   private CalendarService calendarDao;
   private UserService userDao;

   @Autowired
    public CalendarController(CalendarService calendarDao, UserService userDao) {
        this.calendarDao = calendarDao;
        this.userDao = userDao;
    }


    @GetMapping("")
    public String viewCalendar(Model model) {

       User user = userDao.getLoggedInUser();

//       List<CalendarEvent> events =
//               calendarDao.getEventsInMonth(LocalDate.now(), user);
       List<BillCalendarEvent> billsWithDueDates =
               calendarDao.getBillsDueInMonthWithDate(LocalDate.now(), user);

     //   model.addAttribute("events", events);
        model.addAttribute("bills",billsWithDueDates);
        return "calendar/index";
    }


    // Event Add

    // Event Edit

    // Events....

}
