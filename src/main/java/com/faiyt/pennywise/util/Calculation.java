package com.faiyt.pennywise.util;

import com.faiyt.pennywise.models.finance.Bill;

public class Calculation {


    public static Double getMonthlyDollar(String frequency, Double payment) {

        if (frequency.equalsIgnoreCase("Weekly")) {
            return (payment*4);
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            return (payment);
        } else if (frequency.equalsIgnoreCase("Yearly")) {
            return  (payment/12);
        } else if (frequency.equalsIgnoreCase("Twice a Month") || frequency.equalsIgnoreCase("Bi-Weekly")) {
            return (payment*2);
        }

        // If none of these skip.
        return 0D;
    }


    public static Double getYearlyDollar(String frequency, Double payment) {
        return getMonthlyDollar(frequency,payment)*12;
    }



}
