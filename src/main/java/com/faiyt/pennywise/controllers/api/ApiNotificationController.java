package com.faiyt.pennywise.controllers.api;


import com.faiyt.pennywise.models.Response;
import com.faiyt.pennywise.models.ResponseError;
import com.faiyt.pennywise.models.notification.Notification;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.faiyt.pennywise.services.NotificationService;
import com.faiyt.pennywise.services.user.UserService;
import com.faiyt.pennywise.util.StringToObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/notification")
public class ApiNotificationController {
   private NotificationService notificationDao;
   private UserService userDao;

    public ApiNotificationController(NotificationService notificationDao, UserService userDao) {
        this.notificationDao = notificationDao;
        this.userDao = userDao;
    }


    @GetMapping("")
    @JsonView(View.Summary.class)
    public List<Notification> getNotifications() {
        User owner = userDao.getLoggedInUser();
        return notificationDao.getNotifications().findAllByOwnerOrderByCreatedAtDesc(owner);
    }


    @RequestMapping(
            value = "/markRead",
            method= RequestMethod.POST,
            headers = "Accept=*/*",
            produces = "application/json",
            consumes="application/json")
    @ResponseBody
    public Response markRead (@RequestBody String jsonStr) throws IOException {
        try {

            JsonNode jsonObj =  StringToObject.toJsonNode(jsonStr);
            JsonNode idNode = jsonObj.path("identifier");
            Long notificationId = idNode.asLong();

            notificationDao.getNotifications().markRead(notificationId);

        } catch (IOException err) {
            // fill map with errors here
            return new ResponseError();
        }

        Response res = new Response();
        res.setSuccess(true);
        return res;

    }


}
