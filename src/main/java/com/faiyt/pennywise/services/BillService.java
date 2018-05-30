package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.Chart;
import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillCategory;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.repositories.Bills;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class BillService {
    private Bills bills;

    @Autowired
    public BillService(Bills bills) {
        this.bills = bills;
    }

    public Bills getBills() {
        return bills;
    }

    public Double getUserTotalMonthly(User owner) {
        List<Bill> bills = getBills().findAllByOwner(owner);

        Double total = 0D;

        for(Bill bill : bills) {
           total += monthlyTotalByBill(bill);
        }

        return total;
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
            total += monthlyTotalByBill(bill);
        }

        return total;

    }


    private Double monthlyTotalByBill(Bill bill) {
        String frequency  = bill.getFrequency().getName();

        if (frequency.equalsIgnoreCase("Weekly")) {
            return (bill.getPayment()*4);
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            return (bill.getPayment());
        } else if (frequency.equalsIgnoreCase("Yearly")) {
            return  (bill.getPayment()/12);
        } else if (frequency.equalsIgnoreCase("Twice a Month") || frequency.equalsIgnoreCase("Bi-Weekly")) {
            return (bill.getPayment()*2);
        }

        // If none of these skip.
        return 0D;
    }
    //total monthly
    //total ccs
    // est interest


}