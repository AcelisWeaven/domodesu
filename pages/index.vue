<template>
  <div class="my-8 mx-16 lg:mx-16">
    <h1 class="text-xl">
      Welcome,
      <img
        class="h-8 w-8 inline rounded-full"
        :src="$auth.user.profilePicture"
        :alt="$auth.user.name"
      />
      {{ $auth.user.name }}
    </h1>
    <button
      @click="$auth.logout() && $router.push('/login')"
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
    >
      Logout
    </button>

    <select-followed />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
