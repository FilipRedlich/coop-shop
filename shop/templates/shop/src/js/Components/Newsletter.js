import img1 from '../../images/undraw_envelope_re_f5j4.svg';

const Newsletter = () => {
  return(
      <>
      <section className='d-flex flex-row flex-wrap w-100 gap-3 newsletter'>
       <img src={img1} className='newsletter-img flexb-20 m-auto'/>
       <div className='d-flex flex-column justify-content-center gap-1 m-auto text-white flexb-30'>
           <h3 className='newsletter-text'>Want to get information about discounts and promotions first?</h3>
           <h5 className='newsletter-text'>Sign in for our Newsletter!</h5>
       <div className='d-flex flex-row mt-2'>
           <input
                  className="form-control shadow-lg flexb-70 border-l5 newsletter-input"
                  type="email"
                  placeholder="Email address"
                  aria-label="Search"
                />
                <input type='submit' className='flexb-30 border-none newsletter-submit bg-black text-white border-r5'/>
       </div>
       </div>
      </section>
      </>
  )
}

export default Newsletter;