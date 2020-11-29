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
        <v-file-input
          id="inputImage2"
          @change="changeImage"
          @click:clear="cancelImage"
          v-model="note.imageFile"
          accept="image/*"
          color="teal"
          counter
          placeholder="Input Image"
          prepend-icon="mdi-camera"
        ></v-file-input>
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
    brightness () {
      return this.$store.getters.getBrightness;
    },
    model () {
      return this.$store.getters.getModel;
    },
  },

  data () {
    return {
      newImg: null,
      isChange: false,
      originImage: "",
      delTag: "",
      addTag: "",
    };
  },

  mounted () {
    this.originImage = this.note.imagePath;
  },

  methods: {
    // 일단 이미지가 들어왔을 때
    changeImage () {

      if (this.note.imageFile) { //이미지가 입력 됐을 경우
        //console.log(this.note.imageFile);
        let input = document.querySelector("#inputImage2");
        let fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onload = (e) => {
          if (e.target.result !== this.originImage) this.isChange = true;
          this.note.imagePath = e.target.result;


        };
      }
    },
    initColor (picker) {
      this.note.theme = picker;
      this.$store.commit("setBrightness", this.note.theme);
      this.note.brightness = this.brightness;
    },

    cancelImage () {
      this.note.imagePath = "";

      const delIndex = this.note.tags.indexOf(this.note.detectedTag);
      this.note.tags.splice(delIndex, 1);

      // 사진 -> 글
      this.delTag = this.note.detectedTag;
      this.addTag = "";

      //this.note.detectedTag = ""; 이미지 삭제 버튼을 누른 후 수정할 경우 기존 detectedTag가 필요
    },

    // 객체 탐지 함수
    async predict () {
      var img = document.createElement("img");
      img.setAttribute("src", this.note.imagePath);
      let tmp = await this.model.detect(img);

      return new Promise(function (resolve) {
        if (!tmp.length) resolve(null);

        resolve(tmp[0].class);
      });
    },

    async modifyNote () {
      // 우선 이미지가 들어와야하고 변경 또한 되어야 함
      if (this.note.imagePath) {
        if (this.isChange) {
          if ((await this.predict()) !== null) {// 감지된 객체가 있을 경우
            //감지된 객체가 있을 경우에도 기존의 태그는 지워야 함 
            const delIndex = this.note.tags.indexOf(this.note.detectedTag);
            this.note.tags.splice(delIndex, 1);

            this.note.tags.push(await this.predict());
            this.delTag = this.note.detectedTag; //기존의 감지된 태그 
            this.note.detectedTag = await this.predict();
            this.addTag = await this.predict();
          } else {// 사진은 변경됐지만 감지된 객체가 없을 경우
            console.log("사진은 변경됐지만 감지된 객체가 없음!");
            const delIndex = this.note.tags.indexOf(this.note.detectedTag);
            this.note.tags.splice(delIndex, 1);

            this.delTag = this.note.detectedTag;
            this.addTag = "";

            this.note.detectedTag = "";
          }
        }
      }

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

      console.log("add : ", this.addTag);
      console.log("del : ", this.delTag);

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
        this.addTag,
        this.note.imageFile,
      );

      this.newImg = null;

      this.isChange = false;
    },
    addImportant () {
      this.note.important = !this.note.important;
    },

    bindKor (event) {
      this.note.text = event.target.value;
    },

    closeDialog () {
      this.$emit("closeDialog");
      this.newImg = null;
    },

    onClickOutside () {
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
