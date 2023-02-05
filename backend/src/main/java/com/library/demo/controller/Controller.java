package com.library.demo.controller;

import com.library.demo.model.Book;
import com.library.demo.model.Response;
import com.library.demo.model.SearchBooks;
import com.library.demo.model.UserCredential;
import com.library.demo.service.BookService;
import com.library.demo.service.LoginService;
import com.library.demo.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

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
}
