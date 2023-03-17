<template>
  <div class="home-header">
    <div class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </div>
    <div class="home-header-title">在线考勤系统</div>

    <el-dropdown>
      <el-badge :value="12" class="home-header-badge">
        <el-icon :size="20"><Bell /></el-icon>
      </el-badge>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>暂无消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown>
      <ElSpace class="home-header-space">
        <el-avatar :src="(head as string)" />{{ name }}
      </ElSpace>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
const store = useStore();
const head = computed(() => store.state.users.infos.head);
const name = computed(() => store.state.users.infos.name);

const handleLogout = () => {
  store.commit("users/clearToken");
  setTimeout(() => {
    window.location.replace("/login");
  }, 500);
};
</script>

<style scoped lang="scss">
.home-header {
  font-size: 34px;
  display: flex;
  align-items: center;
  height: 100%;

  .home-header-logo {
    .icon-vue,
    .icon-icon-test,
    .icon-typescript {
      margin-right: 5px;
      font-size: inherit;
    }

    .icon-vue {
      color: rgb(65, 184, 131);
    }

    .icon-typescript {
      color: rgb(45, 121, 199);
    }
  }

  .home-header-title {
    margin-left: 30px;
    font-weight: 700;
    font-size: 18px;
    margin-right: auto;
  }

  .home-header-space {
    margin-left: 20px;
  }
}
</style>
