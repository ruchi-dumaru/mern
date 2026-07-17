import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";


const TestPage=()=>{

  const params=useParams();
  const [query,setQuery]=useSearchParams();
  console.log(params)

  useEffect(()=>{
 setTimeout(()=>{
 setQuery({
  search:"dumaru"
 })
 },5000)
  },[query])
  return (<>
 <p> Slug:{params.slug};</p>
 <p> Query={query.get('search')}</p>
 <button onClick={()=>{
  setQuery({
    search:"ruchi self made millionaire"
  })
 }}>clcik to change the query</button>
  </>)
}

export default TestPage