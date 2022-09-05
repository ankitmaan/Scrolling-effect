import { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';


let setLimit = 5
let pageNumber = 0;
function App() {

  const [storingData, setstoringData] = useState([]);
  const [page, setpage] = useState(pageNumber);

  // Calling the api using axios
  function callingData() {
    axios.get(`https://dummyjson.com/products?skip=${pageNumber}&limit=${setLimit}`)
      .then(res => {
        const settingBackendData = res.data.products;
        setstoringData((storingData) => [...storingData, ...settingBackendData]);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Calling the next element for scrolling
  function nextCall() {
    pageNumber = pageNumber + 5;
    console.log(pageNumber);
    if (pageNumber <= 50) {
      console.log("calling new data");
      callingData();
    } else {
      console.log("No data calling");
    }
  }

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
    if (currentHeight + 1 >= scrollHeight) {
      nextCall();
    }
  };

  useEffect(() => {
    callingData();
    window.addEventListener("scroll", handleScroll);
  }, [])
  return (
    <div>
      {storingData != null && storingData != undefined && storingData.length != 0 ?
        <>
          {storingData.map((element) => {
            return <div key={element.id} className='main-div' onScroll={(e) => handleScroll(e)}>
              <img className='mobile-img' src={element.images[0]} alt="" title={element.title} />
              <p>{element.title}</p>
            </div>
          })}
        </> : <div className='fetching-data'>
          <img src="/loading.gif" alt="" />
          <h3>please wait data is loading....</h3>
        </div>
      }
    </div >
  );
}

export default App;
