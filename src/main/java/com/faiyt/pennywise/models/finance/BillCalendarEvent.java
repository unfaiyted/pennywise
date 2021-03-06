package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import java.time.LocalDate;
import java.time.LocalDateTime;


// Mapps Bill Due dates to events
public class BillCalendarEvent extends CalendarEvent {

    @JsonView(View.Summary.class)
    private Bill bill;

    @JsonView(View.Summary.class)
    private LocalDate dueDate;

    public BillCalendarEvent() {
    }

    public BillCalendarEvent(Bill bill, LocalDate date) {
        super(bill.getMerchant().getName(),
                date.atTime(0,0,0),
                date.atTime(0,0,0));
        this.bill = bill;
        this.dueDate = date;

    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }


    @Override
    public String toString() {
        return "BillCalendarEvent{" +
                "bill=" + bill +
                ", dueDate=" + dueDate +
                "} " + super.toString();
    }
}
