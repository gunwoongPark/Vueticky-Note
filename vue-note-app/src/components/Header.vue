<template>
  <div>
    <!-- <v-container fluid>
      <div class="PCView hidden-sm-and-down header">
        <v-row style="align-items: center">
          <v-col><img src="../assets/50VemoBlue.png" /></v-col>
          <v-col>
            <p>{{ this.date }}</p>
          </v-col>
          <v-col>
            <SearchBar @submitText="submitText" />
          </v-col>
        </v-row>
      </div>

      <div class="mobileView hidden-md-and-up header">
        <v-row style="align-items: center">
          <v-col cols="1"><img src="../assets/50VemoBlue.png" /></v-col>
          <v-col cols="11" style="text-align: center">
            <p>{{ this.date }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SearchBar @submitText="submitText" />
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-slide-group class="tagBar" show-arrows>
          <v-slide-item
            class="tagItems"
            v-for="(tag, index) in tags"
            :key="`tag-${index}`"
          >
            <v-btn class="mx-2" depressed rounded @click="selectTag(index)">
              {{ tag }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-row>
    </v-container> -->

    <v-container>
      <v-row class="searchContainer">
        <v-col cols="0" lg="3" md="2" sm="1"></v-col>

        <v-col cols="3" lg="1" md="2" sm="2">
          <img src="../assets/Memo_icon.svg.png" />
        </v-col>

        <v-col cols="9" lg="5" md="6" sm="8">
          <SearchBar @submitText="submitText"
        /></v-col>

        <v-col cols="0" lg="3" md="2" sm="1"></v-col>
      </v-row>
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
    submitText(text) {
      this.$emit("searchNote", text);
    },

    selectTag(index) {
      this.$emit("selectTag", index);
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

p {
  font-size: 25px;
  margin: 25px;
  margin-left: 11%;
  font-family: "Sansita Swashed", cursive;
}

.searchContainer {
  display: flex;
  align-items: center;
}
</style>
