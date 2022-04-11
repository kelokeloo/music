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

/**
 * 登录
 */

export async function login({username, password}){
  try{
    const data = await http.post(`/api/login`, {username, password})
    return data
  }
  catch(e){
    console.log(e);
    return e
  }

}

/**
 * 获取最近收听的音乐
 */

export async function getRecentMusic(){
  return http.get('/api/recent')
  .then(data=>{
    return data
  })
}


/**
 * 音乐标记，标记最近播放的音乐
 */
export function musicMark(musicId){
  return http.get(`/api/musicMark/${musicId}`)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * 歌单标记，标记最近播放的歌单
 */
 export function albumMark(albumId){
  return http.get(`/api/albumMark/${albumId}`)
  .then(data=>{
    console.log(data);
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}


/**
 * search
 */


 export function searchByKey(type, keyWord){
  return http.get(`/api/search/${type}/${keyWord}`)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * 关注用户与取消关注
 * state 为false 表示不关注， true表示关注
 */
 export function setFocusUser(id, state){
  return http.post(`/api/focus`, {
    id,
    state
  })
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * 获取用户关注列表
 */

 export function getUserFocusList(userId){
  return http.get(`/api/focuslist`)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * publish 发布动态
 */
 export function publishMoment(moment){
  return http.post(`/api/moment/publish`, moment)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * 获取动态信息
 */
 export function getMoments(moment){
  return http.get(`/api/moments/`)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}

/**
 * 评论
 */


export function addComment(commentData){
  return http.post('/api/moment/comment', commentData)
  .then(data=>{
    return data
  })
  .catch(e=>{
    console.error(e)
  })
}










