<template>
<div ref="waterfall" class="waterfall">
  <div :style="{height: containerHeight+'px'}">
    <div :key="index" v-for="(item, index) in noteList" class="item">
      <NoteCard :noteDetail="item"></NoteCard>
    </div>
    <div v-if="groupTitle" class="list-title">
      {{groupTitle}}
    </div>
  </div>
</div>
</template>

<script>
import NoteCard from './NoteCard.vue'
import { setTimeout } from 'timers'

export default {
  name: 'downloads',
  components: {
    NoteCard
  },
  props: {
    groupTitle: {
      type: String,
      required: false
    },
    noteList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      sizeType: 1,
      heightList: [],
      items: [],
      containerHeight: 200
    }
  },
  mounted () {
    this.delayUpdate()
  },
  watch: {
    noteList () {
      this.delayUpdate()
    }
  },
  methods: {
    /**
     * @author jingchenxu2015@gmail.com
     * @description 等待页面dom渲染完成
     */
    delayUpdate () {
      let me = this
      setTimeout(function () {
        me.updateLayout()
        window.addEventListener('resize', () => me.updateLayout(), false)
      }, 2)
    },
    /**
     * @author jingchenxu2015@gmail.com
     * @description 更新页面布局 只有在页面布局发生大的改动的时候才会触发
     */
    updateLayout () {
      let me = this
      let items = me.$refs.waterfall.getElementsByClassName('item')
      me.items = items
      let width = document.body.clientWidth
      let heightList
      if (width >= 870) {
        me.heightList = [0, 0, 0]
      }
      if (width >= 600 && width < 870) {
        me.heightList = [0, 0]
      }
      if (width < 600) {
        me.heightList = [0]
      }
      for (let i = 0; i<items.length; i++) {
        let itemHeight
        if (i>0) {
          itemHeight = items[i-1].offsetHeight
        }
        if (width >= 870) {
          me.sizeType = 3
          let x = 0
          let y = 0
          let ob = me.countPosition3(i, x, y, itemHeight)
          items[i].style.transform = 'translate('+ob.x+'px'+','+ob.y+'px'+')'
        }
        if (width >= 600 && width < 870) {
          me.sizeType = 2
          let x = 0
          let y = 0
          let ob = me.countPosition2(i, x, y, itemHeight)
          items[i].style.transform = 'translate('+ob.x+'px'+','+ob.y+'px'+')'
        }
        if (width < 600) {
          me.sizeType = 1
          let x = 0
          let y = 0
          let ob = me.countPosition1(i, x, y, itemHeight)
          items[i].style.transform = 'translate('+ob.x+'px'+','+ob.y+'px'+')'
        }
      }
    },
    /**
     * @author jingchenxu2015@gmail.com
     * @description 计算card的position 偶数为true
     */
    countPosition3 (index, x, y, itemHeight = 0) {
      let me = this

      let order = index%3
      if (order === 0) {
        x = 0
        if (index>0) {
          itemHeight = this.items[index-3].offsetHeight
          me.heightList[0] = me.heightList[0] + itemHeight + 16
        }
        y = me.heightList[0]
      }
      if (order === 1) {
        x = 256
        if (index>1) {
          itemHeight = this.items[index-3].offsetHeight
          me.heightList[1] = me.heightList[1] + itemHeight + 16
        }
        y = me.heightList[1]
      }
      if (order === 2) {
        x = 512
        if (index>2) {
          itemHeight = this.items[index-3].offsetHeight
          me.heightList[2] = me.heightList[2] + itemHeight + 16
        }
        y = me.heightList[2]
      }
      if (y+this.items[index].offsetHeight+50 > me.containerHeight) {
        me.containerHeight = y+this.items[index].offsetHeight+50
      }
      return {
        x,
        y
      }
    },
    /**
     * @author jingchenxu2015@gmail.com
     * @description 计算card的position 偶数为true
     */
    countPosition2 (index, x, y, itemHeight = 0) {
      let me = this

      if (me._isOdd(index)) {
        x = 0
        if (index>0) {
          // 用于保存上方元素的高度
          itemHeight = this.items[index-2].offsetHeight
          // 用于缓存高度
          me.heightList[0] = me.heightList[0] + itemHeight + 16
        }
        y = me.heightList[0]
      } else {
        x = 256
        if (index>1) {
          itemHeight = this.items[index-2].offsetHeight
          me.heightList[1] = me.heightList[1] + itemHeight + 16
        }
        y = me.heightList[1]
      }
      if (y+this.items[index].offsetHeight+50 > me.containerHeight) {
        me.containerHeight = y+this.items[index].offsetHeight+50
      }
      return {
        x,
        y
      }
    },
    /**
     * @author jingchenxu2015@gmail.com
     * @description 计算card的position 偶数为true
     */
    countPosition1 (index, x, y, itemHeight = 0) {
      let me = this
      x = 0
      if (index > 0) {
        me.heightList[0] = me.heightList[0] + itemHeight + 16
      }
      y = me.heightList[0]
      if (y+this.items[index].offsetHeight+50 > me.containerHeight) {
        me.containerHeight = y+this.items[index].offsetHeight+50
      }
      return {
        x,
        y
      }
    },
    _isOdd (number) {
      return number%2 === 0
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1390px) {
  /* 3列 */
  .waterfall {
    width: 784px;
    margin: auto;
  }
  .waterfall > div {
    position: relative;
    height: 500px;
  }
  .waterfall .item {
    width: 240px;
    transform: translate(0px, 40px);
    background-color: brown;
    margin: 16px;
    transition-duration: .218s;
    position: absolute;
    transition-property: opacity,transform;
    box-sizing: border-box;
    opacity: 1;
  }
  .list-title {
    position: absolute;
    margin: 22px 16px;
    top: -40px;
  }
}

@media screen and (max-width: 870px) {
  /* 2列 */
  .waterfall {
    width: 528px;
    margin: auto;
  }
  .waterfall > div {
    position: relative;
    height: 500px;
  }
  .waterfall .item {
    width: 240px;
    transform: translate(0px, 40px);
    background-color:darkgoldenrod;
    box-sizing: border-box;
    margin: 16px;
    transition-duration: .218s;
    position: absolute;
    transition-property: opacity,transform;
    box-sizing: border-box;
    opacity: 1;
  }
  .list-title {
    position: absolute;
    margin: 22px 16px;
    top: -40px;
  }
}

@media screen and (max-width: 600px) {
  /* 1列 */
  .waterfall {
    width: 100%;
    margin: auto;
    padding: 4px 0;
  }
  .waterfall > div {
    position: relative;
    height: 500px;
  }
  .waterfall .item {
    width: 100%;
    background-color: rebeccapurple;
    margin: 0px;
    transition-duration: .218s;
    position: absolute;
    box-sizing: border-box;
    opacity: 1;
  }
  .list-title {
    position: absolute;
    margin: 22px 16px;
    top: -50px;
  }
}
</style>
