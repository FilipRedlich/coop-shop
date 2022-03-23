import img1 from '../../images/undraw_dev_productivity_re_fylf.svg';
const OnSale = () => {
    return (
        <>
            <section className="sale">
                <h1 className="text-center text-white">On sale!</h1>
                <div className="d-flex flex-row flex-wrap w-100 text-center text-white">
                   
                    <div className="d-flex flex-column w-25 m-auto justify-content-center border rounded">
                        <div className=''>
                            <img src={img1} className='img-fluid sale-img' />
                        </div>
                        <h6>Item name</h6>
                    </div>
                    
                    <div className="d-flex flex-column w-25 m-auto justify-content-center border rounded">
                        <div className=''>
                            <img src={img1} className='img-fluid sale-img' />
                        </div>
                        <h6>Item name</h6>

                    </div>
                </div>
            </section>
        </>
    )
}

export default OnSale;