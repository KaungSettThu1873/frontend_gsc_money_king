import React, { useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { GeneralContext } from '../contexts/GeneralContext';

const AdsBanner = () => {
  const {ads_banner} = useContext(GeneralContext);
  const MySwal = withReactContent(Swal);
  const adsFire = () => {
    MySwal.fire({
      imageUrl: "https://luckymillion.pro/api/.."+ads_banner[0].img_url,
      imageHeight: 150,
      width: '100%',
      // height : '50%',
      text: "Money King Website မှ မည်သည့်ဂိမ်းကိုမဆို မသမာသောနည်းဖြင့် ကစားထားခြင်း၊ ကစားထားသော ဂိမ်းများ report ကြည့်မရခြင်း၊ အကောင့်တခုထပ်ပို၍ဖွင့်ကစားထားခြင်း စသည်များကို တွေ့ရှိပါက ထိုကဲ့သို့ ကစားထားသော Player အနိုင်ကြေးအပြင် သွင်းငွေကိုပါ ထုတ်ပေးမည် မဟုတ်ကြောင်း လေးစားစွာအသိပေးအပ်ပါသည်။",
 customClass: {
    popup: 'my-swal-popup',
    htmlContainer: 'my-swal-text'
  }
    })
  }
useEffect(() => {
  if (ads_banner?.length > 0 && ads_banner[0]?.img_url) {
    adsFire();
  }
}, [ads_banner]);

  return (
    <div>

    </div>
  )
}

export default AdsBanner