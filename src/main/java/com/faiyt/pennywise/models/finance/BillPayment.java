package com.faiyt.pennywise.models.finance;


import javax.persistence.*;
import java.time.LocalDate;

@Table
@Entity
public class BillPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BillStatus statusOnPayment;

    @Column
    private LocalDate datePaid;

    @Column
    private Double paidAmount;

    @ManyToOne
    private Bill bill;

    public  BillPayment() {}

    public BillPayment(BillStatus statusOnPayment, LocalDate datePaid, Double paidAmount, Bill bill) {
        this.statusOnPayment = statusOnPayment;
        this.datePaid = datePaid;
        this.paidAmount = paidAmount;
        this.bill = bill;
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

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
