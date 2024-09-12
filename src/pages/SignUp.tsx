import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

//APP imports
import Nav from "../components/Nav";
import {ENDPOINTS} from "../config/ENDPOINTS";
import Footer from "../components/Footer";

interface IObjectKeys {
  [key: string]: any;
}

interface SignUpType extends IObjectKeys{
  name: string,
  surname: string,
  email: string,
  password: string,
  phone_number: string,
  address: string
}

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignUpType>({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone_number: '',
    address: ''
  });
  const [error, setError] = useState<string[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);


  const handleInputChange = (ev: React.FormEvent<HTMLElement>, type: string) => {
    const input = ev.target as HTMLInputElement
    setFormData((prevState: SignUpType) => {
      return {
        ...prevState,
        [type]: input.value
      }
    })
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    let locError: string[] = []
    Object.keys(formData).forEach((field:string) => {
      if(formData[field].length === 0) {
        locError.push(field)
      }
    })

    if(locError.length > 0) {
      setError(locError)
      return
    }

    setError([])
    axios
      .post(`${ENDPOINTS.signup}`, formData)
      .then((res) => {
        navigate('/signup-success')

      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className='signup'>
      <Nav showBtn='login'/>
      <div className='signup-container'>
        <h3>Регистрация</h3>
        {
          error.length > 0 && <div className='form-error'>
          Пожалуйста заполните все обьязательные поля
        </div>
        }
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='email'>Имя:</label>
            <input
              id='name'
              type='name'
              name='name'
              className={error.includes('name') ? 'input-error' : ''}
              placeholder='Иван'
              value={formData.name}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'name')}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='email'>Фамилия:</label>
            <input
              id='surname'
              type='surname'
              name='surname'
              className={error.includes('surname') ? 'input-error' : ''}
              placeholder='Иванов'
              value={formData.surname}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'surname')}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              name='email'
              className={error.includes('email') ? 'input-error' : ''}
              placeholder='ivan@yandex.ru'
              value={formData.email}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'email')}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='password'>Пароль:</label>
            <input
              id='password'
              type='password'
              name='password'
              className={error.includes('password') ? 'input-error' : ''}
              placeholder='••••••••••'
              value={formData.password}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'password')}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='phone_number'>Номер телефона:</label>
            <input
              id='phone_number'
              type='tel'
              name='phone_number'
              className={error.includes('phone_number') ? 'input-error' : ''}
              // pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
              placeholder='+71234567890'
              value={formData.phone_number}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'phone_number')}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='address'>Адрес для доставки:</label>
            <input
              id='address'
              type='address'
              name='address'
              className={error.includes('address') ? 'input-error' : ''}
              placeholder='Москва, Красная площадь, дом 1'
              value={formData.address}
              onChange={(ev:React.FormEvent<HTMLElement>) => handleInputChange(ev, 'address')}
            />
          </div>

          <div className='form-buttons'>
            <button className='primary-button' type='submit'>Зарегистрироваться</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
