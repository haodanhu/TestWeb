<script setup>
import { showToast } from 'vant';
import { ref } from 'vue';
import image from './assets/moa.svg';
import logo from './assets/logo.png';
import Game from './components/Game.vue';
import gameData from './assets/json/game.json';
import TagEnData from './assets/json/Tag_EN.json';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const gamelist = [
];
const taglistEN = {
  "0" : {id: '0' ,tag: "All Game"},
};
function created (){
  // console.log("gameData.data",gameData)
    for(let key in gameData){
      if(key !== "null" && gameData.hasOwnProperty(key)){
        // console.log(key,gameData[key]);
        gamelist.push(gameData[key]);
      }
    }
  // axios.get('json/Tag_EN.json').then(res => {
    for(let key in TagEnData){
      if(key !== "null" && TagEnData.hasOwnProperty(key)){
        // console.log(key,TagEnData[key]);
        taglistEN[key] = TagEnData[key];
      }
    }
  // }).catch(err => {  
  //   console.log(err);
  // })
}
created ()
const activeuse = ref(false)
const history = ref(false)
const active = ref("0")
const searchoverlay = ref(false)
const searchtext = ref('')
const nowdress = ref('home')
const searchData = ref([])

function show(tbl){
  showToast(`开始游戏 ${tbl.Name_CN}`);
  nowdress.value = tbl.Game_Address
  router.replace({ query:{Game:tbl.Name_EN} })
  // showToast(route.fullPath);
}

function changepage(index){
  showToast(`切换页面 ${taglistEN[index].tag}`);
  active.value = index;
  activeuse.value = false
  if(index == 0){
    nowdress.value = 'home'
    active.value = '0'
    router.push('/')
  }
}
function onSearch(value){
  // console.log("onSearch",value);
  showToast(value);
  if(value.length > 0){
    // 创建正则表达式
    const regex = new RegExp("^"+value, 'i'); // 添加 "i" 标志使搜索不区分大小写
    const regex_tag = new RegExp(`\\b${value}\\b`, 'i'); // 不区分大小写的单词匹配
    searchData.value = gamelist.filter(item => {
      // console.log("item.Name_EN",item.Name_EN);
      // item.Name_EN.match("^" +value, 'i')
      if (!regex.test(item.Name_EN)){
        for (let key in item.Tag_EN) {
          if (item.Tag_EN.hasOwnProperty(key)) {
            const index = item.Tag_EN[key];
            // 在这里执行针对每个键值的操作
            // console.log(`Key: ${key}, Value: ${index}, tag: ${taglistEN[index].tag}`);
            // if(regex_tag.test(taglistEN[value11])){
            if(regex_tag.test(taglistEN[index].tag)){
              return true;
            };
          }
        }
        return false;
      }
      return true; // 创建正则表达式，使用 '|'' 实现或的关系
    })
  }
  // console.log("searchData",searchData.value);
}
</script>

<template>
  <div class="goods">
    <van-back-top />
<!--额外页面框------------------------------------------------------------------------------------- -->
    <div v-if="nowdress !== 'home'" class = "main-router" >
      <Game :address = "nowdress" />
      <RouterView>
        <van-floating-bubble axis="xy" magnetic="x" icon="wap-home-o" gap="30" @click="changepage(0)" />
      </RouterView>
    </div>
<!--搜索页------------------------------------------------------------------------------------- -->
    <div v-if="searchoverlay === true" @click="searchoverlay = false" style="z-index: 100; position:absolute; width: 100%; height: 100%;">
      <div @click.stop>
        <div style="width: 100%;height:54px;background:#2d9bff;">
          <van-icon name="arrow-left" size=26 style="padding: 14px 0;padding-left: 6px;float: left;"  @click="searchoverlay = false,searchtext='',searchData=[]" />
          <div @click="onSearch(searchtext)" style="width: 40px;height: 54px;padding-right: 14px; float: right;display: flex; align-items: center; justify-content: center;"> Search </div>
          <van-search v-model="searchtext" style="width: 80%;" shape="round" background="#2d9bff" action-text="Search" placeholder="Please enter search keywords" @search="onSearch(searchtext)"/>
        </div>        
        <div class="goods-group">
          <div class="goods-group-slot" v-for="item in searchData" :key="item.id" @click="show(item)">
              <div class="goods-group-slot-icon">
                  <van-image radius="8px" fit="cover" lazy-load :src= item.Icon_Address />
              </div>
              <div class="goods-group-slot-text">
                  {{ item.Name_EN }}
              </div>
          </div> 
        </div>
      </div>
    </div>
<!--左侧展开栏------------------------------------------------------------------------------------- -->
    <van-popup v-model:show="activeuse" @click="activeuse=false" position="left" class="goods-active">
      <div @click.stop style="padding: 18px 0">
        <div :class="item.id == active ? 'goods-active-actived' : 'goods-active-button'" v-for="item in taglistEN" :key="item.id" @click="changepage(item.id)">
          <div :class="item.id == active ? 'goods-active-actived-text' : 'goods-active-button-text'">
            {{ item.tag }}
          </div>
        </div>
      </div>
    </van-popup>
<!--主页头------------------------------------------------------------------------------------- -->
    <main v-if="nowdress === 'home'" class="goods-main">
      <header class="goods-head">
        <div class="goods-head-title1">
          <van-image class = "goods-head-title1-icon" fit="cover" lazy-load :src=logo />
          <div class = "goods-head-title1-search" >
            <van-search v-model="searchtext" background="#2d9bff" shape="round" placeholder="Please enter search keywords" @click="searchoverlay = true" />
          </div>
        </div>
        <div class="goods-head-title2">
          <van-icon class = "goods-head-title2-change" name="wap-home" color="#f8f8f8" size="32" @click="activeuse=true"/>
          <van-icon class ="goods-head-title2-history" name="contact" color="#f8f8f8" size="32" @click=""/>
        </div>
      </header>
<!--首页全部游戏------------------------------------------------------------------------------------- -->
      <div v-if="active === '0'">
        <div class="goods-group-title">
          <div class="goods-group-title-text">
            Newgames
          </div>
          <div class="goods-group-title-more" @click="changepage(1)">
            More
          </div>
        </div>
        <div class="goods-group">
          <div class="goods-group-slot" v-for="item in gamelist" :key="item.id" @click="show(item)">
              <div class="goods-group-slot-icon">
                <van-image radius="8px" fit="cover" lazy-load :src= item.Icon_Address />
              </div>
              <div class="goods-group-slot-text">
                {{ item.Name_EN }}
              </div>
          </div>
          <van-back-top />
        </div>
      </div>
<!--分页------------------------------------------------------------------------------------- -->
      <div v-if="active !== '0'">
        <div class="goods-group-title">
          <van-icon name="arrow-left" size=20 class="goods-group-title-back" @click="changepage(0)"/>
          <div class="goods-group-title-text">
            {{ taglistEN[active].tag }}
          </div>
        </div>
        <div class="goods-group">
          <div class="goods-group-slot" v-for="item in gamelist" :key="item.id" @click="show(item)">
              <div class="goods-group-slot-icon">
                <van-image radius="8px" fit="cover" lazy-load :src= item.Icon_Address />
              </div>
              <div class="goods-group-slot-text">
                {{ item.Name_EN }}
              </div>
          </div>
          <van-back-top />
        </div>
      </div>
<!-- ------------------------------------------------------------------------------------- -->
    </main>
  </div>
</template>

<style lang="less">
body {
  color: #000000;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

.goods {
  padding-bottom: 50px;
  &-router{
    width: 100%;  
    height: 100%;
    position: absolute;
  }
  &-active{
    width: 144px;
    height: 400px;
    border-radius: 0 40px 40px 0;
    top:40%;
    background-color:#73ccff;
    &-button{
      width: 118px;
      height: 32px;
      padding: 0 12px;
      float: top;
      padding-top: 12px;
      &-text{
        width: 118px;
        height: 32px;
        color: #ffffff;
        display: flex; 
        align-items: center; 
        justify-content: center;
      }
    }
    &-actived{
      width: 118px;
      height: 32px;
      padding: 0 12px;
      float: top;
      padding-top: 12px;
      &-text{
        width: 118px;
        height: 32px;
        border-radius: 16px;
        background-color:#ffffff;
        color: #416f99;
        display: flex; 
        align-items: center; 
        justify-content: center;
      }
    }
  }
  &-head{
    width: 100%;
    height: 108px;
    background-color: #002f5c;
    &-title1{
      width: 100%;
      height: 64px;
      background-color: #2d9bff;
      &-icon{
        width: 134px;
        height: 28px;
        padding: 18px 0;
        padding-left: 14px;
        float: left;
      }
      &-search{
        width: 188px;
        height: 28px;
        padding: 5px 0;
        float: right;
      }
    }
    &-title2{
      width: 100%;
      height: 44px;
      background-color: #0076e4;
      &-change{
        padding: 6px 0;
        padding-left: 14px;
        float: left;
      }
      &-history{
        padding: 6px 0;
        padding-left: 14px;
        float: left;
      }
    }
  }
  &-main {
    width: 100%;
  }
  &-group {
    width: 96%;  
    height: 75vh;   
    background-color: #f8f8f8;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 自适应，均等宽度 */
    gap: 10px; /* 列之间的间隙 */
    padding: 10px 2%;
    &-title {
      width: 100%;
      height: 36px;
      background-color: #f8f8f8;
      &-text { 
        padding: 6px 0;
        padding-left: 14px;
        float: left;
        font-size: 18px;
      }
      &-more { 
        padding-top: 12px;
        padding-right: 14px;
        float: right;
        font-size: 12px;
      }
      &-back{
        padding: 8px 0;
        padding-left: 14px;
        float: left;
      }
    }
    &-slot {
      height: 144px;
      transition: transform 0.3s ease; /* 添加过渡效果 */
      background-color: #f8f8f8;
      -webkit-box-orient: vertical; /* 垂直排列 */
      justify-self: center;
      &:hover {
        transform: scale(1.05); /* 鼠标悬停时放大 */
      }
      &-icon {
        width: 96px;
        height: 96px;
        padding: 0 16px;
        padding-top: 8px;
        justify-self: center;
      }
      &-text {
        width: 96px;
        height: 34px;
        padding: 0 16px;
        padding-top: 4px;
        font-size: 12px;
        justify-self: center;
        overflow: hidden;           /* 隐藏超出 */
        text-overflow: ellipsis;   /* 使用省略号 */
        word-break: break-all;
        // white-space: pre;
      }
    }
  }
}
</style>