<template>
  <div id="app">
    <div id="header"  v-if="showPrevBtn">
      <h3>{{title}}</h3>
    </div>
    <div class="demo"></div>
    <transition :name="transitionName">
      <router-view class="child-view" keep-alive>{{transitionName}}</router-view>
    </transition>
    <vLoading v-show="showLoading"></vLoading>
    <div id="footer">
      <ul> 
       <li v-for="item in tabBar">
          <router-link :to="item.path">{{item.name}}</router-link>
       </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import index from './home.vue';
import loading from './components/loading.vue';
  module.exports =  {
  name: 'app',
  data:function(){
    return {
      transitionName:'slide-left',
      routerList:[],
      title:'home',
      prevPage:'',
      showPrevBtn:true,
      showLoading:true,
      tabBar:[
        {
          path:'/',
          ico:'home',
          name:'国内焦点'
        },{
          path:'/foreign',
          ico:'foreign',
          name:'国外焦点'
        },{
           path:'/war',
           ico:'war',
           name:'军事焦点'
        },{
          path:'/finance',
          ico:'finance',
          name:'财经焦点'
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
     this.transitionName = this.checkDirecition(to.name, from.name) && "slide-left" || "slide-right";
     this.title = to.name;
     // this.showPrevBtn = to.path == '/' ? false:true;

     //this.showLoading = this.checkDirecition(to.name, from.name) ? true : false;
    }
  },
  created:function(){
      if(this.$route.name==undefined){
          this.$router.push('/');
      }
  },
  methods:{
      prev(){
        router.go(-1);
      },
      checkDirecition(to, from) {
          var map = ["index", "foreign", "war","finance","detail"];
          return (map.indexOf(to) - map.indexOf(from)) >= 0;
      }
  },

  components: {
    index,
    vLoading:loading
  }
 
}

</script>

<style>

</style>

