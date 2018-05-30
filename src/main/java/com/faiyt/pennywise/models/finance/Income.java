package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;

import javax.persistence.*;

@Entity
@Table
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ManyToOne
    private PayFrequency payFrequency;

    @Column
    private Double amount;

    @ManyToOne
    private User owner;

    public Income(Long id, String name, PayFrequency payFrequency, Double amount, User owner) {
        this.id = id;
        this.name = name;
        this.payFrequency = payFrequency;
        this.amount = amount;
        this.owner = owner;
    }

    public Long getId() {
        return id;
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

    public PayFrequency getPayFrequency() {
        return payFrequency;
    }

    public void setPayFrequency(PayFrequency payFrequency) {
        this.payFrequency = payFrequency;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Double getEstimatedAnnual() {
        // TODO: Generate estimated annual based on frequency and amount
        return 0D;
    }
}
