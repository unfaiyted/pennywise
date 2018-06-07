package com.faiyt.pennywise.models.notification;

import com.faiyt.pennywise.models.finance.Income;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("INCOME")
public class IncomeNotification  extends Notification {

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonView(View.Summary.class)
    private Income income;

    public IncomeNotification() {}

    public IncomeNotification(Income income) {
        this.income = income;
    }

    public IncomeNotification(String title, String message, NotificationType type, User owner, Income bill) {
        super(title, message, type, owner);
        this.income = income;
    }

    public Income getIncome() {
        return income;
    }

    public void setIncome(Income income) {
        this.income = income;
    }
}