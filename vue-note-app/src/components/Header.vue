<template>
  <div class="mb-3">
    <!-- 그리드 레이아웃을 활용하여 헤더를 반응형으로 배치 -->
    <v-container>
      <!-- 로고와 검색 바 -->
      <v-row class="searchContainer">
        <v-col class="offsetCols" cols="1" lg="2" md="1" sm="2"></v-col>
        <v-col cols="2" lg="1" md="1" sm="2">
          <img class="hidden-sm-and-down" src="../assets/Memo_icon.png" />
          <img class="hidden-md-and-up" src="../assets/Memo_icon_xs.png" />
        </v-col>
        <v-col cols="8" lg="6" md="8" sm="6">
          <SearchBar @submitText="submitText"
        /></v-col>
        <v-col class="hidden-sm-and-down" cols="12" lg="1" md="1"
          ><WeatherBtn
        /></v-col>
        <v-col class="offsetCols" cols="1" lg="2" md="1" sm="2"></v-col>
      </v-row>

      <!-- 태그들 -->
      <v-row>
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

    <WeatherBtn class="hidden-md-and-up mobileView" />

    <GoogleLogin />

    <GoogleLogout />
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import WeatherBtn from "./WeatherBtn";
import GoogleLogin from "./GoogleLogin";
import GoogleLogout from "./GoogleLogout";

export default {
  props: {
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
    WeatherBtn,
    GoogleLogin,
    GoogleLogout,
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

.mobileView {
  left: 2%;
  position: fixed;
  bottom: 12%;
  z-index: 10;
}
</style>

