import { useState } from "react"
import { NavLink } from "react-router"

const ProductListPage=()=>{
  const [productList]=useState({
    _id:"123",
    name:"Mac book pro",
    slug:"890"
  })
  return(<>
  <p className="bg-balck text-white">Product page for listing</p>
  <NavLink to={"/test/"+productList.slug}>{productList.name}</NavLink>
  </>)
}

export default ProductListPage