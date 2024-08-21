import React, {useState , useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'
import { toast } from 'react-toastify'
import { useSelector } from "react-redux"

// functions
import { createProduct } from '../../../functions/product'
import { listCategory } from '../../../functions/category'


import FileUpload from './FileUpload'
import { Spin } from 'antd'

const initialstate = {
    title: "Notebook",
    description: "DES",
    categories: [],
    category: "",
    price: "100",
    quantity: "5",
    images: [],
    sold:"",
  };
  


const Home = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [values,setValues] = useState(initialstate)
    const [ loading , setLoading ] = useState(false)
    useEffect(()=>{
        loadData(user.token)
    }, []);

    const loadData = (authtoken) => {
        listCategory(authtoken)
        .then((res) => {
            //console.log(res.data)
            setValues({ ...values, categories: res.data })
        })
        .catch((err)=>{
            console.log(err)
        });
    };
console.log("values",values)


const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success('Insert '+ res.data.title + "  Success!!!")
        window.location.reload()
        })
        .catch((err)=>{
            console.log(err.response)
            toast.error(err.response.data)
        })
    }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
       
      <MenubarAdmin />
      </div>
      <div className='col'>
        {loading
        ? <h1>Loaing...<Spin /></h1>
        : <h1>Create Product Page</h1>
          }
      
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
        <label>title</label>
            <input
            className='form-control'
            type='text'
            name="title"
            value={values.title}
            onChange={handleChange}
        />
        </div>

        <div className='form-group'>
        <label>description</label>
            <input
            className='form-control'
            type='text'
            name="description"
            value={values.description}
            onChange={handleChange}
        />
        </div>

        <div className='form-group'>
        <label>price</label>
            <input
            className='form-control'
            type='number'
            name="price"
            value={values.price}
            onChange={handleChange}
        />
        </div>

        <div className='form-group'>
        <label>quantity</label>
            <input
            className='form-control'
            type='nember'
            name="quantity"
            value={values.quantity}
            onChange={handleChange}
        />
        </div>

        <div className='form-group'>
        <label>Category</label>
            <select
            className='form-control'           
            name="category"
            onChange={handleChange}
        >
            <option>Please Select</option>
            {   values.category.length > 0 &&
                values.category.map((item) =>(
                    <option key={item._id} value={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>

            
        <FileUpload 
        loading = { loading }
        setLoading={ setLoading }
        values={values} 
        setValues={setValues}
        />
        
        <br/>
        <button
        className='btn btn-primary'
        >Submit</button>

      </form>
      </div>
    </div>
  </div>
  )
}

export default Home
