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
          <v-col style="text-align: right" cols="3"
            ><img class="logo" src="../assets/Vemomint.png"
          /></v-col>
          <v-col cols="8">
            <SearchBar @submitText="submitText" />
          </v-col>
          <v-sheet max-width="350" style="background-color: #e0f2f1">
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
          </v-sheet>
        </v-row>
      </div>
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
.gr {
  border: solid 1px lightgray;
}

.header {
  display: flex;
  background: #e0f2f1c2;
  color: #2196f3;
  position: fixed;
  left: 0;
  right: 0;
}

.logo {
  margin-top: -5px;
}
</style>

