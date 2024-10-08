import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Carousel from "../components/carousel/Carousel";

function Banquet() {
  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='page dashboard-page'>
        <div className='contact-info-container text-page'>
          <h3>Банкеты</h3>

          <p>Ресторан «Райхан» – это лучшее место для проведения вашего праздничного мероприятия! Элегантное оформление
            зала, первоклассное обслуживание, самое вкусное меню – о таком празднике можно только мечтать!</p>
          <p>В ресторане «Райхан» вы можете с удовольствием отметить:</p>
          <ul>
            <li>Юбилеи и дни рождения.</li>
            <li>Детские и семейные праздники.</li>
            <li>Корпоративные мероприятия.</li>
            <li>Кофе-брейки и фуршеты.</li>
          </ul>
          <p>У нас есть все, чтобы ваши гости и вы сами смогли забыть об организаторской суете и полностью раствориться
            в атмосфере нескончаемого праздника. Вам нужно только прийти заказать банкет, выбрать подходящую дату, а мы
            поможем составить вкусное и сытное меню и позаботимся о других организационных моментах.</p>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Banquet;
