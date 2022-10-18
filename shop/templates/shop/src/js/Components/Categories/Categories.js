export const Categories = () =>{
    
  return(
    <>
     <section
        className={`position-fixed categories-section translate-z-0 w-100  ${
          isActive
            ? "hide-element"
            : " categories-section animate rounded categories-top text-white z-index-1 translate-middle-x bg-transparent-custom blur-bg "
        }`}
      >
        <div className="row categories-wrapper gap-3 p-2 w-100 mt-5 min-h-30">
          <div
            id="categories"
            className="text-left categories col-3 no-gutters gap-1"
            //Inside this element buttons are rendered
          ></div>

          <div
            id="rootSubcategories"
            className="bg-dark col-md rootSubcategories mx-auto justify-content-center d-flex flex-row flex-wrap gap-3 p-2 "
          ></div>
        </div>
      </section>
    </>
  )
}