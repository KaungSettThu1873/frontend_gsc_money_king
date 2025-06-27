import { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../assets/css/navbar.css'
import { IoMdClose } from "react-icons/io";
import home from '../../assets/img/home.svg';
import logo from '../../assets/img/logo.png';
import money from '../../assets/img/money.png';
import promotion from '../../assets/img/promotion.svg';
import profile from '../../assets/img/profile.svg';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import LanguageDropdown from '../LanguageDropdown';
import tele from '../../assets/img/telew.svg'
import viber from '../../assets/img/viberw.svg'
import { AlignJustifyIcon } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AuthContext } from '../../contexts/AuthContext';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import fb from '../../assets/img/fb.png'
import useLogout from '../../hooks/useLogout';
 
function Navbar() {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    { img: home, name: content?.nav?.home, link: '/' },
    { img: profile, name: content?.profile?.my_profile, link: '/information?tab=profile' },
    { img: money, name: content?.wallet?.wallet, link: '/information?tab=transfer' },
    { img: promotion, name: content?.nav?.promotion, link: '/promotion' },
  ];
  const [show, setShow] = useState(false);

  const { data } = useFetch(BASE_URL + "/contact");
  
  const contacts = data?.map((contact) => ({
    ...contact,
    image: contact.name === "Viber"
      ? viber
      : contact.name === "Telegram"
        ? tele
        : contact.name === "Facebook"
          ? fb
          : null,
  }));

  const { logout, loading } = useLogout();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  }

  return (
    <>
      <nav className="nav-design-mobile p-2 text-white">
        <div className="d-flex justify-content-between align-items-center">
          <img src={'./images/logo-P-jbhPrl.png'} width={30} height={30} alt="Bossi Logo" />

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {!user && (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn btn-outline-warning btn-sm"
                  aria-label="Login"
                >
                  Login
                </button>
                <Login show={showLogin} handleClose={() => setShowLogin(false)} />

                <button
                  onClick={() => setShowRegister(true)}
                  className="btn btn-warning btn-sm"
                  aria-label="Join Now"
                >
                  Join Now
                </button>
                <Register show={showRegister} onClose={() => setShowRegister(false)} />
              </>
            )}

            {user && (
              <>
                <button className="btn btn-warning btn-sm" disabled>
                  <i className="fa-solid fa-money-check-dollar me-1"></i>
                  {user?.balance ? parseFloat(user.balance).toLocaleString() : '0.00'}
                </button>
              </>
            )}

            <LanguageDropdown />

            <button
              onClick={() => setShow(true)}
              className="btn btn-link text-white p-1 rounded bg-black bg-opacity-25 border-0"
              aria-label="Open menu"
            >
              <AlignJustifyIcon size={22} />
            </button>
          </div>
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.7)",
          width: "280px",
          height: "450px",
          maxHeight: "100vh",
          overflowY: "auto",
          position: "fixed",
          top: "15%",
          right: 0,
        }}
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
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Menu
              </span>
              <button
                onClick={() => setShow(false)}
                className="btn btn-link text-white p-0 border-0"
                aria-label="Close menu"
              >
                <IoMdClose size={26} />
              </button>
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(item.link);
                    setShow(false);
                  }
                }}
              >
                <img
                  src={item.img}
                  alt={`${item.name} icon`}
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

            {user && (
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    width: "100%",
                    borderRadius: "30px",
                    padding: "8px",
                    fontWeight: "bold",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading && (
                    <Spinner
                      style={{ marginRight: "0.5rem" }}
                      animation="border"
                      size="sm"
                    />
                  )}
                  {content?.profile?.logout || "Logout"}
                </button>
              </div>
            )}

            <div style={{ margin: "1.5rem 0" }}>
              <a
                href="https://ponewine20x.xyz/assets/app/bossi.apk"
                target="_blank"
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  border: "1px solid #fff",
                  padding: "8px",
                  borderRadius: "999px",
                  color: "white",
                  textDecoration: "none",
                  width: "100%",
                  fontWeight: 600,
                }}
                rel="noreferrer"
                aria-label="Download App"
              >
                Download App
              </a>
            </div>

            {contacts && contacts.length > 0 && (
              <div
                style={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                {contacts.map((contact, index) => (
                  <a
                    href={contact.link}
                    key={index}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Contact us on ${contact.name}`}
                  >
                    <img
                      src={contact.image}
                      alt={contact.name}
                      width={45}
                      height={45}
                      style={{
                        borderRadius: "50%",
                        boxShadow: "0 0 6px rgba(0,0,0,0.4)",
                      }}
                    />
                  </a>
                ))}
              </div>
            )}
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navbar;