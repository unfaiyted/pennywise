package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Transactions  extends CrudRepository<Transaction, Long> {

    List<Transaction> findAllByAccountId(String accountid);

}
