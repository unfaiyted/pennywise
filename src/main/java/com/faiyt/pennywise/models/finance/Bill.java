package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.util.Calculation;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nickname;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate firstDueDate;
    @Column
    private Double interestRate;
    @Column
    private String interestType;

    @Column
    private Double payment;
    @Column
    private Double totalOwed;

    @ManyToOne
    private BillCategory category;
    @ManyToOne
    private PayFrequency frequency;
    @ManyToOne(cascade = CascadeType.ALL)
    private Merchant merchant;
    @ManyToOne
    private User owner;


    public Bill() {
        this.merchant = new Merchant();
        this.owner = new User();
        this.category = new BillCategory();
    }

    public Bill(Long id, User owner, LocalDate firstDueDate) {
        this.id = id;
        this.owner = owner;
        this.firstDueDate = firstDueDate;
    }

    public Bill(String nickname, PayFrequency frequency, LocalDateTime createdAt, LocalDate firstDueDate, Double interestRate, String interestType, BillCategory category, Merchant merchant, User owner) {
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.firstDueDate = firstDueDate;
        this.interestRate = interestRate;
        this.interestType = interestType;
        this.category = category;
        this.merchant = merchant;
        this.owner = owner;
        this.frequency = frequency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getFirstDueDate() {
        return firstDueDate;
    }

    public void setFirstDueDate(LocalDate firstDueDate) {
        this.firstDueDate = firstDueDate;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public String getInterestType() {
        return interestType;
    }

    public void setInterestType(String interestType) {
        this.interestType = interestType;
    }

    public BillCategory getCategory() {
        return category;
    }

    public void setCategory(BillCategory category) {
        this.category = category;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }

    public Double getPayment() {
        return payment;
    }

    public void setPayment(Double payment) {
        this.payment = payment;
    }


    public Double getTotalOwed() {
        return totalOwed;
    }

    public void setTotalOwed(Double totalOwed) {
        this.totalOwed = totalOwed;
    }

    public PayFrequency getFrequency() {
        return frequency;
    }

    public void setFrequency(PayFrequency frequency) {
        this.frequency = frequency;
    }

    public Double getEstimatedAnnual() {
        String frequency  = this.frequency.getName();
        return Calculation.getYearlyDollar(frequency, this.payment);
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", createdAt=" + createdAt +
                ", firstDueDate=" + firstDueDate +
                ", interestRate=" + interestRate +
                ", interestType='" + interestType + '\'' +
                ", payment=" + payment +
                ", totalOwed=" + totalOwed +
                ", category=" + category +
                ", merchant=" + merchant +
                ", owner=" + owner +
                '}';
    }
}
