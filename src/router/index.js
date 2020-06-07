// //如果使用模块化机制编程 导入vue 和 Router 要调用vue。use（Router）
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// //定义（路由）组件
// //可以从其他文件import进来
//组件引入common
import Recommend from 'common/pages/Recommend/Recommend.vue'
import Singer from 'common/pages/Singer/Singer'
import Rank from 'common/pages/Rank/Rank'
import Search from 'common/pages/Seach/seach'
import SingerDetail from './../components/common/singer-detail/singer-detail'
// console.log(SingerDetail)
//定义路由
//每个路由应该映射一个组件。其中‘component’ 也可以引入组件放入component
//通过vue.extend（）创建的组件构造器
//或者，只是一个组件配置对象
//创建router实例，然后‘router’配置
export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/recommend',
      name: "Recommend",
      component: Recommend
    },
    {
      path: "/music-list",//跳转路径
      name: "Singer",//命名路由
      component: Singer,//路径相对于的组件
      children:[//子路由的配置参数（路由的嵌套）
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path: "/rank",
      name: "Rank",
      component: Rank
    },
    {
      path: "/seach",
      name: "Search",
      component: Search
    },
    {//重定向
      path: '/',
      redirect: "/recommend"//重定向
    }
  ]
})
/*
<router-link></router-link>
<router-view></router-view>
*/
/*
请说出路由配置项常用的属性及作用？

路由配置参数：   

	path : 跳转路径    

	component : 路径相对于的组件    

	name:命名路由    

	meta:路由元信息    

	children:子路由的配置参数(路由嵌套)    

	props:路由解耦    

	redirect : 重定向路由
*/