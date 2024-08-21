//nav

import React from 'react'
import { Menu,Badge  } from 'antd';
import { 
  AppstoreOutlined,
  UserAddOutlined,
  LoginOutlined, 
  LogoutOutlined,
  HomeOutlined, 
  MailOutlined, 
  SettingOutlined, 
  DownOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';



//Router
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Search from '../card/Search';



const Navbar = () => {
  const { SubMenu } = Menu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart }  = useSelector((state) => ({...state}))
  console.log("user Navbar", user)
  const logout = () =>{
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/')
  }
  return (
    <Menu mode="horizontal">
      <Menu.Item 
        key="home" 
        icon={<HomeOutlined /> }>
            <Link to="/">Home</Link>
        </Menu.Item>

      <Menu.Item 
        key="shop" 
        icon={<ShoppingOutlined /> }>
            <Link to="/shop">Shop</Link>
        </Menu.Item>

      <Menu.Item 
        key="cart" 
        icon={<ShoppingCartOutlined /> }>
            <Link to="/cart">
            <Badge count={cart.length} offset={[9,0]}>
            Cart
            </Badge>
            </Link>
        </Menu.Item>

        {user &&(
        <> 
         {user.username}
                     
            <Menu.Item
            icon={<LogoutOutlined />}
            key="setting:1" onClick={logout}>
            Logout
        </Menu.Item>

        {user.role=="admin"
        ? (
        <Menu.Item
          //icon={<LogoutOutlined />}
          key="setting:2" >
          <Link to='/admin/index'>
              Dashboard
          </Link>
          </Menu.Item>
        ) : (
        <Menu.Item
        //icon={<LogoutOutlined />}
        key="setting:2" >
          <Link to='/user/index'>
        Dashboard
        </Link>
         </Menu.Item>)
        }


            
        
          </>
          )}

        {!user && (
        <> 
          <Menu.Item 
        style = {{float:"right"}}
        key="mail" 
        icon={<LoginOutlined /> }>
            <Link to="/Login">Login</Link>
        </Menu.Item>
      

        <Menu.Item 
        style = {{float:"right"}}
        key="app" 
        icon={<UserAddOutlined /> }>
            <Link to="/Register">Register</Link>
        </Menu.Item>
        </>
        )}
        
        <span className="p-1" style={{float:"right"}}>
        <Search />
        </span>
        

    </Menu>
    
  );
 
  
};

export default Navbar
