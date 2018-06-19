package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table
@Entity
public class LinkedInstitution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Institution Name
    @Column
    private String name;

    // Access token provided by Plaid on item import
    @Column
    private String accessToken;

    // Plaid Item ID
    @Column
    private String itemId;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User owner;

    public LinkedInstitution() {}

    public LinkedInstitution(String name, String accessToken, String itemId, User owner) {
        this.name = name;
        this.accessToken = accessToken;
        this.itemId = itemId;
        this.owner = owner;
    }

    public LinkedInstitution(String accessToken, String itemId, User owner) {
        this.accessToken = accessToken;
        this.itemId = itemId;
        this.owner = owner;
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

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }
}
