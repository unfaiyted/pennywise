package com.faiyt.pennywise.models.notification;


import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("SYSTEM")
public class SystemNotification extends Notification {


    @Column(columnDefinition = "TEXT")
    @JsonView(View.Summary.class)
    String systemMessage;

    public SystemNotification() {}

    public SystemNotification(String systemMessage) {
        this.systemMessage = systemMessage;
    }

    public SystemNotification(String title, String message, NotificationType type, User owner, String systemMessage) {
        super(title, message, type, owner);
        this.systemMessage = systemMessage;
    }

    public String getSystemMessage() {
        return systemMessage;
    }

    public void setSystemMessage(String systemMessage) {
        this.systemMessage = systemMessage;
    }



}
