package com.faiyt.pennywise.services;


import com.faiyt.pennywise.repositories.Notifications;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
   private Notifications notifications;


    public NotificationService(Notifications notifications) {
        this.notifications = notifications;
    }

    public Notifications getNotifications() {
        return notifications;
    }


}
