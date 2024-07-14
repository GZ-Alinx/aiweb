<script setup name="userPage">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue';

const router = useRouter()

const goBack = () => {
    router.go(-1)
}

let props = defineProps({
    content: ""
})

</script>

<template>
    <el-page-header @back="goBack" title="返回">
        <template #content>
            <span class="text-large font-600 mr-3">{{ props.content }}</span>
        </template>
    </el-page-header>
</template>

<style scoped></style>