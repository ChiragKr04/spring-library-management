package com.library.demo.repository;

import com.library.demo.model.BookCopies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCopiesRepository extends JpaRepository<BookCopies, Integer> {
    @Query(value = "select * from book_copies where book_id = ?1 and is_available=true", nativeQuery = true)
    List<BookCopies> findBookCopiesByBookIdAndAvailable(Long id);
}
