package com.faiyt.pennywise.controllers;

import com.faiyt.pennywise.models.Calendar;
import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillDueDate;
import com.faiyt.pennywise.models.finance.Payment;
import com.faiyt.pennywise.services.CalendarService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
   private CalendarService calendarDao;

    public CalendarController(CalendarService calendarDao) {
        this.calendarDao = calendarDao;
    }


    @GetMapping("/")
    public String viewCalendar(Model model) {

       List<CalendarEvent> events =
               calendarDao.getEventsInMonth(LocalDate.now());
       HashMap<Bill, LocalDate> billsWithDueDates =
               calendarDao.getBillsDueInMonthWithDate(LocalDate.now());

        model.addAttribute("events", events);
        model.addAttribute("bills",billsWithDueDates);
        return "calendar/index";
    }


    // Event Add

    // Event Edit

    // Events....

}
