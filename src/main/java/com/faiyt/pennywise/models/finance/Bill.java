package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.user.User;

import javax.persistence.*;
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
    private LocalDateTime firstDueDate;
    @Column
    private Double interestRate;
    @Column
    private String interestType;

    @ManyToOne
    private BillCategory category;

    @ManyToOne
    private Merchant merchant;

    @ManyToOne
    private User owner;


    public Bill(Long id, User owner, LocalDateTime firstDueDate) {
        this.id = id;
        this.owner = owner;
        this.firstDueDate = firstDueDate;
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

    public LocalDateTime getFirstDueDate() {
        return firstDueDate;
    }

    public void setFirstDueDate(LocalDateTime firstDueDate) {
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
}
