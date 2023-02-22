package com.library.demo.service;

import com.library.demo.model.UserBorrowBookFullData;
import com.library.demo.model.UserBorrowHistory;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.*;

@Service
public class UserHistoryService {
    final
    private UserBorrowHistoryRepository userBorrowHistoryRepository;
    public UserHistoryService(
            UserBorrowHistoryRepository userBorrowHistoryRepository) {
        this.userBorrowHistoryRepository = userBorrowHistoryRepository;
    }
    public List<Object> fetchUserHistory(String userId) {
       // System.out.println("hi");
        List<Object> bookList= new ArrayList<>();

        List<List<Object>> response = userBorrowHistoryRepository.getUserBorrowHistory(userId);
//        System.out.println(response.getClass());
        for (int i = 0; i < response.size(); i++) {
            Map<String, Object> book = new HashMap<>();
//            System.out.println(response.get(i));
//            System.out.println(response.get(i).get(0).getClass());
//            System.out.println(response.get(i).get(1));
            book.put("user_borrow_history_id", response.get(i).get(0));
            book.put("book_id", response.get(i).get(1));
            book.put("issue_date", response.get(i).get(2));
            book.put("user_id", response.get(i).get(3));
            book.put("copy_id", response.get(i).get(4));
            book.put("return_date", response.get(i).get(5));
            book.put("active", response.get(i).get(6));
            book.put("author", response.get(i).get(7));
            book.put("available", response.get(i).get(8));
            book.put("image", response.get(i).get(9));
            book.put("title", response.get(i).get(10));
            book.put("rating", response.get(i).get(11));
            book.put("price", response.get(i).get(12));
            book.put("genre", response.get(i).get(13));
            book.put("description", response.get(i).get(14));
            bookList.add(book);
//            fullData.add(
//                    new UserBorrowBookFullData(
//                            (BigInteger) response.get(i).get(0),
//                            (BigInteger) response.get(i).get(1),
//                            (Date) response.get(i).get(2),
//                            (String) response.get(i).get(3),
//                    (String) response.get(i).get(4),
//                    (Date) response.get(i).get(5),
//                    (boolean) response.get(i).get(6),
//                    (String) response.get(i).get(7),
//                    (boolean) response.get(i).get(8),
//                    (String) response.get(i).get(9),
//                    (String) response.get(i).get(10),
//                    (double) response.get(i).get(11),
//                    (double) response.get(i).get(12),
//                    (String) response.get(i).get(13),
//                    (String) response.get(i).get(14)
//            ));
//            System.out.println("hi3");
//        }
//
//        return fullData;

        }    return bookList;
    }

    public int getTotalUserBorrowHistory() {
        return userBorrowHistoryRepository.findAll().size();
    }

    public List<UserBorrowHistory> getAllUserBorrowHistory() {
        return userBorrowHistoryRepository.findAll();
    }

}
