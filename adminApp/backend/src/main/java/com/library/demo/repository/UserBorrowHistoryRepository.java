package com.library.demo.repository;

import com.library.demo.model.UserBorrowBookFullData;
import com.library.demo.model.UserBorrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBorrowHistoryRepository extends JpaRepository<UserBorrowHistory,Integer> {
    @Query(value = "select count(*) from user_borrow_history where (book_id = ?1 and user_id = ?2) and active = true", nativeQuery = true)
    Long checkForAlreadyBorrowedActive(Long bookId,String userId);

    @Query(value="SELECT \n" +
            "bh.user_borrow_history_id,\n" +
            "bh.book_id,\n" +
            "bh.issue_date,\n" +
            "bh.user_id,\n" +
            "bh.copy_id,\n" +
            "bh.return_date,\n" +
            "bh.active,\n" +
            "b.author,\n" +
            "b.available,\n" +
            "b.image,\n" +
            "b.title,\n" +
            "b.rating,\n" +
            "b.price,\n" +
            "b.genre,\n" +
            "b.description\n" +
            "FROM user_borrow_history bh\n" +
            "JOIN book b\n" +
            "ON bh.book_id = b.id\n" +
            "WHERE bh.user_id = ?1", nativeQuery = true)
    List<List<Object>> getUserBorrowHistory(String userId);
    @Query(value = "select * from user_borrow_history where status is null",nativeQuery = true)
    List<UserBorrowHistory> getAllActiveRequest();
}
