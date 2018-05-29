package com.faiyt.pennywise.services;

import com.faiyt.pennywise.repositories.Bills;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BillService {
    private Bills bills;

    @Autowired
    public BillService(Bills bills) {
        this.bills = bills;
    }

    public Bills getBills() {
        return bills;
    }


}
