package com.faiyt.pennywise.models;

import javax.persistence.*;


@Entity
@Table
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String addresedTo;
    @Column
    private String street;
    @Column
    private String city;
    @Column
    private String zipCode;


    @ManyToOne
    private State state;

    public Address(Long id, String addresedTo, String street, String city, State state, String zipCode) {
        this.id = id;
        this.addresedTo = addresedTo;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddresedTo() {
        return addresedTo;
    }

    public void setAddresedTo(String addresedTo) {
        this.addresedTo = addresedTo;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
