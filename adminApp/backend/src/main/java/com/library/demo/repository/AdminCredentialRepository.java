package com.library.demo.repository;

import com.library.demo.model.AdminCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminCredentialRepository extends JpaRepository<AdminCredential,Integer> {

    boolean existsByEmailId(String emailId);
    boolean existsByAdminId(String adminId);
//     boolean existByEmailID(String email);
//   @Query(value = "select * from admin_credential where user_id = ?1 and password = ?2", nativeQuery = true)
//   AdminCredential fetchUser(String userId, String password);
    @Query(value = "select * from admin_credential where admin_id=?1 and password=?2",nativeQuery = true)
    AdminCredential fetchAdmin(String adminId, String password);
//
//    @Query(value = "select * from admin_credential where user_id = ?1", nativeQuery = true)
//    AdminCredential FindByUserId(String userId);

  //  boolean findById(String userId);
}
