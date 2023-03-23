package com.library.demo.service;

import com.library.demo.model.Book;
import com.library.demo.model.SearchBooks;
import com.library.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    public List<Book> fetchBook(SearchBooks search){
        System.out.println(search.getClass());
        return bookRepository.findByTitleContaining(search.getSearch());
    }
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }
    public Map<String,List<Book>> getTopTenBookOfAllGenre(){
        Map<String,List<Book>> topTenBooksOfAllGenre= new HashMap<>();
        List<Book> allTopTenBooksOfAllGenre  = bookRepository.findTopTenBooksOfAllGenre();
        for (Book book: allTopTenBooksOfAllGenre) {
            if(topTenBooksOfAllGenre.containsKey(book.getGenre())){
                List<Book> temp = topTenBooksOfAllGenre.get(book.getGenre());
                temp.add(book);
                topTenBooksOfAllGenre.put(book.getGenre(),temp);
            }
            else {
                List<Book> temp = new ArrayList<>();
                temp.add(book);
                topTenBooksOfAllGenre.put(book.getGenre(), temp);
            }
        }

        return topTenBooksOfAllGenre;
    }

    public Book addBook(Book book){
        return bookRepository.save(book);
    }

}
