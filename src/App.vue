<script>
import { showToast } from 'vant';
import { ref } from 'vue';
import image from './assets/moa.svg';
import Game from './components/Game.vue';

export default {
  components: {
    Game
  },
  data() {
    const list = [...Array(50).keys()];
    const active = ref(0)
    const nowchoose = ref(-1)
    const searchoverlay = ref(false)
    const searchtext = ref('')
    const nowdress = ref('home')
    const onChange = (index) => showToast(`标签 ${index}`);
    return { list, active ,nowchoose,searchoverlay,searchtext,nowdress,onChange,imageSrc: image};
  },

  methods: {
    chooseitem(index){
      this.nowchoose = index
    },
    cleanitem(){
      this.nowchoose = -1
    },
    show(index){
      showToast(`标签 ${index}`);
      switch (index){
        case 0:
          this.nowdress = 'http://121.40.242.50:8999/'
          this.$router.push('/Game1')
        break;
        case 1:
          this.nowdress = 'http://121.40.242.50:9000/'
          this.$router.push('/Game1')
          // this.nowdress = '/Game2'
          // this.$router.push('/Game2')
        break;
        default:
          this.nowdress = 'home'
          this.$router.push('/')
      }
    },
    onSearch(value){
      showToast(value);
    }
  },
};
</script>

<template>
  <div class="goods">
    <div v-if="nowdress !== 'home'" class = "main-router" >
      <Game :address = "nowdress" />
      <RouterView/>
      <van-floating-bubble axis="xy" magnetic="x" icon="wap-home-o" @click="show('home')" />
    </div>

    <main v-if="nowdress === 'home'" class="goods-main">
      <header class="goods-head">
        <div class="goods-head-title1">
          <van-image class = "goods-head-title1-icon" fit="cover" lazy-load :src=imageSrc />
          <van-icon class="goods-head-title1-search" name="search" size="18" @click = "()=>{searchoverlay = true;searchtext = ''}"/>
        </div>
        <div class="goods-head-title2">
          <!-- <van-icon class = "goods-head-title2-icon" name="search" size="18" @click = "()=>{searchoverlay = true;searchtext = ''}" />
          <van-icon class="goods-head-title2-search" name="search" size="18" @click = "()=>{searchoverlay = true;searchtext = ''}"/> -->
        </div>
      </header>
      <div class="goods-group">
        <van-overlay :show="searchoverlay" @click="searchoverlay = false" style="z-index: 100">
          <div @click.stop>
            <van-search v-model="searchtext" placeholder="请输入搜索关键词" @search="onSearch(searchtext)"/>
          </div>
        </van-overlay>

        <div class="goods-image" v-for="item in list" :key="item" >
          <van-image width="100%" height="100%" radius="8" lazy-load :src=imageSrc @mouseenter="chooseitem(item)" @mouseend = "cleanitem(item)"  @touchstart ="chooseitem(item)" @touchend = "cleanitem(item)"  @click="show(item)">
            <div v-if="nowchoose === item" class="goods-image-div" >
              {{ item }}
            </div>
          </van-image>
        </div>
        <van-back-top />
      </div>
    </main>
  </div>
</template>

<style lang="less">
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}

.goods {
  padding-bottom: 50px;
  &-image {
    width: 100px;
    height: 100px;
    position: relative; /* 使子元素能够使用绝对定位 */
    transition: transform 0.3s ease; /* 添加过渡效果 */
    &:hover {
      transform: scale(1.05); /* 鼠标悬停时放大 */
    }
    &-div {
      width: 100%;
      height: 1.6em;
      bottom: 0;
      text-align: center;
      position: absolute;
      background: linear-gradient(to top, rgb(43, 43, 43), rgba(255, 255, 255, 0)); /* 半透明背景 */
      color: white; /* 根据需要设置颜色 */
    }
  }
  &-router{
    width: 100%;  
    height: 100%;
    position: absolute;
  }
  &-head{
    width: 100%;
    height: 160px;
    background-color: #002f5c;
    &-title1{
      width: 100%;
      height: 96px;
      background-color: #0060b9;
      &-icon{
        width: 222px;
        height: 40px;
        position: absolute;
        top: 28px;
        left: 24px;
      }
      &-search{
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    &-title2{
      width: 100%;
      height: 64px;
      background-color: #0076e4;
    }
  }
  &-main {
    width: 100%;
  }
  &-group {
    width: 96%;  
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px); /* 自适应，均等宽度 */
    gap: 10px; /* 列之间的间隙 */
    padding: 10px 2%;
    justify-content: center; /* 水平居中对齐 */
  }
}
</style>