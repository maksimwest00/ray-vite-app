import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {MdDelete} from 'react-icons/md'
import {useAppDispatch} from "../app/hooks";
import {countTotalAndAmount, decrement, deleteProduct, increment} from "../app/features/CartSlice";

function CartCard({item, controls=true}: any) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(countTotalAndAmount())
  }, [])

  const img = process.env.REACT_APP_MODE === 'dev' ? require(`../static/${item.img}`) : `${"https://rayhan24.ru"}/${item.img}`
  return (
    <>
      <div className='cart-card'>
        <div className='cart-card-info'>
          <Link to={`/products/${item.id}`}>

            <div className='cart-card-image-container'>
              <img src={img as string} alt="#"/>

            </div>
          </Link>

          <div className='cart-card-details'>
            <Link to={`/products/${item.id}`}>
              <h5>{item.title}</h5>
            </Link>

            {
              item.delivery_status !== undefined &&
              <>
                <div className='cart-card-status'>
                  <div className={item.delivery_status_classname}/>
                  <div>Ваш заказ {(item.delivery_status).toLowerCase()}</div>


                </div>
                <p style={{fontSize: 14, marginTop: 10}}>
                  {item.price.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB'
                  })} x {item.quantity} = {(item.price * item.quantity).toLocaleString('ru-RU', {
                  style: 'currency',
                  currency: 'RUB'
                })}
                </p>
              </>
            }

            {(item.counter && item.price) && <p>{`${item.counter}шт. x ${(item.price).toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB'
            })} = ${(item.counter * item.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}`}</p>}

            {
              (item.counter && controls) && <div className='cart-card-counter-controls'>
                <button
                  className='primary-button small-btn square-corners'
                  onClick={() => {
                    if (item.counter && item.counter === 1) {
                      dispatch(deleteProduct(item))
                    }
                    dispatch(decrement(item))
                  }}
                >-
                </button>
                <button
                  className='primary-button small-btn square-corners'
                  onClick={() => dispatch(increment(item))}
                >+
                </button>
              </div>
            }

          </div>
        </div>
        <div className='cart-card-controls'>
          {
            (item.counter && controls) &&
            <button className='danger-button' onClick={() => dispatch(deleteProduct(item))}>
              <MdDelete color='#fff'/>
            </button>
          }

        </div>
      </div>
    </>

  );
}

export default CartCard;