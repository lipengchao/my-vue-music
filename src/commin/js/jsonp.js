import  originJSONP from  'jsonp'//安装jsonp

//封装jsonp
/*
url  路径
data 数据
opiton 可以选项

resolve:成功
reject 失败
res  成功
data 后端返回的数据
* */
export default function jsonp(url,data,option) {
  //进行拼接  url里面是否有问好，如果没有的话就加上问号，否则为& 在调用params函数传过数据data
  url+=(url.indexOf("?")<0?'?':'&')+param(data)
  return new Promise((resolve ,reject)=>{
    originJSONP(url,option,(res,data)=>{
      if(!res){
        resolve(data)
      }else {
        reject(res)
      }
    })
  })
}


function param(data) {
  let url = ''//空字符串
  //遍历数组
  for (let i in data){
    //判断data不等于undefined的时候data[i】，否则为空
    let value = data[i] !== undefined?data[i]:''
    //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    //空字符串拼接编码
    url+= `&${i}=${encodeURIComponent(value)}`
  }
  //URIstring	必需。一个字符串，含有 URI 组件或其他要编码的文本。‘
  //如果url有data的话就去掉，否则为空
  return url ? url.substring(1) :''
}
