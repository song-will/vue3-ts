<template>
    <div class="wrapper">
        <component :is="curComp" />
    </div>
</template>
<script lang="ts" setup>
import ContentChat from './ContentChat.vue'
import { computed, defineProps } from 'vue'

const props = defineProps({
    currentType: String
})
const curComp = computed(() => {
    switch (props.currentType) {
        case 'CHAT': 
            return ContentChat
        case 'CONTACTS':
            return ''
        default:
            return ContentChat
    }
})
</script>
<style lang="less" scoped>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>