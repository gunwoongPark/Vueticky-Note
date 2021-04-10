<template>
  <!-- WriteEditor.vue와 대부분 동일 -->
  <div>
    <v-card class="dialogBox" v-click-outside="onClickOutside">
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
        <div id="fileContainer">
          <input
            type="file"
            id="modifyImage"
            @change="changeImage"
            accept="image/*"
          />

          <v-icon id="cancelImageIcon" @click="cancelImage"
            >mdi-close-thick</v-icon
          >
        </div>

        <v-img
          v-if="note.imagePath"
          :src="note.imagePath"
          alt="image error"
        ></v-img>
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
        <!-- <v-select
          class="ml-2 mr-2"
          v-model="note.tags"
          :menu-props="{ top: true, offsetY: true }"
          :items="tags"
          attach
          chips
          color="teal"
          label="Tags"
          multiple
        ></v-select> -->
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
            <!-- <v-select
              class="ml-2 mr-2"
              color="teal"
              v-model="note.tags"
              :menu-props="{ top: true, offsetY: true }"
              :items="tags"
              attach
              chips
              label="Tags"
              multiple
            ></v-select> -->
          </v-col>
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
import { Editor } from "vuetify-markdown-editor";
import Color from "./Color";
export default {
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
    brightness() {
      return this.$store.getters.getBrightness;
    },
    model() {
      return this.$store.getters.getModel;
    },
  },

  data() {
    return {
      delTag: "",
      addTag: "",
    };
  },

  mounted() {
    this.originImage = this.note.imagePath;
  },

  methods: {
    // 일단 이미지가 들어왔을 때
    changeImage(e) {
      let file = e.target.files;
      // 이미지 용량 예외처리(500KB초과 시 alert)
      if (file[0].size > 500000) {
        alert("용량이 500KB가 초과되는 이미지는 업로드가 제한됩니다.");
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (e) => {
          this.note.imagePath = e.target.result;
        };
      }
    },

    initColor(picker) {
      this.note.theme = picker;
      this.$store.commit("setBrightness", this.note.theme);
      this.note.brightness = this.brightness;
    },

    cancelImage() {
      this.note.imagePath = "";
      document.querySelector("#modifyImage").value = "";
    },

    // 객체 탐지 함수
    async predict() {
      var img = document.createElement("img");
      img.setAttribute("src", this.note.imagePath);
      let tmp = await this.model.detect(img);

      return new Promise(function (resolve) {
        // 감지된 객체가 없을 경우
        if (!tmp.length) resolve(null);
        // 감지된 객체가 있을 경우
        resolve(tmp[0].class);
      });
    },

    async modifyNote() {
      if (this.note.title === "" || this.note.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      // 이미지가 있는 경우
      if (this.note.imagePath) {
        // 해당 이미지의 객체가 감지 될 때
        let predictResult = await this.predict()
        if (predictResult !== null) {
          const delIndex = this.note.tags.indexOf(this.note.detectedTag);
          if (delIndex !== -1) this.note.tags.splice(delIndex, 1);

          this.delTag = this.note.detectedTag;

          this.note.tags.push(predictResult);

          this.note.detectedTag = predictResult;

          this.addTag = predictResult;
        }

        // 해당 이미지의 객체가 감지 되지 않을 때
        else {
          const delIndex = this.note.tags.indexOf(this.note.detectedTag);
          if (delIndex !== -1) this.note.tags.splice(delIndex, 1);

          this.delTag = this.note.detectedTag;

          this.note.detectedTag = "";

          this.addTag = "";
        }
      }
      // 이미지가 없을 때
      else {
        const delIndex = this.note.tags.indexOf(this.note.detectedTag);
        if (delIndex !== -1) this.note.tags.splice(delIndex, 1);

        this.delTag = this.note.detectedTag;

        this.note.detectedTag = "";

        this.addTag = "";
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
        this.note.imagePath,
        this.note.detectedTag,
        this.delTag,
        this.addTag
      );

      this.newImg = null;
    },
    addImportant() {
      this.note.important = !this.note.important;
    },

    bindKor(event) {
      this.note.text = event.target.value;
    },

    closeDialog() {
      this.$emit("closeDialog");
      this.newImg = null;
    },

    onClickOutside() {
      this.newImg = null;
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

#modifyImage {
  display: inline-block;
}

#fileContainer {
  display: flex;
  justify-content: space-between;
}
</style>
