import React, { useContext } from 'react'
import logo from '../../assets/img/logo.png';
import { FaViber } from 'react-icons/fa';
import profile from '../../assets/img/profile.svg';
import contact from '../../assets/img/contact.svg';
import titok from '../../assets/img/titokWhite.svg';
import about from '../../assets/img/about.svg';
import home from '../../assets/img/home.svg';
import money from '../../assets/img/money.png';
import log from '../../assets/img/log.png';
import promotion from '../../assets/img/promotion.svg';
import { Link } from 'react-router-dom';
import slot from "../../assets/img/slot.svg";
import card from "../../assets/img/card.svg";
import fish from "../../assets/img/fish.svg";
import football from "../../assets/img/sport.svg";
import depositLg from '../../assets/img/depositLg.png';
import phone from '../../assets/img/social24.svg'
import line from '../../assets/img/lineW.svg'
import tele from '../../assets/img/telew.svg'
import viber from '../../assets/img/viberw.svg'
import fb from "../../assets/img/fb.png";
import coin from '../../assets/img/coin.png'
import { CoinsIcon } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import useLogout from "../../hooks/useLogout";
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import ranking from "../../assets/img/trophy.svg";

const SidebarLg = () => {
  const { user } = useContext(AuthContext);
  const { content } = useContext(LanguageContext);
  const { data } = useFetch(BASE_URL + "/contact");
  const contacts = data?.map((contact) => ({
    ...contact, // Copy existing object properties
    image: contact.name == "Viber"
      ? viber
      : contact.name == "Telegram"
        ? tele
        : contact.name == "Facebook"
          ? fb
          : null, // Default to null if no condition matches
  }));

  const { logout, loading } = useLogout();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  }

  const navLinks = [
    { img: home, name: content?.nav?.home?.toUpperCase(), link: '/?type=all' },
    { img: titok, name: content?.nav?.videos?.toUpperCase(), link: '/reels' },
    { img: profile, name: content?.profile?.my_profile?.toUpperCase(), link: '/information?tab=profile' },
    { img: money, name: content?.wallet?.wallet?.toUpperCase(), link: '/information?tab=transfer' },
    { img: log, name: content?.nav?.logs?.toUpperCase(), link: '/information?tab=logs&type=deposit' },
    { img: promotion, name: content?.nav?.promotion?.toUpperCase(), link: '/promotion' },
    { img: contact, name: content?.nav?.contact?.toUpperCase(), link: '/contact' },
    { img: ranking, name: content?.nav?.ranking, link: '/ranking' }

  ];
  const items = [
    { img: slot, link: "/?type=slot", value: "2", name: content?.game_type?.slot },
    { img: fish, link: "/?type=arcade", value: "4", name: content?.game_type?.arcade },
    { img: football, link: "/?type=table", value: "5", name: content?.game_type?.table },
    { img: card, link: "/?type=casino", value: "6", name: content?.game_type?.casino },
    { img: fish, link: "/?type=lottery", value: "8", name: content?.game_type?.lottery },
    { img: football, link: "/?type=bingo", value: "9", name: content?.game_type?.bingo },
    { img: fish, link: "/?type=fishing", value: "0", name: content?.game_type?.fishing },
    // { img: football, link: "/?type=sport book&list=SBO", value: "sport book", name: 'အားကစားဂိမ်းများ' },
  ];

  return (
    <div className='px-3'>
      <div className="text-center my-2">
        <Link to={'/'}>
          <img src={logo} width={150} />
        </Link>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <div>
          <Link to={'/information?tab=profile'} >
            <div className="d-flex gap-2 mb-3 align-items-center ">
              <div>
                <img src={profile} className='navProfileImg' />
              </div>
              <div>
                <h5 className="d-block fw-normal py-0 my-0">
                  {user?.name}
                </h5>
              </div>
            </div>
          </Link>
          
          <div className="moneyGroup gap-2 rounded-5 py-0 ps-3 pe-4">
            <img src={coin} className='coin' />
            <h5 className='pt-2'>{Number(user?.balance).toLocaleString()} Ks</h5>
            {/* <img src={refresh} className='refresh' /> */}
          </div>
        </div>
        <div className='depositBtn text-center py-1 px-2 mt-4  rounded-5' >
          <Link to={'/information?tab=transfer'} >
            <h5 className="fw-semibold py-1 mb-0 px-5">
              <CoinsIcon size={35} className='me-2' />
              {content?.wallet?.deposit?.toUpperCase()}</h5>
          </Link>
        </div>
      </div>
      <div className='my-3 text-center'>
        <a href='https://ponewine20x.xyz/assets/app/bossi.apk' target='_blank' className="btn btn-light">
          {/* <img src="" alt="" /> */}
          Download App
        </a>
      </div>
      <div className="text-center px-4 mt-4">
        {navLinks.map((item, index) => {
          return <Link to={item.link} key={index} >
            <div className='py-1 mb-3 px-4 rounded-5 border border-2 border-white text-center d-flex align-items-center justify-content-center gap-2'>
              <img src={item.img} className='sidebarLgIcon' />
              <h5 className='fw-semibold mt-2'>{item.name}</h5>
            </div>
          </Link>
        })}
        <button
          onClick={handleLogout}
          className="homePromotionBtn my-3 rounded-5 button-bottom">
          <div className="text-center py-2 ">
            {loading && <Spinner className='me-1' size='sm' animation="border" />}
            {content?.profile?.logout?.toUpperCase()}
          </div>
        </button>
      </div>
      {/* {items.map((item, index) => {
        return <Link to={item.link} style={{ background: item.bg }} className="lgGameTab py-1 mx-3 d-flex items-center justify-content-center gap-2 py-2 my-3" key={index}>
          <img src={item.img} className='fixedBottomIcon lgGameTabText' />
          <p className='fw-semibold lgGameTabText'>{item.name}</p>
        </Link>
      })} */}
      <div className="mt-4 mb-5 d-flex align-items-center  justify-content-center gap-4">
        {contacts && contacts.map((contact, index) => {
          return (
            <Link to={contact.link} key={index}>
              <img src={contact.image} className="rounded-3" width={50} />
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default SidebarLg
