import img1 from '../../images/undraw_dev_productivity_re_fylf.svg';
const OnSale = () => {
    return (
      <>
        <section className="sale p-2 pt-5">
          <div className="d-flex flex-row flex-wrap m-auto justify-content-center w-100  gap-3 text-white">
            <div className="sale-item d-flex bg-black flex-column px-3 m-auto justify-content-between border rounded">
              <div className="flexb-30">
                <img src={img1} className="img-fluid sale-img" />
              </div>
              <div className='pb-3 flexb-70 my-auto'>
                  <h2 className='text-danger pb-1'>Price tag</h2>
                  <h6 className='lead text-center '>Item name</h6>
              </div>
            </div>
            


          </div>
        </section>
      </>
    );
}

export default OnSale;