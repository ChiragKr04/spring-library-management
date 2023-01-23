package com.library.demo.repository;

import com.library.demo.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCredentialRepository extends JpaRepository<UserCredential,Integer> {
    boolean existsByEmailId(String emailId);
    // boolean existByEmailID(String email);
//   @Query(value = "select * from user_credential where email_id = ?1", nativeQuery = true)
//    boolean checkEmailExist(String emailId);
}
