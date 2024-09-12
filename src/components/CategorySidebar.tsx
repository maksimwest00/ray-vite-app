import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {getCategories} from "../app/features/CategoriesSlice";
import {useAppDispatch} from "../app/hooks";

function CategorySidebar({categories} : any) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, []);

  return (
    <div className='category-sidebar'>
      <h4>Категории товаров</h4>
      <ul>
        {
          categories && categories.map((item: any) => {
            return <li key={item.id}><Link to={`/categories/${item.id}`}>{item.title}</Link></li>;
          })
        }
      </ul>
    </div>
  );
}

export default CategorySidebar;
