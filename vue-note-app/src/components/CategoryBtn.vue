<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 tagBtn"
          fab
          dark
          color="#80CBC4"
          @click="initData"
        >
          <v-icon dark> mdi-tag-multiple </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="cardTitle">Tag</v-card-title>
        <v-card-text class="mt-5">
          <p>Registered tags</p>

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

          <v-divider></v-divider>

          <v-row class="inputContainer">
            <v-col cols="12" lg="8" md="8" sm="12">
              <v-text-field
                color="blue"
                placeholder="Type your tag..."
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
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      tags: [],
      text: ""
    }
  },

  mounted () {
    if (localStorage.getItem("tags"))
      this.tags = JSON.parse(localStorage.getItem("tags"));
  },

  watch: {
    dialog: {
      handler () {
        this.$emit("initTags", this.tags);
      }
    }
  },

  methods: {
    initData () {
      this.text = ""
    },

    deleteTag (index) {
      this.$emit("deleteTag", index);
    },

    registerTag () {
      if (this.text === "") {
        alert("태그명을 입력해주세요");
        return;
      }
      this.tags.push(this.text);
      this.text = "";
    },

    // selectTag(index) {
    //     this.$emit("selectTag", this.tags[index]);
    //     this.dialog = false;
    // }
  }

}
</script>

<style scoped>
.cardTitle {
  background: #4db6ac;
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
  right: 5%;
  position: fixed;
  bottom: 35%;
  z-index: 10;
}
</style>
