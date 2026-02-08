"use client"
import React, { useState } from 'react'



import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { GiTakeMyMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { GiExpense } from "react-icons/gi";




import { useSelector, useDispatch } from 'react-redux'
// import { showLinearBar, hideLinearBar, updateSideMenuClicked } from './redux/reducers/linearProgressSlice';
import Login from './auth/login/page';
import { updateSideMenuClicked } from './redux/reducers/linearProgressSlice';
import Link from 'next/link';
// import { Link } from 'lucide-react';
// import Login from './auth/Login';

export default function AdminLayout(props) {
    // const isClicked = useSelector((state) => state.linearProgress.isClicked)
    const dispatch = useDispatch()
    // console.log("hello");
    // console.log(isClicked);
    const user = useSelector((state) => state.user.token);


    return (
        <div>
            {
                // user ?
                // false?
                true ?
                    <div>
                        <div className='mx-auto max-w-[1515px]'>
                            <div className='grid grid-cols-6  border-1 border-grey'>
                                <div className='border-1 border-grey'>
                                    <div className='sticky top-[85px]'>
                                        <SideBar />
                                    </div>
                                </div>
                                <div className='col-span-5' >
                                    <div className='p-[20px]  min-h-[680px]'>
                                        {/* Place your main content here */}
                                        {props.children}
                                        {/* {isClicked} */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Login />
            }
        </div>
    )
}


function SideBar() {



    let sideMenusArray = [
        { 'icon': <MdDashboard />, 'label': 'Dashboard', 'link': '/dashboard' },
        { 'icon': <GiTakeMyMoney />, 'label': 'Income Sources', 'link': '/income-sources' },
        { 'icon': <TbPigMoney/>, 'label': 'Budgets', 'link': '/budgets' },
        { 'icon': <GiExpense />, 'label': 'Expenses', 'link': '/expenses' },
        { 'icon': <GrTransaction />, 'label': 'Transactions', 'link': '/transactions' },
    ]

    return (
        <div className='pt-[2px]'>
            <ul className=''>
                {sideMenusArray.map((v, i) => <SideBarMenus v={v} i={i} key={i} />)}
            </ul>
        </div>
    )
}

function SideBarMenus({ v, i }) {
    const dispatch = useDispatch()
    const router = useRouter();

    const isSideMenuClicked = useSelector((state) => state.linearProgress.isSideMenuClicked);
    // const isClicked = useSelector((state) => state.linearProgress.isClicked)

    let handleMenuClick = (v, i) => {
        console.log("side menu clicked"+ i);
        // if (isSideMenuClicked != i) {
        //     dispatch(showLinearBar());
        // }
        // dispatch(showLinearBar());
        dispatch(updateSideMenuClicked(i));

        console.log(i);
        router.push(`${v.link}`);

    }

    return (
        <li onClick={() => handleMenuClick(v, i)} className={`${isSideMenuClicked==i? 'bg-blue-50 text-blue-500' : 'text-gray-500'} font-bold cursor-pointer my-[10px] flex gap-[10px]   justify-right items-center ${isSideMenuClicked!=i?'hover:bg-blue-50':''}`} key={i}>&nbsp;{v.icon}{v.label}</li>
        // <li onClick={() => handleMenuClick(v, i)} className={`${true? 'bg-blue-50 text-blue-500 font-bold' : ''} px-[10px] py-[5px] cursor-pointer my-[10px] flex gap-[10px] items-center ${true? 'hover:bg-red-500' : 'hover:bg-red-400'}`} key={i}>{v.icon}{v.label}</li>
        // <li onClick={() => handleMenuClick(v, i)} className={`${isSideMenuClicked == i ? 'bg-red-500' : ''} px-[10px] py-[5px] cursor-pointer my-[10px] flex gap-[10px] items-center ${isSideMenuClicked == i ? 'hover:bg-red-500' : 'hover:bg-red-400'}`} key={i}>{v.icon}{v.label}</li>
    )
}

export function HomePage({setShowHomePageFunction}) {
    const router = useRouter();
    let handleGetStartedClick = ()=>{
        // setShowHomePageFunction(false);
        router.push('/auth/login')
        
    }
    return (
        <div className='mx-auto max-w-[1515px] font-bold flex flex-col h-[80vh] justify-center items-center text-[40px]'>
                {/* <h1 className='text-[24px]'>Welcome to HyScaler Expense Tracker</h1>             */}
                <h1>Manage Your Expense</h1>
                <h1 className='text-blue-500'>Control Your Money</h1>
                <h2 className='text-[18px] font-normal'>Start creating your buget and save lot of money</h2>
                <button className='text-[18px] rounded-sm bg-blue-500 mt-[25px] text-white px-[20px] py-[5px] cursor-pointer' onClick={()=>handleGetStartedClick()}>Get Started</button>
        </div>
    );
}