# 音乐项目

## 一、功能需求

​	1、推荐页面	

​	2、歌手页面	

​	3、歌手详情页面

​	4、播放器页面	

​	5、歌单页面

​	6、排行页面

​	7、榜单页面

​	8、搜索页面	

​	9、歌曲列表页

​	10、用户中心



## 二、技术需求

​	1、基础组件库

​	2、状态管理  vuex

​	3、路由  vue-router	

​	4、服务器的通讯 axios jsnoop

​	5、第三方插件

​	工具支持

​		脚手架工具 vue-cli

​		自动化构建工具 webpack

​		代码检查工具 esEnt

​	MVVM框架  vue.js（2x）

## 三、搭建项目目录

str

​	api 接口

​	common 公有组件

 		js   

 		style

​			index.styl 入口文件

​			base.styl  样式

​			icon.styl  图标

​			index0.styl 入口文件

​			variable.styl变量和颜色

​			mixin.styl 方法文件

​			resset.css 	重置文件		

​		 img

​	component：组件

​		base : 业务部分\

​				listview 列表哦

​				loading loading事件

​				scroll : 滚动条

​				slider  ： 轮播图

​		common 公有组件

​			m-hander.vue 头部

​			music-list .vue 详情页面

​			no-result.vue	背景组件

​			list-inner.vue   我喜欢的和最近听过的

​			play.vue 播放器

​			play-list.vue 歌曲菜单

​			player.vue  小的播放器

​			progress-circle.vue 套用小的播放器

​			tab.vue 路由跳转

​			user-center  我的个人中心

​		pages:页面组件

​			rank.vue  排行

​			Recommend.vue 推荐

​			seach.vue   搜索页面

​			Singer.vue  歌手详情页

​		router vue-rounter路由

​		store  vuex管理

​			module   模块化

​				 	state : 存放数据状状态

​					getter.js :计算属性

​					mutation-types.js : 存放常量、

​					mutation.js 事件回调函数

​					actions.js  解决异步操作

​			index.js





## 四、移动端适配

在入口文件 index.html

```js
<script>
	document.documentElement.style.fontSize=document.documentElement.clientWidth/10+'px'
</script>
```

## 五、更改配置文件

1、在webpack.base.conf.js

```js
alias: {
  'vue$': 'vue/dist/vue.esm.js',
  '@': resolve('src'),
  "style":resolve('src/common/style'),//起别名  方便引入文件
  "pages":resolve('src/components/pages'),
  'common':resolve("src/components/common")
}
```

## 六、项目代码

#### 单入口文件 app.vue

```vue

```

#### 单入口文件 main.js

```js

```

#### vue部分

##### 公共部分

```vue

```

##### 页面部分

```vue

```

#### css部分

1、整体index.less  入口文件

```css

```

2。创建variable。less  变量文件

```css

```

3.创建mixin.less 方法文件

```css

```

#### 路由部分

```js

```

#### js部分

```js

```

#### api接口

```js

```

#### store 全局状态管理

```

```



#### axios请求/jsonp请求

jsonp封装

```js
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
```







## 十、引用插件

### 1、stylus预处理语言

变量：$声明变量

嵌套：等同于sass

mixin 封装函数的方式封装样式 一个公式可以引用多个

计算   可以做数字变量的计算



## 十一、jsonp

1、安装

```js
 npm install jsonp
```

2、使用

```js
jsonp(url, opts, fn)
```

- `url`（`String`）提取网址
- opts（object），可选
  - `param`（`String`）用于指定回调的查询字符串参数的名称（默认为`callback`）
  - `timeout`（`Number`）发出超时错误后的时间。`0`禁用（默认为`60000`）
  - `prefix`（`String`）处理jsonp响应的全局回调函数的前缀（默认为`__jp`）
  - `name`（`String`）处理jsonp响应的全局回调函数的名称（默认为`prefix`+递增计数器）
- `fn` 打回来

使用`err, data`参数调用回调。

如果超时，`err`将是一个`Error`对象，它`message`是 `Timeout`。

返回一个函数，该函数在被调用时将取消正在进行的jsonp请求（`fn`不会被调用）。

1、封装jsonp

```js
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
```

2、调用jsonp

```js
export function getSingerDetail(singerId){
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  let data =Object.assign({},commonParams,{
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId//传入id
  })
  return jsonp(url, data, options)
}
```

3、引入插件内容

```js
/*参数*/
export const commonParams={
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
}

export const options={
  param:'jsonpCallback'
}

export const ERR_OK=0
```

## 十二 、 create-keyframe-animation 动画

1、安装

```js
npm install create-keyframe-animation
```

2、引入

```js
import animations from 'create-keyframe-animation'
```

3、使用
```js
//操作dom  实现动画效果
    enter(el, done) {
      let { x, y, scale } = this._getPosAndScale(); //获取参数值
      // 设置动画帧数
      let animation = {
        0: {
          tarbsform: `trabslate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          tarbsform: `trabslate3d(0,0,0) scale(1.1)`
        },
        100: {
          tarbsform: `trabslate3d(0,0,0) scale(1)`
        }
      };
      //注册动画
      animations.registerAnimation({
        name: "move",
        animation, //插入自定义动画
        //参数配置
        presets: {
          durantion: 400, //持续时间
          easing: "linear" //过度效果
          // delay:500,//延迟时间
          // terations:1,//实现动画的次数
          //   delay:0,//延迟
          //   direction:'normal',//方向
          //   resetWhenDone:false,//if true 将最后动画状态应用为 ‘变换’属性
          //     clearTransformsBeforeStart:false//是否在动画开始之前清楚现有的转换
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    //回调函数
    afterEnter() {
      animations.unregisterAnimation(); //取消动画
      this.$refs.cdWrapper.style.animation = ""; //清空处理
    },
    //结束
    leave(el, done) {
      this.$refs.cdWrapper.style.transform = "all 0.4s"; //设置动画的秒数
      let { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transition", done); //监听事件
    },
    //结束回调函数
    leaveEnter() {
      this.$refs.cdWrapper.style.transition = ""; //清空处理
    },
    _getPosAndScale() {
      let targetWidth = 40; //定义宽度
      let paddingLeft = 40; //左边的距离
      let paddingTop = 80; //上面的距离
      let paddingBottom = 30; //下边的距离
      let width = window.innerWidth * 0.8; //屏幕的宽度*0.8  获取总宽度
      let scale = targetWidth / width; //获取初始的缩放比例
      let x = -(window.innerWidth / 2 - paddingLeft); // 获取x坐标值
      let y = window.innerHeight - paddingTop - width / 2 - paddingTop; //获取y轴的坐标值
      return {
        x,
        y,
        scale
      };
    },
```

## 十三、技术点

### Object.assign(target, ...sources)

target:目标对象
sources：源对象。

`Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的`[[Get]]`和目标对象的`[[Set]]`，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用[`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)和[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 。

### findIndex 

#### 定义和用法

findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。

findIndex() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 *true* 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 -1

**注意:** findIndex() 对于空数组，函数是不会执行的。

**注意:** findIndex() 并没有改变数组的原始值。

### substr() 方法

#### 定义和用法

substr() 方法可在字符串中抽取从 *start* 下标开始的指定数目的字符。

#### 语法

```
stringObject.substr(start,length)
```

| 参数     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *start*  | 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。 |
| *length* | 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 *stringObject* 的开始位置到结尾的字串。 |

#### 返回值

一个新的字符串，包含从 *stringObject* 的 *start*（包括 start 所指的字符） 处开始的 *length* 个字符。如果没有指定 *length*，那么返回的字符串包含从 *start* 到 *stringObject* 的结尾的字符。



1.getAttribute()方法返回指定属性名的属性值 接受一个参数。

setAttribute()方法接受两个参数：要设置的特性名和值。如果特性已存在，将替换原有的值;



### better-scroll使用

#### 1、安装

```js
npm install better-scroll --save
```

#### 2、基本使用

```js
import BScroll from 'better-scroll'

 this.mySCroll = new BScroll(this.$refs.slider,{
          配置项
        })
```

#### 3、配置项  (轮播图)

scrollX

- 类型：Boolean
- 默认值: false
- 作用：当设置为 true 的时候，可以开启横向滚动。
- 备注：当设置 [eventPassthrough](http://ustbhuangyi.github.io/better-scroll/doc/options.html#eventpassthrough) 为 'horizontal' 的时候，该配置无效。



scrollY

- 类型：Boolean
- 默认值：true
- 作用：当设置为 true 的时候，可以开启纵向滚动。
- 备注：当设置 [eventPassthrough](http://ustbhuangyi.github.io/better-scroll/doc/options.html#eventpassthrough) 为 'vertical' 的时候，该配置无效。



momentum

- 类型：Boolean
- 默认值：true
- 作用：当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画。



snap
类型：Boolean | Object
默认值：false
作用：这个配置是为了做 Slide 组件用的，默认为 false，如果开启则需要配置一个 Object，例如：

```js
snap: {
 loop: false,
 threshold: 0.1,
 stepX: 100,
 stepY: 100,
 easing: {
   style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   fn: function(t) {
     return t * (2 - t)
   }
 }
}
```

注意：loop 为 true 是为了支持循环轮播，但只有一个元素的时候，loop 为 true 是无效的，也并不会 clone 节点。threshold 表示可滚动到下一个的阈值，easing 表示滚动的缓动函数。

备注：这是一个高级的配置，一般场景不需要配置，具体应用场景可见 Slide Demo 。想了解更多的细节可以去看 example 中的 slide 组件的代码。

- 类型：Boolean | Object
- 默认值：false
- 作用：这个配置是为了做 slide 组件用的，默认为 false，如果开启则需要配置一个 Object，例如：`* snap: {loop: false,threshold: 0.1,stepX: 100,stepY: 100}`。
- 备注：这是一个高级的配置，一般场景不需要配置，具体应用场景可见 [Slide Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/slide) 。想了解更多的细节可以去看 example 中的 [slide](https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue) 组件的代码。



click

- 类型：Boolean
- 默认值：false
- 作用：better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 `_constructed`，值为 true。

probeType

- 类型：Number
- 默认值：0
- 可选值：1、2、3
- 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发[scroll 事件](http://ustbhuangyi.github.io/better-scroll/doc/events.html#scroll)；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。

### 4、事件

#### scrollEnd

- 参数：{Object} {x, y} 滚动结束的位置坐标
- 触发时机：滚动结束。

#### goToPage(x, y, time, easing)

- 参数
  - {Number} x 横轴的页数
  - {Number} y 纵轴的页数
  - {Number} time 动画执行的时间
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。



### 5、方法

#### on(type, fn, context)

- 参数：

  - {String} type 事件名
  - {Function} fn 回调函数
  - {context} 函数执行的上下文环境，默认是 this

- 返回值：无

- 作用：监听当前实例上的[自定义事件](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html)。如：scroll, scrollEnd, pullingUp, pullingDown等。

- 示例：

  ```javascript
  import BScroll from 'better-scroll'
  let scroll = new BScroll('.wrapper')
  function onScroll(pos) {
    console.log(`Now position is x: ${pos.x}, y: ${pos.y}`)
  }
  scroll.on('scroll', onScroll)
  ```

#### getCurrentPage()

- 参数：无

- 返回值：{Object} `{ x: posX, y: posY,pageX: x, pageY: y}` 其中，x 和 y 表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。

- 作用：获取当前页面的信息。

  


#### goToPage(x, y, time, easing)

- 参数
  - {Number} x 横轴的页数
  - {Number} y 纵轴的页数
  - {Number} time 动画执行的时间
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。



### enable()

- 参数：无
- 返回值：无
- 作用：启用 better-scroll, 默认 开启。



### disable()

- 参数：无
- 返回值：无
- 作用：禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。



### refresh()

- 参数：无

- 返回值：无

- 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。

  

### scrollTo(x, y, time, easing)

- 参数：
  - {Number} x 横轴坐标（单位 px）
  - {Number} y 纵轴坐标（单位 px）
  - {Number} time 滚动动画执行的时长（单位 ms）
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：滚动到指定的位置，见 [Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/vertical-scroll/zh) 。



### scrollToElement(el, time, offsetX, offsetY, easing)

- 参数：
  - {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
  - {Number} time 滚动动画执行的时长（单位 ms）
  - {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  - {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：滚动到指定的目标元素。



## 十四、封装

### 轮播图

引用

```js
<template>
  <div class="recommend">
    <!--判断list数组中的长度-->
    <div class="banner" v-if="list.length">
      <Slider>
        <div v-for="(item,index) in list" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </Slider>
    </div>
   
  </div>
</template>
<script>
  import Slider from 'common/base/slider/slider'
  import {getRecommend} from 'api/Recommend'
  import {ERR_OK} from 'api/config'
  export default {
    data(){
      return{
        list:[]
      }
    },
    created(){
      this.getBanner()
    },
    methods:{
      getBanner(){
        getRecommend().then(res=>{
          // console.log(res)
          if (res.code===ERR_OK){
            this.list=res.data.slider
            console.log(this.list)
          }
        })
      }
    },
    components:{
      Slider
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~style/style/index0.styl';
  .recommend
    width:w(375)
      height: h(245)
    .banner
      position relative
      width 100%
      overflow hidden
   
</style>
```



```js
//slider
<template>
  <!--封装轮播图-->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex===index }"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from "../../../commin/js/dom";

 export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      //是否可以轮播
      loop: {
        type: Boolean,
        default: true
      },
      //自动轮播
      autoplay: {
        type: Boolean,
        default: true
      },
      //轮播的间隔
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
     setTimeout(()=>{
       this._setSliderWidth()//设置滑块宽度
       this._initDots()//初始化dot
       this._initSlilder()//初始化文件
       //判断autoplay是否为true，如果为true调用该方法
       if (this.autoplay){
         this._play()
       }
     },20)
      window.addEventListener('resize',()=>{
        //判断this.slider是否为false,我们就return出去
        if (!this.slider) return
        //执行滑块的宽度
        this._setSliderWidth(true)
        //重新计算
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        //获取sliderGroup的所有子元素
        this.children = this.$refs.sliderGroup.children
        //设置宽度为0
        let width = 0
        //获取slider总的宽度
        let slideWidth = this.$refs.slider.clientWidth
        //循环所有的子元素
        for (let i = 0; i < this.children.length; i++) {
          //获取每一个子元素
          let child = this.children[i]
          addClass(child, 'slider-item')
          //获取去总元素的宽度
          child.style.width = slideWidth + 'px'
          //累加 宽度+总的宽度
          width += slideWidth
        }
        //判断loop为真时候或isResize为假的时候，就进行增加
        if (this.loop && !isResize) {
          //总的宽度*2
          width += 2 * slideWidth
        }
        //给sliderGroup设置样式宽度 获取宽度
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlilder() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,//横向坐标
          scrollY: false,//纵向坐标
          momentum: false,//滚动的动画
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },//1.0+版本是在snap里面配置的loop和threshold和speed
        })
        this.slider.on("scrollEnd", () => {
          //当前第几个子元素
          let pageIndex = this.slider.getCurrentPage().pageX
          //判断loop是否为true，如果为true就进行下标-1
          if (this.loop) pageIndex  -= 1
          //将获取下标
          this.currentPageIndex=pageIndex
          //判断是否自动轮播
          if (this.autoplay) {
            //停止定时器
            clearTimeout(this.timer)
            //启动自动轮播
            this._play()
          }
        })
      },
      _initDots() {
        //接收数组 chidren的所有子元素的长度
        this.dots = new Array(this.children.length)
      },
      _play(){
        //将下标进行加1
        let index= this.currentPageIndex+1
        //判断loop是否为true，如果为true就进入index+=1
        if(this.loop){
          index+=1
        }
        // 启动定时器
        this.timer=setTimeout(()=>{
          this.slider.goToPage(index,0,400)
        },this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/style/index0.styl';

  .slider
    min-height: w(1)
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: w(0)
      left: w(0)
      bottom: w(12)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 w(4)
        width: w(8)
        height: w(8)
        border-radius: 50%
        background: $color_tab
        &.active
          width: w(20)
          border-radius: w(5)
          background: $bg_active
</style>
```

3、设置dom

```js
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
```



### 滚动条

### load组件
```JS
<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/style/index0.styl"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
```



## 十五、接口代理

### 1、安装express的中间件

```js
npm i body-parser -D   
```

### 2、webpack.dev.conf.js引入和axios中进行请求 接口代理

​	这里我们代理了一个 post 请求，我们本地实现了 `/api/getPurlUrl` 这个 post 接口，并且接受的是 json 格式的数据，然后转发给 QQ 官网接口的时候，我们添加了 headers，伪造了 `referer` 和 `origin`，并且把 `Content-Type` 设置为 `application/x-www-form-urlencoded`，目的就是为了满足 QQ 官网接口的请求格式。

```js
const bodyParser = require("body-parser")//接口代理
const axios = require("axios")
```

### 3、在webpack.dev.conf.js中在devServer中引用

```js
before(app) {
    app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.post(url, req.body, {
            headers: {
                referer: 'https://y.qq.com/',
                origin: 'https://y.qq.com',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
```

### 4、在api中进行引用

```js
import { commonParams, ERR_OK } from './config';
import { getUid } from './../commin/js/uid'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getSongsUrl (songs) {
  const url = debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request () {
      return axios.post(url, {
        comm: data,
        req_0: urlMid
      }).then((response) => {
        const res = response
        if (res.code === ERR_OK) {
          let urlMid = res.req_0
          if (urlMid && urlMid.code === ERR_OK) {
            const purlMap = {}
            urlMid.data.midurlinfo.forEach((item) => {
              if (item.purl) {
                purlMap[item.songmid] = item.purl
              }
            })
            if (Object.keys(purlMap).length > 0) {
              resolve(purlMap)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      })
    }

    function retry () {
      if (--tryTime >= 0) {
        request()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }

    request()
  })
}

function genUrlMid (mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
```

### 5、创建song.js中的数据

```js
import { getSongsUrl } from 'api/songs'
import { ERR_OK } from 'api/config'


//处理数据
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.url = url
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,//获取id
    mid: musicData.songmid,//获取mid
    singer: filterSinger(musicData.singer),
    name: musicData.songname,//获取名称
    album: musicData.albumname,
    duration: musicData.interval,//执行的描述
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url
  })
}
function filterSinger(singer) {
  let ret = []//定义空数组
  if (!singer) {//判断singer是否为真，如果真的就返回空字符串
    return ''
  }
  //遍历singer，进行接收
  singer.forEach(item => {
    ret.push(item.name)
  })
  return ret.join("/")//将接收的转换成/字符串
}

export function isValidMusic(musicData) {
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}
//对歌曲列表进行处理
export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((purlMap) => {
    songs = songs.filter((song) => {
      const purl = purlMap[song.mid]
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
        return true
      }
      return false
    })
    return songs
  })
} 
```

### 5、定义一个uid.js

```js
let _uid = ''
export function getUid(){
    if(_uid) return _uid
    if(!_uid){
        let t = (new Date).getUTCMilliseconds()
        _uid= ''+Math.round(2147483647 * Math.random()) * t % 1e10
    }
    return _uid
} 
```

### 6、获取到歌手的歌曲列表

```js
<template>
  <transition name="slide">
    <music-list :song="list" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer.js";
import { ERR_OK } from "./../../../api/config";
import { createSong, isValidMusic, processSongsUrl } from "style/js/song.js";
import musicList from "common/common/music-list/music-list";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.img;
    },
    ...mapGetters(["singer"])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) return this.$router.push("/music-list");
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          //将进程进行接收
          processSongsUrl(this._normalizeSongs(res.data.list)).then(songs => {
            this.list = songs;
          });
        }
      });
    },
    _normalizeSongs(list) {
      // console.log(list)
      let ret = []; //定义空数组
      list.forEach(item => {
        let { musicData } = item;
        //判断songid或alummid存在的话就进行接收
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  created() {
    this._getSingerDetail();
  },
  components: {
    musicList
  }
};
</script>
<style lang="stylus" scoped>
@import '~style/style/index0.styl';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg;
}

.slide-enter-active, .slide-leave-active {
  transition: all 1s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
```

