import React, { useCallback, useEffect, useState } from 'react'
import "../App.css"
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import axios from 'axios'
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import imageCompressor from 'quill-image-compress'
import  ImageResize  from 'quill-image-resize';
import ImageUploader from "quill-image-uploader";
const Editor = ({setQbody}) => {
    const [quil,setQuil] = useState();
    const TOOLBAR_OPTIONS = [
        [{ header: [ 1, 2, 3, 4, 5,6] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block","link"],
        ["clean"],
      ]
      Quill.register('modules/imageCompress', imageCompressor);
      Quill.register('modules/imageResize', ImageResize);
      Quill.register("modules/imageUploader", ImageUploader);

    const wrapperRef = useCallback((wrapper)=>{
        if(wrapper == null) return ""
        wrapper.innerHTML ="";
        const edit = document.createElement("div");
        wrapper.append(edit)
       
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
       const q= new Quill(edit, {theme:"snow",
                              modules:{
                                      toolbar:TOOLBAR_OPTIONS,
                                      imageCompress: {
                                        quality: 0.7, // default
                                        maxWidth: 1000, // default
                                        maxHeight: 1000, // default
                                        imageType: 'image/jpeg', // default
                                        debug: true, // default
                                        suppressErrorLogging: false, // default
                                        insertIntoEditor: undefined, // default
                                      },
                                      imageResize: {
                                        // See optional "config" below
                                    },
                                    imageUploader: {
                                      upload: (file) => {
                                        return new Promise(  (resolve, reject) => {
                                          uploadImage(file)
                                          .then((result) => {
                                            console.log(result);
                                            resolve(result);
                                          })
                                          .catch((error) => {
                                            reject("Upload failed");
                                            console.error("Error:", error);
                                          });;
                                        });
                                      },
                                    },                                 
                                    
                            
                                    }})
     
     //  q.enable(false)
       q.setText('Write Something...');
        setQuil(q);
    },[])
    useEffect(()=>{
        if (quil == null) return
        const handler = (delta,oldDelta,source)=>{
            if(source !== 'user') return
            console.log(quil.getContents());
            setQbody({body:quil.getContents(),text:quil.getText(0,100)});

         
            
          }
        quil.on('text-change',handler )
        return ()=>{
            quil.off('text-change',handler);
          }
    },[quil])

  return (
    <div className=' pageblog container  ' ref={wrapperRef} >Editor</div>
  )
}

export default Editor