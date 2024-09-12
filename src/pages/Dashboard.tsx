import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getCategories} from "../app/features/CategoriesSlice";
import useGetWindowSize from "../hooks/useGetWindowSize";
import CategorySidebar from "../components/CategorySidebar";
import PageImage from "../components/PageImage";

interface jwtUser {
  name: string,
  email: string,
  iat: number,
  exp: number
}

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [windowWidth, windowHeight] = useGetWindowSize()

  // const {products, status} = useAppSelector(store => store.products)

  // @ts-ignore
  const {categories, status} = useAppSelector(store => store.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, []);

  return (
    <div className="dashboard">
      <Nav showBtn={null}/>
      <div className='dashboard-page'>
        <PageImage
          title="Меню"
        />
        {
          windowWidth < 1200 && <h3>Меню</h3>
        }
        {status === 'pending' && <Loading/>}
        <div className='menu-container'>
          {
            windowWidth > 1200 && <CategorySidebar categories={categories}/>
          }
          <div>
            <div className='menu-grid'>
              <div className='cards-container'>
                {
                  categories && categories.map((item: any) =>
                    <div key={item.id}>
                      <Card product={item}/>
                    </div>
                  )
                }
              </div>
            </div>

          </div>

        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;
