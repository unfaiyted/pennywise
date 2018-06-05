package com.faiyt.pennywise.models;


import com.faiyt.pennywise.models.finance.BillDueDate;
import com.faiyt.pennywise.models.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User owner;

    @OneToMany
    private List<CalendarEvent> events;


    public Calendar(User owner, List<CalendarEvent> events) {
        this.owner = owner;
        this.events = events;
    }



}
