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
import { addUserToken } from '../redux/reducers/userSlice';




export default function IncomeSources() {
  const router = useRouter();
  const dispatch = useDispatch();
  let [sourcesArray, setSources] = useState([]);
  let [isAddSourceBtnClicked, setIsAddSourceBtnClicked] = useState(false);


  useEffect(() => {
    dispatch(hideLinearBar());
    getSources();
  }, [])

  function getSources() {
    let lcToken = localStorage.getItem("jwt-token");
    let token = lcToken.substring(1, lcToken.length - 1);
    console.log(token);

    axios.get(`${backendBaseUrl}/api/income-sources`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {

        let incomeSources = res.data;
        setSources(incomeSources)
      }).catch(err => {
        console.log(err);
      })
  }

  let handleAddSource = () => {
    // dispatch(showLinearBar());
    // router.push('/add/product');
    console.log("Add Budget Clicked");
    setIsAddSourceBtnClicked(true);
  }



  return (
    <>
      <div>
        <div className='flex justify-between items-center mb-[20px]'>
          <h1 className='font-bold text-[22px] mb-[20px]'>Income Sources</h1>
          {
            !isAddSourceBtnClicked ?
              <button className='bg-blue-500 text-white py-[4px] rounded-[15px] px-[10px] cursor-pointer' onClick={handleAddSource}>+Add Source</button>
              :
              ''
          }

        </div>
        {
          isAddSourceBtnClicked ? <AddIncomeSource setIsAddSourceBtnClickedFunction={setIsAddSourceBtnClicked} getSourcesFunction={getSources} /> : ''
        }
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
                true ?
                  sourcesArray.map((v, i) => <SourceRow prop={v} index={i} key={i} getSourcesFunction={getSources} />)
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

function SourceRow({ prop, index, getSourcesFunction }) {
  const dispatch = useDispatch();
  const router = useRouter();

  let handleSourceDelete = () => {
    // dispatch(showLinearBar());
    // console.log("delete button clicked");
    // // console.log(prop._id);
    // axios.post(`${backendBaseUrl}/product/delete-product`, { id: prop._id })
    //   .then(res => res.data)
    //   .then(finalRes => {
    //     dispatch(hideLinearBar());
    //     if (finalRes.status) {
    //       success(toast, finalRes.message);
    //       getProductsFunction();
    //     } else {
    //       error(toast, finalRes.message);
    //     }
    //   })
  }

  let handleSourceViewEdit = () => {
    // dispatch(showLinearBar());
    // router.push(`/view-edit/product/${prop._id}`);
  }
  // return (<tr><td>hii</td></tr>)

  return (
    <tr className='border-y-2 border-y-gray-400'>
      <td className=' p-[8px]'>{index + 1}</td>
      <td>{prop.sourceTitle}</td>
      <td>{prop.sourceAmount}</td>
      <td>{prop.sourceFrequency}</td>
      <td>
        <div className='flex gap-[20px] items-center'>
          <button className='cursor-pointer' onClick={handleSourceViewEdit}><FaRegEdit className='text-blue-500' /></button>
          <button className='cursor-pointer' onClick={handleSourceDelete}><AiOutlineDelete className='text-red-500' /></button>
        </div>
      </td>
    </tr>
  )
}

function AddIncomeSource({ setIsAddSourceBtnClickedFunction, getSourcesFunction }) {

  let handleAddSourceSubmit = (event) => {
    event.preventDefault();
    console.log("Add source submit clicked");
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => formDataObject[key] = value);
    //  console.log(formDataObject);


    let lcToken = localStorage.getItem("jwt-token");
    // console.log(lcToken);
    let token = lcToken.substring(1, lcToken.length - 1);
    // console.log(token);

    axios.post(`${backendBaseUrl}/api/income-sources/add`, formDataObject, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {

        let data = res.data;
        let status = res.status;
        let message = data.message;
        let savedSource = data.data;

        console.log(data);
        console.log(message);
        if (res.status == 201) {
          console.log("Source added successfully");
          success(toast, message);
          getSourcesFunction();
          setTimeout(() => {
            setIsAddSourceBtnClickedFunction(false);
          }, 5000);
        }
      }).catch(err => {
        // let message = err.response.data.message;
        // error(toast, message);
        console.log(err);
        error(toast, "Something went xrong");
      })

  }
const frequencyArray = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];

  return (
    <div>
      <ToastContainer />
      <h1 className='font-bold'>New Income Source</h1>
      <form className='flex justify-between w-[75%] gap-[5px] px-[20px] p-[5px]' onSubmit={handleAddSourceSubmit}>

        <input className='border grow outline-0 px-[10px] py-[5x]' autoFocus={true} placeholder='Enter source name' name='sourceTitle' required />
        <input className='border grow outline-0 px-[10px] py-[5x]' placeholder='Enter amount' name='sourceAmount' required />
        <select className='outline-0 border' name='sourceFrequency' required>
          {frequencyArray.map((v, i) => (
            <option key={i} value={v}>{v}</option>
          ))}
        </select>
        <button className='bg-blue-500 text-white w-[100px]' >Add</button>
      </form>
    </div>
  )
}



