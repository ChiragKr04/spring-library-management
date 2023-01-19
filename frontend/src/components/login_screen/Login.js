import axios from 'axios';
import React, { Component } from 'react';
import "./Login.css"


export default class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            userData: [],
            isLoading: true
        };

    }

    componentDidMount() {
        fetch(
            "http://localhost:4000/library/getAllUser")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    userData: json,
                    isLoading: false
                });
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
                                <li key={item.userId}>User Id: {item.userId},
                                    User_Name: {item.userName},
                                    Email: {item.userEmail},
                                    Password: {item.userPassword}</li>
                            ))
                            } </div>
                    }
                </div>
            </div>
        )
    }
}
