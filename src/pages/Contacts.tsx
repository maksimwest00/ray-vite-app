import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Img from '../static/images/contacts.jpeg'

function Contacts() {
  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='dashboard-page contacts-page'>
        <h3>Контакты</h3>
        <div className='contact-info-container'>
          <div style={{
            borderRadius: 20,
            overflow: 'hidden'
          }}>
            <img src={Img} alt="Ресторан" style={{width: 500}}/>
          </div>
          <div className='contacts-info'>
            <p>Адрес: 4-ая Магистральная улица 18, ст. 1 </p>
            <p>Тел: <a href="tel:+7(965)102-21-10">+7(965)102-21-10</a></p>
            <p><a href="mailto:rayhan.24@mail.ru">Email: rayhan.24@mail.ru</a></p>
	    <p>Бесплатная доставка от 800рублей в пределах района!</p>
	    <p>За пределами района доставка осуществляется за счёт клиента.</p>
          </div>
        </div>

      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.263068867818!2d37.51567971593121!3d55.771302780558344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9fcb518112a4f9fa!2zNTXCsDQ2JzE2LjciTiAzN8KwMzEnMDQuMyJF!5e0!3m2!1sen!2sde!4v1652597764045!5m2!1sen!2sde"
        width="100%" height="350" style={{border:0}} allowFullScreen={true} loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <Footer />
    </div>
  );
}

export default Contacts;
