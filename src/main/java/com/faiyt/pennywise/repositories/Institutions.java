package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Account;
import com.faiyt.pennywise.models.finance.Institution;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Institutions extends CrudRepository<Institution, Long> {

    List<Institution> findByOwner(User owner);

    @Query("select distinct i from Institution i " +
            "join fetch i.accounts a" +
            " where " +
            "a.id IN (select a.id from Account a where a = ?1)")
    Institution findByAccount(Account account);



}
