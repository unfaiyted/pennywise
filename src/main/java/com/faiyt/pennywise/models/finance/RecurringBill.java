package com.faiyt.pennywise.models.finance;


import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.util.Calculation;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("RECURRING")
public class RecurringBill  extends Bill {


    @ManyToOne
    private PayFrequency frequency;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<BillDueDate> dueDates;


    public RecurringBill() {
        this.frequency = new PayFrequency();
    }

    public RecurringBill(String nickname,  LocalDateTime createdAt, LocalDate firstDueDate, Double interestRate, String interestType, BillCategory category, Merchant merchant, User owner) {
        super(nickname, createdAt, firstDueDate, interestRate, interestType, category, merchant, owner);

        generateDueDatesList();
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
            between = Period.between(this.getDueDate(), lastDate);

            System.out.println(between.getYears());

        } while(Math.abs(between.getYears()) <= 1);

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


    @Override
    public String toString() {
        return "RecurringBill{" +
                "frequency=" + frequency +
                ", dueDates=" + dueDates +
                "} " + super.toString();
    }
}
