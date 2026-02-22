<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link to="/"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <svg class="stroke-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                fill="none">
                <path d="M12.7083 5L7.5 10.2083L12.7083 15.4167" stroke="" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Back to dashboard
            </router-link>
          </div>
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Settle<span class="text-sm italic font-semibold"> Klinik</span>
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Masukkan email dan password untuk masuk akun!
                </p>
              </div>
              <div>

                <form @submit="onSubmit">
                  <div class="space-y-5">
                    <VeeInput name="username" label="Username" required />
                    <VeeInput name="password" label="Password" isPassword required />

                    <div>
                      <Button type="submit" :disabled="!meta.valid || isSubmitting" class="w-full">
                        <Spinner v-if="isSubmitting" />
                        <span v-else>Kirim</span>
                      </Button>
                    </div>
                  </div>
                </form>


                <div class="mt-5 flex items-center justify-between">
                  <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Don't have an account?
                    <router-link to="/signup" class="text-brand-500 hover:text-brand-600 dark:text-brand-400">Sign
                      Up</router-link>
                  </p>

                  <router-link to="/reset-password"
                    class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">Forgot
                    password?</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <h1 class="mb-2 font-semibold text-white text-title-sm sm:text-title-md">
                  Settle<span class="text-sm italic font-semibold"> Klinik</span>
                </h1>
              </router-link>
              <p class="text-center text-gray-400 dark:text-white/60">
                Sistem Informasi Klinik untuk Praktik Mandiri
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </FullScreenLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import { useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'

import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import VeeInput from '@/components/forms/VeeInput.vue'
import Button from '@/components/ui/Button.vue'
import Spinner from '@/components/ui/Spinner.vue'

import useLogin from '@/services/auth/hooks/useLogin'
import type { ILoginPayloadRequest } from '@/services/auth/interfaces/request.type'
import { loginSchema } from '@/services/auth/schemas/request.schema'

const router = useRouter()

const { handleSubmit, isSubmitting, meta } = useForm<ILoginPayloadRequest>({
  validationSchema: loginSchema,
})

const { handleLogin } = useLogin("admin")

const onSubmit = handleSubmit(async (state) => {
  try {
    await handleLogin(state);

    toast.success("Berhasil masuk akun!")
    router.push("/admin/dashboard");

  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error((error as Error).message);
    }
  }
})
</script>
