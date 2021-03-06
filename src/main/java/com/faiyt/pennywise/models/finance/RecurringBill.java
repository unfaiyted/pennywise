package com.faiyt.pennywise.models.finance;


import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.faiyt.pennywise.util.Calculation;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("RECURRING")
public class RecurringBill  extends Bill {


    @ManyToOne
    @JsonView(View.Summary.class)
    private PayFrequency frequency;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonView(View.SummaryWithDetails.class)
    private List<BillDueDate> dueDates;


    public RecurringBill() {
        this.frequency = new PayFrequency();
    }

    public RecurringBill(String nickname,  LocalDateTime createdAt, LocalDate firstDueDate, Double interestRate, String interestType,
                         BillCategory category, Merchant merchant, PaymentMethod method, User owner) {
        super(nickname, createdAt, firstDueDate, interestRate, interestType, category, merchant, method, owner);
    }

    public Double getEstimatedAnnual() {
        String frequency  = this.frequency.getName();
        return Calculation.getYearlyDollar(frequency, this.getPayment());
    }

    // includes first due date.
    public void generateDueDatesList() {

        List<BillDueDate> dates = new ArrayList<>();
        dates.add( new BillDueDate(this.getDueDate()));

        // Get the first due date
        // create due dates for the next year
        // include first due date.
        LocalDate lastDate = this.getDueDate();

        Period between;

        do { // adds dates to list
            LocalDate next = Calculation.nextFrequencyDate(this.frequency.getName(), lastDate);
            dates.add(new BillDueDate(next));
            lastDate = next;
            between = Period.between(LocalDate.now(), lastDate);

            // until its 1 year after today
        } while(between.getYears() < 1);

        this.dueDates = dates;

    }

    public PayFrequency getFrequency() {
        return frequency;
    }

    public void setFrequency(PayFrequency frequency) {
        this.frequency = frequency;
    }

    public List<BillDueDate> getDueDates() {
        return dueDates;
    }

    public void setDueDates(List<BillDueDate> dueDates) {
        this.dueDates = dueDates;
    }


    public String dueDatesAsString() {

        String s = "[";

        for(BillDueDate date : this.dueDates) {
            s += "\"" + date.getDate().toString() + "\", ";
        }

        s = s.substring(0, s.length() - 2 );

        s += "]";

        return s;

    }


    public BillDueDate nextDueDate() {

        LocalDate today = LocalDate.now();
        BillDueDate closest = new BillDueDate(LocalDate.now());
        Integer daysBewtween = 0;
        // Period period = Period.between(LocalDate.now(), LocalDate.now());
        Long p = 365L;

        for (BillDueDate date : dueDates) {
            Long p2 = ChronoUnit.DAYS.between(date.getDate(), today);
            if (date.getDate().isAfter(today) && p2 < p) {
                p = p2;
                closest = date;
            }
        }

        return closest;

    }

    @Override
    public void setPayments(List<Payment> payments) {
        super.setPayments(payments);
        this.updateDueDate();
    }

    // Checks for the payments list and
    // will update the due date to the nearest date
    // to the current due date.
    private void updateDueDate() {

        LocalDate lastPaymentDate = LocalDate.MIN;
        LocalDate updatedDueDate = LocalDate.MIN;

        Long daysBetween = Long.MAX_VALUE;

        // payments list
        for (Payment payment : super.getPayments()) {
            if (payment.getDatePaid().isAfter(lastPaymentDate)) lastPaymentDate = payment.getDatePaid();
        }

        for(BillDueDate dueDate : dueDates) {

            // Due date must be after the last payment date
            // must be closest due date to lastPaymentDate
            if(dueDate.getDate().isAfter(lastPaymentDate)) {
               Long days =  ChronoUnit.DAYS.between(lastPaymentDate, dueDate.getDate());

               if(days < daysBetween) {
                    updatedDueDate = dueDate.getDate();
                    daysBetween = days;
               }

            }
        }
        // due dates list

        // after last payment select next DUE DATE

        super.setDueDate(updatedDueDate);

    }



    @Override
    public String toString() {
        return "RecurringBill{" +
                "frequency=" + frequency +
                ", dueDates=" + dueDates +
                "} " + super.toString();
    }
}
