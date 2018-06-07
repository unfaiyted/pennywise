package com.faiyt.pennywise.models.notification;

import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


@Entity
@Table
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="bill_type",
        discriminatorType = DiscriminatorType.STRING)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private Long id;

    @Column
    @JsonView(View.Summary.class)
    private String title;

    @Column(columnDefinition = "TEXT")
    @JsonView(View.Summary.class)
    private String message;

    @Column
    @OrderBy
    @JsonView(View.Summary.class)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    @JsonView(View.Summary.class)
    private boolean userViewed = false;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User owner;

    @ManyToOne
    @JsonView(View.Summary.class)
    private NotificationType type;

    public Notification() {}

    public Notification(String title, String message, NotificationType type, User owner) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isUserViewed() {
        return userViewed;
    }

    public void setUserViewed(boolean userViewed) {
        this.userViewed = userViewed;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @JsonView(View.Summary.class)
    public String getAge() {

        LocalDateTime now = LocalDateTime.now();

        Long minutes = ChronoUnit.MINUTES.between(this.createdAt, now);
        Long hours = ChronoUnit.HOURS.between( this.createdAt, now);
        Long days = ChronoUnit.DAYS.between(this.createdAt, now);


        if(minutes < 60) {
            return (minutes > 1) ? minutes + " minutes ago" : "Just now";
        }
        if(hours < 24) {
            return (hours > 1) ? hours + " hours ago" : hours + " hour ago";
        }
        if(days <= 31) {
            return (days > 1) ? days + " days ago" : days + " day ago";
        }

        return "A long time ago";
    }

}
