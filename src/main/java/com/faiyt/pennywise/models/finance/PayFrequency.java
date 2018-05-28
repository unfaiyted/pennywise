package com.faiyt.pennywise.models.finance;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class PayFrequency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    // Monthly
    // Weekly
    // Bi-Weekly
    // Every-Monday
    // Every 2 weeks....
    // on and on... hmm

    public PayFrequency(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    private Integer daysBetweenPayment() {

        if(this.name.equalsIgnoreCase("month")) {

        }

        if(this.name.equalsIgnoreCase("weekly")) {

        }

         return null;

    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    public  LocalDateTime getNextPayDate(LocalDateTime lastPay) {
        // TODO: calculate when the next payment will be given the lastpay date
        return LocalDateTime.now();
    }
}
