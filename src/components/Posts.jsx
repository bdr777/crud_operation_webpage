import React from 'react'
import { useEffect } from 'react'
import { getApi } from '../api/PostApi.jsx'
import { deleteApi } from '../api/PostApi.jsx'
import { Form } from './Form.jsx'
import { set } from 'react-hook-form';
import '../App.css'

export const Posts = () => {
    const [data,setData]=React.useState([]);
    const [editData,setEditData]=React.useState({});

    const getPostApi=async()=>{
  const res=await getApi();
  console.log(res.data);
  setData(res.data);
}
  useEffect(()=>{
    getPostApi();
  },[])

  const handleDelete=async(id)=>{
  const res=await deleteApi(id);
  if(res.status === 200){
     const newData=data.filter((item)=>item.id !== id);
     setData(newData);
  }
  }

  const handleUpdatePost=(item)=>{
setEditData(item);    
  }

  return (
    <>
    <section className='section-form'>
      <Form data={data} setData={setData} editData={editData} setEditData={setEditData}/>
    </section>
   <section className='section-posts'>
    <ol>
        {
            data.map((item)=>{
                return(
                    <li key={item.id}>
                        <p>Title:{item.title}</p>
                        <p>Body:{item.body}</p>
                        <button onClick={()=>handleUpdatePost(item)}>Edit</button>
                        <button className='btn-delete' onClick={()=>handleDelete(item.id)}>Delete</button>
                    </li>
                )
            })
        }
    </ol>
   </section>
   </>
  )
}

export default Posts