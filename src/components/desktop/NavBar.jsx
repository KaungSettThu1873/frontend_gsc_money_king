import { useContext, useDebugValue, useEffect, useState } from "react";
import Register from '../../pages/Register';
import Login from '../../pages/Login';
// src/pages/Register.jsx
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../assets/css/navbar.css";
import { IoMdClose, IoMdRefreshCircle } from "react-icons/io";
import home from "../../assets/img/home.svg";
import logo from "../../assets/img/logo.png";
import money from "../../assets/img/money.png";
import register from "../../assets/img/register.svg";
import promotion from "../../assets/img/promotion.svg";
import profile from "../../assets/img/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import LanguageDropdown from "../LanguageDropdown";
import tele from "../../assets/img/telew.svg";
import viber from "../../assets/img/viberw.svg";
import { AlignJustifyIcon } from "lucide-react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseUrl";
import fb from "../../assets/img/fb.png";
import useLogout from "../../hooks/useLogout";
import AdsVideo from "../../pages/AdsVideo";
function NavBar() {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    { img: home, name: content?.nav?.home, link: "/?type=all" },
    {
      img: profile,
      name: content?.profile?.my_profile,
      link: "/information?tab=profile"
    },
    {
      img: money,
      name: content?.wallet?.wallet,
      link: "/information?tab=transfer"
    },
    { img: promotion, name: content?.nav?.promotion, link: "/promotion"   },
    { img: "/images/Final_All/icons8-message-100.png", name: content?.nav?.contact, link: "/contact" },
    // { img: "/images/Final_All/icons8-video-96.png", name: content?.nav?.ads_video, link: "/ads-video" },
  ];
  const [show, setShow] = useState(false);

  const { data } = useFetch(BASE_URL + "/contact");
  // console.log(data);

  const contacts = data?.map((contact) => ({
    ...contact, // Copy existing object properties
    image:
      contact.name == "Viber"
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
  };

  return (
    <>
      <nav className="nav-design">
        <div className="d-flex justify-content-spacebetwenn  justify-content-around">
          <div>
            <img src={'./images/logo-P-jbhPrl.png'}  className="logoSize" />
          </div>
          <div className="d-flex justify-content-evenly ">
            {/* <a className="me-4">Login</a> */}
            {!user && (
              <>
                {/* <button className="btn btn-outline-warning btn-sm me-4">
                  Login
                </button> */}
                     <button onClick={() => setShowLogin(true)} className="btn btn-outline-warning nav-btn ">{content?.auth?.login || "login"}</button>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} />
             <button onClick={() => setShowRegister(true)} className="btn btn-warning nav-btn">
        {content?.auth?.register || "Join Now"}
      </button>
      <Register show={showRegister} onClose={() => setShowRegister(false)} />
              </>
            )}

                {user && ( <>
<button
              onClick={() => {
                navigate(navLinks[0].link + "?type=all");
                setShow(false);
              }}
              className="btn btn-warning nav-btn mobile-view"
            >
              <i className="fa-solid fa-home me-2"></i>
               {content?.nav?.home || "Home"}
            </button>

                    <button
              onClick={() => {
                navigate(navLinks[1].link);
                setShow(false);
              }}
              className="btn btn-warning nav-btn mobile-view"
            >
              <i className="fa-solid fa-circle-user me-2"></i>
              {content?.profile?.my_profile || "Profile"}
            </button>
                </> )}


          
          {user && (
            <>
              <button  className="btn btn-warning nav-btn">
              <i className="fa-solid fa-money-check-dollar pe-2"></i>
                {user?.balance}
              </button>

                <button
              onClick={handleLogout}
              className="btn btn-outline-warning nav-btn mobile-view"
            >
              {loading && (
                <Spinner
                  style={{ marginRight: "0.5rem" }}
                  animation="border"
                  size="sm"
                />
              )}
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              {content?.profile?.logout || "Logout"}
            </button>
            </>
          )}
            <LanguageDropdown />
                {user && ( <>
            <button
              onClick={() => setShow(true)}
              className=" cursor-pointer   rounded text-dark btn btn-warning nav-sideBarBtn"
            >
              <AlignJustifyIcon className="custom-icon"/>
            </button>
            </>)}
          </div>
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        className="offcanvasDesign"
      >
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Offcanvas.Header
            style={{
              width: "100%",
              borderBottom: "1px solid #444",
              paddingBottom: "1rem",
            }}
          >
            <Offcanvas.Title
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Menu
              </span> */}
              <IoMdClose
                onClick={() => setShow(false)}
                style={{ cursor: "pointer" }}
                size={26}
                color="#fff"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body style={{ paddingTop: "1rem" }}>
            {navLinks.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.link);
                  setShow(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#292929")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={item.img}
                  alt=""
                  width={24}
                  style={{
                    marginRight: "12px",
                    filter: "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
                  }}
                />
                <p style={{ margin: 0, fontSize: "1rem", fontWeight: 500 }}>
                  {item.name}
                </p>
              </div>
            ))}

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  width: "100%",
                  borderRadius: "30px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                {loading && (
                  <Spinner
                    style={{ marginRight: "0.5rem" }}
                    animation="border"
                    size="sm"
                  />
                )}
                {content?.profile?.logout}
              </button>
            </div>

            <div style={{ margin: "1.5rem 0" }}>
              <a
                href="https://ponewine20x.xyz/assets/app/bossi.apk"
                target="_blank"
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  border: "1px solid #fff",
                  padding: "10px",
                  borderRadius: "999px",
                  color: "white",
                  textDecoration: "none",
                  width: "100%",
                  fontWeight: 600,
                }}
                rel="noreferrer"
              >
              {content?.nav?.download_app || "Download App"}  
              </a>
            </div>

            <div
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {/* {contacts &&
                contacts.map((contact, index) => (
                  <Link to={contact.link} key={index}>
                    <img
                      src={contact.image}
                      alt=""
                      width={45}
                      height={45}
                      style={{
                        borderRadius: "50%",
                        boxShadow: "0 0 6px rgba(0,0,0,0.4)",
                      }}
                    />
                  </Link>
                ))} */}
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default NavBar;
