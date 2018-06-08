package com.faiyt.pennywise.services.user;

import com.faiyt.pennywise.models.user.ExtendedSocialUser;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.UserProfile;
import com.faiyt.pennywise.repositories.Users;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

@Repository
public class UserService {
    private Users users;

    @Autowired
    public UserService(Users users) {
        this.users = users;
    }

    public Users getUsers() {
        return users;
    }

    public void createUser(String username, UserProfile profile) {
        users.addUser(username, RandomStringUtils.randomAlphanumeric(8));
        // get user ID
        User user = users.findByUsername(username);
        users.addDefaultRole(user.getId());
        users.addProfile(user.getId(),
                profile.getEmail(),
                profile.getFirstName(),
                profile.getLastName(),
                profile.getName(),
                profile.getUsername());

    }


    public User getLoggedInUser() {

        if(SecurityContextHolder.getContext().getAuthentication() != null) {
            try {
                return  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            } catch (ClassCastException e) {
                try {
                    System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
                    ExtendedSocialUser socialUser = (ExtendedSocialUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                    return getUsers().findByUsername(socialUser.getUserId());
                } catch (NullPointerException x) {
                   return null;
                }
            }
        }
        return null;

    }

}
