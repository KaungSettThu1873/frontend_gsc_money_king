import React, { useContext, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import useLogin from "../hooks/useLogin"
import BASE_URL from '../hooks/baseUrl'
import { LanguageContext } from "../contexts/LanguageContext"
// import logo from "../assets/img/logo.png"

const Login = ({ show, handleClose }) => {
  const { content, lan } = useContext(LanguageContext);
  const [pwType, setPwType] = useState('password');
  const togglePwType = () => {
    setPwType(pwType === 'text' ? 'password' : 'text');
  }

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, errMsg } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/login";
    let inputData = { user_name, password };
    await login(url, inputData);
  }

  return (
   <Modal show={show} onHide={handleClose} centered className="custom-auth-modal">
      <Modal.Body className="p-4" style={{
        backgroundColor: '#212121',
        borderRadius: '20px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        color: 'white',
        // boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
      }}>
             <div className='text-end mb-2'>
          <button onClick={handleClose} style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            color: '#bbb'
          }}>&times;</button>
        </div>
        <div className="text-center mb-3">
          <img src={'./images/logo-P-jbhPrl.png'} width={220} alt="logo" />
          <h4 style={{ color: '#FFD700', fontWeight: 'bold' }}>{content?.auth?.login.toUpperCase()}</h4>
        </div>

        <form onSubmit={handleLogin}>
        <div style={{ display: 'flex', marginBottom: '10px', borderRadius: '10px', overflow: 'hidden' }}>
    <input
      type="text"
      placeholder={content?.profile?.username}
      value={user_name}
      onChange={(e) => setUsername(e.target.value)}
      style={{ flex: 1, padding: '10px', border: 'none' }}
    />
  </div>
  {error?.user_name && <span className="text-danger ms-1">*{error.user_name}</span>}
  {!error?.user_name && errMsg && <span className="text-danger ms-1">*{errMsg}</span>}

  {/* Password Box */}
  <div style={{ display: 'flex', marginBottom: '10px', borderRadius: '10px', overflow: 'hidden' }}>
    <input
      type={pwType}
      placeholder={content?.auth?.password}
      value={password}
      onChange={e => setPassword(e.target.value)}
      style={{ flex: 1, padding: '10px', border: 'none' }}
    />
    <div
      onClick={() => setPwType(pwType === 'text' ? 'password' : 'text')}
      style={{ background: '#333', padding: '10px', cursor: 'pointer' }}
    >
      {pwType === 'text' ? <EyeIcon color="white" size={20} /> : <EyeOffIcon color="white" size={20} />}
    </div>
  </div>
  {error?.password && <span className='text-danger ms-1'>*{error.password}</span>}


          <button type="submit" className={`${lan === "mm" ? "mm-font" : ""}`}  style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#FF0000',
                        color: 'white',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                      }}>
            {loading && <Spinner className="me-1" size="sm" />}
            {content?.auth?.login.toUpperCase()}
          </button>

          {/* <button type="button" onClick={handleClose} className="btn w-100 bg-black2 text-white py-2 rounded-4">
            {lan === 'mm' ? 'ပိတ်မည်' : 'Close'}
          </button> */}
        </form>
      </Modal.Body>
    </Modal>
    
  )
}

export default Login;