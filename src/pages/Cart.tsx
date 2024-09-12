import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import CartCard from "../components/CartCard";
import {confirmOrder, saveOrder} from "../app/features/OrderSlice";
import {clearAll} from "../app/features/CartSlice";
import {useNavigate} from "react-router-dom";

function Cart() {
  const dispatch = useAppDispatch()
  const {cartItems, total} = useAppSelector((state) => state.cart)
  // @ts-ignore
  const {confirmStatus} = useAppSelector((state) => state.orders)

  const navigate = useNavigate()

  const handleOrder = () => {
    dispatch(saveOrder({...cartItems, total}))
    navigate('/checkout')
  }

  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='cart-page'>
        <h3>Товары в корзине</h3>
        <div className='cart-items'>
          {cartItems.length === 0 && <h4 style={{textAlign: 'center', color: '#ccc'}}>Корзина пуста</h4>}

          {
            cartItems.map(
              (item: any) => <CartCard item={item} key={item.id} />
            )
          }
          {
            cartItems.length > 0 && <div className='cart-total-price'>
              Итого: {
              (total)
                .toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
              }
            </div>
          }
          <button
            className={'primary-button'}
            style={{width: '100%', marginTop: '25px'}}
            disabled={cartItems.length === 0}
            onClick={handleOrder}
          >Оформить заказ</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
