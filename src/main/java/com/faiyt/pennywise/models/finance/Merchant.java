package com.faiyt.pennywise.models.finance;

import com.faiyt.pennywise.models.Address;

import javax.persistence.*;


@Entity
@Table
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String website;
    @Column
    private String websiteUsername;
    @Column
    private String phoneNumber;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address address;

    public Merchant() {
        this.address = new Address();
    }

    public Merchant(String name, String website, String websiteUsername, String phoneNumber, Address address) {
        this.name = name;
        this.website = website;
        this.websiteUsername = websiteUsername;
        this.phoneNumber = phoneNumber;
        this.address = address;
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

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getWebsiteUsername() {
        return websiteUsername;
    }

    public void setWebsiteUsername(String websiteUsername) {
        this.websiteUsername = websiteUsername;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Merchant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", website='" + website + '\'' +
                ", websiteUsername='" + websiteUsername + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address=" + address +
                '}';
    }
}
