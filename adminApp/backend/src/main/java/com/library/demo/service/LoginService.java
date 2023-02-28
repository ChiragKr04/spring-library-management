package com.library.demo.service;

import com.library.demo.model.LoginPayload;
import com.library.demo.model.Response;
import com.library.demo.model.AdminCredential;
import com.library.demo.repository.AdminCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    AdminCredentialRepository userCredentialRepository;
    public Response login(AdminCredential adminCredential){
        Response response = new Response();
        if(userCredentialRepository.existsByAdminId(adminCredential.getAdminId())){
            adminCredential =userCredentialRepository.fetchAdmin(adminCredential.getAdminId(), adminCredential.getPassword());
            LoginPayload loginPayload = new LoginPayload();
            loginPayload.setUserId(adminCredential.getAdminId());
            loginPayload.setFirstname(adminCredential.getFirstname());
            loginPayload.setLastname(adminCredential.getLastname());
            loginPayload.setEmailId(adminCredential.getEmailId());
            loginPayload.setPhoneNo(adminCredential.getPhoneNo());
            loginPayload.setAddress(adminCredential.getAddress());
            response.setMessage("Success");
            response.setLoginPayload(loginPayload);
            return response;


        }
        response.setError("Incorrect UserId or Password");
        return response;
    }
}
