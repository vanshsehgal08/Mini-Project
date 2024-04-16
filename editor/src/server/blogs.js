import axios from 'axios';
const URI = "http://localhost:3000"
export async function addPost(data){
    try{
        console.log("data---")
        console.log(data);
        const res = await axios.post(`${URI}/add`,data);
        console.log("OUt of axios"+data);
        return res.data;

    }catch(err){
        
        console.log("error from get addPost " + err)
        console.log(`${URI}/add`);
        return [];

    }
}