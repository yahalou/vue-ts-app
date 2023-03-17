<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside>
        <home-aside></home-aside>
      </el-aside>
      <el-main>
        <home-bread></home-bread>
        <home-main></home-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import HomeHeader from "./components/HomeHeader.vue";
import HomeAside from "./components/HomeAside.vue";
import HomeBread from "./components/HomeBread.vue";
import HomeMain from "./components/HomeMain.vue";
</script>

<style scoped lang="scss">
.el-header {
  box-shadow: 0 8px 24px -2px rgb(0, 0, 0, 0.05);
}

.el-aside {
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
}

.el-main {
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
</style>
