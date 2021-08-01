<template>
  <div>
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
          v-for="streamer in followedStreams"
          :key="streamer.displayName"
          :to="'/monitor?streamer=' + streamer.displayName"
        >
          <img
            v-if="streamer.thumbnail"
            class="w-full"
            :src="streamer.thumbnail"
            width="404"
            height="227"
          />
          <div class="flex items-center w-full">
            <img
              class="mr-4 inline-flex flex-grow-0 h-16 w-16 bg-gray-100"
              v-if="getUserPicture(streamer.id)"
              :src="getUserPicture(streamer.id)"
            />
            <span v-else class="mr-4 inline-flex h-16 w-16 bg-gray-100"></span>
            <div class="flex flex-col">
              <div>
                <span
                  class="inline-flex relative h-3 w-3 mr-1"
                  v-if="streamer.isLive"
                >
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
                <span class="text-xl font-semibold">
                  {{ streamer.displayName }}
                </span>
              </div>
              <span class="font-light" v-if="streamer.viewerCount > 0">
                {{ streamer.viewerCount }} viewers
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="my-8">
      <div
        class="
          grid
          gap-4
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        <nuxt-link
          class="
            flex flex-row
            items-center
            rounded-lg
            shadow-lg
            overflow-hidden
            cursor-pointer
            hover:opacity-80
          "
          v-for="streamer in followedUsers"
          :key="streamer.displayName"
          :to="'/monitor?streamer=' + streamer.displayName"
        >
          <img
            class="inline h-16 w-16"
            v-if="getUserPicture(streamer.id)"
            :src="getUserPicture(streamer.id)"
          />
          <div v-else class="h-16 w-16 bg-gray-100"></div>
          <div class="my-2 mx-4">
            <span class="text-xl font-semibold">
              {{ streamer.displayName }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface StreamerThumbnail {
  id: string
  thumbnail: string | false
  isLive: boolean
  displayName: string
  viewerCount: number
}

interface ProfilePicture {
  id: string
  picture: string
}

export default Vue.extend({
  data() {
    return {
      followedStreams: [] as StreamerThumbnail[],
      followedUsers: [] as StreamerThumbnail[],
      refreshInterval: null as number | null,
      profilePictures: [] as ProfilePicture[],
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
      const followedStreamsUrl = new URL(
        'https://api.twitch.tv/helix/streams/followed'
      )
      followedStreamsUrl.searchParams.append(
        'user_id',
        <string>this.$auth.user?.id
      )
      this.$axios
        .$get(followedStreamsUrl.href)
        .then((followedStreamsResponse: any) => {
          this.followedStreams = followedStreamsResponse.data.map((s) => ({
            id: s.user_id,
            thumbnail: s.thumbnail_url
              .replace('{width}', '404')
              .replace('{height}', '227'),
            isLive: true,
            displayName: s.user_name,
            viewerCount: s.viewer_count,
          }))

          const followedUsersUrl = new URL(
            'https://api.twitch.tv/helix/users/follows'
          )
          followedUsersUrl.searchParams.append(
            'from_id',
            <string>this.$auth.user?.id
          )
          this.$axios
            .$get(followedUsersUrl.href)
            .then((followedUsersResponse: any) => {
              this.followedUsers = followedUsersResponse.data
                // filter our users that are online (already handled before)
                .filter(
                  (u) =>
                    !this.followedStreams.some((s) => s.user_name === u.to_name)
                )
                .map((u) => ({
                  id: u.to_id,
                  isLive: false,
                  displayName: u.to_name,
                  viewerCount: 0,
                }))

              this.refreshProfilePictures()
            })
        })
    },
    refreshProfilePictures() {
      const profilesToFetch = [...this.followedStreams, ...this.followedUsers]
        .map((f) => f.id)
        // ignore already fetched profile pictures
        .filter((id) => !this.profilePictures.some((p) => p.id === id))

      const usersProfileUrl = new URL('https://api.twitch.tv/helix/users')
      profilesToFetch.forEach((id) => {
        usersProfileUrl.searchParams.append('id', id)
      })

      this.$axios.$get(usersProfileUrl.href).then(({ data }: any) => {
        data.forEach((user) => {
          this.profilePictures.push({
            id: user.id,
            picture: user.profile_image_url,
          })
        })
      })
    },
    getUserPicture(id) {
      return this.profilePictures.find((p) => p.id === id)?.picture
    },
  },
})
</script>
