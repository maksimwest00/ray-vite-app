import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOrderDetails, unsetOrderDetails} from "../../app/features/AdminSlice";

function OrderDetails({orderId}: any) {
  const dispatch = useAppDispatch()
  const {orderDetails} = useAppSelector(store => store.admin)

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(getOrderDetails(orderId))
  //   return () => {
  //     dispatch(unsetOrderDetails)
  //   }
  // }, []);


  return (
    <div className='admin-order-details'>
      <h5 style={{marginBottom: 10, marginTop: 5}}>Номер заказа: #{orderId}</h5>
      <table className='admin-order-table' style={{width: 750, minWidth: 'auto'}}>
        <thead>
        <tr className='admin-order-table-header-row'>
          <th>Идентификатор</th>
          <th>Наименование Продукта</th>
          <th>Цена</th>
          <th>Количество</th>
        </tr>
        </thead>
        <tbody>
        {
          orderDetails.map((detail: any) => {
            return <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.title}</td>
              <td>{detail.price}</td>
              <td>{detail.quantity}</td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
