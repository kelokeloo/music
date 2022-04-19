import { Header } from  '../../../components/common/header'
import classes from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { CloseCircleOutlined, PlusSquareOutlined, PlusOutlined  } from '@ant-design/icons'
import http from '../../../Api/common/http'
import { baseUrl } from '../../../global.conf'
import { Button, message } from 'antd'
import { setHeadIcon } from '../../../Api/common/load'
export function SetHeadIcon(){
  const fileInputRef = useRef(null)
  const [uploadImageList, setUploadImageList] = useState({
    list: []
  })
  const uploadAddress = '/api/upload'
  function handleInputChange(e){
    const file =  fileInputRef.current.value
    const formData = new FormData()
    
    const files = fileInputRef.current.files
    for(let i =0; i < files.length; i++){
      formData.append('photos', files[i])
    }

    http.post(uploadAddress, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(data=>{
      console.log('data', data);
      let imgList = data.imgList
      imgList = imgList.map(item=>{
        return baseUrl + '/images/moment/' + item
      })
      let list = uploadImageList.list
      list = [...list, ...imgList]
      console.log(list);
      setUploadImageList({
        list: list
      })
    })
  }
  const navigateTo = useNavigate()
  /**
   * 提交修改
   */
  function submit(){
    if(uploadImageList.list.length > 0){
      let url = uploadImageList.list[0]
      url = url.substring(baseUrl.length)
      // console.log(url);
      setHeadIcon(url)
      .then(result=>{
        // 更改本地数据
        console.log(result);
        window.sessionStorage.setItem('headIcon', baseUrl+url)
        navigateTo(-1)
      })
    }
    else {
      message.error('请选择图片')
    }
    // setHeadIcon()
  }

  return (
    <div>
      <Header></Header>
      <main>
      <div className={classes.photos}>
        {
          uploadImageList.list.map((item,index)=>{
            return <img key={index} src={item}/>
          })
        }
        {
          <a>
            <PlusOutlined className={classes.iconStyle}></PlusOutlined>
            <input type="file" multiple name='photos' ref={fileInputRef} onChange={handleInputChange}/>
          </a>
        }
      </div>
      <Button type='primary' onClick={submit}>修改图像</Button>
      </main>
    </div>
  )
}