package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.models.finance.*;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.repositories.BillPayments;
import com.faiyt.pennywise.repositories.Bills;
import com.faiyt.pennywise.util.Calculation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class BillService {
    private Bills bills;
    private BillPayments payments;

    @Autowired
    public BillService(Bills bills, BillPayments payments) {
        this.bills = bills;
        this.payments = payments;
    }

    public Bills getBills() {
        return bills;
    }

    public Double getUserTotalMonthly(User owner) {
        List<Bill> bills = getBills().findAllByOwner(owner);

        Double total = 0D;

        for(Bill bill : bills) {
            if(bill instanceof RecurringBill) {
                total += monthlyTotalByBill((RecurringBill) bill);
            }
        }

        return total;
    }

    public Bill saveBill(Bill bill) {
        return getBills().save(bill);
    }
    public RecurringBill saveBill(RecurringBill bill) {
        return getBills().save(bill);
    }
    public OneTimeBill saveBill(OneTimeBill bill) {
        return getBills().save(bill);
    }

    public Chart categoryTotalsAsChartData(User owner) {

        List<BillCategory> categories = getBills().getCategories();

        List<String> categoryNames = new ArrayList<>();
        List<Double> series = new ArrayList<>();

        for(BillCategory category : categories) {
            // adds category if missing

            List<Bill> bills = getBills().findAllByOwnerAndAndCategory(owner, category);

            if(!bills.isEmpty()) {
                if (!categoryNames.contains(category.getName())) categoryNames.add(category.getName());

                Double total = 0D;

                for(Bill bill : bills) {
                    total += bill.getPayment();
                }

                series.add(total);

            }

        }


        return new Chart(categoryNames, series);
    }

    public Double getUserBillsByCategory(User owner, BillCategory category) {

        List<Bill> bills =  getBills().findAllByOwnerAndAndCategory(owner, category);

        Double total = 0D;

        for(Bill bill : bills) {
            if(bill instanceof RecurringBill) {
                total += monthlyTotalByBill((RecurringBill) bill);
            }
        }

        return total;

    }

    private Double monthlyTotalByBill(RecurringBill bill) {
        String frequency  = bill.getFrequency().getName();

        return Calculation.getMonthlyDollar(frequency, bill.getPayment());

    }


    public BillPayment addBillPayment(Bill bill, Double amount) {

        BillPayment payment =
               new BillPayment(bill.getStatus(),
                        LocalDate.now(),  amount, bill);

        payments.save(payment);

        return payment;

    }

    public void updateBillStatusesByOwner(User owner) {
        List<BillStatus> statuses = getBills().getStatuses();
        List<Bill> bills = getBills().findAllByOwner(owner);

        for(Bill bill : bills) {
            for(BillStatus status : statuses) {

                if(!status.getName().equalsIgnoreCase("None")) {
                    if(status.getMaxDays() >= bill.daysTillDue() && status.getMinDays() <= bill.daysTillDue()) {
                      bill.setStatus(status);
                    }
                }
            }
        }
        //save updated bills
        getBills().saveAll(bills);
    }





}
