package com.faiyt.pennywise.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime lastLoginDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private UserProfile profile;

    public User() { }

    public User(User copy) {
        id = copy.id;
        username = copy.username;
        password = copy.password;
        createdAt = copy.createdAt;
        lastLoginDate = copy.lastLoginDate;
        profile = copy.profile;
    }

    public User(String username, String password, LocalDateTime createdAt, LocalDateTime lastLoginDate) {
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.lastLoginDate = lastLoginDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(LocalDateTime lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }


    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", lastLoginDate=" + lastLoginDate +
                ", profile=" + profile +
                '}';
    }
}
