//rafce
import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'

//function
import { 
  createCategory,
  listCategory,
  deleteCategory,
  updateCategory, 

        } from '../../../functions/category';
import {Link} from "react-router-dom"
// redux
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CreateCategory = () => {
  const { user } = useSelector((state)=> ({...state }))

  console.log('hello', user.token)
    const [values, setValues] = useState({
        name:"",
    });
    const [category, setCategory ] = useState([]);

    useEffect(()=>{
      loadData(user.token)
    },[])

    const loadData = (authtoken) => {
      listCategory(authtoken)
      .then((res)=>{
        setCategory(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    const handleRemove = (id) => {
      deleteCategory( user.token,id)
        .then((res) => {
          console.log(res);         
          loadData(user.token);
          toast.success('Remove Data'+res.data.name+ "  Sucess!!!")
        })
        .catch((err) => {
          console.log(err);
          toast.error('Error!!! Remove Data')
        });
    };

    console.log('data',category)
    
   

    const handleChangeCategory = (e) =>{
        console.log(values.name)
        setValues({...values,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(values.name)
        createCategory(user.token,values)
        .then(res=>{
            console.log(res);
            loadData(user.token)
            toast.success('Insert Data'+res.data.name+" Sucess!!!")
        })
        .catch((err)=>{
            console.log(err)
            toast.error('Error!!! Insert Data')
    }) 
}  
    return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
           
          <MenubarAdmin />
          </div>
          
        <div className='col'>
          <h1>Create Category</h1>

            <form onSubmit = {handleSubmit} >
                <div className='form-group'>
                    <label>เพิ่มหมวดหมู่สินค้า</label>
                    <input type="text" 
                    name="name"
                    value={values.name}
                    onChange={handleChangeCategory}
                    className='form-control' />
                <button className='btn btn-outline-primary'
                >เพิ่ม
                </button>
                </div>
            </form>
            <hr/>
            <ul className="list-group">
              {category.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name}

                <span 
                style={{float:"right"}}
                className="badge text-bg-primary rounded-pill"   
              >
                <Link to={`/admin/update-category/${item._id}`}>
                Edit
                </Link>
                </span>

              <span
                style={{float:"right"}} 
                className="badge text-bg-primary rounded-pill" 
                onClick={() => handleRemove( item._id )}              
              >
                X
              </span>

              
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
      )
}

export default CreateCategory
