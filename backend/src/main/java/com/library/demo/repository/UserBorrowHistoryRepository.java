package com.library.demo.repository;

import com.library.demo.model.UserBorrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBorrowHistoryRepository extends JpaRepository<UserBorrowHistory,Integer> {
}
