package com.library.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.demo.demoData.PopulateBookCopies;
import com.library.demo.demoData.PopulateBookService;
import com.library.demo.model.*;
import com.library.demo.service.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.io.FileNotFoundException;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "/admin")
public class Controller {

    @Autowired
    SignUpService signUpService;
    @Autowired
    LoginService loginService;
    @Autowired
    BookService bookService;
    @Autowired
    BookBorrowRequestService bookBorrowRequestService;

//    @Autowired
//    PopulateBookService populateBookService;
//    @Autowired
//    BookCopiesService bookCopiesService;
//    final
//    IssueBookService issueBookService;
    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    PopulateBookCopies populateBookCopies;

//    public Controller(IssueBookService issueBookService
//            , UserHistoryService userHistoryService
//            , PopulateBookCopies populateBookCopies) {
//        this.issueBookService = issueBookService;
//        this.userHistoryService = userHistoryService;
//        this.populateBookCopies = populateBookCopies;
//    }

    @PostMapping(path = "/signUp")
    public Response signUp(@RequestBody AdminCredential adminCredential){
        System.out.println(adminCredential.getEmailId());
        System.out.println(adminCredential.getFirstname());
        System.out.println(adminCredential.getLastname());
        System.out.println(adminCredential.getPhoneNo());
        System.out.println(adminCredential.getAddress());
        return signUpService.signUp(adminCredential);
    }
    @PostMapping(path = "/login")
    public Response login(@RequestBody AdminCredential adminCredential){
        System.out.println(adminCredential.getAdminId() +" \n"+ adminCredential.getPassword());
        System.out.println(loginService.login(adminCredential));

        return loginService.login(adminCredential);
    }

    @GetMapping(path = "/getAllUserHistory")
    public List<UserBorrowHistory> getAllUserHistory() {
        return userHistoryService.getAllUserBorrowHistory();
    }

    @GetMapping(path = "/getBorrowRequest")
    public List<UserBorrowHistory> getActiveBorrowRequests(){
        return userHistoryService.getAllActiveBorrowRequest();
    }
    @GetMapping(path = "/borrowRequest")
    public Flux<ServerSentEvent<String>> getSseStream() {
        ObjectMapper objectMapper = new ObjectMapper();

        return Flux.interval(Duration.ofSeconds(5))
                .map(seq -> {
                    int totalHistory = userHistoryService.getTotalUserBorrowHistory();
                    Map<String, Integer> data = new HashMap<>();
                    data.put("data", totalHistory);

                    String json = null;
                    try {
                        json = objectMapper.writeValueAsString(data);
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }

                    return ServerSentEvent.<String>builder()
                            .data(json)
                            .build();
                });
    }

    @PostMapping(path = "/search")
    public List<Book> getBook(@RequestBody SearchBooks search){
        System.out.println(search.getSearch().toLowerCase());
        if (search.getSearch().toLowerCase().equals("all")){
            return bookService.getAllBooks();
        }
        return bookService.fetchBook(search);
    }

    @PostMapping(path = "/approveRequest")
    public String approveRequest(@RequestBody UserBorrowHistory userBorrowHistory){
        System.out.println(userBorrowHistory.getUserBorrowHistoryId());
        System.out.println(userBorrowHistory.getUserId());
        return bookBorrowRequestService.approveRequest(userBorrowHistory);
    }
    @PostMapping(path = "/disapproveRequest")
    public String disapproveRequest(@RequestBody UserBorrowHistory userBorrowHistory){
        System.out.println(userBorrowHistory.getUserBorrowHistoryId());
        System.out.println(userBorrowHistory.getUserId());
        return bookBorrowRequestService.disapproveRequest(userBorrowHistory);
    }


    @PostMapping(path="/add-book")
    public Book addBook(@RequestBody Book book, @RequestHeader HashMap<String, String> headers){
        System.out.println(book);
        System.out.println("Total Copies to generate " + headers.get("copies"));
        var data = bookService.addBook(book);
        String copies = headers.get("copies").toString();
        populateBookCopies.generateBookCopies(data.getId(),Integer.parseInt(copies));
        return data;
    }

    @PostMapping(path="/update-copies")
    public boolean updateCopies(@RequestHeader HashMap<String, String> headers){
        String bookId = headers.get("bookId");
        String copies = headers.get("copies");
        populateBookCopies.generateBookCopies(Long.parseLong(bookId),Integer.parseInt(copies));
        return true;
    }

//
//    @GetMapping(path = "/populateBooks")
//    public String populateBook() throws FileNotFoundException {
//        return populateBookService.PopulateBook();
//    }
//    @GetMapping(path = "/populateBookCopies")
//    public String populateBookCopies()  {
//        return populateBookCopies.populateBookCopies();
//    }
//    @GetMapping(path = "/getCopies")
//    public List<BookCopies> getCopies(@RequestParam Integer bookId)  {
//
//        return  bookCopiesService.getBookCopies(bookId);
//    }
//    @PostMapping(path = "/issueBook")
//    public Response issueBookCopies(@RequestBody IssueBookPayload issueBookPayload){
////        System.out.println(issueBookPayload.getUserId());
////        System.out.println(issueBookPayload.getBookId());
////        System.out.println(issueBookPayload.getBookCopyId());
//        return issueBookService.issueBook(issueBookPayload);
//    }
//
//    @PostMapping(path = "/fetchUserHistory")
//    public List<Object> fetchUserHistory(@RequestParam String userId) {
//        return userHistoryService.fetchUserHistory(userId);
//    }
//
//    @PostMapping(path = "/forgotPassword")
//    public boolean forgotPassword(@RequestBody HashMap<String, String> userId) {
//        return signUpService.forgotPassword(userId.get("userId"));
//    }

}
