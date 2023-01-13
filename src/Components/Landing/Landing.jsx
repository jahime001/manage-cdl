import React from 'react'
import Nav from '../Nav/Nav'
import './Landing.css'
import macbook from './mockup2.png'

export default function Landing() {
  return (
    <div className='Landing'>
        <Nav />
        <section className='one'>
            <div className='front-page'>
              <div className='title-textbox'>
                <div className='title-text'>
                   <h1>Manage Cdl</h1>
                   <h2>The helper for your company</h2>
                   <p>Easily manage and organize your bus company's information. This includes personal details, employees, vans, students, pay rates, contact information, and more.</p>
                </div>
                <div className='join-now'>
                  Join Now For Free!
                </div>
              </div>
              <div className='title-imagebox'>
                    <img src={macbook} alt="" className='macbook' />
              </div>
            </div>
          <div className="wave">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
    </svg>
</div>
        </section>
    </div>
  )
}
