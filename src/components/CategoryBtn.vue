<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <!-- PC뷰 -->
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 tagBtn hidden-sm-and-down"
          fab
          dark
          color="teal lighten-3"
          @click="initData"
        >
          <v-icon dark> mdi-tag-multiple </v-icon>
        </v-btn>

        <!-- 모바일 뷰 -->
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 tagBtn hidden-md-and-up"
          fab
          dark
          small
          color="teal lighten-3"
          @click="initData"
        >
          <v-icon dark> mdi-tag-multiple </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="cardTitle">Tag Management</v-card-title>
        <v-card-text class="mt-5">
          <p>Registered Tags</p>

          <div v-if="tags.length">
            <v-chip
              class="tag"
              v-for="(tag, index) in tags"
              :key="`tag-${index}`"
              close
              @click:close="deleteTag(index)"
            >
              {{ tag }}
            </v-chip>
          </div>

          <div v-else>
            <p>There are no saved tags...</p>
          </div>

          <!-- <v-divider></v-divider> -->

          <!-- 그리드 레이아웃을 활용하여 버튼 배치를 반응형으로 구현 -->
          <!-- <v-row class="inputContainer">
            <v-col cols="12" lg="8" md="8" sm="12">
              <v-text-field
                color="teal"
                placeholder="Please enter a tag to register..."
                hide-details
                prepend-icon="mdi-tag"
                single-line
                type="text"
                v-model="text"
                @keyup.enter="registerTag"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12" style="text-align: center">
              <v-btn text @click="registerTag">register</v-btn>
            </v-col>
          </v-row> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      text: "",
    };
  },

  // dialog가 닫히면 데이터 전송
  watch: {
    dialog: {
      handler() {
        this.$emit("initTags", this.tags);
      },
    },
  },

  methods: {
    initData() {
      this.text = "";
    },

    deleteTag(index) {
      this.$emit("deleteTag", index);
    },

    // 등록 및 예외처리
    // registerTag() {
    //   this.text = this.text.toLowerCase();

    //   if (this.text === "") {
    //     alert("태그명을 입력해주세요");
    //     return;
    //   }

    //   var blank_pattern = /[\s]/g;
    //   if (blank_pattern.test(this.text) == true) {
    //     alert("태그에는 공백은 사용할 수 없습니다. ");
    //     this.text = "";
    //     return;
    //   }

    //   if (this.text.length > 20) {
    //     alert("태그가 너무 깁니다.");
    //     this.text = "";
    //     return;
    //   }

    //   if (this.tags.indexOf(this.text) !== -1) {
    //     alert("이미 등록된 태그가 있습니다.");
    //     this.text = "";
    //     return;
    //   }

    //   this.tags.push(this.text);
    //   this.text = "";
    // },
  },
};
</script>

<style scoped>
.cardTitle {
  background: #009688;
  color: white;
}

.inputContainer {
  display: flex;
  align-items: center;
}

.tag {
  margin: 2px;
}

.categoryBtn {
  right: 2%;
  position: fixed;
  bottom: 28%;
  z-index: 10;
}
</style>
