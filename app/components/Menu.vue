<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { type Component } from 'vue'
import { type ElMenu } from 'element-plus'

interface MenuItemPlain {
  name: string
  link: string,
  icon?: Component
}

interface MenuItemWithChildren {
  name: string,
  icon?: Component
  children: MenuItemPlain[]
}

export type MenuItem = MenuItemPlain | MenuItemWithChildren

const router = useRouter()

const props = defineProps<{
  items: MenuItem[],
  height?: string
}>()

const lastActiveSubMenuIndex = ref()

const menuTemplateRef = useTemplateRef<typeof ElMenu>('menuTemplateRef')

const onClickLink = (menuItemPlain: MenuItemPlain) => {
  router.push(menuItemPlain.link)
}

const isMenuItemPlain = (item: MenuItem): item is MenuItemPlain => {
  return !('children' in item);
}

const closeActive = () => {
  menuTemplateRef.value!.close(lastActiveSubMenuIndex.value)
}

const onOpenSubMenu = (index: string) => {
  lastActiveSubMenuIndex.value = index
}

defineExpose({
  closeActive
})
</script>

<template>
  <el-menu @open="onOpenSubMenu" class="sidebar__menu" :unique-opened="true" ref="menuTemplateRef">
    <OverlayScrollbarsComponent :options="{scrollbars: {theme: 'os-theme-default'}}" :style="{height: props.height}">
      <template v-for="(menuItem, i) in props.items">
        <el-menu-item v-if="isMenuItemPlain(menuItem)" :index="i.toString()">
          <el-icon>
            <component v-if="menuItem.icon" :is="menuItem.icon" />
          </el-icon>
          <span @click="onClickLink(menuItem)">{{ menuItem.name }}</span>
        </el-menu-item>
        <el-sub-menu class="sidebar__sub-menu" v-else :index="i.toString()" >
          <template #title>
            <el-icon>
              <component v-if="menuItem.icon" :is="menuItem.icon" />
            </el-icon>
            <span>{{ menuItem.name }}</span>
          </template>
          <template #default>
            <el-menu-item v-for="(menuItemChild, j) in menuItem.children" :index="i.toString() + '-' + j.toString()">
              <el-icon>
                <component v-if="menuItemChild.icon" :is="menuItemChild.icon" />
              </el-icon>
              <span @click="onClickLink(menuItemChild)">{{ menuItemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </OverlayScrollbarsComponent>
  </el-menu>
</template>