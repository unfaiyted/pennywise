package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.Institution;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Institutions extends CrudRepository<Institution, Long> {

    List<Institution> findByOwner(User owner);

}
