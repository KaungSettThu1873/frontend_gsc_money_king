import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import mm from '../assets/img/mm.png'
import en from '../assets/img/en.png'
import zh from '../assets/img/zh.png'
import th from '../assets/img/th.png'
import { LanguageContext } from '../contexts/LanguageContext'

const flags = {
  mm: mm,
  en: en,
  zh: zh,
  th: th,
};

const LanguageDropdown = () => {
  const { content, lan, updateLanguage } = useContext(LanguageContext);

  return (
    <Dropdown>
      <Dropdown.Toggle className='border-0 px-1 px-lg-2 nav-lan ' style={{ background: 'transparent' }} id="dropdown-basic">
   <img src={flags[lan] || en} className='flag' alt={lan} />
      </Dropdown.Toggle>

      <Dropdown.Menu className='langDropdown mt-5  bg-dark'>
        <Dropdown.Item  
        onClick={() => updateLanguage('mm')}
        >
          <img src={mm} className='flag' />
        </Dropdown.Item>
        <Dropdown.Item  
        onClick={() => updateLanguage('en')}
        >
          <img src={en} className='flag' />
        </Dropdown.Item>
                <Dropdown.Item  
        onClick={() => updateLanguage('zh')}
        >
          <img src={zh} className='flag' />
        </Dropdown.Item>
                <Dropdown.Item  
        onClick={() => updateLanguage('th')}
        >
          <img src={th} className='flag' />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageDropdown
