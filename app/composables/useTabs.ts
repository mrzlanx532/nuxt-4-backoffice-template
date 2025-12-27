import { type Component, ref, shallowRef, watch } from 'vue'

export interface ITabItem {
    title: string,
    component: Component,
    hasError?: boolean
}

export const useTabs = () => {

    const selectedTab = ref(0)

    const initTabs = (_tabs: ITabItem[]) => {

        const tabs = shallowRef(_tabs)

        const selectedTabComponent = initSelectedTabComponent(tabs)
        watchSelectedTab(tabs, selectedTabComponent)

        return {
            tabs,
            selectedTabComponent,
            onChangeSelectedTab
        }
    }

    const initSelectedTabComponent = (tabs: Ref<ITabItem[]>) => {
        return shallowRef(tabs.value[selectedTab.value]!.component)
    }

    const watchSelectedTab = (tabs: Ref<ITabItem[]>, selectedTabComponent: ReturnType<typeof initSelectedTabComponent>) => {
        watch(
            selectedTab,
            () => {
                selectedTabComponent.value = tabs.value[selectedTab.value]!.component
            }
        )
    }

    const onChangeSelectedTab = (tabIndex: number) => {
        selectedTab.value = tabIndex;
    }

    return {
        initTabs
    }
}
