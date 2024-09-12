import React, {useEffect, useState} from 'react';
import {FaShoppingBasket} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {countTotalAndAmount} from "../app/features/CartSlice";

interface cartDetails {
  amount: number,
  total: number
}

function CartWidget() {
  const [cartDetails, setCartDetails] = useState<cartDetails>({
    amount: 0,
    total: 0
  });

  const dispatch = useAppDispatch()
  const { cartItems, amount, total } = useAppSelector((state) => state.cart)

  useEffect(() => {
    dispatch(countTotalAndAmount())
  }, [cartItems]);

  return (
    <>
      <Link to='/cart'>
        <button className='nav-cart'>

          <FaShoppingBasket style={{fontSize: 16}}/>

          <div className="nav-cart-total">
            { amount }
            |
            {total.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}
          </div>
        </button>
      </Link>
    </>
  );
}

export default CartWidget;