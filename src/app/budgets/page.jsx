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
  let [isAddBudgeBtnClicked, setIsAddBudgetBtnClicked] = useState(false);



  useEffect(() => {
    dispatch(hideLinearBar());
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

  let handleAddBudgetBtn = (event) => {
    event.preventDefault();
    setIsAddBudgetBtnClicked(true);
  }



  return (
    <>
      <div>
          <ToastContainer />
        <div className='flex justify-between items-center mb-[20px]'>
        <h1 className='font-bold text-[22px] mb-[20px]'>Budgets</h1>
        {
            !isAddBudgeBtnClicked ?
          <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddBudgetBtn}>+Add Budgets</button>
              :
              ''
          }          
          
        </div>
        {
          isAddBudgeBtnClicked ? <AddBudget setIsAddBudgetBtnClickedFunction={setIsAddBudgetBtnClicked} getBudgetsFunction={getBudgets} /> : ''
        }

        <div className='px-[20px] mt-[10px] pt-[10px] border-t grid grid-cols-3 gap-[10px]'>
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
            <div className='shadow-lg p-[15px] cursor-pointer'>
              <div className='flex items-start gap-[20px]'>
                    <div className='flex justify-center items-center text-[55px] bg-blue-500 rounded-[50%] w-[60px] h-[60px] text-white'>
                        {/* {prop.icon} */}
                    </div>

                    <div className='flex gap-[5px] items-center justify-between text-[20px] grow'>
                        <h1 className='font-bold'>{prop.budgetTitle}</h1>
                        <h2 className='flex items-center'><MdCurrencyRupee/>{prop.budgetTargetAmount}</h2>
                    </div>
              </div>
              <div className='mt-[10px]'>
              <div className='flex items-center justify-between text-[12px]'>
                <h3 className='flex items-center'><MdCurrencyRupee/>{prop.budgetSpentAmount} Spent</h3>
                <h3 className='flex items-center'><MdCurrencyRupee/>{prop.budgetTargetAmount-prop.budgetSpentAmount} Remaining</h3>
              </div>
              <ProgressBar value={(prop.budgetSpentAmount/prop.budgetTargetAmount)*100} style={{ height: "8px" }} showValue={false} />
              </div>
            </div>
    )
}

function AddBudget({setIsAddBudgetBtnClickedFunction, getBudgetsFunction}){
  let handleBudgetSubmit = (event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => formDataObject[key] = value);

    console.log(formDataObject);
    let lcToken = localStorage.getItem("jwt-token");
    let token = lcToken.substring(1, lcToken.length - 1);

    axios.post(`${backendBaseUrl}/api/budget/add`, formDataObject, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        let data = res.data;
        let status = res.status;
        let message = data.message;
        // let savedSource = data.data;

        // console.log(data);
        // console.log(message);
        if (res.status == 201) {
          console.log("Budget added successfully");
          success(toast, message);
          getBudgetsFunction();
          setTimeout(() => {
            setIsAddBudgetBtnClickedFunction(false);
          }, 5000);
        }
      }).catch(err => {
        console.log(err);
        error(toast, "Something went xrong");
      })


  }
  return(
    <div>
      <h1 className='font-bold'>New Budget</h1>
      <form className='flex justify-between w-[75%] gap-[5px] px-[20px] p-[5px]' onSubmit={handleBudgetSubmit}>
    
        <input className='border grow outline-0 px-[10px] py-[5x]' name='budgetTitle' autoFocus={true}  placeholder='Enter buget title'/>
        <input className='border grow outline-0 px-[10px] py-[5x]' name='budgetTargetAmount' placeholder='Enter total budget'/>
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