<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          id="pattern"
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
          class="note"
          :style="{ 'background-color': note.theme }"
        >
          <div class="Container">
            <v-icon v-if="note.important" class="starIcon"
              >mdi-brightness-1</v-icon
            >
            <v-spacer class="hidden-sm-and-down"></v-spacer>

            <div class="MobileDeleteIconContainer hidden-md-and-up">
              <v-icon
                v-if="note.brightness"
                style="color: black"
                class="deleteIcon"
                :class="{ noImportantIcon: !note.important }"
                @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >

              <v-icon
                v-else
                style="color: white"
                class="deleteIcon"
                :class="{ noImportantIcon: !note.important }"
                @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >
            </div>

            <div class="PCDeleteIconContainer hidden-sm-and-down">
              <v-icon
                v-if="note.brightness"
                style="color: black"
                class="deleteIcon"
                @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >

              <v-icon
                v-else
                style="color: white"
                class="deleteIcon"
                @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >
            </div>
          </div>

          <div
            class="inCard"
            v-bind="attrs"
            v-on="on"
            @click.prevent="initData"
          >
            <v-card-title
              v-if="note.brightness"
              style="color: black"
              class="cardTitle noteTitle"
            >
              <p>{{ note.title }}</p>

              <v-divider
                style="border-color: black; margin-left: 10px"
              ></v-divider>
            </v-card-title>

            <v-card-title
              v-else
              style="color: white"
              class="cardTitle noteTitle"
            >
              <p>{{ note.title }}</p>

              <v-divider
                style="border-color: white; margin-left: 10px"
              ></v-divider>
            </v-card-title>
            <img id="image" v-if="note.imagePath" :src="note.imagePath" />
            <v-card-text class="noteText">
              <Editor v-model="note.text" mode="viewer" />
            </v-card-text>
          </div>
        </v-card>
      </template>
      <ModifyEditor
        :note="note"
        :tags="tags"
        @noteModified="modifyNote"
        @closeDialog="closeDialog"
      />
    </v-dialog>
  </div>
</template>
       
<script>
import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';
import { Editor } from "vuetify-markdown-editor";
import ModifyEditor from "./ModifyEditor";
export default {
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

  data () {
    return {
      dialog: false,
      isSubmit: false,
      tempNote: {},
    };
  },

  // 사용자가 dialog를 비정상적으로 닫거나 등록을 안하고 닫을 경우 나올 예외처리를 하기 위해 dialog를 감시 후 변수를 초기화하여 조건문을 사용할 수 있도록 해 모든 상황에서 예외처리
  // 카드의 출력이 변경하지 않아도 렌더링 되는 경우를 방지 할 수 있음
  watch: {
    dialog: {
      handler () {
        if (this.dialog === false && this.isSubmit === false) {
          this.note.title = this.tempNote.title;
          this.note.text = this.tempNote.text;
          this.note.theme = this.tempNote.theme;
          this.$store.commit("setBrightness", this.tempNote.theme);
          this.note.brightness = this.brightness;
          this.note.important = this.tempNote.important;
          this.note.tags = this.tempNote.tags;
          this.note.imagePath = this.tempNote.imagePath;
        }
      },
    },
  },
  async created () {
    this.model = tf.sequential();
    this.model = await cocoSSD.load(); //cocoSSD라는 detection model을 로딩 동기식으로 
    //console.log(this.model);
    console.log("model loaded");
    this.predict();
    this.model = null;

  },
  mounted () {
    //this.setBrightness(this.note.theme) 
    this.$store.commit("setBrightness", this.note.theme);

  },
  computed: {
    brightness () {
      return this.$store.getters.getBrightness;
    },
  },
  methods: {
    async predict () {
      console.log(this.note.title);

      var img = document.createElement("img");
      img.setAttribute("src", this.note.imagePath);

      //var img = document.getElementById("image");

      let tmp = await this.model.detect(img);
      console.log(tmp)

      //this.predicted = tmp[0].class
    },

    mouseEnter (e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },

    mouseLeave (e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },

    modifyNote (
      title,
      text,
      theme,
      time,
      date,
      originDate,
      important,
      tags,
      imagePath
    ) {
      this.isSubmit = true;
      this.dialog = false;
      this.$emit(
        "modifyNote",
        title,
        text,
        theme,
        time,
        date,
        originDate,
        this.note.guid,
        important,
        tags,
        imagePath
      );
    },

    // 버튼을 누를 경우 데이터 초기화
    initData () {
      this.tempNote.title = this.note.title;
      this.tempNote.text = this.note.text;
      this.tempNote.theme = this.note.theme;
      this.$store.commit("setBrightness", this.note.theme);
      this.tempNote.important = this.note.important;
      this.tempNote.tags = this.note.tags;
      this.tempNote.imagePath = this.note.imagePath;

      this.isSubmit = false;
    },

    deleteNote () {
      if (confirm("정말 삭제하시겠습니까?"))
        this.$emit("deleteNote", this.note.guid);
    },

    closeDialog () {
      this.dialog = false;
    },
  },

  components: {
    ModifyEditor,
    Editor,
  },
};
</script>

<style scoped>
.note {
  border-radius: 50px 5px 50px 5px;
}

.cardTitle {
  margin-top: -25px;
}
.noteTitle {
  font-size: 25px;
  font-weight: bold;
}

.note {
  border-radius: 50px 5px 50px 5px;
}

.Container {
  display: flex;
}

.PCDeleteIconContainer {
  visibility: hidden;
}

.deleteIcon:hover {
  cursor: pointer;
}

.noImportantIcon {
  margin: 0 0 0 -10px;
}

p {
  white-space: pre-line;
}
.starIcon {
  color: rgb(181, 0, 0);
  margin: 0 0 0 -10px;
}

.inCard {
  margin: 20px;
}
.inCard img {
  max-width: 100%;
  height: auto;
  display: block;
}

.cardDiv {
  margin: 10px;
}
</style>
