package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Bill;
import com.faiyt.pennywise.models.finance.BillCategory;
import com.faiyt.pennywise.models.finance.PayFrequency;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bills extends CrudRepository<Bill, Long> {

    @Query("select p  from PayFrequency p")
    List<PayFrequency> getPayFrequencies();

    @Query("select p  from PayFrequency p where p.id = ?1")
    PayFrequency getPayFrequencyById(Long id);

    @Query("select c  from BillCategory c")
    List<BillCategory> getCategories();

    @Query("select c  from BillCategory c where c.name = ?1")
    BillCategory getCategoryByName(String name);

    @Query("select c.name  from BillCategory c where c.id in (" +
            "select b.category from Bill b where b.owner = ?1)")
    List<String> getUserCategoryNames(User owner);

    @Query("select b from Bill b where b.owner = ?1")
    List<Bill> findAllByOwner(User owner);


    List<Bill> findAllByOwnerAndAndCategory(User owner, BillCategory category);



}
