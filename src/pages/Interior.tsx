import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Carousel from "../components/carousel/Carousel";

function Interior() {
  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='page dashboard-page'>
        <div className='contact-info-container text-page'>
          <h3 style={{marginBottom: 20}}>Интерьер</h3>
          <div>
            <Carousel />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Interior;
