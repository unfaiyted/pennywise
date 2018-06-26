package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.ChartDataPoint;
import com.faiyt.pennywise.models.finance.Account;
import com.faiyt.pennywise.models.finance.Institution;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface Accounts extends CrudRepository<Account, Long> {

    @Query(value = "select " +
            "new com.faiyt.pennywise.models.ChartDataPoint(t.date, sum(t.amount)) " +
            "from Transaction t " +
            "  where accountId = ?1 " +
            "GROUP BY  t.date " +
            "having sum(t.amount) > 0 " +
            "ORDER BY t.date desc", nativeQuery = false)
    List<ChartDataPoint> getSpendingByDay(String accountId);


    @Query("select distinct a from Institution i " +
            "join i.accounts a" +
            " where " +
            "i.id = ?1 ")
    List<Account> findByInstitutionId(Long id);


}
