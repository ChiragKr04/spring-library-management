package com.library.demo.repository;

import com.library.demo.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface UserCredentialRepository extends JpaRepository<UserCredential,Integer> {
    boolean existsByEmailId(String emailId);

    @Query(value = "select user_id, first_name, last_name, email_id, address, phone_no " +
            "from user_credential " +
            "where user_id = ?1 and password = ?2", nativeQuery = true)
    Object getUser(String id, String password);
}
