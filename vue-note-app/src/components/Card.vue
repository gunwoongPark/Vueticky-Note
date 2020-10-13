<template>
  <div>
    <v-dialog v-model="dialog" width="550">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
          class="note"
          :style="{ 'background-color': note.theme }"
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
              ><p>{{ note.title }}</p></v-card-title
            >
            <v-card-text
              ><p>{{ note.text }}</p></v-card-text
            >
          </div>
        </v-card>
      </template>
      <ModifyEditor :note="tempNote" @noteModified="modifyNote" />
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
    allNotes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      tempNote: {},
      dialog: false,
    };
  },

  created() {
    console.log("Card created : ", this.allNotes);
  },

  methods: {
    mouseEnter(e) {
      e.target.firstChild.lastChild.style.visibility = "visible";
    },

    mouseLeave(e) {
      e.target.firstChild.lastChild.style.visibility = "hidden";
    },

    modifyNote(title, text, theme, time, date) {
      console.log("modifunc! : ", this.allNotes);

      let dateNotes = JSON.parse(localStorage.getItem(this.date));

      dateNotes[this.index].title = title;
      dateNotes[this.index].text = text;
      dateNotes[this.index].theme = theme;
      dateNotes[this.index].time = `edited ${date} ${time}`;

      this.dialog = false;

      this.$emit("modifyNote", dateNotes, this.index);
    },

    deleteNote(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      notes.splice(index, 1);

      this.$emit("deleteNote", notes);
    },
    initData(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      this.tempNote.title = notes[index].title;
      this.tempNote.text = notes[index].text;
      this.tempNote.theme = notes[index].theme;
      this.tempNote.date = this.date;
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
