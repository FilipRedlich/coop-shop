import logo from '../../../images/shop_logo.svg';
const MainFooter = () => {
    return (
      <footer className="footer">
        <div className="footer--logo-container">
          <div className="footer---logo--container-block rounded footer-emblem">
            <img src={logo} className="footer-logo" alt='pycoop logo' />
            <h2 className="my-auto footer-logo-text">PESTKA</h2>
          </div>
        </div>

        <div className="footer--logo-container-links">
          <div className="">
            <h3 className="">links</h3>
            <p>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/FilipRedlich/coop-shop"
              >
                Source code
              </a>
            </p>
            <p>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/BrtSkr"
              >
                BrtSkr
              </a>
            </p>
            <p>
              <a
                className="footer-anchor remove-all-decoration"
                href="https://github.com/FilipRedlich"
              >
                FilipRedlich
              </a>
            </p>
          </div>
          <div className="">
            <h3 className="text-uppercase">contact</h3>
            <p>
              <a
                className="footer-anchor remove-all-decoration"
                href="mailto:brtskr1503@gmail.com"
              >
                BrtSkr
              </a>
            </p>
            <p>
              <a
                className="footer-anchor remove-all-decoration"
                href="mailto:filipredlich.pr@gmail.com"
              >
                FilipRedlich
              </a>
            </p>
            <p></p>
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