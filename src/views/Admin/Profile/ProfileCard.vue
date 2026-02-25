<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <!-- <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img src="/images/user/owner.jpg" alt="user" />
          </div> -->
          <Skeleton shape="circle" height="h-20" width="w-20" :loading="item == null" class="mb-2">
            <AvatarText :text="item?.name ?? '-'" />
          </Skeleton>

          <div class="order-3 xl:order-2">
            <Skeleton height="h-8" :loading="item == null" class="mb-2">
              <h4 class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {{ item?.name }}
              </h4>
            </Skeleton>
            <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p class="text-sm text-gray-500 dark:text-gray-400">Developer</p>
              <div class="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Surabaya, Jawa Timur</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { User } from '@/services/auth/interfaces/response.type'

import Skeleton from '@/components/ui/skeleton/index.vue'
import AvatarText from '@/components/ui/avatar/AvatarText.vue';


interface Props {
  item: User | undefined
}

defineProps<Props>()
</script>
