package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.notification.Notification;
import com.faiyt.pennywise.models.notification.NotificationType;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface Notifications extends CrudRepository<Notification, Long> {


    List<Notification> findAllByOwnerOrderByCreatedAtDesc(User owner);

    @Query("select n from NotificationType n")
    List<NotificationType> getTypes();


    @Modifying
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    @Query("update Notification n set n.userViewed = TRUE where n.id = ?1")
    void markRead(Long id);

}
