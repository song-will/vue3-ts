<template>
    <div class="selection-area-wrapper">
        <component :is="curComp" />
    </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import SelectionChat from './SelectionChat.vue'
import SelectionContacts from './SelectionContacts.vue'

const props = defineProps<{ currentType: string }>()

const curComp = computed(() => {
    switch (props.currentType) {
        case 'CHAT':
            return SelectionChat
        case 'CONTACTS':
            return SelectionContacts
        default:
            return SelectionChat
    }
})
console.log(curComp)
</script>
<style lang="less" scoped>
.selection-area-wrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>