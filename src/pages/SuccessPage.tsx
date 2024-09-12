import React, {useEffect} from 'react';
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import Nav from "../components/Nav";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import {useAppDispatch} from "../app/hooks";
import {clearStatus} from "../app/features/OrderSlice";

interface props {
  type: string,
  text?: string,
  showLoginBtn?: boolean
}

function SuccessPage({type, text='Регистрация прошла успешно, пожалуйста войдите в систему.', showLoginBtn=true}: props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(clearStatus())
    };
  }, []);


  return (
    <div className='success-page'>
      <Nav showBtn=''/>
      <div>
        <IoCheckmarkDoneCircleSharp className='success-icon'/>
        <p>
          {text}
        </p>
        {
          showLoginBtn && <Link to='/login'>
            <button className='primary-button'>Войти</button>
          </Link>
        }

      </div>
      <Footer />
    </div>
  );
}

export default SuccessPage;
