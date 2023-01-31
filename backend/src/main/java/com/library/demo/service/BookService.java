package com.library.demo.service;

import com.library.demo.model.Book;
import com.library.demo.model.SearchBooks;
import com.library.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    public List<Book> fetchBook(SearchBooks search){
        System.out.println(search.getClass());
        return bookRepository.findByTitleContaining(search.getSearch());
    }
}
