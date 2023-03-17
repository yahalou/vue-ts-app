<template>
  <el-menu :default-active="route.fullPath" router>
    <el-sub-menu v-for="item in menus" :index="item.path" :key="item.path">
      <template #title>
        <el-icon>
          <!-- 动态组件的应用场景 -->
          <!-- 被传给 :is 的值可以是：1.被注册的组件名 2.导入的组件对象 -->
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="item.path + child.path"
        :index="item.path + child.path"
      >
        <el-icon><component :is="child.meta?.icon"></component></el-icon>
        <span>{{ child.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import type { RouteRecordName } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
// 权限列表
const permission = store.state.users.infos.permission;

const menus = _.cloneDeep(router.options.routes).filter((v) => {
  // 根据不同的角色展示不同的菜单
  v.children = v.children?.filter(
    (v) =>
      v.meta?.menu &&
      (permission as (RouteRecordName | undefined)[]).includes(v.name)
  );
  return (
    v.meta?.menu &&
    (permission as (RouteRecordName | undefined)[]).includes(v.name)
  );
});
</script>

<style scoped lang="scss">
.el-menu {
  height: calc(100vh - 60px);
  border: none;
  padding-top: 30px;
}

// 选择同时为两个类的元素
.el-menu-item.is-active {
  background: #e6f7ff;
  border-right: 3px solid #1890ff;
}
</style>
