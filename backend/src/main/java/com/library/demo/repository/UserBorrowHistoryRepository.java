package com.library.demo.repository;

import com.library.demo.model.UserBorrowHistory;
import com.library.demo.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBorrowHistoryRepository extends JpaRepository<UserBorrowHistory,Integer> {
    @Query(value = "select count(*) from user_borrow_history where (book_id = ?1 and user_id = ?2) and active = true", nativeQuery = true)
    Long checkForAlreadyBorrowedActive(Long bookId,String userId);

    List<UserBorrowHistory> findByUserId(String userId);
}
