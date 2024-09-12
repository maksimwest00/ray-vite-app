import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import {Link, useParams} from "react-router-dom";
import {ENDPOINTS} from "../config/ENDPOINTS";
import axios from "axios";
import {product} from "./Products";
import CounterInput from "../components/CounterInput";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {addProduct} from "../app/features/CartSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getProducts} from "../app/features/ProductsSlice";
import {MdOutlineAddShoppingCart} from "react-icons/md";
import {jwtDecode} from "jwt-decode";

interface recipe {
  ingredients: string
}

function Product() {


  const {id} = useParams()
  const [product, setProduct] = useState<product | null>(null);
  const [ingredients, setIngredients] = useState<recipe | null>(null);
  const [counter, setCounter] = useState<number>(1);

  const [img, setImg] = useState<any>('');

  const dispatch = useAppDispatch()
  const { products, status } = useAppSelector(store => store.products)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if(products.length === 0) {
        dispatch(getProducts())
      }

      axios.get(`${ENDPOINTS.getRecipes}/${id}`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        setIngredients(res.data[0])
      })
    }, 500)

    const token: string|null = localStorage.getItem('token')
    if(token) {
      const tk_values: any = jwtDecode(token)
      setIsLoggedIn(tk_values.id !== null)
    }

  }, []);

  useEffect(() => {
    const filteredProduct = products.find((item: any) => item.id === Number(id))
    setProduct(filteredProduct)

    if(filteredProduct) {
      try {
        const img = `${"https://rayhan24.ru"}/${filteredProduct.img}`
        setImg(img)
      } catch (e) {
        setImg('#')
      }

    }

  }, [products])

  const addToCart = () => {
    dispatch(addProduct({...product, counter}))
  }

  const handleCounter = (counterType: any) => {
    if(counterType === 'increment') {
      setCounter((prev) => prev + 1)
    } else {
      setCounter((prev) => {
        if(prev > 1)
          return prev - 1
        return prev
      })
    }

  }



  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      {!product && <Loading/>}
      <div className='product-page'>
        {
          product && <div className='product-info'>
            <div className='product-title-container'>
              <h3>{product.title}</h3>
            </div>
            <div className='product-image-container'>
              <img src={img as string} alt={product.title}/>
            </div>
            <div className="product-ingredients">
              <h4>Описание</h4>
              {ingredients && <p>{ingredients.ingredients}</p>}
            </div>
            <div className='product-description'>
              <p>Цена: {(product.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</p>
            </div>
            <div className='product-controls'>


              {
                isLoggedIn ?
                  <>
                    <CounterInput
                      counter={counter}
                      handleCounter={(type: any) => handleCounter(type)}
                    />

                    <button
                      className='primary-button df'
                      style={{marginTop: 30, marginBottom: 20, alignItems: 'center', width: 165}}
                      onClick={addToCart}
                    > <MdOutlineAddShoppingCart style={{marginRight: 10, fontSize: 22}}/> В корзину
                    </button>
                  </>
                  : <p style={{fontSize: 16}}>
                    Пожалуйста <Link to='/login' style={{color: '#36B441'}}>войдите</Link> или <Link to='/signup' style={{color: '#36B441'}}>зарегистрируйтесь</Link> чтобы заказать.
                  </p>
              }

            </div>
          </div>
        }
      </div>
      <Footer/>
    </div>
  );
}

export default Product;
