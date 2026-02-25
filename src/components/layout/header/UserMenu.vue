<template>
  <div class="relative" ref="dropdownRef">
    <button class="flex items-center text-gray-700 dark:text-gray-400" @click.prevent="toggleDropdown">
      <Skeleton :loading="me == null" shape="circle" width="w-11" height="h-11">
        <AvatarText :text="me?.name ?? '-'" size="11" />
      </Skeleton>

      <Skeleton :loading="me == null" width="w-16" height="h-5" class="ml-3 mr-2">
        <span class="block ml-3 mr-2 font-medium text-theme-sm">{{ me?.name }} </span>
      </Skeleton>

      <HiChevronDown :class="[
        'stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200',
        dropdownOpen ? 'rotate-180' : ''
      ]" />
    </button>

    <!-- Dropdown Start -->
    <div v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ me?.name }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ me?.email }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href" @click="closeDropdown">
          <router-link :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            <!-- SVG icon would go here -->
            <component :is="item.icon" class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <button type="submit" @click="openModal(); closeDropdown()"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
        <LogoutIcon class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
        Sign out
      </button>
    </div>
    <!-- Dropdown End -->
  </div>

  <Modal :is-open="isOpen" @close="closeModal" class="max-w-md m-4">
    <div class="relative w-full max-w-md rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
      <div class="text-center">
        <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
          Keluar
        </h4>

        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Apakah Anda yakin keluar akun?
        </p>

        <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" className="w-full" @click="closeModal">
            Tidak
          </Button>
          <Button size="sm" variant="outline" className="w-full" @click="signOut">
            Ya
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { nextTick, ref } from 'vue'
import { toast } from 'vue3-toastify'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { UserCircleIcon, LogoutIcon, SettingsIcon, } from '@/icons'

import Button from '@/components/ui/Button.vue';
import Modal from '@/components/ui/Modal.vue';
import { useModal } from '@/composables/useModal';
import AvatarText from '@/components/ui/avatar/AvatarText.vue'
import Skeleton from '@/components/ui/skeleton/index.vue'

import useLogout from '@/services/auth/hooks/useLogout'
import { useAuthStore } from '@/store/useStore'
import { HiChevronDown } from 'vue3-icons/hi'

const dropdownOpen = ref(false)

const menuItems = [
  { href: '/admin/profile', icon: UserCircleIcon, text: 'Edit profile' },
  { href: '/admin/profile', icon: SettingsIcon, text: 'Account settings' },
]

const router = useRouter()
const auth = useAuthStore()
const { me } = storeToRefs(auth)
const { handleLogout } = useLogout()

const { isOpen, openModal, closeModal } = useModal()

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const signOut = async () => {
  try {
    closeDropdown()

    const { data, error } = await handleLogout(auth.role)
    if (data || error) {
      if (data) {

        if (auth.role === "admin") Cookies.remove("token")
        else if (auth.role === "user") Cookies.remove("token-user")

        auth.setIsLoggedIn(false)


        toast.success("Berhasil keluar akun!")
        nextTick(() => {
          router.replace({ name: 'admin.login' })
        })
      } else {
        toast.error("Gagal keluar akun!")
      }
    }
  } catch (err) {
    toast.error((err as Error).message || "Terjadi kesalahan")
  }
}

</script>
