import React, { useContext } from 'react'
import { Volume2Icon } from 'lucide-react'
import { GeneralContext } from '../../contexts/GeneralContext'

const Marquee = () => {
  const {banner_text} = useContext(GeneralContext);
  return (
    <div className='ps-lg-3 py-lg-3 shadow-lg d-flex align-items-center mt-1 mb-2 gap-2 flex-nowrap w-100'>
      <div className='shadow-lg homeMarquee py-1 px-3 m-sm-2 w-100'>
        <Volume2Icon className='marqueeText me-2' size={22} />
        <marquee className='marqueeText w-100' behavior="" direction="left">
          {banner_text?.[0]?.text}
        </marquee>
      </div>
    </div>


  )
}

export default Marquee
