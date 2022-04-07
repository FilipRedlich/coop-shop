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

const addFunc = () =>{
  let xx = document.querySelectorAll('.testtt')
  console.log(xx)
}
addFunc()