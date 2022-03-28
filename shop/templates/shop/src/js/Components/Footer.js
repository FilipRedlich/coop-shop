const MainFooter = () => {
    return (
      
        <footer className="d-flex flex-row flex-wrap justify-content-center gap-3 py-5 bg-transparent-custom w-100 text-white">
          <div className="flexb-60 position-relative">
            <h1 className="display-3 footer-logo text-center mt-5 w-50 mx-auto">Pestka</h1>
          </div>
          <div className="d-flex flex-row gap-5 flexb-30">
            <div className="">
              <h3 className="text-uppercase">links</h3>
              <h6><a className="text-muted remove-all-decoration" href="https://github.com/FilipRedlich/coop-shop">Source code</a></h6>
              <h6><a className="text-muted remove-all-decoration" href="https://github.com/BrtSkr">BrtSkr</a></h6>
              <h6><a className="text-muted remove-all-decoration" href="https://github.com/FilipRedlich">FilipRedlich</a></h6>
            
            </div>
            <div className="">
              <h3 className="text-uppercase">contact</h3>
              <h6><a className="text-muted remove-all-decoration" href="mailto:arcadam111@gmail.com">BrtSkr</a></h6>
              <h6><a className="text-muted remove-all-decoration" href="mailto:placeholder">FilipRedlich</a></h6>
              <h6></h6>
            </div>
          </div>

        </footer>
      
    );
}

export default MainFooter;