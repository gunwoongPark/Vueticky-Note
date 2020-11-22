<template>
  <!-- WriteEditor.vue와 대부분 동일 -->
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

        <div v-if="this.brightness" class="time" style="color: rgb(95, 95, 95)">
          {{ note.time }}
        </div>
        <div v-else class="time" style="color: rgb(220, 220, 220)">
          {{ note.time }}
        </div>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            MarkDown Editor:
            <v-sheet class="mb-2 mt-2" color="white" elevation="5">
              <v-container fluid>
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
      </v-card-text>

      <v-divider></v-divider>

      <!-- PCView -->
      <v-card-actions class="hidden-sm-and-down">
        <Color :theme="note.theme" @selectedColor="initColor" />
        <v-icon
          class="starIcon"
          :class="{ important: note.important }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="note.tags"
          :menu-props="{ top: true, offsetY: true }"
          :items="tags"
          attach
          chips
          color="teal"
          label="Tags"
          multiple
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="closeDialog"> cancel </v-btn>
        <v-btn color="black" text @click="modifyNote"> modify </v-btn>
      </v-card-actions>

      <!-- mobileView -->
      <v-container fluid class="hidden-md-and-up">
        <v-row style="display: flex; align-items: center">
          <v-col cols="1"
            ><Color :theme="note.theme" @selectedColor="initColor"
          /></v-col>
          <v-col cols="1"
            ><v-icon
              class="starIcon"
              :class="{ important: note.important }"
              @click="addImportant"
              >mdi-star</v-icon
            ></v-col
          >
          <v-col cols="10">
            <v-select
              class="ml-2 mr-2"
              color="teal"
              v-model="note.tags"
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
            ><v-btn color="black" text @click="modifyNote">
              modify
            </v-btn></v-col
          >
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// import axios from "axios";
// import ipObj from "../ip.js"
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
    tags: {
      type: Array,
      required: true,
    },
  },

  computed: {
    brightness () {
      return this.$store.getters.getBrightness;
    },
    imgName () {
      return this.$store.getters.getImgName;
    }
  },
  methods: {
    initColor (picker) {
      this.note.theme = picker;
      this.$store.commit('setBrightness', this.note.theme);
      this.note.brightness = this.brightness;
    },

    modifyNote () {
      if (this.note.title === "" || this.note.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      const originDate = this.note.date;

      const dateObj = new Date();

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const date = `${year}-${month}-${day}`;

      const time = `${hour}:${minutes}:${seconds}`;


      this.$emit(
        "noteModified",
        this.note.title,
        this.note.text,
        this.note.theme,

        time,
        date,
        originDate,
        this.note.important,
        this.note.tags,
        this.note.image,
        this.files
      );
    },
    addImportant () {
      this.note.important = !this.note.important;
    },

    bindKor (event) {
      this.note.text = event.target.value;
    },

    closeDialog () {
      this.$emit("closeDialog");
    },
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
  /* font */
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

.time {
  color: rgb(102, 102, 102);
  font-size: 15px;
  margin-bottom: -10px;
  text-align: right;
  width: 100%;
}

.important {
  color: red;
}
.Vdivider {
  margin-top: -10px;
}

.cardFooter {
  margin-top: -20px;
}
</style>
