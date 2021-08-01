<template>
  <div>
    <div>Select a live channel</div>
    <div
      class="
        grid
        gap-4
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      <nuxt-link
        class="
          flex flex-col
          items-center
          rounded-lg
          shadow-lg
          overflow-hidden
          cursor-pointer
          hover:opacity-80
        "
        v-for="channel in followed"
        :key="channel.user_name"
        :to="'/monitor?streamer=' + channel.user_name"
      >
        <img
          class="w-full"
          :src="
            channel.thumbnail_url
              .replace('{width}', '404')
              .replace('{height}', '227')
          "
        />
        <div class="my-2">
          <span class="inline-flex relative h-3 w-3 mr-1">
            <span
              class="
                animate-ping
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-red-400
                opacity-75
              "
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
            ></span>
          </span>
          <span class="text-xl font-semibold">{{ channel.user_name }}</span>
        </div>
      </nuxt-link>
      <div v-if="followed.length === 0" class="font-light">
        Nobody's live right now. Check later!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      followed: [] as any[],
      refreshInterval: null as number | null,
    }
  },
  created() {
    if (process.server) return

    // eslint-disable-next-line nuxt/no-globals-in-created
    this.refreshInterval = window.setInterval(() => {
      this.refresh()
    }, 60 * 1000)
    this.refresh()
  },
  destroyed() {
    if (this.refreshInterval !== null)
      window.clearInterval(this.refreshInterval)
  },
  methods: {
    refresh() {
      const searchUrl = new URL('https://api.twitch.tv/helix/streams/followed')
      searchUrl.searchParams.append('user_id', <string>this.$auth.user?.id)
      this.$axios.$get(searchUrl.href).then((response: any) => {
        this.followed = response.data
      })
    },
  },
})
</script>