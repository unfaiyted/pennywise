package com.faiyt.pennywise.models.finance;


import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Table
@Entity
public class BillStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private Long id;

    @Column(nullable = false)
    @JsonView(View.Summary.class)
    private String name;

    @Column
    @JsonView(View.SummaryWithDetails.class)
    private Integer minDays;

    @Column
    @JsonView(View.SummaryWithDetails.class)
    private Integer maxDays;

    @Column
    @JsonView(View.Summary.class)
    private String color;

    public BillStatus() { }

    public BillStatus(String name) {
        this.name = name;
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


    public Integer getMinDays() {
        return minDays;
    }

    public void setMinDays(Integer minDays) {
        this.minDays = minDays;
    }

    public Integer getMaxDays() {
        return maxDays;
    }

    public void setMaxDays(Integer maxDays) {
        this.maxDays = maxDays;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
