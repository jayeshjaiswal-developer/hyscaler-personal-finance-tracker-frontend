"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLinearBar, showLinearBar } from '../redux/reducers/linearProgressSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { backendBaseUrl } from '../api/api';
import { error, success } from '../functions/notifyUser';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";




export default function Transactions() {
  const router = useRouter();
  const dispatch = useDispatch();
  let [transactionsArray, setTransactionsArray] = useState([]);


  useEffect(() => {
    dispatch(hideLinearBar());
    getTransactions();
  }, [])

  function getTransactions() {
    // axios.get(`${backendBaseUrl}/product/view-product`)
    //   .then(res => res.data)
    //   .then(finalRes => {
    //     console.log(finalRes.message);
    //     setProductArray(finalRes.data);
    //   }).catch((error) => {
    //     console.log(error);
    //     console.log("something went xrong in frontend");
    //   })

    const transactionsArray = [
      {
        id: 1,
        type: "Income",
        amount: 50000,
        source: "TCS",
        date: "2026-02-01",
      },
      {
        id: 2,
        type: "Expense",
        amount: 1200,
        category: "Food",
        description: "Bought vegetables, fruits and groceries.",
        date: "2026-02-05",
      },
      {
        id: 3,
        type: "Expense",
        amount: 1500,
        category: "Bills",
        description: "Paid monthly electricity bill.",
        date: "2026-02-03",
      },
      {
        id: 4,
        type: "Income",
        amount: 8000,
        source: "Upwork Client",
        date: "2026-02-04",
      },
      {
        id: 5,
        type: "Expense",
        amount: 500,
        category: "Entertainment",
        description: "Watched movie with friends.",
        date: "2026-02-06",
      },
      {
        id: 6,
        type: "Income",
        amount: 2000,
        source: "Stock Dividend",
        date: "2026-02-02",
      },
    ];


    setTransactionsArray(transactionsArray)

  }

  let handleAddCategoryBtn = () => {
    dispatch(showLinearBar());
    router.push('/add/product');
  }



  return (
    <>
      <div>
        <ToastContainer />
        <div className='flex justify-between items-center mb-[20px]'>
          <h1 className='font-bold text-[22px] mb-[20px]'>Transactions</h1>
          <input className='border-b-1 outline-0 w-[50%] px-[10px]' type='text' placeholder='Type to search'/>
        </div>
        

        <div className='px-[20px]'>
          <table className='w-full'>
            <thead className='text-left'>
              <tr>
                <th className='p-[8px]'>Id</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                // productArray.length != 0?
                true ?
                  transactionsArray.map((v, i) => <SourceRow prop={v} index={i} key={i} getTransactionsFunction={getTransactions} />)
                  :
                  <tr><td colSpan={8} className='text-center py-[100px]'>No ncome sources found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function SourceRow({ prop, index, getTransactionsFunction }) {
  const dispatch = useDispatch();
  const router = useRouter();

  let handleProductDelete = () => {
    dispatch(showLinearBar());
    console.log("delete button clicked");
    // console.log(prop._id);
    axios.post(`${backendBaseUrl}/product/delete-product`, { id: prop._id })
      .then(res => res.data)
      .then(finalRes => {
        dispatch(hideLinearBar());
        if (finalRes.status) {
          success(toast, finalRes.message);
          getTransactionsFunction();
        } else {
          error(toast, finalRes.message);
        }
      })
  }

  let handleProductViewEdit = () => {
    dispatch(showLinearBar());
    router.push(`/view-edit/product/${prop._id}`);
  }
  // return (<tr><td>hii</td></tr>)
  return (
    <tr className='border-y-2 border-y-gray-400'>
      <td className=' p-[8px]'>{index + 1}</td>
      <td>{prop.date}</td>
      <td>{prop.type}-{prop.type == "Income" ? prop.source : prop.description}</td>
      <td>{prop.amount}</td>

    </tr>
  )
}



