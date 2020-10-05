App.vue

<template>
  <v-app>
    <v-main>
      <Header style="z-index: 10" />

      <CalendarBtn />

      <WriteBtn @noteAdded="newNote" />

      <div class="noteContainer">
        <v-row v-masonry item-selector=".note">
          <v-col
            class="note"
            v-for="(note, index) in notes"
            :key="`note-${index}`"
            v-masonry-tile
            :style="{ 'background-color': note.theme }"
            cols="12"
            lg="2"
            md="3"
            sm="6"
          >
            <v-card>
              <div class="delete">
                <v-spacer></v-spacer>
                <v-icon dark class="modifyIcon" @click="modifyNote(index)"
                  >mdi-pen</v-icon
                >
                <v-icon
                  dark
                  class="deleteIcon"
                  @click.prevent="deleteNote(index)"
                  >mdi-delete</v-icon
                >
              </div>
              <v-card-title>{{ note.title }}</v-card-title>
              <v-card-text>{{ note.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import CalendarBtn from "./components/CalendarBtn";

export default {
  components: { Header, WriteBtn, CalendarBtn },

  data() {
    return {
      notes: [],
    };
  },

  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
  },

  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },

  methods: {
    newNote(title, text, theme) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    modifyNote(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.noteContainer {
  margin-top: 100px;
  margin-left: 25px;
  margin-right: 25px;
}

.delete {
  display: flex;
  background: black;
}

.deleteIcon:hover {
  cursor: pointer;
}

.modifyIcon:hover {
  cursor: pointer;
}
</style>