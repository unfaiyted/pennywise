package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.Calendar;
import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.repositories.Bills;
import com.faiyt.pennywise.repositories.Calendars;
import com.faiyt.pennywise.repositories.Incomes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class CalendarService {
    private Calendars calendars;
    private Bills bills;
    private Incomes incomes;


    @Autowired
    public CalendarService(Calendars calendars, Bills bills, Incomes incomes) {
        this.calendars = calendars;
        this.bills = bills;
        this.incomes = incomes;
    }

    public Calendars getCalendars() {
        return calendars;
    }

    public Bills getBills() {
        return bills;
    }

    public Incomes getIncomes() {
        return incomes;
    }

    public List<CalendarEvent> getEventsInMonth(LocalDate date) {
        List<CalendarEvent> events  = new ArrayList<>();
        return events;
    }

    public HashMap<Bill,LocalDate> getBillsDueInMonthWithDate(LocalDate date) {

        HashMap<Bill, LocalDate> bills = new HashMap<>();

        return bills;
    }





}


