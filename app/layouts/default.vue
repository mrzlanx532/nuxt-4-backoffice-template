<script setup lang="ts">
import Menu from "~/components/Menu.vue"

let ro = undefined

const router = useRouter()

const logoContainerRef = useTemplateRef('logoContainerRef')
const footerRef = useTemplateRef('footerRef')

const scrollbarHeight = ref()

const updateMenuDimensions = () => {
  scrollbarHeight.value = (window.innerHeight - logoContainerRef.value.offsetHeight - footerRef.value.offsetHeight) + 'px'
}

const initResizeObserver = () => {
  const body = document.body;
  let lastHeight = body.offsetHeight;

  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const newHeight = entry.contentRect.height;
      if (newHeight !== lastHeight) {
        updateMenuDimensions()
        lastHeight = newHeight;
      }
    }
  });

  observer.observe(body);

  return observer
}

const clickHome = () => {
  router.push('/')
}

onMounted(() => {
  ro = initResizeObserver()
  updateMenuDimensions()
})

onUnmounted(() => {
  ro.unobserve()
})
</script>

<template>
  <el-scrollbar height="100vh">
    <el-container class="el-container">
      <el-aside class="side-menu__container">
        <div class="side-menu__logo" ref="logoContainerRef" @click="clickHome">
          <img src="/img/logo.png" alt="Logo">
          <div>Digital Dyatel</div>
        </div>
        <Menu :height="scrollbarHeight"/>
        <div class="side-menu__footer" ref="footerRef">
          <img src="/img/avatar.png" alt="avatar">
          <p class="username">Денис Данилов</p>
          <p class="role">Администратор</p>
          <a>Выйти</a>
        </div>
      </el-aside>
      <el-container class="main-container">
        <el-main>
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </el-scrollbar>
</template>