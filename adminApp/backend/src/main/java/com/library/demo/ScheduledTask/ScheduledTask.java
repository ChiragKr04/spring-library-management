package com.library.demo.ScheduledTask;

import com.library.demo.model.UserBorrowHistory;
import com.library.demo.repository.UserBorrowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ScheduledTask {
    @Autowired
    UserBorrowHistoryRepository userBorrowHistoryRepository;
    @Scheduled(fixedRate = 60000)
    public void deleteUnApprovedBorrowRequest(){
        for (UserBorrowHistory request:userBorrowHistoryRepository.delayUserRequest()
        ) {
            userBorrowHistoryRepository.delete(request);
        }
        System.out.println("scheduler check "+new Date());

    }
}
