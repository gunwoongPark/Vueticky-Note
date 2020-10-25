<template>
  <div class="header">
    <v-container>
      <!-- <div class="PCView hidden-sm-and-down">
        <v-row>
          <v-col style="text-align: right" cols="4"
            ><img class="logo" src="../assets/Vemomint.png"
          /></v-col>
          <v-col cols="5">
            <SearchBar @submitText="submitText" />
            <v-sheet max-width="680px" style="background-color: #e0f2f1"
              ><v-slide-group class="tagBar" show-arrows>
                <v-slide-item
                  style="background-color: #00bfa5"
                  class="tagItems"
                  v-for="(tag, index) in tags"
                  :key="`tag-${index}`"
                >
                  <v-btn
                    class="mx-2"
                    depressed
                    rounded
                    @click="selectTag(index)"
                  >
                    {{ tag }}
                  </v-btn>
                </v-slide-item>
              </v-slide-group></v-sheet
            >
          </v-col>
        </v-row>
      </div>

      <div class="mobileView hidden-md-and-up">
        <v-row>
          <v-col
            ><img class="logo" src="../assets/Vemomint.png" /></v-col></v-row
        ><v-row>
          <v-col>
            <SearchBar @submitText="submitText" />
            <v-sheet max-width="100%" style="background-color: #e0f2f1">
              <v-slide-group class="tagBar" show-arrows>
                <v-slide-item
                  style="background-color: #00bfa5"
                  class="tagItems"
                  v-for="(tag, index) in tags"
                  :key="`tag-${index}`"
                >
                  <v-btn
                    class="mx-2"
                    depressed
                    rounded
                    @click="selectTag(index)"
                  >
                    {{ tag }}
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </div> -->

      <v-row class="searchContainer">
        <v-col cols="0" lg="3" md="2" sm="1"></v-col>
        <v-col cols="3" lg="1" md="2" sm="2">
          <img class="logo" src="../assets/Vemomint.png" />
        </v-col>
        <v-col cols="9" lg="5" md="6" sm="8">
          <SearchBar @submitText="submitText"
        /></v-col>
        <v-col cols="0" lg="3" md="2" sm="1"></v-col>
      </v-row>
      <v-row>
        <v-col class="tagContainer"
          ><v-slide-group class="tagBar" show-arrows>
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
          </v-slide-group></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
  props: {

    tags: {
      type: Array,
      required: true,
    },
  },

  methods: {
    submitText (text) {
      this.$emit("searchNote", text);
    },
    selectTag (idx) {
      this.$emit("tagSelected", idx);
    }
  },

  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  background: #e0f2f1c2;
  color: #2196f3;
  position: fixed;
  left: 0;
  right: 0;
}

.logo {
  margin: -30px 0 0 10px;
}

.searchContainer {
  display: flex;
  align-items: center;
}

.tagContainer {
  margin-top: -40px;
  display: flex;
  justify-content: center;
}
</style>

