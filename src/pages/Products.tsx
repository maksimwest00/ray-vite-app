import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import {Link, useParams} from "react-router-dom";
import {ENDPOINTS} from "../config/ENDPOINTS";
import axios from "axios";
import Card from "../components/Card";
import {getProducts, Menu} from "../app/features/ProductsSlice";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import PageImage from "../components/PageImage";
import CategorySidebar from "../components/CategorySidebar";
import useGetWindowSize from "../hooks/useGetWindowSize";
import {getCategories} from "../app/features/CategoriesSlice";

export interface product {
  id: number,
  title: string,
  price: number,
  img: string,
  categories_id: number,
  created_at: string,
  updated_at: string
}

function Products() {
  const {id} = useParams()
  const [category, setCategory] = useState<Menu | null>(null);
  const [windowWidth, windowHeight] = useGetWindowSize()

  const dispatch = useAppDispatch()
  const {products, status} = useAppSelector(store => store.products)
  const {categories} = useAppSelector<any>(store => store.categories)

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories())
    }

    axios.get(`${ENDPOINTS.getCategory}/${id}`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        setCategory(res.data[0])
      })

    if (products.length === 0) {
      // @ts-ignore
      dispatch(getProducts())
    }

  }, [id]);

  const filteredProducts = products.filter((item: any) => item.categories_id === Number(id))
  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      {(!category && status === 'pending') && <Loading/>}
      <div className='products-page'>
        <PageImage
          image={category && category.image}
          title={category ? category.title : 'Меню'}
        />
        { (windowWidth < 1200 && category) && <h3>{category.title}</h3>}
        <div className="menu-container">
          {
            windowWidth > 1200 && <CategorySidebar categories={categories}/>
          }
          <div className='menu-grid'>
            <div className='cards-container'>
              {
                filteredProducts.map((item: any) =>
                  <div key={item.id}>
                    <Card product={item}/>
                  </div>
                )
              }
            </div>
          </div>

        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Products;
