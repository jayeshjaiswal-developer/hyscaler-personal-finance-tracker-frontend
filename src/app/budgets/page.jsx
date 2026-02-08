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
import { MdCurrencyRupee } from 'react-icons/md';
import { ProgressBar } from 'primereact/progressbar';







export default function Budgets() {
  const router = useRouter();
  const dispatch = useDispatch();
  let [budgetsArray, setBudgetsArray] = useState([]);


  useEffect(() => {
    dispatch(hideLinearBar());
    getBudgets();
  }, [])

  function getBudgets() {
    // axios.get(`${backendBaseUrl}/product/view-product`)
    //   .then(res => res.data)
    //   .then(finalRes => {
    //     console.log(finalRes.message);
    //     setProductArray(finalRes.data);
    //   }).catch((error) => {
    //     console.log(error);
    //     console.log("something went xrong in frontend");
    //   })
 const budgetsArray = [
  {
    id: 1,
    category: "Shopping",
    totalBudget: 2500,
    spent: 600,
    remaining: 1900,
  },
  {
    id: 2,
    category: "Food",
    totalBudget: 4000,
    spent: 1200,
    remaining: 2800,
  },
  {
    id: 3,
    category: "Travel",
    totalBudget: 3000,
    spent: 1500,
    remaining: 1500,
  },
  {
    id: 4,
    category: "Rent",
    totalBudget: 10000,
    spent: 10000,
    remaining: 0,
  },
  {
    id: 5,
    category: "Entertainment",
    totalBudget: 2000,
    spent: 700,
    remaining: 1300,
  },
  {
    id: 6,
    category: "Health",
    totalBudget: 1500,
    spent: 500,
    remaining: 1000,
  },
];


  setBudgetsArray(budgetsArray)

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
        <h1 className='font-bold text-[22px] mb-[20px]'>Budgets</h1>
          <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddCategoryBtn}>+Add Budgets</button>
        </div>
        <AddBudget/>
        <div className='px-[20px] grid grid-cols-3 gap-[10px]'>
            {
              // productArray.length != 0?
              // false?
              budgetsArray.length!=0?
              // budgetsArray.map((v, i) => <BudgetCard prop={v} index={i} key={i} getBudgetsFunction={getBudgets} />)
              budgetsArray.map((v, i) => <BudgetCard prop={v} index={i} key={i} />)
              :
              <div>No bugets found</div>
            }
        {/* <table className='w-full'>
          <thead className='text-left'>
            <tr>
              <th className='p-[8px]'>Id</th>
              <th>Source</th>
              <th>Amount</th>
              <th>Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              // productArray.length != 0?
              true?
              sourcesArray.map((v, i) => <SourceRow prop={v} index={i} key={i} getProductsFunction={getProducts} />)
              :
              <tr><td colSpan={8} className='text-center py-[100px]'>No ncome sources found</td></tr>
            }
          </tbody>
        </table> */}
        </div>
      </div>
    </>
  )
}

// function BudgetCard(){
//   return (
//     <div>
//       <div>
//         <h1>Shopping</h1>
//         <h1>2300</h1>
//       </div>
      
//     </div>
//   )
// }

function BudgetCard({ prop }) {
    return (
            <div className={`shadow-lg p-[15px]`}>
              <div className='flex items-start gap-[20px]'>
                    <div className='flex justify-center items-center text-[55px] bg-blue-500 rounded-[50%] w-[60px] h-[60px] text-white'>
                        {/* {prop.icon} */}
                    </div>

                    <div className='flex gap-[5px] items-center justify-between text-[20px] grow'>
                        <h1 className='font-bold'>{prop.category}</h1>
                        <h2 className='flex items-center'><MdCurrencyRupee/>{prop.totalBudget}</h2>
                    </div>
              </div>
              <div className='mt-[10px]'>
              <div className='flex items-center justify-between text-[12px]'>
                <h3 className='flex items-center'><MdCurrencyRupee/>{prop.spent} Spent</h3>
                <h3 className='flex items-center'><MdCurrencyRupee/>{prop.remaining} Remaining</h3>
              </div>
              <ProgressBar value={(prop.spent/prop.totalBudget)*100} style={{ height: "8px" }} showValue={false} />
              </div>
            </div>
    )
}

function AddBudget(){
  return(
    <div>
      <h1 className='font-bold'>New Budget</h1>
      <form className='flex justify-between w-[75%] gap-[5px] px-[20px] p-[5px]'>
    
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter buget title'/>
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter total budget'/>
        {/* <select className='outline-0 border'>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select> */}
        <button className='bg-blue-500 text-white w-[100px]'>Add</button>
      </form>
    </div> 
  )
}