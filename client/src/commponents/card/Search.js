//rafce
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//redux


const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search } = useSelector((state)=>({...state}))
    const { text } = search
 
    const handleChange = (e) =>{
      //  console.log(e.target.value)
      dispatch({
      type:"SEARCH_QUERY",
      payload:{text:e.target.value},
    })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/shop?' + text)
    }


  return (
    <form onSubmit={handleSubmit}>
        <input
        onChange={handleChange}
        type="search"
        className='from-control'/>
     
    </form>
    
  )
}

export default Search
