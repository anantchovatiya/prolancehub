import React from 'react'

export const Footer = () => {
  return (
    <>
    <div className="footer flex flex-col md:flex-row justify-between content-center w-full mt-10 gap-2 px-10 md:px-16 md:h-56 bg-slate-900 text-white">
      <div className="f1 flex flex-col justify-center content-center">
        <span className='pt-2 text-xl md:text-3xl font-bold text-center'>ProlanceHub</span>
        <span className='text-center'>Connecting Talent with Opportunity</span>
      </div>
      <div className="f2 pt-5">
        <p className='text-xl font-bold mb-1 md:mb-3'>For Clients</p>
        <p className='text-sm md:text-lg'>Find freelancers</p>
        <p className='text-sm md:text-lg'>Post Projects</p>
        <p className='text-sm md:text-lg'>Refund policy</p>
        <p className='text-sm md:text-lg'>Privacy policy</p>
      </div>
      <div className="f3 pt-5">
      <p className='text-xl font-bold mb-1 md:mb-3'>For Freelancers</p>
        <p className='text-sm md:text-lg'>Find work</p>
        <p className='text-sm md:text-lg'>Create Account</p>
      </div>
      <div className="f4 pt-5">
      <p className='text-xl font-bold mb-1 md:mb-3'>Meet Developer</p>
        <p className='text-sm md:text-lg'>Anant Chovatiya</p>
      </div>
      <div className="f5 pt-5">
      <p className='text-xl font-bold mb-1 md:mb-3 pb-1'>Call us</p>
      <p className='text-sm md:text-lg'>📍 Address: Jamnagar, India</p>
      <p className='text-sm md:text-lg'>📧 Email: support@prolancehub.com</p>
      <p className='text-sm md:text-lg'>📞 Contact: +123 456 7890</p>
      </div>
    </div>
     <div className='text-sm text-center bg-slate-900 text-white pt-10 md:pt-1'>© 2025 ProlanceHub. All Rights Reserved.</div>
    </>
  )
}
