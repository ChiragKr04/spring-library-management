package com.library.demo.service;

import com.library.demo.model.UserBorrowHistory;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserHistoryService {
    final
    private UserBorrowHistoryRepository userBorrowHistoryRepository;
    public UserHistoryService(
            UserBorrowHistoryRepository userBorrowHistoryRepository) {
        this.userBorrowHistoryRepository = userBorrowHistoryRepository;
    }
    public List<UserBorrowHistory> fetchUserHistory(String userId) {

        return userBorrowHistoryRepository.findByUserId(userId);

    }
}
