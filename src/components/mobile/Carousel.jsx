import React, { useContext } from 'react'
import { Carousel } from 'react-bootstrap'
import { GeneralContext } from '../../contexts/GeneralContext';
import { AuthContext } from "../../contexts/AuthContext";

const Carousels = () => {
  const {banners} = useContext(GeneralContext);
    const { user } = useContext(AuthContext);


  return (
    (user && (<>
         <div className='carouselContainer p-sm-4'>
      <Carousel>
        {banners && banners.map((item, index) => {
          return <Carousel.Item key={index}>
            <img src={"https://luckymillion.pro/api/.."+item.img_url} className='bannerImg' />
          </Carousel.Item>
        })}
      </Carousel>
    </div>
    </>))
 
  )
}

export default Carousels
