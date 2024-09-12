import {useEffect, useState} from 'react';
import axios from "axios";

//APP imports
import Nav from "../components/Nav";
import {ENDPOINTS} from "../config/ENDPOINTS";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";

function ForgotPass() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string|null>(null)

  const [success, setSuccess] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    let locError: string[] = []

    if(!email) {
      setError(locError)
      setErrorMessage('Пожалуйста введите email')
      return
    } else {
      setError([])
      setErrorMessage(null)
    }

    setError([])
    axios.post(`${ENDPOINTS.forgetPassword}`, {email}).then((res) => {
        setSuccess('Мы отправили вам email, чтобы востановить пароль.')
    }).catch(e => {
      console.log('Error', e)
      setErrorMessage('Неверно введен email!')
    })

  }

  return (
    <div className='login'>
      <Nav showBtn='signup'/>
      <div className='signup-container'>
        <h3>Восстановить пароль</h3>
        {
          (error.length > 0 || errorMessage !== null) && <div className='form-error'>
            {errorMessage}
          </div>
        }
        {
          success.length > 0 && <div className='form-success'>
            {success}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              name='email'
              className={error.includes('email') ? 'input-error' : ''}
              placeholder='ivan@yandex.ru'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          <div className='form-buttons'>
            <button className='primary-button' type='submit'>Отправить email</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPass;
