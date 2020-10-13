<template>
  <div>
    <v-dialog v-model="dialog" width="550">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
          class="note"
          :style="{ 'background-color': tempNote.theme }"
        >
          <div class="footerContainer">
            <v-spacer></v-spacer>
            <div class="iconContainer">
              <v-icon class="deleteIcon" @click.prevent="deleteNote(index)"
                >mdi-close-circle</v-icon
              >
            </div>
          </div>
          <div v-bind="attrs" v-on="on" @click.prevent="initData(index)">
            <v-card-title class="cardTitle">{{ tempNote.title }}</v-card-title>
            <v-card-text>{{ tempNote.text }}</v-card-text>
          </div>
        </v-card>
      </template>
      <Editor :notes="note" @noteModified="modifyNote" />
    </v-dialog>
  </div>
</template>

<script>
import Editor from "./Editor";
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  components: {
    Editor,
  },

  data() {
    return {
      notes: [],
      tempNote: {},
      dialog: false,
    };
  },

  created() {
    this.tempNote.title = this.note.title;
    this.tempNote.text = this.note.text;
    this.tempNote.theme = this.note.theme;
  },

  methods: {
    mouseEnter(e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },
    mouseLeave(e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },
    modifyNote(title, text, theme, time, date) {
      this.notes = JSON.parse(localStorage.getItem(this.date));
      this.notes[this.index].title = title;
      this.notes[this.index].text = text;
      this.notes[this.index].theme = theme;
      this.notes[this.index].time = `edited ${date} ${time}`;

      this.$emit("modifyNote", this.notes);
      this.dialog = false;
    },

    deleteNote(index) {
      this.notes = JSON.parse(localStorage.getItem(this.date));
      this.notes.splice(index, 1);

      this.$emit("deleteNote", this.notes);
    },
    initData(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      this.notes.title = notes[index].title;
      this.notes.text = notes[index].text;
      this.notes.theme = notes[index].theme;
      this.notes.date = this.date;
    },
  },
};
</script>

<style scoped>
.cardTitle {
  margin-top: -25px;
}
.footerContainer {
  display: flex;
}

.iconContainer {
  visibility: hidden;
}

.deleteIcon:hover {
  cursor: pointer;
}
</style>
