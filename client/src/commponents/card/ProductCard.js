//rafce
import React from 'react'
import { 
    EditOutlined, 
    DeleteOutlined,
    EyeOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
// lodash
import _ from 'lodash'

const { Meta } = Card;
/*const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
]*/
const ProductCard = ({product}) => {
    const dispatch = useDispatch()


    //console.log(product)
    const { _id, title, description, images} =  product

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
  return (
    <Card
    hoverable
    cover={
        <img 
        className='p-1 pb-6'
        style={{height : "150px", objectFit : "cover"}}
            alt="example"
            src={images && images.length 
            ? images[0].url
            : "" }
       />
        }
        
        actions = {[
            <Link to={'/product/'+_id}>
            <EyeOutlined className="text-warning" key="edit" />
            </Link>
            ,            
             <ShoppingCartOutlined 
                onClick = { handleAddToCart}
             className="text-danger"
             />,
        ]}

>      
    <Meta title={title} description={description} />
    
  </Card>
  )
}

export default ProductCard
