import React from 'react';
import {useState,useEffect} from 'react';
//import Pagination from './Pagination';
import logo from './logo.svg';
import images from './images.json';
import ImageContainer from './ImageContainer';
import './App.css';



function App() {
  
 

  return (
<>
{/* <Pagination />  */}
<div className='app'>
  <div className='container'>
    {images.map(res => {
      return (
        <div key = {res.id} className="wrapper">
          <ImageContainer 
          src={res.urls.regular}
          thumb={res.urls.thumb}
          height={res.height}
          width={res.width}
          alt={res.alt_description} />
        </div>
      )
    })}  </div>
</div>

</>
  );
}

export default App;
