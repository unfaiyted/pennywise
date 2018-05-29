package com.faiyt.pennywise.services;

import com.faiyt.pennywise.repositories.Addresses;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    private Addresses addresses;

    public AddressService(Addresses addresses) {
        this.addresses = addresses;

    }

    public Addresses getAddresses() {
        return addresses;
    }
}
