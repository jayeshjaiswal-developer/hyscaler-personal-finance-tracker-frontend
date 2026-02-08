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




export default function IncomeSources() {
  const router = useRouter();
  const dispatch = useDispatch();
  let [sourcesArray, setSources] = useState([]);


  useEffect(() => {
    dispatch(hideLinearBar());
    getProducts();
  }, [])

  function getProducts() {
    // axios.get(`${backendBaseUrl}/product/view-product`)
    //   .then(res => res.data)
    //   .then(finalRes => {
    //     console.log(finalRes.message);
    //     setProductArray(finalRes.data);
    //   }).catch((error) => {
    //     console.log(error);
    //     console.log("something went xrong in frontend");
    //   })
    const incomeSources = [
  {
    id: 1,
    source: "Salary",
    amount: 50000,
    frequency: "Monthly",
  },
  {
    id: 2,
    source: "Freelancing",
    amount: 15000,
    frequency: "Weekly",
  },
  {
    id: 3,
    source: "Stock Dividend",
    amount: 2000,
    frequency: "Quarterly",
  },
  {
    id: 4,
    source: "Rent Income",
    amount: 12000,
    frequency: "Monthly",
  },
  {
    id: 5,
    source: "YouTube Revenue",
    amount: 8000,
    frequency: "Monthly",
  },
  {
    id: 6,
    source: "Business Profit",
    amount: 25000,
    frequency: "Yearly",
  },
];

  setSources(incomeSources)

  }

  let handleAddCategoryBtn = () => {
    // dispatch(showLinearBar());
    router.push('/add/product');
  }



  return (
    <>
      <div>
        <ToastContainer />
        <div className='flex justify-between items-center mb-[20px]'>
        <h1 className='font-bold text-[22px] mb-[20px]'>Income Sources</h1>
          <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddCategoryBtn}>+Add Source</button>
        </div>
        <AddIncomeSource/>
        <div className='px-[20px]'>
        <table className='w-full'>
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
        </table>
        </div>
      </div>
    </>
  )
}

function SourceRow({ prop, index, getProductsFunction }) {
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
          getProductsFunction();
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
      <td>{prop.source}</td>
      <td>{prop.amount}</td>
      <td>{prop.frequency}</td>
      <td>
        <div className='flex gap-[20px] items-center'>
          <button className='cursor-pointer' onClick={handleProductViewEdit}><FaRegEdit className='text-blue-500'/></button>
          <button className='cursor-pointer' onClick={handleProductDelete}><AiOutlineDelete className='text-red-500'/></button>
        </div>
      </td>
    </tr>
  )
}

function AddIncomeSource(){
  return(
    <div>
      <h1 className='font-bold'>New Income Source</h1>
      <form className='flex justify-between w-[75%] gap-[5px] px-[20px] p-[5px]'>
    
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter source name'/>
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter amount'/>
        <select className='outline-0 border'>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
        <button className='bg-blue-500 text-white w-[100px]'>Add</button>
      </form>
    </div> 
  )
}



