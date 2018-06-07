package com.faiyt.pennywise.models.notification;


import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("BILL")
public class BillNotification  extends Notification {

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonView(View.Summary.class)
    private Bill bill;

    public BillNotification() {}

    public BillNotification(Bill bill) {
        this.bill = bill;
    }


    public BillNotification(String title, String message, NotificationType type, User owner, Bill bill) {
        super(title, message, type, owner);
        this.bill = bill;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
