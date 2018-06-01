package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.BillPayment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillPayments extends CrudRepository<BillPayment, Long> {

}
