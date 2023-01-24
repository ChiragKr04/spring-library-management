package com.library.demo.model;

public record UserData(String userId, String firstName, String lastName, String emailId, String phoneNo, String address) {
    public static UserData toJson(Object[] data){
        return new UserData(
                data[0].toString(),
                data[1].toString(),
                data[2].toString(),
                data[3].toString(),
                data[4].toString(),
                data[5].toString()
        );
    }

}
