package com.library.demo.repository;

import com.library.demo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByTitleContaining(String title);

    Book findById(long bookId);
}
