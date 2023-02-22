package com.library.demo.service;

import com.library.demo.model.*;
import com.library.demo.repository.BookCopiesRepository;
import com.library.demo.repository.BookRepository;
import com.library.demo.repository.UserBorrowHistoryRepository;
import com.library.demo.repository.UserCredentialRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class IssueBookService {
    @Autowired
    EmailService emailService;
    final
    BookRepository bookRepository;

    final
    BookCopiesRepository bookCopiesRepository;

    final UserBorrowHistoryRepository userBorrowHistoryRepository;

    public IssueBookService(BookRepository bookRepository
            , BookCopiesRepository bookCopiesRepository
            , UserBorrowHistoryRepository userBorrowHistoryRepository) {
        this.bookRepository = bookRepository;
        this.bookCopiesRepository = bookCopiesRepository;
        this.userBorrowHistoryRepository = userBorrowHistoryRepository;
    }

    public Response issueBook(IssueBookPayload issueBookPayload){
        Response response = new Response();
        return validCheckForIssueBook(response,issueBookPayload);
    }
    private Response validCheckForIssueBook(Response response
            , IssueBookPayload issueBookPayload){
        //Validation check
        System.out.println("v "+userBorrowHistoryRepository.checkForAlreadyBorrowedActive(
                issueBookPayload.getBookId(),
                issueBookPayload.getUserId()));
        if (userBorrowHistoryRepository.checkForAlreadyBorrowedActive(
                issueBookPayload.getBookId(),
                issueBookPayload.getUserId()) != 0) {
                response.setError("Book Already Borrowed");
                return response;
        }
        else {
            //for fetch title and author
            Book book = bookRepository.findById(issueBookPayload.getBookId());
            //updating user history
            UserBorrowHistory userBorrowHistory = new UserBorrowHistory();
            userBorrowHistory.setUserId(issueBookPayload.getUserId());
            userBorrowHistory.setBookId(issueBookPayload.getBookId());
            userBorrowHistory.setCopyId(issueBookPayload.getBookCopyId());
            userBorrowHistory.setBookTitle(book.getTitle());
            userBorrowHistory.setAuthor(book.getAuthor());
            userBorrowHistory.setActive(true);
            userBorrowHistory.setIssueDate(new Date());
            System.out.println(userBorrowHistory.getAuthor());
            userBorrowHistoryRepository.save(userBorrowHistory);
            // updating book copies table
            BookCopies bookCopies = bookCopiesRepository.findByBookCopyId(issueBookPayload.getBookCopyId());
            bookCopies.setAvailable(false);
            bookCopiesRepository.save(bookCopies);

            //////////////////////////
            // Sending email after book is issued
//            emailService.sendEmailForIssueRequest(userBorrowHistory);

            //System.out.println(bookCopies.isAvailable());
            //check copies availability
            if (bookCopiesRepository.checkForCopyAvailability(
                    issueBookPayload.getBookId()) == 0) {
                book.setAvailable(false);
                bookRepository.save(book);
            }

            response.setMessage("Book copy is Booked for collect your copy within 2 hours.");
        }
        return response;
    }

}
