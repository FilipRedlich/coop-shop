import img1 from '../../images/undraw_dev_productivity_re_fylf.svg';
const OnSale = () => {
    return (
      <>
        <section className="sale">
          <h1 className="text-center text-white">On sale!</h1>
          <div className="d-flex flex-row flex-wrap m-auto justify-content-center w-100  gap-3 text-white">
            <div className="sale-item d-flex flex-column px-3 m-auto justify-content-between border rounded">
              <div className="">
                <img src={img1} className="img-fluid sale-img" />
              </div>
              <div className='pb-3'>
                  <h2 className=' text-danger pb-2'>Price tag</h2>
                  <h6 className='lead text-center'>Item name</h6>
              </div>
            </div>


          </div>
        </section>
      </>
    );
}

export default OnSale;