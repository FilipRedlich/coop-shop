import React, {useEffect} from "react"
import renderTry, { TEST_ARRAY } from "./Test"
import { removeSubCat } from "./ProductsNav"
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
        removeSubCat()
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