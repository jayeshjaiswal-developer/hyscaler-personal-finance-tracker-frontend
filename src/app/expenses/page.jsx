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

export default function Expenses() {
  const router = useRouter();
  const dispatch = useDispatch();
  let [expensesArray, setExpensesArray] = useState([]);

  useEffect(() => {
    dispatch(hideLinearBar());
    getExpenses();
  }, [])

  function getExpenses() {
    // axios.get(`${backendBaseUrl}/product/view-product`)
    //   .then(res => res.data)
    //   .then(finalRes => {
    //     console.log(finalRes.message);
    //     setProductArray(finalRes.data);
    //   }).catch((error) => {
    //     console.log(error);
    //     console.log("something went xrong in frontend");
    //   })
    const expensesArray = [
      {
        id: 1,
        title: "Grocery Shopping",
        amount: 1200,
        category: "Food",
        description: "Bought vegetables, fruits and daily grocery items.",
        date: "2026-02-05",
      },
      {
        id: 2,
        title: "Netflix Subscription",
        amount: 499,
        category: "Entertainment",
        description: "Monthly Netflix subscription payment.",
        date: "2026-02-02",
      },
      {
        id: 3,
        title: "Bus Ticket",
        amount: 80,
        category: "Travel",
        description: "Bus travel ticket for office commute.",
        date: "2026-02-06",
      },
      {
        id: 4,
        title: "Electricity Bill",
        amount: 1500,
        category: "Bills",
        description: "Monthly electricity bill payment.",
        date: "2026-02-01",
      },
      {
        id: 5,
        title: "Medicine",
        amount: 350,
        category: "Health",
        description: "Purchased basic medicines from pharmacy.",
        date: "2026-02-04",
      },
      {
        id: 6,
        title: "New Shoes",
        amount: 2200,
        category: "Shopping",
        description: "Bought new sports shoes from store.",
        date: "2026-02-03",
      },
    ];

    setExpensesArray(expensesArray)

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
          <h1 className='font-bold text-[22px] mb-[20px]'>Expenses</h1>
          <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddCategoryBtn}>+Add Expenses</button>
        </div>
        <AddExpense />
        <div className='px-[20px]'>
          <table className='w-full'>
            <thead className='text-left'>
              <tr>
                <th className='p-[8px]'>Id</th>
                <th>Title</th>
                <th>Amount spent</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                expensesArray.length != 0 ?
                  // true?
                  expensesArray.map((v, i) => <ExpenseRow prop={v} index={i} key={i} getExpensesFunction={getExpenses} />)
                  :
                  <tr><td colSpan={8} className='text-center py-[100px]'>No expenses found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function ExpenseRow({ prop, index, getExpensesFunction }) {
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
          getExpensesFunction();
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
      <td>{prop.title}</td>
      <td>{prop.amount}</td>
      <td>{prop.category}</td>
      <td>{prop.description}</td>
      <td>{prop.date}</td>
      <td>
        <div className='flex gap-[20px] items-center'>
          <button className='cursor-pointer' onClick={handleProductViewEdit}><FaRegEdit className='text-blue-500' /></button>
          <button className='cursor-pointer' onClick={handleProductDelete}><AiOutlineDelete className='text-red-500' /></button>
        </div>
      </td>
    </tr>
  )
}

function AddExpense() {
  return (
    <div>
      <h1 className='font-bold'>New Expense</h1>
      <form className='flex justify-between gap-[5px] px-[20px] p-[5px]'>

        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter expense title' />
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter amount spent' />
        <select className='outline-0 border'>
          <option>Food</option>
          <option>Shopping</option>
          <option>Travel</option>
          <option>Rent</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Education</option>
          <option>Groceries</option>
          <option>Investment</option>
          <option>Emergency</option>
          <option>Others</option>
        </select>
          <textarea className='border grow outline-0 px-[10px] py-[5x] resize-none flex-wrap' rows={1} placeholder='Enter description' />
          <input type='date'></input>
          <button className='bg-blue-500 text-white w-[100px]'>Add</button>
      </form>
    </div>
  )
}

