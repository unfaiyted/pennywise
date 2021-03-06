package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="bill_type",
        discriminatorType = DiscriminatorType.STRING)
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private Long id;
    @Column
    @JsonView(View.SummaryWithDetails.class)
    private String nickname;

    @Column
    @JsonView(View.Summary.class)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    @JsonView(View.Summary.class)
    private Double interestRate;
    @Column
    private String interestType;
    @Column
    @JsonView(View.Summary.class)
    private Double payment;


    @Column
    @JsonView(View.Summary.class)
    private Double totalOwed;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dueDate;

    @Column
    @JsonView(View.Summary.class)
    private boolean active = true;

    @ManyToOne
    @JsonView(View.Summary.class)
    private BillStatus status;

    @ManyToOne
    @JsonView(View.Summary.class)
    private BillCategory category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonView(View.Summary.class)
    private Merchant merchant;

    @ManyToOne
    @JsonView(View.Summary.class)
    private PaymentMethod method;

    @JoinTable
    @OneToMany(cascade = CascadeType.ALL)
    @JsonView(View.SummaryWithDetails.class)
    private List<Payment> payments = new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    @JsonView(View.SummaryWithDetails.class)
    private User owner;

    public Bill() {
        this.merchant = new Merchant();
        this.owner = new User();
        this.category = new BillCategory();
    }

    public Bill(String nickname, LocalDateTime createdAt, LocalDate dueDate,
                Double interestRate, String interestType, BillCategory category, Merchant merchant,
                PaymentMethod method, User owner) {
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.dueDate = dueDate;
        this.interestRate = interestRate;
        this.interestType = interestType;
        this.category = category;
        this.merchant = merchant;
        this.method = method;
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

    public List<Payment> getPayments() {
        return payments;
    }

    public void addPayment(Payment payment) {
        this.payments.add(payment);
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
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
