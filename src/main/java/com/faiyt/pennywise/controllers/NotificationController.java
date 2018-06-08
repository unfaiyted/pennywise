package com.faiyt.pennywise.controllers;


import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.NotificationService;
import com.faiyt.pennywise.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notifications")
public class NotificationController {
   private NotificationService notificationDao;
   private UserService userDao;

    @Autowired
    public NotificationController(NotificationService notificationDao, UserService userDao) {
        this.notificationDao = notificationDao;
        this.userDao = userDao;
    }

    @GetMapping("")
    public String getNotifications(Model model) {
        User user = userDao.getLoggedInUser();
        model.addAttribute("notifications",
                notificationDao.getNotifications().findAllByOwnerOrderByCreatedAtDesc(user));
        return "/users/notifications";
    }
}
