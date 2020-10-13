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
            <v-card-title class="cardTitle"
              ><p>{{ tempNote.title }}</p></v-card-title
            >
            <v-card-text
              ><p>{{ tempNote.text }}</p></v-card-text
            >
          </div>
        </v-card>
      </template>
      <ModifyEditor :note="note" @noteModified="modifyNote" />
    </v-dialog>
  </div>
</template>

<script>
import ModifyEditor from "./ModifyEditor";
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

  data() {
    return {
      tempNote: {
        title: this.note.title,
        text: this.note.text,
        theme: this.note.theme,
      },
      dialog: false,
    };
  },

  methods: {
    mouseEnter(e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },
    mouseLeave(e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },
    modifyNote(title, text, theme, time, date) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      notes[this.index].title = title;
      notes[this.index].text = text;
      notes[this.index].theme = theme;
      notes[this.index].time = `edited ${date} ${time}`;

      this.tempNote.title = title;
      this.tempNote.text = text;
      this.tempNote.theme = theme;

      this.dialog = false;

      this.$emit("modifyNote", notes);
    },

    deleteNote(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      notes.splice(index, 1);

      this.$emit("deleteNote", notes);
    },
    initData(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      this.note.title = notes[index].title;
      this.note.text = notes[index].text;
      this.note.theme = notes[index].theme;
      this.note.date = this.date;
    },
  },

  components: {
    ModifyEditor,
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

p {
  white-space: pre-line;
}
</style>
