import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOrderDetails, getOrders, unsetOrderDetails} from "../../app/features/AdminSlice";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";
import {MdDone} from 'react-icons/md'

function EditOrder({orderId}: any) {
  const dispatch = useAppDispatch()
  const {orderDetails} = useAppSelector(store => store.admin)
  const [formData, setFormData] = useState<any[]>([]);

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(getOrderDetails(orderId))
  //   return () => {
  //     dispatch(unsetOrderDetails)
  //   }
  // }, []);

  useEffect(() => {
    console.log(orderDetails)
    setFormData(orderDetails)
  }, [orderDetails]);


  const handleChange = (value: any, orderDetail: any) => {
    const updatedFormData = formData.map((item : any) => {
      if(item.id === orderDetail.id) {
        return {...item, quantity: parseInt(value)}
      }

      return item
    })

    setFormData(updatedFormData)
  }

  const deleteOrderItem = (detail: any) => {
    console.log('deleting ', detail)

    axios.delete(`${ENDPOINTS.orderDetails}/${detail.id}`, {
      data: {
        order_id: detail.order_id
      }
    })
      .then((res: any) => {
        console.log('deleted item')

        // @ts-ignore
        dispatch(getOrderDetails(orderId))
        dispatch(getOrders())
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleChangeSubmit = (id: any) => {
    const orderDetail = formData.find(item => item.id === id)
    console.log(orderDetail)
    axios.put(`${ENDPOINTS.orderDetails}`, {
      id: orderDetail.id,
      order_id: Number(orderDetail.order_id),
      quantity: orderDetail.quantity
    }).then(res => {
      // @ts-ignore
      dispatch(getOrderDetails(orderId))
      dispatch(getOrders())
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className='admin-order-details'>
        <h5 style={{marginBottom: 10, marginTop: 5}}>Номер заказа: #{orderId}</h5>
        <table className='admin-order-table' style={{width: 750, minWidth: 'auto'}}>
          <thead>
          <tr className='admin-order-table-header-row'>
            <th>Ид.</th>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Кол-вo</th>
            <th>Действие</th>
          </tr>
          </thead>
          <tbody>
          {
            formData && formData.map((detail: any) => {
              return <tr key={detail.id}>
                <td>{detail.id}</td>
                <td>{detail.title}</td>
                <td>{detail.price}</td>
                <td>
                    <input type="text" style={{textAlign: 'right'}} value={detail.quantity} onChange={(ev) => handleChange(ev.target.value, detail)} />
                </td>
                <td>
                  <button
                    className={'icon-button'}
                    onClick={() => handleChangeSubmit(detail.id)}
                  >
                    <MdDone />
                  </button>

                  <button
                    className={'icon-button'}
                    style={{borderRadius: 10, padding: '5px 5px 0'}}
                    title='Удалить заказ'
                    onClick={() => deleteOrderItem(detail)}
                  >
                    <MdDelete style={{color: '#801634'}}/>
                  </button>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
        <div className='df jcsb'>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
