import React from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
    const userState = useSelector((state) => state.user);
    console.log("userState");
    console.log(userState);
    return (
        <div>HomePage </div>
    )
}
