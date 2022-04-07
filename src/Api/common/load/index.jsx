import http from "../http";

/**
 * 获取音乐的详情信息
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

/**
 * 获取歌单的详情信息
 * @param {string} id 
 */
export async function getAlbumById(id){
  try{
    const data = await http.get(`/api/album/${id}`)
    return data
  }
  catch(e){
    console.log(e);
    return e
  }
}