<template>
  <div>
    <v-dialog v-model="dialog" width="550">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 plusBtn"
          fab
          dark
          color="black"
          style="z-index: 10"
          @click="initData"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <WriteEditor :note="note" @noteAdded="newNote" />
    </v-dialog>
  </div>
</template>

<script>
import WriteEditor from "./WriteEditor";
export default {
  data() {
    return {
      note: {
        title: "",
        text: "",
        theme: "#FFFFFFFF",
      },

      dialog: false,
    };
  },

  methods: {
    initData() {
      console.log("init!", this.note.title, this.note.text, this.note.theme);
      this.note.title = "";
      this.note.text = "";
      this.note.theme = "#FFFFFFFF";
    },

    newNote(title, text, theme, time, date) {
      this.dialog = false;
      this.$emit("noteAdded", title, text, theme, time, date);
    },
  },

  components: {
    WriteEditor,
  },
};
</script>

<style scoped>
.plusBtn {
  position: fixed;
  right: 5%;
  bottom: 5%;
}
</style>
