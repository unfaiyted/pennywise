package com.faiyt.pennywise.models;


import javax.persistence.*;

@Entity
@Table
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String abbr;


    public State() {

    }

    public State(String name, String abbr) {
        this.name = name;
        this.abbr = abbr;
    }

    public State(Long id, String name, String abbr) {
        this.id = id;
        this.name = name;
        this.abbr = abbr;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
