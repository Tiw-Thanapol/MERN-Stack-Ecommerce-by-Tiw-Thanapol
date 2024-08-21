//rafce
import React, {useState , useEffect} from 'react'
//fuction
import { readProduct } from '../functions/product'

import { useParams } from 'react-router-dom'
import SingeProductlCard from '../card/SingeProductlCard'

const Product = () => {
    const param = useParams()
    const [product , setProdut] = useState([])

    useEffect(()=>{
        //code
        loadData()
    },[])

    const loadData = () =>{
        readProduct(param.id)
        .then((res)=>{
           setProdut(res.data)
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

  return (
    <div className='container-fluid'>
        <div
            className='row pt-4'>
                <SingeProductlCard product={product}/>
        </div>

      <div className='row'>
      {/*JSON.stringify(product)*/}
      </div>
    </div>
  )
}

export default Product
