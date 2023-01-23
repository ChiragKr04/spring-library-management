package com.library.demo.repository;

import com.library.demo.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialRepository extends JpaRepository<UserCredential,Integer> {
    boolean existsByEmailId(String emailId);
}
