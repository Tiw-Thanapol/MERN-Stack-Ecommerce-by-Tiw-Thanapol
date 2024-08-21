//rafce
import React, { useState, useEffect } from 'react'

//function
import { listProductBy } from '../functions/product'
import ProductCard from '../card/ProductCard'
import LoadingCard from '../card/LoadingCard'


const BestSeller = () => {
  const [ loading, setLoading] = useState(false)
    const [ products, setProducts ] = useState([])

    useEffect(()=>{
        //
        //console.log(res)
        loadData()
    },[])

    const loadData =()=>{
        setLoading(false)
        listProductBy("sold","desc",3)
        .then((res)=>{
           setProducts(res.data)
        })
        .catch((err)=>{
            setLoading(true)
            setProducts(err)
        })
        }
  return (
    <>
    <div>
        <div className="container">
            {loading ?(
             <LoadingCard count={3}/>
            ) : (
            
            <div className="row">
                { products.map((item,index)=> (              
                <div key={index} className="col-md-4">
                <ProductCard product={item}/>
                </div>
                ))}


            </div>  
            )}      
        </div>
    </div>
    </>
  )
}

export default BestSeller
