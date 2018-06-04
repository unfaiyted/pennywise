package com.faiyt.pennywise.models.finance;

import javax.persistence.*;

@Table
@Entity
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    // Online // In-Person // Send via PayPal // Send via Google Wallet //
    // Send via Service [Service Provider]
    // Mail

}
