package com.library.demo.controller;

import com.library.demo.demoData.PopulateBookService;
import com.library.demo.model.*;
import com.library.demo.service.BookCopiesService;
import com.library.demo.service.BookService;
import com.library.demo.service.LoginService;
import com.library.demo.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "/demo")
public class Controller {

    @Autowired
    SignUpService signUpService;
    @Autowired
    LoginService loginService;
    @Autowired
    BookService bookService;
    @Autowired
    PopulateBookService populateBookService;
    @Autowired
    BookCopiesService bookCopiesService;

    @PostMapping(path = "/signUp")
    public Response signUp(@RequestBody UserCredential userCredential){
        System.out.println(userCredential.getEmailId());
        System.out.println(userCredential.getFirstname());
        System.out.println(userCredential.getLastname());
        System.out.println(userCredential.getPhoneNo());
        System.out.println(userCredential.getAddress());
        return signUpService.signUp(userCredential);
    }
    @PostMapping(path = "/login")
    public Response login(@RequestBody UserCredential userCredential){
        System.out.println(userCredential.getUserId() +" \n"+ userCredential.getPassword());
        System.out.println(loginService.login(userCredential));

        return loginService.login(userCredential);
    }
    @PostMapping(path = "/search")
    public List<Book> getBook(@RequestBody SearchBooks search){
        return bookService.fetchBook(search);
    }

    @PostMapping(path="/add-book")
    public Book addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }

    @GetMapping(path = "/populateBooks")
    public String populateBooks() throws FileNotFoundException {
        return populateBookService.PopulateBook();
    }
    @GetMapping(path = "/getCopies")
    public List<BookCopies> getCopies(@RequestParam Integer bookId)  {
        List<BookCopies> copyList = bookCopiesService.getBookCopies(bookId);
        for (BookCopies copy: copyList
             ) {
            System.out.println("book copy Id: " + copy.getBookCopyId());
            System.out.println("book copy Id: " + copy.isAvailable());
        }
        System.out.println(bookId);
        return copyList;
    }

}
