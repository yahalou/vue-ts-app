<template>
  <div>hello login</div>
</template>

<script setup lang="ts">
import http from "@/utils/http";
import { useStore } from "@/store";

const store = useStore();

store.dispatch("users/login").then((res) => console.log(res));
</script>

<style scoped lang="scss"></style>
