import {Link} from "react-router-dom";
import {MdAddShoppingCart} from 'react-icons/md'
import {useAppDispatch} from "../app/hooks";
import {addProduct} from "../app/features/CartSlice";
import process from "process";

function Card({product}: any) {
  const dispatch = useAppDispatch()
  const img = product.image || product.img
  let image
  try {
    image = process.env.REACT_APP_MODE === 'dev' ? require(`../static/${img}`) : `${"https://rayhan24.ru"}/${img}`
  } catch(err: any) {
    console.log('Something went wrong.', err.message)
    image = '#'
  }

  


  const path = !product.price ? '/categories' : '/products'
  return (
    <div className='card'>
      <div className="card-image-container">
        <Link to={`${path}/${product.id}`}>
            <img src={image as string} alt={product.title}/>
        </Link>
        {
          product.price &&
          <div className='card-controls'>
            <button
              className='primary-button small-btn'
              onClick={() => dispatch(addProduct({...product, counter: 1}))}
            >
              <MdAddShoppingCart/>
            </button>
          </div>
        }
      </div>
      <Link to={`${path}/${product.id}`}>
        <div className='card-title-container'>
          <h6 className='card-title'>{product.title}</h6>
          {product.price && <p className='card-price'>{(product.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</p>}
        </div>
      </Link>
    </div>
  );
}

export default Card;