package com.faiyt.pennywise.services;

import com.faiyt.pennywise.models.finance.BillPayment;
import com.faiyt.pennywise.repositories.BillPayments;
import org.springframework.stereotype.Service;

@Service
public class BillPaymentService {
    private BillPayments billPayments;

    public BillPaymentService(BillPayments billPayments) {
        this.billPayments = billPayments;
    }

    public BillPayments getBillPayments() {
        return billPayments;
    }

}
