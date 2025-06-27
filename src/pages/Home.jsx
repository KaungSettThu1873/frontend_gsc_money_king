import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/mobile/Footer";
import Carousel from "../components/mobile/Carousel";
import "../assets/css/home.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGift, FaViber } from "react-icons/fa";
import fb from "../assets/img/fb.png";
import Marquee from "../components/mobile/Marquee";
import { IoWalletOutline } from "react-icons/io5";
import GameTabsLg from "../components/desktop/GameTabsLg";
import LanguageDropdown from "../components/LanguageDropdown";
import tele from '../assets/img/telew.svg'
import viber from '../assets/img/viberw.svg'
import AdsBanner from "../components/AdsBanner";
import { LanguageContext } from "../contexts/LanguageContext";
import { GeneralContext } from "../contexts/GeneralContext";
import AllTab from "../components/mobile/AllTab";
import BottomMenu from "../components/mobile/BottomMenu";


const HomePage = () => {
  const { banners, ads_banner, banner_text, contacts } = useContext(GeneralContext);
  const { content } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isSiteBgPlay, setIsSiteBgPlay] = useState(false);

  contacts?.map((contact) => ({
    ...contact, // Copy existing object properties
    image: contact.name == "Viber"
      ? viber
      : contact.name == "Telegram"
        ? tele
        : contact.name == "Facebook"
          ? fb
          : null, // Default to null if no condition matches
  }));

  useEffect(() => {
    navigate('/?type=all');
  }, []);

  return (
    <div >
      <AdsBanner ads_banner={ads_banner} />
      <div className="d-flex align-items-center bg-none bg-sm-black">
        <Marquee />
  
      </div>
      <Carousel  />
      <div className="px-lg-3">
        {/* <div className="beforeLoginHome my-5 pb-3"> */}
        {/* <AllTab /> */}
          {/* <Link to={'/information?tab=transfer'}>
            <button className="w-full py-2 rounded-4 sidebarSocial bg-white text-center text-black fw-bold d-flex justify-content-center flex-nowrap px-2"  >
              <IoWalletOutline size={30} className="me-2" />
              <h4 className="pb-0 mb-0">{content?.wallet?.wallet}</h4>
            </button>
          </Link> */}
          {/* <Link to={'/promotion'} className="mt-4  w-full text-center d-flex align-items-center justify-content-center gap-2   py-2 cursor-pointer homePromotionBtn text-center rounded-4">
            <FaGift size={28} />
            <h2 className=" fw-semibold pb-0 mb-0 ">{content?.nav?.promotion}</h2>
          </Link>
          <div className="mt-4 d-flex align-items-center  justify-content-center gap-4"> */}
            {/* {contacts && contacts.map((contact, index) => {
              return (
                <Link to={contact.link} key={index}>
                  <img src={contact.image} className="rounded-3" width={50} />
                </Link>
              );
            })} */}
          {/* </div> */}
        {/* </div> */}

        {/* Desktop Games Tabs */}
        <GameTabsLg />
      </div>
            {/* <BottomMenu /> */}
      <Footer />

    </div>
  );
};

export default HomePage;
