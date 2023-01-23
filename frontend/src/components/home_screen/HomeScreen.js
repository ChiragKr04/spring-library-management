import React, { Component, useEffect, useState } from 'react';
import "./HomeScreen.css"
import { ApiConstants } from "../../constants/ApiConstants"
import { RestApiService } from '../../utils/RestApiService';
import { useLocation } from 'react-router-dom';


export default function HomeScreen() {

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const { state } = useLocation();

    const getAllData = async () => {
        console.log(`STATE ${state.currentUser.userId}`)
        try {
            await RestApiService.get(
                ApiConstants.getAllUser,
                {
                    "Authorization": "any-auth-token"
                },
            ).then((json) => {
                setUserData(json.data);
                setLoading(false);
            })
        } catch (e) {
            setUserData([]);
            setLoading(false);
        }
    }

    if (isLoading) {
        getAllData();
    }

    return (
        <div className="center">
            <h1>
                Hello world!
            </h1>

            <div className="row">
                {
                    (isLoading)
                        ? <div> Loading...</div>
                        : <div>
                            User Id: {state.currentUser.userId}<br /> User Name: {state.currentUser.userName}<br /> User Email: {state.currentUser.userEmail}
                            <div> {userData.map((item) => (
                                <li key={item.userId}>
                                    User Id: {item.userId},
                                    User_Name: {item.userName},
                                    Email: {item.userEmail},
                                    Password: {item.userPassword}
                                </li>
                            ))
                            } </div>
                        </div>
                }
            </div>
        </div>
    )
}

