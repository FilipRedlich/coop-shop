import React from "react"
import renderTry, { imgArr, TEST_ARRAY } from "./Test"
import { removeSubCat } from "./ProductsNav";
import { addEvent } from "./ProductsNav";
const RenderSubCat = () =>{
    return(
        <>
        <section className="subcats">
         <h1>TESTING</h1>
        </section>
        </>
    )
}

const RenderProducts = () => {
    return (
        <>
            <section className="products-section bg-black w-100 d-flex flex-wrap flex-row">
            
            </section>
        </>
    )
}
const RenderOnLoad = () =>{
        removeSubCat()
        renderTry(SUBCATS_NAME[1], imgArr)
        addEvent(document.querySelectorAll(".testing"))
        console.log('RenderOnLoad in RenderScripts')
        return(
            <>
            </>
        )
}
export {
    RenderOnLoad,
    RenderProducts
}
export default RenderSubCat;