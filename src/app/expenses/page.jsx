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
  let [isAddExpenseBtnClicked, setIsAddExpenseBtnClicked] = useState(false);
  let [budgetsArray, setBudgetsArray] = useState([]);

  useEffect(() => {
    dispatch(hideLinearBar());
    getExpense();
    getBudgets();
  }, [])

  function getBudgets() {
    let lcToken = localStorage.getItem("jwt-token");
    let token = lcToken.substring(1, lcToken.length - 1);
    console.log(token);

    axios.get(`${backendBaseUrl}/api/budget`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        let budgets = res.data;
        setBudgetsArray(budgets)
      }).catch(err => {
        console.log(err);
      })
  }


  console.log("Below is budgetsArray");
  console.log(budgetsArray);

  function getExpense() {
    let lcToken = localStorage.getItem("jwt-token");
    let token = lcToken.substring(1, lcToken.length - 1);
    console.log(token);

    axios.get(`${backendBaseUrl}/api/expense`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        let expenses = res.data;
        setExpensesArray(expenses)
      }).catch(err => {
        console.log(err);
      })
  }

  // function getExpense() {
  //   // axios.get(`${backendBaseUrl}/product/view-product`)
  //   //   .then(res => res.data)
  //   //   .then(finalRes => {
  //   //     console.log(finalRes.message);
  //   //     setProductArray(finalRes.data);
  //   //   }).catch((error) => {
  //   //     console.log(error);
  //   //     console.log("something went xrong in frontend");
  //   //   })


  //   const expensesArray = [
  //     {
  //       id: 1,
  //       title: "Grocery Shopping",
  //       amount: 1200,
  //       category: "Food",
  //       description: "Bought vegetables, fruits and daily grocery items.",
  //       date: "2026-02-05",
  //     },
  //     {
  //       id: 2,
  //       title: "Netflix Subscription",
  //       amount: 499,
  //       category: "Entertainment",
  //       description: "Monthly Netflix subscription payment.",
  //       date: "2026-02-02",
  //     },
  //     {
  //       id: 3,
  //       title: "Bus Ticket",
  //       amount: 80,
  //       category: "Travel",
  //       description: "Bus travel ticket for office commute.",
  //       date: "2026-02-06",
  //     },
  //     {
  //       id: 4,
  //       title: "Electricity Bill",
  //       amount: 1500,
  //       category: "Bills",
  //       description: "Monthly electricity bill payment.",
  //       date: "2026-02-01",
  //     },
  //     {
  //       id: 5,
  //       title: "Medicine",
  //       amount: 350,
  //       category: "Health",
  //       description: "Purchased basic medicines from pharmacy.",
  //       date: "2026-02-04",
  //     },
  //     {
  //       id: 6,
  //       title: "New Shoes",
  //       amount: 2200,
  //       category: "Shopping",
  //       description: "Bought new sports shoes from store.",
  //       date: "2026-02-03",
  //     },
  //   ];

  //   setExpensesArray(expensesArray)

  // }


  let handleAddExpenseBtn = (event) => {
    event.preventDefault();
    setIsAddExpenseBtnClicked(true);
  }



  return (
    <>
      <div>
        <ToastContainer />
        <div className='flex justify-between items-center mb-[20px]'>
          <h1 className='font-bold text-[22px] mb-[20px]'>Expenses</h1>
          {
            !isAddExpenseBtnClicked ?
              <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddExpenseBtn}>+Add Expenses</button>
              :
              ''
          }
        </div>
        {
          isAddExpenseBtnClicked ? <AddExpense setIsAddExpenseBtnClickedFunction={setIsAddExpenseBtnClicked} getExpenseFunction={getExpense} budgetsArray={budgetsArray} /> : ''
        }
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
                  expensesArray.map((v, i) => <ExpenseRow prop={v} index={i} key={i} getExpenseFunction={getExpense} />)
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

function ExpenseRow({ prop, index, getExpenseFunction }) {
  const dispatch = useDispatch();
  const router = useRouter();

  let handleExpenseDelete = () => {
  }

  let handleExpenseViewEdit = () => {

  }
  return (
    <tr className='border-y-2 border-y-gray-400'>
      <td className=' p-[8px]'>{index + 1}</td>
      <td>{prop.expenseTitle}</td>
      <td>{prop.expenseAmount}</td>
      <td>{prop.expenseCategory.budgetTitle}</td>
      <td>{prop.expenseDescription}</td>
      <td>{prop.expenseDate}</td>
      <td>
        <div className='flex gap-[20px] items-center'>
          <button className='cursor-pointer' onClick={handleExpenseViewEdit}><FaRegEdit className='text-blue-500' /></button>
          <button className='cursor-pointer' onClick={handleExpenseDelete}><AiOutlineDelete className='text-red-500' /></button>
        </div>
      </td>
    </tr>
  )
}

function AddExpense({ setIsAddExpenseBtnClickedFunction, getExpenseFunction, budgetsArray }) {
  let handleAddExpenseSubmit = (event) => {
    event.preventDefault();
    // setIsAddExpenseBtnClickedFunction(false);
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => formDataObject[key] = value);
    // console.log("Below is budgetsArray");
    // console.log(budgetsArray);

    console.log("Below is formObject")
    console.log(formDataObject);
    let lcToken = localStorage.getItem("jwt-token");
    let token = lcToken.substring(1, lcToken.length - 1);

    axios.post(`${backendBaseUrl}/api/expense/add`, formDataObject, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        let data = res.data;
        let status = res.status;
        let message = data.message;

        if (status == 201) {
          console.log("Expense added successfully");
          success(toast, message);
          getExpenseFunction();
          setTimeout(() => {
            setIsAddExpenseBtnClickedFunction(false);
          }, 5000);
        }
      }).catch(err => {
        console.log(err);
        error(toast, "Something went xrong");
      })

  }
  return (
    <div>
      <h1 className='font-bold'>New Expense</h1>
      <form className='flex justify-between gap-[5px] px-[20px] p-[5px]' onSubmit={handleAddExpenseSubmit}>

        <input className='border grow outline-0 px-[10px] py-[5x]' name='expenseTitle' autoFocus={true} placeholder='Enter expense title' />
        <input className='border grow outline-0 px-[10px] py-[5x]' name='expenseAmount' placeholder='Enter amount spent' />
        <select className='outline-0 border' name='budgetId'>
          {budgetsArray.map((v, i) => (
            <option key={i} value={v.budgetId}>{v.budgetTitle}</option>
          ))}
        </select>
        <textarea className='border grow outline-0 px-[10px] py-[5x] resize-none flex-wrap' name='expenseDescription' rows={1} placeholder='Enter description' />
        <input type='date' name='expenseDate'></input>
        <button className='bg-blue-500 text-white w-[100px]'>Add</button>
      </form>
    </div>
  )
}

