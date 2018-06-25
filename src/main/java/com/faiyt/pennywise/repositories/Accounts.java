package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.ChartElement;
import com.faiyt.pennywise.models.finance.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.HashMap;
import java.util.List;

public interface Accounts extends CrudRepository<Account, Long> {

    @Query(value = "select " +
            "new com.faiyt.pennywise.models.ChartElement(t.date, sum(t.amount)) " +
            "from Transaction t " +
            "  where accountId = ?1 " +
            "GROUP BY  t.date " +
            "having sum(t.amount) > 0 " +
            "ORDER BY t.date desc", nativeQuery = false)
    List<ChartElement> getSpendingByDay(String accountId);


}
