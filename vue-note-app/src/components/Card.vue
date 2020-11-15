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
            <v-spacer></v-spacer>

            <div class="MobileDeleteIconContainer hidden-md-and-up">
              <v-icon
                v-if="note.Brightness"
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
                v-if="note.Brightness"
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
              v-if="note.Brightness"
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
          this.note.important = this.tempNote.important;
          this.note.tags = this.tempNote.tags;
        }
      },
    },
  },
  mounted () {
    //console.log('hello')
    this.setBrightness(this.note.theme)
  },
  methods: {
    mouseEnter (e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },

    mouseLeave (e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },

    modifyNote (title, text, theme, Brightness, time, date, originDate, important, tags) {
      this.isSubmit = true;
      this.dialog = false;
      this.$emit(
        "modifyNote",
        title,
        text,
        theme,
        Brightness,
        time,
        date,
        originDate,
        this.note.guid,
        important,
        tags
      );
    },
    setBrightness (color) {
      let hexR = color.substring(1, 3);
      let hexG = color.substring(3, 5);
      let hexB = color.substring(5, 7);

      let decR = parseInt(hexR, 16);
      let decG = parseInt(hexG, 16);
      let decB = parseInt(hexB, 16);

      let v = (decR + decG + decB) / 3;
      //console.log(v);
      (v < 120) ? this.note.Brightness = false : this.note.Brightness = true;
    },
    // 버튼을 누를 경우 데이터 초기화
    initData () {
      this.tempNote.title = this.note.title;
      this.tempNote.text = this.note.text;
      this.tempNote.theme = this.note.theme;
      this.tempNote.important = this.note.important;
      this.tempNote.tags = this.note.tags;

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
  margin: -10px 0 0 -7px;
}

.inCard {
  margin: 20px;
}

.cardDiv {
  margin: 10px;
}
</style>
