package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Transactions  extends CrudRepository<Transaction, Long> {


}
