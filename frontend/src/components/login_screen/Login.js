import React, { Component } from 'react';
import "./Login.css"
import { ApiConstants } from "../../constants/ApiConstants"
import { RestApiService } from '../../utils/RestApiService';


export default class Login extends Component {

    getAllData = async () => {
        try {
            await RestApiService.get(
                ApiConstants.getAllUser,
                {
                    "Authorization": "any-auth-token"
                },
            ).then((json) => {
                this.setState({
                    userData: json.data,
                    isLoading: false
                });
            })
        } catch (e) {
            this.setState({
                userData: [],
                isLoading: false
            });
        }
    }

    loginUser = async () => {
        try {
            await RestApiService.post(
                ApiConstants.login,
                {
                    "Authorization": "any-auth-token"
                },
                {
                    "userEmail": "chirag@gmail.com",
                    "userPass": "123456"
                }
            ).then((json) => {
                console.log(`[loginUser] ${json}`);
            })
        } catch (e) {

        }
    }

    constructor(props) {
        super();
        this.state = {
            userData: [],
            isLoading: true
        };

    }

    componentDidMount() {
        this.getAllData().then(() => {
            this.loginUser()
        })

    }

    render() {
        const { isLoading, userData } = this.state;
        return (
            <div className="center">
                <h1>
                    Hello world!
                </h1>

                <div className="row">
                    {
                        (isLoading)
                            ? <div> Loading...</div>
                            : <div> {userData.map((item) => (
                                <li key={item.userId}>
                                    User Id: {item.userId},
                                    User_Name: {item.userName},
                                    Email: {item.userEmail},
                                    Password: {item.userPassword}
                                </li>
                            ))
                            } </div>
                    }
                </div>
            </div>
        )
    }
}
