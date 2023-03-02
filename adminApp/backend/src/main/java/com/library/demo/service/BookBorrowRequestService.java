package com.library.demo.service;

import com.library.demo.model.BookCopies;
import com.library.demo.model.UserBorrowHistory;
import com.library.demo.repository.BookCopiesRepository;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookBorrowRequestService {
    @Autowired
    UserBorrowHistoryRepository userBorrowHistoryRepository;
    @Autowired
    BookCopiesRepository bookCopiesRepository;
    public String approveRequest(UserBorrowHistory userBorrowHistory){
        userBorrowHistory.setStatus("Approved");
        userBorrowHistoryRepository.save(userBorrowHistory);
        return "success";
    }
    public String disapproveRequest(UserBorrowHistory userBorrowHistory){
        BookCopies bookCopies = bookCopiesRepository.findByBookCopyId(userBorrowHistory.getCopyId());
        bookCopies.setAvailable(true);
        bookCopiesRepository.save(bookCopies);
        userBorrowHistoryRepository.delete(userBorrowHistory);
        return "success disapproved";
    }
}
