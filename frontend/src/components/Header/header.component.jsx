import React from 'react';
import './header.component.css';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
      <div className='header'>
          <div className="title"><Link to='/' style={{color:'white',textDecoration:'none'}}>DASHBOARD</Link></div>
          <div className="list-items">
              <span className="list-item"><Link to="/" style={{color:'white',textDecoration:'none'}}>CREATE</Link></span> {/* to create table */}
              <span className="list-item"><Link to='/manage' style={{color:'white',textDecoration:'none'}}>MANAGE</Link></span>{/* to manage table */}
          </div>
      </div>
    </div>
  )
}

export default Header
