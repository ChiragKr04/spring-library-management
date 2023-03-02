package com.library.demo.service;

import com.library.demo.model.UserBorrowHistory;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookBorrowRequestService {
    @Autowired
    UserBorrowHistoryRepository userBorrowHistoryRepository;
    public String approveRequest(UserBorrowHistory userBorrowHistory){
        userBorrowHistory.setStatus("Approved");
        userBorrowHistoryRepository.save(userBorrowHistory);
        return "success";
    }
}
