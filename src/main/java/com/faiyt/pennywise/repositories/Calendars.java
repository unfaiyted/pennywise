package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.Calendar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Calendars extends CrudRepository<Calendar, Long> {


}
