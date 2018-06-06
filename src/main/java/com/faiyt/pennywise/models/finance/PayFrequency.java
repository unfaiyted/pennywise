package com.faiyt.pennywise.models.finance;


import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class PayFrequency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private Long id;

    @Column
    @JsonView(View.Summary.class)
    private String name;

    public PayFrequency() {}

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

    @Override
    public String toString() {
        return "PayFrequency{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
