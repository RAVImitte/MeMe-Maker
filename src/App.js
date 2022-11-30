import './index.css';
import React, {useState } from 'react';
import ReactDOM from 'react-dom';
import Display from './Components/Display';

  function App(){  

    const [items,setItems] = useState([]); 
    


  const memepage=(item)=>{
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Display item={item}/>
      </React.StrictMode>
    );
    }

    const search = () => {

        const BASE_URL = 'https://api.imgflip.com/get_memes'; 


        fetch(`${BASE_URL}`,{method:'GET'})
        .then(response => response.json())
        .then(json => {
          setItems(json.data.memes);
        });
        document.getElementById('searchbtn').setAttribute('hidden',true);

        }
        // console.log(items);
        return (
            <div className="pageBody">
                  <div className="Title">
                    <h2 id="main-title"> MeMe Maker</h2> 
                    <button id = "searchbtn" type="submit" onClick={search}>Click ME!</button> 
                  </div>

                    <ul id="imgs">
                      {
                        items.map(item =>
                            <li>
                              <h3 id="head">{item.name}</h3>
                              
                              <img src={item.url} onClick ={ () => {memepage(item)}} alt="ha bokka le"></img>                    
                            </li>
                              )
                      }
                    </ul>
          </div>
      );
  }


export default App;
