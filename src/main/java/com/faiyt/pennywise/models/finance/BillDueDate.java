package com.faiyt.pennywise.models.finance;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table
public class BillDueDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate date;

    public BillDueDate() {}

    public BillDueDate(LocalDate date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
