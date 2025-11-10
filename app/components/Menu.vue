<script setup lang="ts">
import {
  ElIconLocation,
  ElIconTickets
} from '#imports'
import { type Component } from 'vue'

const props = defineProps<{
  height?: string
}>()

const router = useRouter()

interface MenuItem {
  name: string,
  icon: Component,
  children?: MenuItem[]
  link: string
}

const menuItems: MenuItem[] = [
  {
    name: 'Шумы',
    icon: ElIconLocation,
    children: [
      {
        name: 'Каталог треков',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Коллекции',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Авторы',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Библиотеки',
        link: '/example',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Музыка',
    icon: ElIconTickets,
    children: [
      {
        name: 'Каталог треков',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Плейлисты',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Авторы',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Лейблы',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Альбомы',
        link: '/example',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Пользователи',
    icon: ElIconLocation,
    children: [
      {
        name: 'Каталог пользователей',
        link: '/example',
        icon: ElIconLocation,
      },
      {
        name: 'Отчеты',
        link: '/example',
        icon: ElIconLocation,
      },
    ]
  },
  {
    name: 'Блог',
    link: '/example',
    icon: ElIconLocation,
  },
  {
    name: 'Ручки',
    link: '/example',
    icon: ElIconLocation,
  },
  {
    name: 'Ручки',
    link: '/example',
    icon: ElIconLocation,
  },
  {
    name: 'Ручки',
    link: '/example',
    icon: ElIconLocation,
  },
  {
    name: 'Ручки',
    link: '/example',
    icon: ElIconLocation,
  },
]

const onClickLink = (menuItem: MenuItem) => {
  router.push(menuItem.link)
}
</script>

<template>
  <el-menu class="side-menu" :unique-opened="true">
    <el-scrollbar :height="props.height ?? '100vh'" :always="true">
      <template v-for="(menuItem, i) in menuItems">
        <el-sub-menu class="sub-menu" v-if="menuItem.children" :index="i.toString()" >
          <template #title>
            <el-icon>
              <component v-if="menuItem.icon" :is="menuItem.icon" />
            </el-icon>
            <span>{{ menuItem.name }}</span>
          </template>
          <template #default>
            <el-menu-item v-for="(menuItemChildren, j) in menuItem.children" :index="i.toString() + '-' + j.toString()">
              <el-icon>
                <component v-if="menuItemChildren.icon" :is="menuItemChildren.icon" />
              </el-icon>
              <span @click="onClickLink(menuItemChildren)">{{ menuItemChildren.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="i.toString()">
          <el-icon>
            <component v-if="menuItem.icon" :is="menuItem.icon" />
          </el-icon>
          <span @click="onClickLink(menuItem)">{{ menuItem.name }}</span>
        </el-menu-item>
      </template>
    </el-scrollbar>
  </el-menu>
</template>