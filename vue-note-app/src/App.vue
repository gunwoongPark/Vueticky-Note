<template>
  <v-app>
    <v-main>
      <Header style="z-index: 10" :date="date" />

      <CalendarBtn @selectDate="selectDate" />

      <WriteBtn @noteAdded="newNote" :date="date" />

      <div class="noteContainer">
        <v-row v-masonry item-selector=".noteList">
          <v-col
            class="noteList"
            v-for="(note, index) in todayNotes"
            :key="`note-${index}`"
            v-masonry-tile
            cols="12"
            lg="2"
            md="3"
            sm="6"
          >
            <Card
              :index="index"
              :note="note"
              :date="date"
              @modifyNote="modifyNote"
              @deleteNote="deleteNote"
            />
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
import Card from "./components/Card";

export default {
  components: {
    Header,
    WriteBtn,
    CalendarBtn,
    Card,
  },

  data() {
    return {
      notes: [],
      todayNotes: [],
      mouseHover: false,
      date: "",
    };
  },

  mounted() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    this.date = `${year}-${month}-${day}`;

    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
  },

  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        this.todayNotes = newNotes.filter(
          (note) => note.date === `${this.date}`
        );
        localStorage.setItem("notes", JSON.stringify(newNotes));
        localStorage.setItem(`${this.date}`, JSON.stringify(this.todayNotes));
      },
    },

    date: {
      handler() {
        if (!localStorage.getItem(`${this.date}`)) {
          localStorage.setItem(`${this.date}`, JSON.stringify([]));
          this.todayNotes = JSON.parse(localStorage.getItem(`${this.date}`));
        } else {
          this.todayNotes = JSON.parse(localStorage.getItem(`${this.date}`));
        }
      },
      deep: true,
    },
  },

  methods: {
    newNote(title, text, theme, time, date) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        time: time,
        date: date,
      });
    },

    modifyNote(newDateNotes) {
      // this.notes = notes;
      console.log(newDateNotes);
      let allDateNotes = JSON.parse(localStorage.getItem(`${this.date}`));
      console.log(allDateNotes);
    },

    deleteNote(notes) {
      this.notes = notes;
    },

    selectDate(picker) {
      if (this.date !== picker) this.date = picker;
    },
  },
};
</script>

<style scoped>
.calendarBtn {
  position: fixed;
  right: 5%;
  bottom: 15%;
}

.noteContainer {
  margin-top: 100px;
  margin-left: 25px;
  margin-right: 25px;
}
</style>
