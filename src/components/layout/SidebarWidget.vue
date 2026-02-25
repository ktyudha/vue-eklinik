<template>
  <div class="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">

    <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Settle <span
        class="italic text-[10px] font-light">Klinik</span></h3>
    <p class="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
      Sistem Informasi Klinik
    </p>

    <Button size="sm" @click="handleClick">
      <HiPhone />
      <span>Hubungi kami</span>
    </Button>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import config from '@/constants/config';
import { HiPhone } from 'vue3-icons/hi'

const message = `Halo Developer ${config.APP_NAME}, Saya Mau Konsultasi.`;
const whatsapp = `https://api.whatsapp.com/send?phone=${config.OFFICE_WHATSAPP}&text=${message}`;

const handleClick = () => {
  // Ukuran window baru
  const width = 800;
  const height = 600;

  // Hitung posisi supaya muncul di tengah
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  window.open(
    whatsapp,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
  );
}
</script>
