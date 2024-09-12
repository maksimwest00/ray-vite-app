import React, {useEffect, useState} from 'react';
import useGetWindowSize from "../hooks/useGetWindowSize";

function PageImage({image = null, title} : any) {
  const [windowWidth, windowHeight] = useGetWindowSize()
  const img = image ? `${"https://rayhan24.ru"}/${image}` : import("../static/images/welcome-41.jpeg")
  const [parallaxHeaderTop, setParallaxHeaderTop] = useState(0);


  useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    };
  }, []);

  const handleScroll = (ev: any) => {
    setParallaxHeaderTop(ev.target.scrollingElement.scrollTop * 1.8)
  }

  return (
    <>
      {
        windowWidth > 1200 &&
        <div className="page-image" style={{backgroundImage: `url(${img})`}}>
          {/*<img width="100%" style={{marginTop: '-150px', position: 'fixed'}} src={img} alt=""/>*/}
          <div>
            <h1 style={{marginTop: `-${parallaxHeaderTop}px`}}>{title}</h1>
          </div>
        </div>
      }

    </>
  );
}

export default PageImage;
