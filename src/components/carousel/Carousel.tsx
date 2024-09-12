import React from 'react';
import "./carousel.styles.css"

// import ImageGallery from "react-image-gallery";

function ImageGallery({items,infinite,autoPlay}: any) {
  return <></>;
}

const images = [
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%283%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%283%29.JPG',
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%284%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%284%29.JPG',
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%285%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%285%29.JPG',
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%286%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%286%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%287%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2810%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2812%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2812%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2813%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2813%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2815%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2815%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2816%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2816%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2817%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2817%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2821%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2821%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2825%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2825%29.JPG'
  },
  {
    original: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2845%29.JPG',
    thumbnail: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/i7ip/4G4hRyQx3/01%20%2845%29.JPG'
  }
  ]

function Carousel() {
  return (
    <div className='carouosel-container'>
      <ImageGallery items={images} infinite={true} autoPlay={true}/>
    </div>
  );
}

export default Carousel;