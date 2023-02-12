package com.library.demo.service;

import com.library.demo.model.UserBorrowBookFullData;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserHistoryService {
    final
    private UserBorrowHistoryRepository userBorrowHistoryRepository;
    public UserHistoryService(
            UserBorrowHistoryRepository userBorrowHistoryRepository) {
        this.userBorrowHistoryRepository = userBorrowHistoryRepository;
    }
    public List<UserBorrowBookFullData> fetchUserHistory(String userId) {

        List<UserBorrowBookFullData> fullData = new ArrayList<>();
        List<List<Object>> response = userBorrowHistoryRepository.getUserBorrowHistory(userId);

        for (int i = 0; i < response.size(); i++) {
            System.out.println(response.get(i));
            fullData.add(
                    new UserBorrowBookFullData(
                    (BigInteger) response.get(i).get(0),
                    (BigInteger) response.get(i).get(1),
                    (Date) response.get(i).get(2),
                    (String) response.get(i).get(3),
                    (String) response.get(i).get(4),
                    (Date) response.get(i).get(5),
                    (boolean) response.get(i).get(6),
                    (String) response.get(i).get(7),
                    (boolean) response.get(i).get(8),
                    (String) response.get(i).get(9),
                    (String) response.get(i).get(10),
                    (double) response.get(i).get(11),
                    (double) response.get(i).get(12),
                    (String) response.get(i).get(13),
                    (String) response.get(i).get(14)
            ));
        }

        return fullData;

    }
}
