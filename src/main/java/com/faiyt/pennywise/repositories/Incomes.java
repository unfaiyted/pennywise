package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.Income;
import com.faiyt.pennywise.models.finance.PayFrequency;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Incomes extends CrudRepository<Income, Long> {


    @Query("select p  from PayFrequency p")
    List<PayFrequency> getPayFrequencies();


    @Query("select i from Income i where i.owner = ?1")
    List<Income> findAllByOwner(User owner);


}
