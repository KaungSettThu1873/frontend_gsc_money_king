import React, { useContext } from 'react'
import { Carousel } from 'react-bootstrap'
import { GeneralContext } from '../../contexts/GeneralContext';
import { AuthContext } from "../../contexts/AuthContext";

const Carousels = () => {
  const {banners} = useContext(GeneralContext);
    const { user } = useContext(AuthContext);

    console.log(banners);

  return (
    (user && (<>
         <div className='carouselContainer p-sm-4'>
      <Carousel>
        {banners && banners.map((item, index) => {
          return <Carousel.Item key={index}>
            {/*<div>{"https://moneyking77.online/api/.."+item.desktop_image}</div>*/}
            <img src={item.desktop_image} className='bannerImg' />
          </Carousel.Item>
        })}
      </Carousel>
    </div>
    </>))
 
  )
}

export default Carousels
