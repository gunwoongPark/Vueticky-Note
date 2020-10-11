<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          class="modifyIcon"
          @click.prevent="initData(index)"
          >mdi-pen</v-icon
        >
      </template>
      <Editor :notes="notes" @noteModified="modifyNote" />
    </v-dialog>
  </div>
</template>

<script>
import Editor from "./Editor";
export default {
  data() {
    return {
      notes: {
        title: "",
        text: "",
        theme: "",
        date: "",
      },

      dialog: false,
    };
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  methods: {
    initData(index) {
      let notes = JSON.parse(localStorage.getItem(this.date));
      this.notes.title = notes[index].title;
      this.notes.text = notes[index].text;
      this.notes.theme = notes[index].theme;
      this.notes.date = this.date;
    },

    modifyNote(title, text, theme, time, date) {
      this.dialog = false;
      this.$emit("noteModified", title, text, theme, this.index, time, date);
    },
  },

  components: {
    Editor,
  },
};
</script>

<style scoped>
</style>
