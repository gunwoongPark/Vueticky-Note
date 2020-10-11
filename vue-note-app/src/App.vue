<template>
  <v-app>
    <v-main>
      <Header style="z-index: 10" />

      <CalendarBtn @selectDate="selectDate" />

      <WriteBtn @noteAdded="newNote" :date="date" />

      <div class="noteContainer">
        <v-row v-masonry item-selector=".noteList">
          <v-col
            class="noteList"
            v-for="(note, index) in notes"
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

  // 최초 시작 시 오늘 불러오는 기능!
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
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
    // 날짜를 변경하면
    date: {
      handler() {
        // 빈 배열 생성
        if (!localStorage.getItem(`${this.date}`))
          localStorage.setItem(`${this.date}`, JSON.stringify([]));
        else {
          this.todayNotes = JSON.parse(localStorage.getItem(`${this.date}`));
        }
      },
      deep: true,
    },

    todayNotes: {
      handler() {},
    },
    deep: true,
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

    modifyNote(notes) {
      this.notes = notes;
    },

    deleteNote(notes) {
      this.notes = notes;
    },

    selectDate(picker) {
      if (this.date === picker) {
        console.log("same!");
      } else {
        this.date = picker;
        console.log(this.date);
      }
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
