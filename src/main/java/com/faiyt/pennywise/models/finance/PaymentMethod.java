package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.user.View;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Table
@Entity
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.SummaryWithDetails.class)
    private Long id;

    @Column
    @JsonView(View.Summary.class)
    private String name;

    @Column
    @JsonView(View.Summary.class)
    private String icon;

    @Column
    @JsonView(View.SummaryWithDetails.class)
    private String link;


    public PaymentMethod() {}

    public PaymentMethod(String name, String icon, String link) {
        this.name = name;
        this.icon = icon;
        this.link = link;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
