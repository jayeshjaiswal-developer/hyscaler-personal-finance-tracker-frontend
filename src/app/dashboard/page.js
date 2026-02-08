"use client"
import React, { useEffect } from 'react'
// import BasicDemo from '../prime-react-Components/BasicDemo'
// import DoughnutChartDemo from '../prime-react-Components/DoughnutChartDemo'
// import VerticalBarDemo from '../prime-react-Components/VerticalBarDemo'
import { TiShoppingCart } from "react-icons/ti";
import { FaBoxOpen } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import { GiTakeMyMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { GiExpense } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { Chart } from 'chart.js';
import StackedBarDemo from '../prime-react-components/StackedBarDemo';



// import { hideLinearBar } from '../redux/reducers/linearProgressSlice';





export default function Dashboard() {
    // const dispatch = useDispatch();
    //  useEffect(()=>{
    //         dispatch(hideLinearBar());
    //     },[])

    let dashboardCardsData = [
        { "amount": 1558876, "label": "Total Income", "icon": <GiTakeMyMoney />},
        { "amount": 1558876, "label": "Total Budget", "icon": <TbPigMoney />},
        { "amount": 1558876, "label": "Total Expenses", "icon": <GiExpense />},
        // { "count": 1558876, "label": "Delivered", "icon": <TbTruckDelivery />, "cardColor": "rgba(38,105,255,255)" }
    ];
    return (
        <>
        <h1 className='font-bold text-[28px]'>Feb 2026</h1>
            <div className='grid grid-cols-3 gap-[50px]'>
                            {dashboardCardsData.map((v, i) => <DashboardCards prop={v} key={i} />)}
                        </div>
                        <div className="grid grid-cols-3 gap-[40px] mt-[40px]">
                            <div className="col-span-2">
                                {/* <StackedBarDemo/> */}
                            </div>
                            <div className=''>
                                {/* <DoughnutChartDemo /> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 mt-[40px] gap-[50px]">
                            {/* <div className="">
                                <VerticalBarDemo />
                            </div>
                            <div className=''>
                                <VerticalBarDemo />
                            </div>
                            <div className=''>
                                <VerticalBarDemo />
                            </div> */}

                        </div>
        </>
    )
}

// export default function Dashboard(){
//     return ("This is dashboard");
// }

function DashboardCards({ prop }) {
    return (
        <div>
            <div className={`p-[20px] border-1 border-grey `}>
                <div className='grid grid-cols-3 gap-[5px]'>
                    <div className='col-span-2 flex flex-col gap-[5px] justify-center '>
                        <h1 className='text-[18px]'>{prop.label}</h1>
                        <h2 className='text-[25px] flex font-bold items-center'><MdCurrencyRupee/>{prop.amount}</h2>
                    </div>
                    <div className='flex justify-center items-center text-[55px] bg-blue-500 rounded-[50%] w-[80px] h-[80px] text-white'>
                        {prop.icon}
                    </div>
                </div>
            </div>
        </div>
    )
}

