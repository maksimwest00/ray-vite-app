import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Banquet() {
  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='page dashboard-page'>
        <div className='contact-info-container text-page'>
        <h3>Вакансии</h3>
        <p>
          Как и любая Компания, которая не просто делает бизнес, а видит своей целью необходимость приносить пользу и быть нужными людям, мы придерживаемся нашей Миссии. Мы дарим неповторимую атмосферу расслабленного спокойствия, гостеприимства и радушия. Мы — № 1!
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Banquet;
