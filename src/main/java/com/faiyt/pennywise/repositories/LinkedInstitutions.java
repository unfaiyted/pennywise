package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.finance.LinkedInstitution;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkedInstitutions extends CrudRepository<LinkedInstitution, Long> {

}
