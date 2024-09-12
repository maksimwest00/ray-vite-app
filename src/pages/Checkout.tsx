import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import CartCard from "../components/CartCard";
import {getUserDetails} from "../app/features/UserSlice";
import {confirmOrder} from "../app/features/OrderSlice";
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import {clearAll} from "../app/features/CartSlice";
import SuccessPage from "./SuccessPage";

function Checkout() {
  const {cartItems, total, amount} = useAppSelector((store) => store.cart)
  const {user, status} = useAppSelector((store) => store.users)
  // @ts-ignore
  const {confirmStatus} = useAppSelector((store) => store.orders)

  const [city, setCity] = useState('Москва');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('getting...')
    dispatch(getUserDetails())
  }, [])

  useEffect(() => {
    if (status === 'fulfilled') {
      setAddress(user.address)
      setEmail(user.email)
      setPhone(user.phone_number)
    }
  }, [user])

  useEffect(() => {
    if(confirmStatus === 'fulfilled') {
      dispatch(clearAll())
    }
  }, [confirmStatus]);


  const handleOrder = (ev: any) => {
    ev.preventDefault()
    dispatch(
      confirmOrder({
        cartItems, userDetails: {
          city,
          address,
          email,
          phone
        },
        total
      })
    )
  }

  if(confirmStatus === 'fulfilled')
    return <SuccessPage
      type="success"
      text='Заказ успешно оформлен. Наш курьер свяжется с вами.'
      showLoginBtn={false}
    />


  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      {confirmStatus === 'pending' && <Loading/>}
      <div className='page'>
        <div className='orders'>
          <h3>Ваш Заказ:</h3>
          <div>
            {
              cartItems.map((item: any) => <CartCard key={item.id} item={item} controls={false}/>)
            }
          </div>
          <div>
            <h6 style={{textAlign: "right", marginBottom: 0}}>Общее количество: {amount} шт.</h6>
            <h6 style={{
              textAlign: "right",
              marginTop: 5,
              marginBottom: 20
            }}>Итого: {total.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</h6>
          </div>
        </div>
        <hr/>
        <div className='order-user-info'>
          <h4>Детали доставки:</h4>
          <form onSubmit={handleOrder}>
            <div className='form-control' style={{margin: '10px 0', padding: '0'}}>
              <label htmlFor="city">Город:</label>
              <input type="text" id="city" placeholder='Москва' disabled={true} value={city}/>
            </div>
            <div className='form-control' style={{margin: '10px 0', padding: '0'}}>
              <label htmlFor="address">Адрес:</label>
              <input type="text" id="address" placeholder='Адрес' value={address} onChange={(ev: any) => setAddress(ev.target.value)}/>
            </div>
            <div className='form-control' style={{margin: '10px 0', padding: '0'}}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder='Email' value={email} onChange={(ev: any) => setEmail(ev.target.value)}/>
            </div>
            <div className='form-control' style={{margin: '10px 0', padding: '0'}}>
              <label htmlFor="phone_number">Номер телефона:</label>
              <input type="tel" id='phone_number' placeholder='Номер телефона' value={phone} onChange={(ev: any) => setPhone(ev.target.value)}/>
            </div>

            <button
              className={'primary-button'}
              style={{width: '100%', marginTop: '25px'}}
              disabled={cartItems.length === 0 || (address==='' || email==='' || phone==='')}
            >Заказать
            </button>
          </form>
        </div>


      </div>
      <Footer/>
    </div>
  );
}

export default Checkout;
