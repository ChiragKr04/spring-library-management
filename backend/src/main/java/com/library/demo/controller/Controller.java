package com.library.demo.controller;

import com.library.demo.demoData.PopulateBookCopies;
import com.library.demo.demoData.PopulateBookService;
import com.library.demo.model.*;
import com.library.demo.service.*;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "/demo")
public class Controller {

    final
    SignUpService signUpService;
    final
    LoginService loginService;
    final
    BookService bookService;
    final
    PopulateBookService populateBookService;
    final
    BookCopiesService bookCopiesService;
    final
    IssueBookService issueBookService;
    final
    UserHistoryService userHistoryService;
    final PopulateBookCopies populateBookCopies;

    public Controller(IssueBookService issueBookService
            , UserHistoryService userHistoryService
            , PopulateBookCopies populateBookCopies, SignUpService signUpService, LoginService loginService, BookService bookService, PopulateBookService populateBookService, BookCopiesService bookCopiesService) {
        this.issueBookService = issueBookService;
        this.userHistoryService = userHistoryService;
        this.populateBookCopies = populateBookCopies;
        this.signUpService = signUpService;
        this.loginService = loginService;
        this.bookService = bookService;
        this.populateBookService = populateBookService;
        this.bookCopiesService = bookCopiesService;
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
        if (search.getSearch().equalsIgnoreCase("all")){
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

    @GetMapping(path = "/getTopTenBooksOfAllGenre")
    public Map<String,List<Book>> getTopTenBooksOfAllGenre(){
        return bookService.getTopTenBookOfAllGenre();
    }

}
