<template>
  <div class="trash">
    <div class="tips">
      回收站中的记事会在7天后删除
    </div>
    <div class="empty-container">
      <div class="empty">

      </div>
      <div class="empty-tips">
        回收站中没有任何记事
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trash',
  data () {
    return {}
  }
}
</script>

<style scoped>
.trash {
  width: 100%;
  height: 100%;
}
.trash .tips {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.empty-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
}
.empty-container .empty {
  background-image: url(../assets/trash.svg);
  background-size: 120px 120px;
  height: 120px;
  margin: 20px;
 width: 120px;
}
.empty-container .empty-tips {
  color: rgba(51,51,51,0.4);
  cursor: default;
  font-size: 20px;
  font-family: 'Roboto Slab','Times New Roman',serif;
  font-variant-ligatures: none;
}
</style>
