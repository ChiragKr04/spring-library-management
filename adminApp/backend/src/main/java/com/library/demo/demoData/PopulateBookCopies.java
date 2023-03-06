package com.library.demo.demoData;

import com.library.demo.model.Book;
import com.library.demo.model.BookCopies;
import com.library.demo.repository.BookCopiesRepository;
import com.library.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PopulateBookCopies {
    final
    BookRepository bookRepository;
    final BookCopiesRepository bookCopiesRepository;

    public PopulateBookCopies(BookRepository bookRepository,BookCopiesRepository bookCopiesRepository ) {
        this.bookRepository = bookRepository;
        this.bookCopiesRepository = bookCopiesRepository;
    }
    public String populateBookCopies(){
        List<Book> bookList = bookRepository.findAll();
        for (Book book: bookList
             ) {
            for (int i = 0; i < 3; i++) {
                BookCopies bookCopies = new BookCopies();
                bookCopies.setBookId(book.getId());
                bookCopies.setAvailable(true);
                bookCopiesRepository.save(bookCopies);
            }
        }
        return "success";
    }
    public String generateBookCopies(long bookId, int totalCopies){
        System.out.println("TOTAL COPIES "+ totalCopies);
        for (int i = 0; i < totalCopies; i++) {
            BookCopies bookCopies = new BookCopies();
            bookCopies.setBookId(bookId);
            bookCopies.setAvailable(true);
            bookCopiesRepository.save(bookCopies);
        }
        return "success";
    }
}
