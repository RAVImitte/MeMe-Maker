 import React, { Component } from 'react';
 import ReactDOM from 'react-dom';
 import App from '../App';
 import { saveAs } from 'file-saver';


 class Display extends Component {

     makeQuery = (obj) =>{
         const params = Object.entries(obj).map(([key,value]) => `${key}=${value}`)
         return '?' + params.join('&');
        }
        querify=(obj) => {
             var s = "";
             for (var key in obj) {
                 if (s !== "") {
                     s += "&";
                 }
                 s += (key + "=" + encodeURIComponent(obj[key]));
             }
             return s;
         }
        render() { 


            
            const generate =async (item)=>{
              var lst=[],ind;
              lst = document.getElementsByTagName('input');
            //   txtboxes.push({text:lst[0].value});
            //   txtboxes.push({text:lst[1].value});
            //   console.log(txtboxes);
            var txtboxes=[];
            for(ind =0 ;ind<lst.length;ind++)
                txtboxes[ind] = lst[ind].value;

                console.log(lst);
              const formData = new FormData();
              formData.append('username', 'memeproj');
              formData.append('password', 'memeproj');
              formData.append('template_id', item.id);
              txtboxes.forEach((c,ind) => 
                formData.append(`boxes[${ind}][text]`,c));

              await fetch(
                `https://api.imgflip.com/caption_image`,{
                    method:'POST',
                    body: formData
                }).then(res => {
                    res.json().then(res=>{
                       document.getElementById('memed').setAttribute('src',res.data.url);
                       
                    })
                });
           }



     const goHome=()=>{
     
             const root = ReactDOM.createRoot(document.getElementById('root'));
             root.render(
               <React.StrictMode>
                 <App/>
               </React.StrictMode>
             );

             }
             let arr=[];
             for (var i =1;i<=this.props.item.box_count;i++){
                arr.push(i);
             }
             const ListItems = arr.map((num) => <li>
                <label for={num.toString()} >{`Enter the Text${num.toString()} `}</label>
                <input className='boxes'  type="text" key={num.toString()} id={num.toString()} placeholder=''></input>
             </li>
             )
         return (
        <body id="memePage">
            <div id="memeStyle">
                <div>
                    <img id='memed' alt="" src ={this.props.item.url}/>
                </div>
                <div>
                    <button onClick={goHome}>Home</button>
                    <ul id='txtboxes'>{ListItems}</ul>       
                </div>
            </div>
            <div>
                <button type="submit" onClick={()=>generate(this.props.item)} id="geneButton">Generate Meme</button>
                <button type="submit" onClick={()=>{
                    saveAs(document.getElementById('memed').getAttribute('src'),'meme.jpg');
                }} id="geneButton">Download Meme</button>
            </div>
        </body>
        );
    }
 }
  
 export default Display;