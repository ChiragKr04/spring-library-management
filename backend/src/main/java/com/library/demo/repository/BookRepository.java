package com.library.demo.repository;

import com.library.demo.model.Book;
import com.library.demo.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByTitleContaining(String title);
    @Query(value = "SELECT * FROM book where genre in(select distinct genre from book) ORDER BY rating DESC LIMIT (select count(distinct genre) from book)*10 OFFSET 10",nativeQuery = true)
    List<Book> findTopTenBooksOfAllGenre();

    Book findById(long bookId);
}
