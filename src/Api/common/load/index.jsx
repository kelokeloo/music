import http from "../http";

/**
 * 
 * @param {string} id 
 */
export async function getMusicById(id){
  try{
    const data = await http.get(`/api/music/${id}`)
    return data
  }
  catch(e){
    console.log(e);
    return e
  }
}