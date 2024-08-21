import React , {useState, useEffect } from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from "react-redux"
//Notificcation
import {toast} from 'react-toastify'


//function
import { listProduct, removeProduct } from '../../functions/product'
import AdminProductCard from '../../card/AdminProductCard'


const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    loadData(100)
  },[])

   const loadData = (count) => {
      setLoading(true)
      listProduct(count)
      .then((res) => {
        setLoading(false)
        setProduct(res.data)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      })
    }
    
    const handleRemove =(id)=>{
      /*console.log(user.token,id)*/
      if (window.confirm("Delete?")){
        removeProduct(user.token,id)
        .then(res=> {
          toast.success('Delete' + res.data.title + ' Success!!!')
          loadData(199)
          console.log(res)          
        })
        .catch(err => {
          console.log(err)
          toast.error('Delete Failed!!!')
        })
      }
    }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
       
      <MenubarAdmin />
      </div>
      
    <div className='col'>
      {loading ?<h1>Loading....</h1> : <h1>Home Admin</h1> }


      <div className='row'>
      {product.map((item) => (
        <div key={item._id} className='col-md-2'>

          <AdminProductCard 
           handleRemove={handleRemove}
           product={item}
           />
          </div>
        ))} 
</div>
      </div>
    </div>
  </div>
  )
}

export default Home
