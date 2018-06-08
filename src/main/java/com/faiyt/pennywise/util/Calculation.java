package com.faiyt.pennywise.util;

import java.time.LocalDate;

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


    public static LocalDate nextFrequencyDate(String frequency, LocalDate date) {

        if (frequency.equalsIgnoreCase("Weekly")) {
            return date.plusDays(7);
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            return date.plusMonths(1);
        } else if (frequency.equalsIgnoreCase("Yearly")) {
            return date.plusYears(1);
        } else if (frequency.equalsIgnoreCase("Bi-Weekly")) {
            return date.plusWeeks(2);
        } else if (frequency.equalsIgnoreCase("Twice a Month")) {
            return date.plusWeeks(2);
        }

        return LocalDate.now();
    }

    public static String debtToIncomeRatio(Double debt, Double income) {

        Double diff = Math.floor((debt / income)* 100);

        if (diff > 300) { return "∞/100"; }

        return  diff.intValue() + "/100";
    }



}
