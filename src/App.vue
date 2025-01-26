<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()

import UserLayout from "./layout/user/UserLayout.vue"
import AdminLayout from "./layout/admin/AdminLayout.vue"
import CommonLayout from "./layout/common/CommonLayout.vue"

const displayLayout = computed(()=>{
  if (router.currentRoute.value.meta.layout === 'user'){
    return UserLayout
  } else if (router.currentRoute.value.meta.layout === 'admin'){
    return AdminLayout
  } else {
    return CommonLayout
  }
})

</script>

<template>
  <div style="height: 100vh;width: 100vw">
    <component :is="displayLayout" style="width:100%; height: 100%" />
  </div>
</template>

<style>

</style>
