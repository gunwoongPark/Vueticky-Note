<template>
  <div>
    <v-card class="dialogBox">
      <v-card-title
        class="headline lighten-2"
        :style="{ backgroundColor: note.theme }"
      >
        <textarea
          v-if="this.brightness"
          style="color: black; width: 100%"
          v-model="note.title"
          placeholder="Title"
        ></textarea>
        <textarea
          v-else
          style="color: white; width: 100%"
          v-model="note.title"
          placeholder="Title"
        ></textarea>

        <div class="divider"></div>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            MarkDown Editor:
            <v-sheet class="mt-2 mb-2" color="white" elevation="5">
              <v-container>
                <textarea
                  placeholder="Take a note..."
                  @input="bindKor"
                  :value="note.text"
                  rows="16"
                  style="width: 100%"
                ></textarea>
              </v-container>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            Previewer:
            <v-sheet
              class="mt-2"
              color="white"
              elevation="5"
              style="height: 403px; overflow: auto"
            >
              <Editor mode="viewer" v-model="note.text" />
            </v-sheet>
          </v-col>
        </v-row>

        <!-- 사진 등록 -->
        <v-file-input
          v-model="files"
          accept="image/*"
          color="teal"
          counter
          placeholder="Input Image"
          prepend-icon="mdi-camera"
        ></v-file-input>

        <!-- <img :src="testPath" /> -->
      </v-card-text>

      <v-divider></v-divider>

      <!-- PCView -->
      <v-card-actions class="hidden-sm-and-down">
        <Color :theme="note.theme" @selectedColor="initColor" />
        <v-icon
          class="starIcon"
          :class="{ important: note.isImportant }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="note.selectedTags"
          :menu-props="{ top: true, offsetY: true }"
          :items="tags"
          color="teal"
          attach
          chips
          label="Tags"
          multiple
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="closeDialog"> cancel </v-btn>
        <v-btn color="black" text @click="createNew"> register </v-btn>
      </v-card-actions>

      <!-- mobileView -->
      <!-- 모바일 뷰는 화면이 작기 때문에 버튼 배치를 사용자가 누르기 편한 위치로 조정 -->
      <v-container fluid class="hidden-md-and-up">
        <v-row style="display: flex; align-items: center">
          <v-col cols="1"
            ><Color :theme="note.theme" @selectedColor="initColor"
          /></v-col>
          <v-col cols="1"
            ><v-icon
              class="starIcon"
              :class="{ important: note.isImportant }"
              @click="addImportant"
              >mdi-star</v-icon
            ></v-col
          >
          <v-col cols="10">
            <v-select
              class="ml-2 mr-2"
              color="teal"
              v-model="note.selectedTags"
              :menu-props="{ top: true, offsetY: true }"
              :items="tags"
              attach
              chips
              label="Tags"
              multiple
            ></v-select
          ></v-col>
        </v-row>

        <v-row style="text-align: center">
          <v-col
            ><v-btn color="black" text @click="closeDialog">
              cancel
            </v-btn></v-col
          >
          <v-col
            ><v-btn color="black" text @click="createNew">
              register
            </v-btn></v-col
          >
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ipObj from "../ip.js"
import { Editor } from "vuetify-markdown-editor";
import Color from "./Color";
export default {
  data () {
    return {
      files: null
    }
  },
  props: {
    note: {
      type: Object,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    tags: {
      type: Array,
      required: true,
    },
  },

  computed: {
    brightness () {
      return this.$store.getters.getBrightness;
    }
  },

  methods: {
    // 팔레트에서 받아온 색 초기화
    initColor (picker) {
      this.note.theme = picker;
      this.$store.commit('setBrightness', this.note.theme)
      //this.setBrightness(this.note.theme)
    },

    // 노트 생성
    createNew () {

      // 입력 예외처리
      if (this.note.title === "" || this.note.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      const dateObj = new Date();

      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const date = this.date;

      const time = `${hour}:${minutes}:${seconds}`;

      if (this.files) { //이미지 파일을 입력한 경우에만
        //console.log(this.files.name);
        let form = new FormData();
        form.append("image", this.files);
        form.append("noteID", this.note.guid);
        //this.$store.commit("imgUpload", form);  //서버에 이미지 업로드 요청
        axios.post(`${ipObj.ip}/imageUpload`, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then((res) => {
            console.log(res.status + ":Success of ImageUploading");

          })
          .catch((err) => {
            console.log(err.res);
          })
        this.note.image = true;
      }

      this.$emit(
        "noteAdded",
        this.note.title,
        this.note.text,
        this.note.theme,
        time,
        date,
        this.note.guid,
        this.note.isImportant,
        this.note.selectedTags,
        this.note.image

      );

      this.note.isImportant = false;


    },


    addImportant () {
      this.note.isImportant = !this.note.isImportant;
    },

    bindKor (event) {
      this.note.text = event.target.value;
    },
    closeDialog () {
      this.$emit("closeDialog");
    }
  },

  components: {
    Color,
    Editor,
  },
};
</script>

<style scoped>
textarea {
  padding: 10px;
  resize: none;
  border: none;
}

textarea:hover {
  outline: 0;
}

textarea:focus {
  outline: 0;
}

.dialogBox {
  overflow: hidden;
}

.important {
  color: red;
}

.divider {
  height: 20px;
}
</style>
