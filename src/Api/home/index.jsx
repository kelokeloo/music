import http from '../common/http'

/**
 * 获取handpick数据
 */

export async function getHandpick(){
  try{
     const data = await http.get('/api/handpick')
     return data
  }
  catch(e){
    console.error(e);
    return e
  }
}



