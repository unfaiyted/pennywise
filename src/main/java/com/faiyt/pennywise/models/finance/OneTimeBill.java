package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("ONETIME")
public class OneTimeBill extends Bill {

    public OneTimeBill() {
    }

    public OneTimeBill(String nickname, LocalDateTime createdAt, LocalDate dueDate, Double interestRate, String interestType, BillCategory category, Merchant merchant, User owner) {
        super(nickname, createdAt, dueDate, interestRate, interestType, category, merchant, owner);
    }

    public OneTimeBill(RecurringBill bill) {
        super(bill.getNickname(), bill.getCreatedAt(), bill.getDueDate(),
                bill.getInterestRate(), bill.getInterestType(),
                bill.getCategory(), bill.getMerchant(), bill.getOwner());
    }
}
