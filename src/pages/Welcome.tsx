import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';

// APP imports
import useGetWindowSize from "../hooks/useGetWindowSize";
import Nav from "../components/Nav";

function Welcome() {
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null);
  const [windowWidth, windowHeight] = useGetWindowSize()
  const [showInstall, setShowInstall] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if (windowWidth < 1200) {
      window.addEventListener('beforeinstallprompt', handlePrompt)
      return () => {
        window.removeEventListener('beforeinstallprompt', handlePrompt)
      };
    }

  }, []);

  const handlePrompt = (ev: any) => {
    console.log(ev)
    ev.preventDefault()
    setPwaInstallPrompt(ev)
  }

  const handleInstall = () => {
    pwaInstallPrompt.prompt()
    pwaInstallPrompt.userChoice.then((choiseResult: any) => {
      if(choiseResult.outcome === 'accepted') {
        console.log('User Accepted the A2hs')
      }
    })
    setPwaInstallPrompt(null)
  }

  return (
    <div className='welcome-page'>
      <Nav showBtn='login'/>
      <div className="welcome-page-info">
        <p>Вкусная еда, быстрая доставка. Войдите или зарегистрируйтесь чтобы заказать</p>
        <div style={{display: 'flex'}}>
          <Link to='/dashboard'>
            <button className='primary-button'>Меню</button>
          </Link>
          <Link to='/signup'>
            <button className='primary-button'>Зарегистрироваться</button>
          </Link>
        </div>
      </div>

      {/*{*/}
      {/*  (windowWidth < 1200 && showInstall) &&*/}
      {/*  <div>*/}
      {/*    <div className="install-pwa-block">*/}
      {/*      <div className="close" onClick={() => setShowInstall(false)}>*/}
      {/*        <AiOutlineClose />*/}
      {/*      </div>*/}
      {/*      <p>Установите наше приложение</p>*/}
      {/*      <button className='primary-button small-btn' onClick={handleInstall}>Установить</button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*}*/}

    </div>
  );
}

export default Welcome;
