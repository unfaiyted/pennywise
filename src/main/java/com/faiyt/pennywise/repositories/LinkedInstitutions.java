package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.LinkedInstitution;
import com.faiyt.pennywise.models.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LinkedInstitutions extends CrudRepository<LinkedInstitution, Long> {

    List<LinkedInstitution> findByOwner(User owner);

}
