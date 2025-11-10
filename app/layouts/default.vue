<script setup lang="ts">
import Menu from "~/components/Menu.vue"
</script>

<template>
  <el-scrollbar height="100vh">
    <el-container class="el-container">
      <el-aside>
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </el-scrollbar>
</template>