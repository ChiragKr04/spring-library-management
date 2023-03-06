package com.library.demo.controller;

import com.library.demo.demoData.PopulateBookCopies;
import com.library.demo.demoData.PopulateBookService;
import com.library.demo.model.*;
import com.library.demo.service.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


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
    final
    IssueBookService issueBookService;
    final
    UserHistoryService userHistoryService;
    final PopulateBookCopies populateBookCopies;

    public Controller(IssueBookService issueBookService
            , UserHistoryService userHistoryService
            , PopulateBookCopies populateBookCopies) {
        this.issueBookService = issueBookService;
        this.userHistoryService = userHistoryService;
        this.populateBookCopies = populateBookCopies;
    }

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
        System.out.println(search.getSearch().toLowerCase());
        if (search.getSearch().toLowerCase().equals("all")){
            return bookService.getAllBooks();
        }
        return bookService.fetchBook(search);
    }

    @PostMapping(path="/add-book")
    public Book addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }

    @GetMapping(path = "/populateBooks")
    public String populateBook() throws FileNotFoundException {
        return populateBookService.PopulateBook();
    }
    @GetMapping(path = "/populateBookCopies")
    public String populateBookCopies()  {
        return populateBookCopies.populateBookCopies();
    }
    @GetMapping(path = "/getCopies")
    public List<BookCopies> getCopies(@RequestParam Integer bookId)  {

        return  bookCopiesService.getBookCopies(bookId);
    }
    @PostMapping(path = "/issueBook")
    public Response issueBookCopies(@RequestBody IssueBookPayload issueBookPayload){
//        System.out.println(issueBookPayload.getUserId());
//        System.out.println(issueBookPayload.getBookId());
//        System.out.println(issueBookPayload.getBookCopyId());
        return issueBookService.issueBook(issueBookPayload);
    }

    @PostMapping(path = "/fetchUserHistory")
    public List<Object> fetchUserHistory(@RequestParam String userId) {
        return userHistoryService.fetchUserHistory(userId);
    }

    @PostMapping(path = "/forgotPassword")
    public boolean forgotPassword(@RequestBody HashMap<String, String> userId) {
        return signUpService.forgotPassword(userId.get("userId"));
    }

}
