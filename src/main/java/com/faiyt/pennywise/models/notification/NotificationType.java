package com.faiyt.pennywise.models.notification;

import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;


@Table
@Entity
public class NotificationType {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @JsonView(View.Summary.class)
    private String name;

    @Column
    @JsonView(View.Summary.class)
    private String icon;


    public NotificationType() {}

    public NotificationType(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
