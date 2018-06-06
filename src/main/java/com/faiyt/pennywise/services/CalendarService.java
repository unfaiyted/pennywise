package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.Calendar;
import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillCalendarEvent;
import com.faiyt.pennywise.models.finance.BillDueDate;
import com.faiyt.pennywise.models.finance.RecurringBill;
import com.faiyt.pennywise.models.user.User;
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

    public List<CalendarEvent> getEventsInMonth(LocalDate date, User user) {
        LocalDate start = date.withDayOfMonth(1);
        LocalDate end = date.withDayOfMonth(date.lengthOfMonth());

        List<CalendarEvent> events  = new ArrayList<>();
        return events;
    }

    public List<BillCalendarEvent> getBillsDueInMonthWithDate(LocalDate date, User user) {
        LocalDate start = date.withDayOfMonth(1);
        LocalDate end = date.withDayOfMonth(date.lengthOfMonth());

        List<BillCalendarEvent> events = new ArrayList<>();

        List<Bill> billList = bills.findBillsContainingDueDatesBetween(start, end, user);

        for(Bill bill : billList) {
            if(bill instanceof RecurringBill) {
                RecurringBill rBill = (RecurringBill) bill;
                for(BillDueDate dueDate : rBill.getDueDates()) {
                    if(dueDate.getDate().isAfter(start) && dueDate.getDate().isBefore(end)) {
                        events.add(new BillCalendarEvent(rBill, dueDate.getDate()));
                    }

                }

            }

        }

        return events;
    }





}


