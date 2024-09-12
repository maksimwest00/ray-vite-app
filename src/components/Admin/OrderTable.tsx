import React, {useState} from 'react';
import {FcViewDetails} from 'react-icons/fc'
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete, MdDone, MdPublishedWithChanges} from 'react-icons/md'
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";
import {useAppDispatch} from "../../app/hooks";
import {getOrders} from "../../app/features/AdminSlice";


function OrderTable({orders, delivery_status_id, setOpenModal, setSelectedOrderId, setSelectedOrderAction}: any) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<'idle' | 'pending' | 'fulfilled' | 'rejected'>('idle')
  const [error, setError] = useState<any>({});


  const changeStatus = (order: any, statusId: number) => {
    setStatus((prev) => ('pending'))

    axios.get(`${ENDPOINTS.orderDetails}/${order.id}`)
      .then((response: any) => {

        axios.put(`${ENDPOINTS.changeOrderStatus}`, {
          order_id: order.id,
          status_id: statusId,
          userDetails: {
            name: order.title,
            phone: order.alternative_phone_number,
            address: order.delivery_address,
            price: order.price,
            email: order.email
          },
          orderDetails: response.data

        }).then((res) => {
          dispatch(getOrders())
          setStatus((prev) => ('fulfilled'))
          setError({})
        }).catch ((err: any) => {
          console.log(err.message)
          setStatus((prev) => ('rejected'))
          setError(err)
        })

      }).catch((err: any) => {
      console.log(err)
    })
  }

  const deleteOrder = (orderId: number) => {
    let really = window.confirm('Вы действительно хотите удалить товар?')

    if (really) {
      axios.delete(`${ENDPOINTS.getUserOrders}/${orderId}`)
        .then((res) => {
          dispatch(getOrders())
      }).catch((err) => {
        console.log(err.message)
        dispatch(getOrders())
      })
    } else {
      return
    }

  }

  return (
    <table className='admin-order-table'>
      <thead>
      <tr className='admin-order-table-header-row'>
        <th>Номер заказа</th>
        <th>На имя</th>
        <th>Адресс</th>
        <th>Телефон</th>
        <th>Итого</th>
        <th>Время заказа</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      {
        orders && orders.map((order: any) => {
          let date = order.created_at.replace('T', ' ').replace('.000Z', '')
          let id = order.id
          return order.delivery_status === delivery_status_id && <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.title}</td>
            <td>{order.delivery_address}</td>
            <td>{order.alternative_phone_number}</td>
            <td>{order.price}</td>
            <td>{String(date)}</td>
            <td>
              <button
                className={'icon-button'}
                style={{borderRadius: 10, padding: '5px 5px 0'}}
                title={delivery_status_id === 1 ? 'Принять заказ' : 'Изменить статус'}
                disabled={status === 'pending'}
                onClick={() => {
                  changeStatus(order, delivery_status_id)
                }}
              >
                {delivery_status_id === 1 ? <MdDone/> : <MdPublishedWithChanges/>}
              </button>
              <button
                className={'icon-button'}
                style={{borderRadius: 10, padding: '5px 5px 0'}}
                title='Детали заказа'
                disabled={status === 'pending'}
                onClick={() => {
                  setOpenModal(true)
                  setSelectedOrderId(order.id)
                  setSelectedOrderAction('order-details')
                }}
              >
                <FcViewDetails/>
              </button>
              <button
                className={'icon-button'}
                style={{borderRadius: 10, padding: '5px 5px 0'}}
                title='Изменить'
                disabled={status === 'pending'}
                onClick={() => {
                  setOpenModal(true)
                  setSelectedOrderId(order.id)
                  setSelectedOrderAction('edit-order')
                }}
              >
                <AiFillEdit/>
              </button>
              <button
                className={'icon-button'}
                style={{borderRadius: 10, padding: '5px 5px 0'}}
                title='Удалить заказ'
                disabled={status === 'pending'}
                onClick={() => deleteOrder(order.id)}
              >
                <MdDelete style={{color: '#801634'}}/>
              </button>
            </td>
          </tr>
        })
      }

      </tbody>
    </table>
  );
}

export default OrderTable;
