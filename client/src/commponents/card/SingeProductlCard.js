//rafce
import React from 'react'
import { 
    EditOutlined, 
    DeleteOutlined,
    EyeOutlined,
    ShoppingCartOutlined,
    HeartOutlined
} from '@ant-design/icons';
import { Avatar, Card,Tabs, Flex, Switch } from 'antd';
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { useSelector, useDispatch } from 'react-redux';
// lodash
import _ from 'lodash'

//function
import { addToWishList } from '../functions/users'
import { toast } from 'react-toastify'

const { Meta } = Card;
const {TabPane} = Tabs;


const SingeProductlCard = ({product}) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state)=>({...state}))

  const {_id,title,quantity,description,item,images,price,sold,category} = product

//console.log(images[0].url)
const handleAddToCart = () =>{
  let cart = []
  if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
  }
  cart.push({
      ...product,
      count:1
  })
  let unique = _.uniqWith(cart,_.isEqual)
  localStorage.setItem("cart",JSON.stringify(cart))
  dispatch({
      type:"ADD_TO_CART",
      payload:unique
  })
  dispatch({
    type:"SET_VISIBLE",
    payload:true
  })
}

const handleAddToWishList = (e) => {
  console.log(user)
  if(user){
  addToWishList(user.token,_id)
  .then((res)=>{
    console.log(res.data)
    toast.success('Add to wishlist Success!!!')
  }).catch((err)=>{
    console.log(err)
  })
}else{
  toast.error('Please Login!!!')
  //return
}
}
  return (
    <>
    <div className='col-md-7'>
    <Carousel autoplay showArrows={true} infiniteLoop>
    {images && images.map(item=><img src={item.url} key={item.public_id}/>)}
    </Carousel>

    <Tabs>
      <TabPane tab="description" key="1">
        {description}
      </TabPane>
      <TabPane tab="more" key="2">
        {description}
      </TabPane>
    </Tabs>

    </div>


    <div className='col-md-5'>
      <h1 className="bg-info p-3">{title}</h1>
    <Card   
    actions = {[
        <a onClick={handleAddToWishList}>
        <HeartOutlined className="text-info" key="edit" /><br />
        Add to whistlist
        </a>
        ,   
        <>
        <a>     
         <ShoppingCartOutlined 
         onClick = { handleAddToCart}
           className="text-danger"
         /><br/>
         Add to Cart,
         </a>
         </>
    ]}
>      
<ul className="list-group list-group-flush">

  <li className="list-group-item">
    Price
    <span className='float-end'>{price}</span>
  </li>

  <li className="list-group-item">
    Quantity
    <span className='float-end'>{quantity}</span>
  </li>

  <li className="list-group-item">
    Sold
    <span className='float-end'>{sold}</span>
  </li>

    { category&& 
  <li className="list-group-item">
    Category
    <span className='float-end'>{category.name}</span>
  </li>
}

  </ul>
</Card>

    </div>
     
     

    </>


  )
}

export default SingeProductlCard
