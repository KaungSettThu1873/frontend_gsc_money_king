import React from 'react'
 import  p1 from '../../assets/img/pd1.png'
import  p2 from '../../assets/img/pd2.png'
import  p3 from '../../assets/img/pd3.png'
import  p4 from '../../assets/img/pd4.png'
import  p5 from '../../assets/img/pd5.png'
import  p6 from '../../assets/img/pd6.png'
import  p8 from '../../assets/img/pd8.png'
import  p9 from '../../assets/img/pd9.png'
import  p10 from '../../assets/img/pd10.png'
import  p11 from '../../assets/img/pd11.png'
import  p12 from '../../assets/img/pd12.png'
import  p13 from '../../assets/img/pd13.png'
import  p14 from '../../assets/img/pd14.png'
import  p15 from '../../assets/img/pd15.png'
import  p16 from '../../assets/img/pd16.png'
import  p18 from '../../assets/img/pd18.png'
import  p19 from '../../assets/img/pd19.png'
import  p20 from '../../assets/img/pd20.png'
import  p21 from '../../assets/img/pd21.png'
import  p22 from '../../assets/img/pd22.png'
import  p23 from '../../assets/img/pd23.png'

const Footer = () => {
  const providers=[p1,p2,p3,p4,p5,p6,p8,p9,p10,p11]
  return (
  <div style={{background:'#0D0D0D'}} className='py-3' >
     <small className='d-block text-center'>Best viewed by Google Chrome 72.0 or higher. Best viewed at a resolution of 1280x1024 or higher</small>
     <small className="d-block text-center my-1">Bossi Copyright © 2019 . All rights reserved.</small>
    <div className='mt-2 d-flex flex-wrap align-items-center justify-content-center gap-3 px-2 px-sm-4  mb-5 mb-sm-0'>
       {providers.map((img,index)=>{
          return <img src={img} className='providerImg ' key={index} />
      })}
      </div>
  </div>
  )
}

export default Footer
