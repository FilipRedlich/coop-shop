import img1 from '../../images/undraw_envelope_re_f5j4.svg';

const Newsletter = () => {
  return (
    <>
      <section className="d-flex flex-row flex-wrap w-100 gap-3 newsletter animate__animated animate__backInRight">
        <div className="d-flex flex-column justify-content-center newsletter-section gap-1 text-white flexb-30">
          <h3 className="newsletter-text">
            Want to get information about discounts and promotions first?
          </h3>
          <h5 className="newsletter-text">Sign in for our Newsletter!</h5>
          <form
            action="/subscribeToNewsletter/"
            method="POST"
            className="d-flex newsletter-input-wrapper flex-row mt-2"
          >
            <input
              className="form-control shadow-lg flexb-70 border-l5 newsletter-input"
              type="email"
              placeholder="Email address"
              aria-label="Search"
            />
            <input
              type="submit"
              className="flexb-30 border-none newsletter-submit text-white border-r5"
              value="Submit"
            />
          </form>
        </div>
      </section>
    </>
  );
}

export default Newsletter;