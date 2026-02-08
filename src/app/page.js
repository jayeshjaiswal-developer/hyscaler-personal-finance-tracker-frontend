"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AdminLayout, { HomePage } from "./AdminLayout";
import Dashboard from "./dashboard/page";
import Login from "./auth/login/page";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.token);
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
