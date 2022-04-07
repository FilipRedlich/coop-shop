import React, {useEffect} from "react"
import renderTry, {TEST_ARRAY} from "./Test"
const RenderSubCat = () =>{
    return(
        <>
        <section className="subcats">
         <h1>TESTING</h1>
        </section>
        </>
    )
}
const RenderOnLoad = () =>{
   
        renderTry(TEST_ARRAY)
        console.log('hehe')
      
    return(
        <>
        </>
    )
}
export {
    RenderOnLoad
}
export default RenderSubCat;