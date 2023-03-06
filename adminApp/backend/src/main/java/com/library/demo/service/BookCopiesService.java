package com.library.demo.service;

import com.library.demo.model.BookCopies;
import com.library.demo.repository.BookCopiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookCopiesService {
    @Autowired
    BookCopiesRepository bookCopiesRepository;
    public List<BookCopies> getBookCopies(long bookId){
        return (List<BookCopies>) bookCopiesRepository.findBookCopiesByBookIdAndAvailable(bookId);
    }
}
