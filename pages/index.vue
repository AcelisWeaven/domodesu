<template>
  <div>
    <h1 class="my-4">
      {{ $t('welcome') }},
      <img
        class="h-8 w-8 inline rounded-full"
        :src="$auth.user.profilePicture"
        :alt="$auth.user.name"
      />
      {{ $auth.user.name }}
    </h1>
    <span
      @click="$auth.logout()"
      class="
        bg-purple-500
        hover:bg-purple-700
        text-white
        font-bold
        py-1
        px-2
        my-4
        rounded
        cursor-pointer
      "
      >{{ $t('logout') }}</span
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
