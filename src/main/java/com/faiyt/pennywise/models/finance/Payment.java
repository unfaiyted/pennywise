package com.faiyt.pennywise.models.finance;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Table
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BillStatus statusOnPayment;

    @Column
    private LocalDate datePaid;

    @Column
    private Double paidAmount;

    public  Payment() {}

    public Payment(BillStatus statusOnPayment, LocalDate datePaid, Double paidAmount) {
        this.statusOnPayment = statusOnPayment;
        this.datePaid = datePaid;
        this.paidAmount = paidAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BillStatus getStatusOnPayment() {
        return statusOnPayment;
    }

    public void setStatusOnPayment(BillStatus statusOnPayment) {
        this.statusOnPayment = statusOnPayment;
    }

    public LocalDate getDatePaid() {
        return datePaid;
    }

    public void setDatePaid(LocalDate datePaid) {
        this.datePaid = datePaid;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

}
