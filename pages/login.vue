<template>
  <div>
    <client-only>
      <div slot="placeholder">
        <div class="flex h-screen">
          <div class="m-auto">
            <div class="animate-bounce">
              <font-awesome-layers class="fa-4x">
                <font-awesome-icon
                  icon="cog"
                  class="fa-spin"
                ></font-awesome-icon>
              </font-awesome-layers>
            </div>
          </div>
        </div>
      </div>
    </client-only>
    <client-only>
      <div class="my-8 mx-16">
        <h1 class="text-xl">Welcome, please login to use Domodesu</h1>
        <button
          class="
            bg-purple-500
            hover:bg-purple-700
            text-white
            font-bold
            py-2
            px-4
            my-4
            rounded
            cursor-pointer
          "
          @click="login"
        >
          Connect with Twitch
        </button>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    if (this.$auth.loggedIn) {
      // redirect if already logged in
      this.$router.push('/')
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('twitch')
    },
  },
})
</script>
