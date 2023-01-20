package com.library.library_prg.repository;

import com.library.library_prg.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select user_id, user_name, user_email from library_user", nativeQuery = true)
    List<User> getAllUser();

    @Query(value = "select user_id, user_name, user_email " +
            "from library_user " +
            "where user_email = ?1 and user_pass = ?2", nativeQuery = true)
    User getUser(String email, String password);
}
