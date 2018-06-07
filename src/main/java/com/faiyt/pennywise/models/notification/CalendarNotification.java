package com.faiyt.pennywise.models.notification;


import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("CALENDAR")
public class CalendarNotification extends Notification {

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonView(View.Summary.class)
    private CalendarEvent event;

    public CalendarNotification() {}

    public CalendarNotification(CalendarEvent event) {
        this.event = event;
    }

    public CalendarNotification(String title, String message, NotificationType type, User owner, CalendarEvent event) {
        super(title, message, type, owner);
        this.event = event;
    }

    public CalendarEvent getEvent() {
        return event;
    }

    public void setEvent(CalendarEvent event) {
        this.event = event;
    }

}
