package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table
public class BillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Summary.class)
    private Long id;

    @Column
    @JsonView(View.Summary.class)
    private String name;

    @Column
    @JsonView(View.SummaryWithDetails.class)
    private String icon;

    public BillCategory() {}

    public BillCategory(String name, String icon ) {
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

    @Override
    public String toString() {
        return "BillCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
