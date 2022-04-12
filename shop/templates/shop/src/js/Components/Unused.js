const watchForMove = (el) => {
  const watchedElement = document.querySelector(".gallery");
  const observer = new IntersectionObserver(
    (e) => {
      console.log(e);
    },
    {
      rootMargin: "0px 0px 0px 0px",
      threshold: 1.0,
    }
  );
  //observer.observe(watchedElement)
};

const addFunc = () => {
  let xx = document.querySelectorAll(".testtt");
  console.log(xx);
};

const RenderSubCat = () => {
  return (
    <>
      <section className="subcats">
        <h1>TESTING</h1>
      </section>
    </>
  );
};
const RenderOnLoad = () => {
  renderTry(TEST_ARRAY);
  console.log("hehe");

  return <></>;
};
