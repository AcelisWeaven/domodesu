<template>
  <div>
    <div>
      <div class="text-center mb-4">
        <div class="text-xl">Select a channel</div>
        <div class="font-bold text-sm tracking-wider uppercase">
          {{ followedStreams.length }} online
          <button class="hover:text-purple-700" @click="refresh">
            <font-awesome-icon
              icon="sync-alt"
              :class="{ 'fa-spin': isSyncing, 'text-purple-500': isSyncing }"
            ></font-awesome-icon>
          </button>
          / {{ filteredFollowedUsers.length }} offline
        </div>
      </div>
      <div
        class="
          grid
          gap-4
          grid-cols-1
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          my-8
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
          :to="'/monitor?streamer=' + self.name"
        >
          <img class="inline h-16 w-16" :src="self.profilePicture" />
          <div class="my-2 mx-4">
            <div class="text-xl font-semibold">
              {{ self.name }}
              <span
                class="
                  text-xs
                  bg-gray-200
                  text-gray-500
                  px-3
                  py-1
                  rounded-md
                  uppercase
                  tracking-wider
                "
              >
                you
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        class="
          grid
          gap-4
          grid-cols-1
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
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
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
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
          v-for="streamer in filteredFollowedUsers"
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
import TwitchJs, { Api } from 'twitch-js'
import chunk from '../utils/chunk'

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
      hasFetchedFollowedUsers: false,
      profilePictures: [] as ProfilePicture[],
      api: null as Api | null,
      isSyncing: false,
    }
  },
  created() {
    if (process.server) return

    const token = (<any>this.$auth.strategy).token.get().replace('Bearer ', '')
    const twitchJs = new TwitchJs({
      token,
      clientId: process.env.twitchClientId,
    })
    this.api = twitchJs.api
    this.refresh()
  },
  methods: {
    fetchFollowed(cursor: string = ''): Promise<StreamerThumbnail[]> {
      if (this.hasFetchedFollowedUsers)
        return Promise.resolve(this.followedUsers)
      return new Promise((resolve, reject) => {
        this.api
          ?.get('users/follows', {
            search: {
              from_id: <string>this.$auth.user?.id,
              after: cursor,
            },
          })
          .then(async (followedUsersResponse: any) => {
            let followedUsers = followedUsersResponse.data.map(
              (u: any) =>
                <StreamerThumbnail>{
                  id: u.toId,
                  isLive: false,
                  displayName: u.toName,
                  viewerCount: 0,
                }
            )
            const nextCursor = followedUsersResponse.pagination.cursor
            if (nextCursor) {
              followedUsers = [
                ...followedUsers,
                ...(await this.fetchFollowed(nextCursor)),
              ]
            }

            this.hasFetchedFollowedUsers = true
            resolve(followedUsers)
          })
          .catch(reject)
      })
    },
    fetchStreams(cursor: string = ''): Promise<StreamerThumbnail[]> {
      return new Promise((resolve, reject) => {
        this.api
          ?.get('streams/followed', {
            search: {
              user_id: <string>this.$auth.user?.id,
              after: cursor,
            },
          })
          .then(async (followedStreamsResponse: any) => {
            let followedStreams = followedStreamsResponse.data.map(
              (s: any) => ({
                id: s.userId,
                thumbnail: s.thumbnailUrl
                  .replace('{width}', '404')
                  .replace('{height}', '227'),
                isLive: true,
                displayName: s.userName,
                viewerCount: s.viewerCount,
              })
            )

            const nextCursor = followedStreamsResponse.pagination.cursor
            if (nextCursor) {
              followedStreams = [
                ...followedStreams,
                ...(await this.fetchStreams(nextCursor)),
              ]
            }
            resolve(followedStreams)
          })
          .catch(reject)
      })
    },
    refresh() {
      if (this.isSyncing) return

      this.isSyncing = true
      Promise.all([
        this.fetchFollowed().then((followedUsers) => {
          this.followedUsers = followedUsers
          this.refreshProfilePictures()
        }),
        this.fetchStreams().then((followedStreams) => {
          this.followedStreams = followedStreams
        }),
      ]).finally(() => {
        this.isSyncing = false
      })
    },
    refreshProfilePictures() {
      const profileIdsToFetch = this.followedUsers
        .map((f) => f.id)
        // ignore already fetched profile pictures
        .filter((id) => !this.profilePictures.some((p) => p.id === id))

      // early return if there's nothing to fetch
      if (profileIdsToFetch.length === 0) return

      chunk(profileIdsToFetch, 100).forEach((chunkProfilesIdsToFetch) => {
        this.api
          ?.get('users', {
            search: {
              id: chunkProfilesIdsToFetch,
            },
          })
          .then(({ data }: any) => {
            data.forEach((user: any) => {
              this.profilePictures.push({
                id: user.id,
                picture: user.profileImageUrl.replace('300x300', '70x70'),
              })
            })
          })
      })
    },
    getUserPicture(id: string) {
      return this.profilePictures.find((p) => p.id === id)?.picture
    },
  },
  computed: {
    filteredFollowedUsers(): StreamerThumbnail[] {
      // filter out users that are online
      return this.followedUsers.filter(
        (u: any) =>
          !this.followedStreams.some((s) => s.displayName === u.toName)
      )
    },
    self() {
      return this.$auth.user
    },
  },
})
</script>
