import React , {useState, useEffect } from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from "react-redux"

//function
import { getOrders } from '../../functions/users'
import {updateStatusOrder, getOrdersAdmin} from '../../functions/admin'

//Notificcation
import {toast} from 'react-toastify'

//antd
import { Tabs, Table } from 'antd';
const { TabPane } = Tabs;
const Orders = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ orders , setOrders] = useState([])

    useEffect(()=>{
        //code
        loadData()
    },[])

    const loadData = () =>{
        getOrdersAdmin(user.token)
        .then(res=>{
            setOrders(res.data)          
        })
    }
    //console.log(orders)
    const handleChangeStatus = (OrderId,orderstatus)=>{
        updateStatusOrder(user.token,OrderId,orderstatus)
        .then(res => {
            console.log(res.data)
            toast.info('Update '+res.data.orderstatus+ ' Success')
            loadData()
        })
    }
    const orderCard = orders.map((item,index)=>{
      //สามารถใส่code js ตรงนี้ได้ เช่นการคำนวน หรือlog
      //console.log('item',item)
      return <div key={index} className='card m-3'>
          <p>Order by <b>{item.orderdBy.username}</b>
          <br/>
              {'    '+item.orderstatus}</p>
          {/*Select*/}
          <select 
          value={item.orderstatus}
          onChange={(e)=>handleChangeStatus(item._id, e.target.value)}
          style={{width:"200px", alignSelf:"right"}}
          className='form from-control'>
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing Order</option>
              <option value="Cancel">Cancel Order</option>
              <option value="Completed!">Completed</option>
              
          </select>
          {/* Table*/}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Count</th>
                  
                </tr>
              </thead>
              {/*2 Loop Table*/}
              { item.products.map((p,i)=>
                <tr >
                  <td>{p.product.title}</td>
                  <td>{p.price}</td>
                  <td>{p.count}</td>
                </tr>
              )}
              <tr>
                <td className='col text-center' colSpan={3}>
                  ราคาสุทธิ:{" "}<b><u>{item.cartTotal}</u></b></td>
              </tr>
            </table>           
      </div>
      }
)
//Table antd
      const columns = [
        {
          title: 'ชื่อผู้ใช้งาน',
          dataIndex:'orderdBy',
          render:(item,i)=><>
            {item.username}
          </>
        },
        {
          title: 'รายการสินค้า',
          render:(item,i)=><ol>
            {item.products.map((p,i)=>
            <li>{p.product.title}</li>
            )}
          </ol>
        },
        {
          title: 'จำนวน',
          render:(item,i)=><ol>
            {item.products.map((p,i)=>
            <ol>{p.count}</ol>
            )}
          </ol>
        },
        {
          title: 'ราคา',        
          render:(item,i)=><ol>
            {item.products.map((p,i)=>
            <ol>{p.price}</ol>
            )}
          </ol>
        },
        {
          title: 'ราคารวมสุทธิ',
          dataIndex: 'cartTotal',
          key: 'cartTotal',
        },
        {
          title: 'อัพเดทสถานะ',
          render:(item)=><select 
          value={item.orderstatus}
          onChange={(e)=>handleChangeStatus(item._id, e.target.value)}
          style={{width:"200px", alignSelf:"right"}}
          className='form from-control'>
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing Order</option>
              <option value="Cancel">Cancel Order</option>
              <option value="Completed!">Completed</option>             
          </select>
        },
      ];
//Table Boostrap
      const tableBoot = <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th scope="col">ชื่อผู้ใช้งาน</th>
          <th scope="col">รายการสินค้า</th>         
          <th scope="col">จำนวน</th>
          <th scope="col">ราคา/หน่วย</th>
          <th scope="col">ราคารวม</th>
          <th scope="col">ราคารวมสุทธิ</th>
          <th scope="col">สถานะ</th>
          <th scope="col">อัพเดทสถานะ</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item,i)=>
        <tr>
          <th scope="row">{item.orderdBy.username}</th>
          <td>
            <ol>
              {item.products.map((p)=>(
              <li>{p.product.title} {' '}</li>
              ))}
            </ol>
          </td>
          <td>
              {item.products.map((p)=>(
              <li>{p.count} {' '}</li>
              ))}           
          </td>
          <td>
              {item.products.map((p)=>(
              <li>{p.price} {' '}</li>
              ))}
          </td>
          <td>
              {item.products.map((p)=>(
              <li>{p.count*p.price} {' '}</li>
              ))}
          </td>       
          <td><b>{item.cartTotal}</b></td>
          <td>{item.orderstatus}</td>
          <td><select 
          value={item.orderstatus}
          onChange={(e)=>handleChangeStatus(item._id, e.target.value)}
          style={{width:"200px", alignSelf:"right"}}
          className='form from-control'>
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing Order</option>
              <option value="Cancel">Cancel Order</option>
              <option value="Completed!">Completed</option>             
          </select></td>

        </tr>
        )}
      </tbody>
    </table>

  return (
    <div className='container-fluid'>
      <div className='row'>
        
        <div className='col-md-2'>
      <MenubarAdmin />
      </div>
      
      <div className='col text-center'>  
       <Tabs defaultActiveKey='1' >
          <TabPane tab='Table by Order Card' key="1">
            Table by Order Card
            {orderCard}
          </TabPane>
          <TabPane tab='Table by Antd' key="2">
            Table by Antd
            <Table dataSource={orders} columns={columns} />;
          </TabPane>
          <TabPane tab='Table by Boostrap' key="3">
            Table by Boostrap
            {tableBoot}
          </TabPane>
        </Tabs>
      </div>
      <div>
    </div>
  </div>
</div>
)
}
export default Orders