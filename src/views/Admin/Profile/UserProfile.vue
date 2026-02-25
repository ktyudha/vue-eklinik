<template>

  <PageBreadcrumb :pageTitle="currentPageTitle" />

  <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
    <profile-card :item="me" />
    <personal-info-card :item="me" />
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'


import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

import ProfileCard from './ProfileCard.vue'
import PersonalInfoCard from './PersonalInfoCard.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/useStore'

const currentPageTitle = ref('Profil')

const auth = useAuthStore()
const { me } = storeToRefs(auth)

</script>
