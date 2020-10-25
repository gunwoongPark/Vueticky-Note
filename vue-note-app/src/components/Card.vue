<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          id="cardborder"
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
          class="note"
          :style="{ 'background-color': note.theme }"
        >
          <div class="Container">
            <v-icon v-if="note.important" class="starIcon">mdi-pin</v-icon>
            <v-spacer></v-spacer>

            <div class="MobileDeleteIconContainer hidden-md-and-up">
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

          <div v-bind="attrs" v-on="on" @click.prevent="initData">
            <v-card-title
              v-if="note.Brightness"
              style="color: black"
              class="cardTitle noteTitle"
            >
              <p>{{ note.title }}</p>
            </v-card-title>
            <v-card-title
              v-else
              style="color: white"
              class="cardTitle noteTitle"
            >
              <p>{{ note.title }}</p>
            </v-card-title>
            <v-card-text
              v-if="note.Brightness"
              style="color: black"
              class="noteText"
            >
              <Editor v-model="note.text" mode="viewer" />
            </v-card-text>
            <v-card-text v-else style="color: white" class="noteText">
              <Editor v-model="note.text" mode="viewer" />
            </v-card-text>
          </div>
        </v-card> </template
    ></v-dialog>
  </div>
</template>
        <ModifyEditor :note="note" :tags="tags" @noteModified="modifyNote" />
    </v-dialog>
  </div>
</template>

<script>
import {
  Editor
} from "vuetify-markdown-editor";
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
  mounted () {
    //console.log('hello')
    this.setBrightness(this.note.theme)
  },

  methods: {
    mouseEnter (e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },

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

    modifyNote (title, text, theme, Brightness, time, date, originDate, important, tags) {
      this.isSubmit = true;
      this.dialog = false;
      this.$emit("modifyNote", title, text, theme, Brightness, time, date, originDate, this.note.guid, important, tags);
      this.setBrightness(theme)
    },

    initData () {
      this.tempNote.title = this.note.title;
      this.tempNote.text = this.note.text;
      this.tempNote.theme = this.note.theme;
      this.tempNote.important = this.note.important
      this.tempNote.tags = this.note.tags;
    },

    deleteNote () {
      //   if (confirm("정말 삭제하시겠습니까?"))
      this.$emit("deleteNote", this.note.guid);

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
  },

  components: {
    ModifyEditor,
    Editor,
  },
};
</script>

<style scoped>
.cardTitle {
  margin-top: -25px;
}

.note {
  border-radius: 5px 50px 5px 50px;
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

p {
  white-space: pre-line;
}
.starIcon {
  color: rgb(181, 0, 0);
  margin-top: -20px;
}
</style>
