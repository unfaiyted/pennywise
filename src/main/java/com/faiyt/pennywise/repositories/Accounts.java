package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Account;
import org.springframework.data.repository.CrudRepository;

public interface Accounts extends CrudRepository<Account, Long> {
}
