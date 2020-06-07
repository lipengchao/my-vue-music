/*dom操作的代码*/
//是否含有classn
export function hasClass(el, className) {
  //正则是否含有
  let reg = new RegExp('(^|\\s)'+ className + '(\\s|$)')
  //检验一个字符串是否符合某一个正则规范
  return reg.test(el.className)
}
export function addClass(el, className) {
  //判断hasclass的是否还有class书信吧
  if (hasClass(el, className)) {
    return
  }
  //如果没有，我们就进行拆分
  let newClass = el.className.split(' ')
  //进行接收
  newClass.push(className)
  //进行拼接
  el.className = newClass.join(' ')
}
//获取数据下标
export function getData(el,name,val){
  let prefix = 'data-'
  //将定义好的下标与定义的字符串拼接
  name = prefix+name
  //判断val的值是否存在，存在就进入set 否则就get
  if(val){
    return el.setAttribute(name,val)//setAttribute()方法接受两个参数：要设置的特性名和值。如果特性已存在，将替换原有的值;
  }else{
    return el.getAttribute(name)//getAttribute()方法返回指定属性名的属性值 接受一个参数。
  }
}

//解决浏览器的兼容
let elementStyle = document.createElement("div").style//创建div

let vendoe =(()=>{
  //各大浏览器兼容问题
  let transformNames={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  }
  //遍历各大浏览器的
  for(let key in transformNames){
    //遍历的div的浏览器不等于undefined是时候返回key值
    if(elementStyle[transformNames[key]]!==undefined) return key
  }
  return false
})()

//解决兼容问题
export function  prefixStyle(style){
  if(vendoe===false) return false  //当vendoe 为false的时候就 返回false
  if(vendoe==='standard') return style // 当vendoe等于standard时候就返回style
  return vendoe +style.charAt(0).toUpperCase()+style.substr(1)//vendoe+加上第一个字符大写+剩余字符
}