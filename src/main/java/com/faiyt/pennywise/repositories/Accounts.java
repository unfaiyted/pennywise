package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.ChartElement;
import com.faiyt.pennywise.models.finance.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface Accounts extends CrudRepository<Account, Long> {

    @Query(value = "select " +
            "  t.date as date," +
            "  sum(t.amount) as total_spent " +
            "from transaction t " +
            "  where account_id != ?1 " +
            "GROUP BY  t.date " +
            "having sum(t.amount) > 0 " +
            "ORDER BY t.date desc", nativeQuery = true)
    List<ChartElement> getSpendingByDay(String accountId);


}
