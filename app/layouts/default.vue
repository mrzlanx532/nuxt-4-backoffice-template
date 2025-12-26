<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Menu, { type MenuItem } from "~/components/Menu.vue"
import locale from 'element-plus/es/locale/lang/ru';
import { ModalsContainer } from 'vue-final-modal'
import {
  ElIconLocation,
  ElIconTickets
} from '#imports'

let ro: ResizeObserver | undefined = undefined

const router = useRouter()

const logoContainerRef = useTemplateRef('logoContainerRef')
const footerRef = useTemplateRef('footerRef')
const menuTemplateRef = useTemplateRef('menuTemplateRef')

const scrollbarHeight = ref()
const sidebarIsReady = ref(false)

const items: MenuItem[] = [
  {
    name: 'Шумы',
    icon: ElIconLocation,
    link: '/sounds',
    children: [
      {
        name: 'Каталог треков',
        link: '/sounds',
        icon: ElIconLocation,
      },
      {
        name: 'Коллекции',
        link: '/sounds/collections',
        icon: ElIconLocation,
      },
      {
        name: 'Авторы',
        link: '/sounds/authors',
        icon: ElIconLocation,
      },
      {
        name: 'Библиотеки',
        link: '/sounds/libraries',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Музыка',
    icon: ElIconTickets,
    link: '/music',
    children: [
      {
        name: 'Каталог треков',
        link: '/music',
        icon: ElIconLocation,
      },
      {
        name: 'Плейлисты',
        link: '/music/playlists',
        icon: ElIconLocation,
      },
      {
        name: 'Авторы',
        link: '/music/authors',
        icon: ElIconLocation,
      },
      {
        name: 'Лейблы',
        link: '/music/labels',
        icon: ElIconLocation,
      },
      {
        name: 'Альбомы',
        link: '/music/albums',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Пользователи',
    icon: ElIconLocation,
    link: '/users',
    children: [
      {
        name: 'Каталог пользователей',
        link: '/users',
        icon: ElIconLocation,
      },
      {
        name: 'Отчеты',
        link: '/users/reports',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Блог',
    link: '/blog',
    icon: ElIconLocation,
  },
]

const updateMenuDimensions = () => {
  scrollbarHeight.value = (window.innerHeight - logoContainerRef.value!.offsetHeight - footerRef.value!.offsetHeight) + 'px'
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
  menuTemplateRef.value!.closeActive()
  router.push('/')
}

const logout = async () => {
  const { $auth } = useNuxtApp()

  await $auth().logout()
}

onMounted(() => {
  ro = initResizeObserver()
  updateMenuDimensions()
  sidebarIsReady.value = true
})

onUnmounted(() => {
  ro!.disconnect()
})
</script>

<template>
  <OverlayScrollbarsComponent :options="{scrollbars: {theme: 'os-theme-main-scroll'}}" :style="{height: '100vh'}">
    <el-config-provider :locale="locale">
      <el-container class="el-container">
        <el-aside class="sidebar">
          <div class="sidebar__overlay" :class="{'--active': !sidebarIsReady}"/>
          <div class="sidebar__logo" ref="logoContainerRef" @click="clickHome">
            <img src="/img/logo.png" alt="Logo">
            <div>Digital Dyatel</div>
          </div>
          <Menu ref="menuTemplateRef" :height="scrollbarHeight" :items="items"/>
          <div class="sidebar__footer" ref="footerRef">
            <img src="/img/avatar.png" alt="avatar">
            <p class="username">Денис Данилов</p>
            <p class="role">Администратор</p>
            <el-link @click="logout">Выйти</el-link>
          </div>
        </el-aside>
        <el-container class="main">
          <el-main>
            <slot/>
          </el-main>
        </el-container>
      </el-container>
      <ModalsContainer />
    </el-config-provider>
  </OverlayScrollbarsComponent>
</template>