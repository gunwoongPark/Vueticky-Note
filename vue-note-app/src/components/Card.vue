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
              <v-icon class="deleteIcon" @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >
            </div>

            <div class="PCDeleteIconContainer hidden-sm-and-down">
              <v-icon class="deleteIcon" @click.prevent="deleteNote"
                >mdi-close-circle</v-icon
              >
            </div>
          </div>

          <div v-bind="attrs" v-on="on" @click.prevent="initData">
            <v-card-title class="cardTitle noteTitle">
              <p>{{ note.title }}</p>
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

  data() {
    return {
      dialog: false,
      isSubmit: false,
      tempNote: {},
    };
  },

  watch: {
    dialog: {
      handler() {
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

  methods: {
    mouseEnter(e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },

    mouseLeave(e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },

    modifyNote(title, text, theme, time, date, originDate, important, tags) {
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
        tags
      );
    },

    initData() {
      this.tempNote.title = this.note.title;
      this.tempNote.text = this.note.text;
      this.tempNote.theme = this.note.theme;
      this.tempNote.important = this.note.important;
      this.tempNote.tags = this.note.tags;

      this.isSubmit = false;
    },

    deleteNote() {
      if (confirm("정말 삭제하시겠습니까?"))
        this.$emit("deleteNote", this.note.guid);
    },

    closeDialog() {
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
  margin-top: -15px;
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
</style>
