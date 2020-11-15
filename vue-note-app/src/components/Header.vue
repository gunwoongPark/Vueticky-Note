<template>
  <div class="header mb-3">
    <!-- 그리드 레이아웃을 활용하여 헤더를 반응형으로 배치 -->
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
      <v-row>
        <!-- 태그들을 담는 container -->
        <v-col class="tagContainer"
          ><v-slide-group class="tagBar" show-arrows>
            <v-slide-item
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
    tags: {
      type: Array,
      required: true,
    },
  },

  methods: {
    submitText (text) {
      this.$emit("searchNote", text);
    },

    selectTag (index) {
      this.$emit("selectTag", index);
    },
  },

  components: {
    SearchBar,
  },
};
</script>

<style scoped>
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

.tagContainer {
  display: flex;
  justify-content: center;
}
</style>

