package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillCategory;
import com.faiyt.pennywise.models.finance.PayFrequency;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bills extends CrudRepository<Bill, Long> {


    @Query("select p  from PayFrequency p")
    List<PayFrequency> getPayFrequencies();

    @Query("select c  from BillCategory c")
    List<BillCategory> getCategories();



}
