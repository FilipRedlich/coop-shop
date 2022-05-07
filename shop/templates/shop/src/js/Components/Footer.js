import logo from '../../images/shop_logo.svg';
const MainFooter = () => {
    return (
      <footer className="d-flex flex-row flex-wrap justify-content-center position-relative gap-3 py-5 bg-black footer w-100 text-white">
        <div className=" flexb-60 position-relative p-3">
          <div className="d-flex flex-row justify-content-center w-50 m-auto rounded gap-3 footer-emblem">
            <img src={logo} className="footer-logo" />
            <h2 className="my-auto footer-logo-text">PESTKA</h2>
          </div>
        </div>

        <div className="d-flex flex-row my-auto gap-5 flexb-30">
          <div className="">
            <h3 className="text-uppercase">links</h3>
            <h6>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/FilipRedlich/coop-shop"
              >
                Source code
              </a>
            </h6>
            <h6>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/BrtSkr"
              >
                BrtSkr
              </a>
            </h6>
            <h6>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/FilipRedlich"
              >
                FilipRedlich
              </a>
            </h6>
          </div>
          <div className="">
            <h3 className="text-uppercase">contact</h3>
            <h6>
              <a
                className="footer-anchor remove-all-decoration"
                href="mailto:arcadam111@gmail.com"
              >
                BrtSkr
              </a>
            </h6>
            <h6>
              <a
                className="footer-anchor remove-all-decoration"
                href="mailto:filipredlich.pr@gmail.com"
              >
                FilipRedlich
              </a>
            </h6>
            <h6></h6>
          </div>
          {/* <div className="social-bubble">
            <h3 className='text-uppercase'>Socials</h3>
            <i className="bi bi-facebook"></i>
          </div> */}
        </div>
      </footer>
    );
}

export default MainFooter;