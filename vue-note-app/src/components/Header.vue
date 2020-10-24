<template>
  <div class="header">
    <v-container fluid>
      <div class="PCView hidden-sm-and-down">
        <v-row>
          <v-col style="text-align: right" cols="4"
            ><img class="logo" src="../assets/Vemomint.png"
          /></v-col>
          <v-col cols="5">
            <SearchBar @submitText="submitText" />
          </v-col>
          <!-- <v-col style="text-align: left">
            <p>{{ this.date }}</p>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col style="margin-left: 33%; margin-top: -25px">
            <v-slide-group class="tagBar" show-arrows>
              <v-slide-item
                style="background-color: #00bfa5"
                class="tagItems"
                v-for="(tag, index) in tags"
                :key="`tag-${index}`"
              >
                <v-btn class="mx-2" depressed rounded @click="selectTag(index)">
                  {{ tag }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
            <div></div>
          </v-col>
        </v-row>
      </div>

      <div class="mobileView hidden-md-and-up">
        <v-row>
          <v-col style="text-align: right" cols="3"
            ><img class="logo" src="../assets/Vemomint.png"
          /></v-col>
          <v-col cols="8">
            <SearchBar @submitText="submitText" />
          </v-col>
          <!-- <v-col style="text-align: left">
            <p>{{ this.date }}</p>
          </v-col> -->
        </v-row>

        <v-row>
          <v-col style="margin-left: 25%">
            <v-slide-group class="tagBar" show-arrows>
              <v-slide-item
                style="background-color: #00bfa5"
                class="tagItems"
                v-for="(tag, index) in tags"
                :key="`tag-${index}`"
              >
                <v-btn class="mx-2" depressed rounded @click="selectTag(index)">
                  {{ tag }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
            <div></div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
  props: {
    date: {
      type: String,
      required: true,

    },
    tags: {
      type: Array,
      required: true,
    },
  },

  methods: {
    submitText (text) {
      this.$emit("searchNote", text);
    },
  },

  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  background: rgba(255, 255, 255, 0.741);
  color: #2196f3;
  position: fixed;
  left: 0;
  right: 0;
}

.logo {
  margin-top: -5px;
}
</style>
