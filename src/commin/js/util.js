//工具  洗盘函数
function getRandomInt(min,max){
    //返回一个向下取整,获取(随机数，*最大值-最小值+1 )+最小值
    return Math.floor(Math.random() * (max-min + 1) + min )
}

export function shuffle(arr){
    let _arr = arr.slice()
    for(let i = 0 ; i<_arr.length;i++){
        let j = getRandomInt(0,i)//获取随机值
        //进行排序
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return  _arr
}