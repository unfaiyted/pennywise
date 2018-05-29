package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.State;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Addresses extends CrudRepository<Address, Long> {

    @Query("select s from State s")
    List<State> getStates();
}
