import React, {useEffect} from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getUserOrders} from "../app/features/OrderSlice";
import CartCard from "../components/CartCard";

function Orders() {
  const dispatch = useAppDispatch()
  // @ts-ignore
  const { orders } = useAppSelector(store => store.orders)

  useEffect(() => {
    dispatch(getUserOrders())
  }, [])

  return (
    <div className='dashboard'>
      <Nav showBtn={null} />
      <div className='page orders-page'>
        <h3>Мои Заказы</h3>
        <div className='orders-list-container'>
          <div className='orders-list'>
            {
              Object.keys(orders).map((dateKey: any) => {
                return dateKey && <div key={dateKey}>
                  <h6 style={{margin: '10px 0 5px',}}>Заказ оформлен: {new Date(dateKey).toLocaleString('ru-RU')}</h6>
                  <h6 style={{margin: '5px 0 20px'}}>
                    Итого: {
                      (orders[dateKey].reduce((a: number,b: any) => a + (b.price * b.quantity), 0))
                        .toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
                    }
                  </h6>

                  {
                    orders[dateKey].map((order: any) =>
                      <>
                        <div key={order.order_details_id}>
                            <CartCard item={order} />
                            {order.product_name}
                        </div>
                      </>

                    )
                  }
                  <hr/>
                </div>
              })
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
