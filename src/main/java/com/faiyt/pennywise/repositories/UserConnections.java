package com.faiyt.pennywise.repositories;

import com.faiyt.pennywise.models.user.UserConnection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConnections extends CrudRepository<UserConnection, Long> {

}