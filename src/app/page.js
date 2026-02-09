"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminLayout, { HomePage } from "./AdminLayout";
import Dashboard from "./dashboard/page";
import Login from "./auth/login/page";
import { useDispatch, useSelector } from "react-redux";
import { addUserToken } from "./redux/reducers/userSlice";

export default function Home() {
  const user = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

    useEffect(() => {
      let token = localStorage.getItem('jwt-token');
      // console.log("This is token: "+ tokenStr);
      if(token){
        dispatch(addUserToken(token));
      }
    }, [])
  
  return (
    <div>
      {
        user ?
          <Dashboard />
          :
          <HomePage/>
      }
    </div>
  );
}
