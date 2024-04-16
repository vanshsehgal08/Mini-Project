import React, { useState } from 'react'
import Editor from './Editor';
import axios from 'axios';
import { addPost } from '../server/blogs';
const QuillDeltaToHtmlConverter = require('quill-delta-to-html');

const Form = () => {
  const [title , setTitle] = useState("");
  const [cardImage, setCardImage] = useState("");
  const [qdata,setQbody] = useState([]);
  const quilToHTML =(quillData)=>{
    var cfg ={};
    for(let op in quillData.ops) {
      // If we have image op
      if(quillData.ops[op].insert.image) {
          // Set it as custom op and copy original data
          quillData.ops[op].insert.customImage = quillData.ops[op].insert.image;
          // Delete original image op
          delete quillData.ops[op].insert.image;
      }


  }
      var converter = new QuillDeltaToHtmlConverter(quillData.ops,cfg);
      converter.renderCustomWith(function(customOp,contextOp){
              
        if(customOp.insert.type === "customImage"){
          
          return (`<img alt= "${customOp.attributes.alt}" src="${customOp.insert.value}"    />`)
        }else{
          return "Unmanageble image"
        }
    })
    var html  = converter.convert();

    return html;


  }
  const uploadImage = async (img)=>{
    const imageFormData = new FormData();
    imageFormData.append("file",img);
    imageFormData.append("upload_preset","aarinpreset");
    imageFormData.append("cloud_name","dqxuucjcd");
    const cloudRes = await axios.post("https://api.cloudinary.com/v1_1/dqxuucjcd/image/upload",imageFormData);
    let url = await cloudRes.data.url;
    console.log(url)
    console.log(typeof(url))
    
    url = url.substring(0,url.indexOf('p')+1)+"s"+url.substring(url.indexOf('p')+1);
    console.log(url)
    return url ;
  } 

  function handleCardImage(data){
    
    setCardImage(data.target.files[0]);
    
    }
    const handleTitle = (e)=>{
    
      setTitle(e.target.value)
      //console.log(title)
  }
  async function handleSubmit(event){
    event.preventDefault();
    if(cardImage === undefined  ){
      console.log("No cover or card image found");
      alert("No card image found");
      //return redirect("/edit");
      }
      const body =  quilToHTML(qdata.body)
      console.log(body)
      console.log("uploading images");
      const cardURL  = await uploadImage(cardImage);
    
      const data = {title:title,
                    body:body,
                    cardimage:cardURL,
                    text:qdata.text  
                  }
      
      console.log(data)
      addPost(data)
      alert("Data uploaded")
  }


  return (
    <div>

      <form method='post' onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4">
          <label for="title" className="block  text-gray-700 font-medium mb-2">Title</label>
          <input type="text" onChange={handleTitle} id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
      <label for="cardImage" className="block text-gray-700 font-medium mb-2"   >Card Image</label>
      <input type="file"  id="cardImage" onChange={handleCardImage}  name="cardImage" />
      <Editor setQbody = {setQbody}/>

      <div className="flex justify-end">
          <button type="submit"   className="px-4 py-2 bg-[#28b457] text-black rounded-md hover:bg-[#] mr-2">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Form