<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @click="menuItemClickEvent"
      >
        <a-menu-item v-for="item in navItems" :key='item.path'> {{ item.title }} </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 20px 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Yczbest.cn ©2025 Created by SmartBest-Zhi
    </a-layout-footer>
  </a-layout>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
const openKeys = ref<string[]>(['sub1']);
import { useRouter } from "vue-router";

const router = useRouter();

const navItems = ref([
  {
    key: "Home",
    title: "Home",
    path: "/absproxy/5173/user"
  },
  {
    key: "MeetingRoom",
    title: "Meeting Room",
    path: "/absproxy/5173/user/selectDevice"
  }
])

const selectedKeys = ref<string[]>([router.currentRoute.value.path]);
const menuItemClickEvent = function(item: any) {
  if (router.currentRoute.value.path !== item.key){
    router.push(item.key)
    console.log(selectedKeys.value)
  }
}

</script>

<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: url("@/assets/Logo.jpeg") 100% 100% no-repeat;
}
</style>
