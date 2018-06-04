package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;


@Entity
@Table
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="bill_type",
        discriminatorType = DiscriminatorType.STRING)
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nickname;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private Double interestRate;
    @Column
    private String interestType;
    @Column
    private Double payment;
    @Column
    private Double totalOwed;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dueDate;

    @Column
    private boolean active = true;

    @ManyToOne
    private BillStatus status;

    @ManyToOne
    private BillCategory category;

    @ManyToOne(cascade = CascadeType.ALL)
    private Merchant merchant;


    @ManyToOne
    private PaymentMethod method;


    @ManyToOne
    @JsonBackReference
    private User owner;

    public Bill() {
        this.merchant = new Merchant();
        this.owner = new User();
        this.category = new BillCategory();
    }

    public Bill(String nickname, LocalDateTime createdAt, LocalDate dueDate, Double interestRate, String interestType, BillCategory category, Merchant merchant, User owner) {
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.dueDate = dueDate;
        this.interestRate = interestRate;
        this.interestType = interestType;
        this.category = category;
        this.merchant = merchant;
        this.owner = owner;

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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Integer daysTillDue() {
        return (int) ChronoUnit.DAYS.between(LocalDate.now(), dueDate);
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BillStatus getStatus() {
        return status;
    }

    public void setStatus(BillStatus status) {
        this.status = status;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", createdAt=" + createdAt +
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
