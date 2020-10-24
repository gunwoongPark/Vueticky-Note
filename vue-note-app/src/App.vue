<template>
  <v-app>
    <v-main>
      <Header
        style="z-index: 10"
        :date="date"
        :tags="tags"
        @searchNote="searchNote"
        @selectTag="selectTag"
      />

      <v-btn
        v-if="isTagMode"
        class="mx-2 reloadBtn"
        fab
        dark
        color="blue"
        @click="reloadOrigin"
      >
        <v-icon dark> mdi-reload </v-icon>
      </v-btn>

      <CategoryBtn
        class="categoryBtn"
        @initTags="initTags"
        @deleteTag="deleteTag"
      />

      <CalendarBtn class="calendarBtn" @selectDate="selectDate" />

      <WriteBtn
        class="writeBtn"
        @noteAdded="newNote"
        :date="date"
        :tags="tags"
      />

      <TopBtn class="topBtn" />

      <div class="noteContainer">
        <!-- 검색 후 렌더링 하니 masonry가 제대로 작동하지 않아 v-if를 v-show로 변경하니 정상 작동 -> 초기 렌더링 비용과 관계가 있어 보임-->
        <div v-show="isNormal" class="importantNotesContainer">
          <v-row>
            <p>Important Notes :</p>
          </v-row>
          <v-row v-masonry item-selector=".imNoteList">
            <v-col
              class="imNoteList"
              v-for="(imNote, index) in importantNotes"
              :key="`imNote-${index}`"
              v-masonry-tile
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <Card
                :note="imNote"
                :date="date"
                :tags="tags"
                @modifyNote="modifyNote"
                @deleteNote="deleteNote"
              />
            </v-col>
          </v-row>
        </div>

        <hr v-if="isNormal" />

        <div v-if="isNormal" class="normalNotesContainer">
          <v-row>
            <p>Normal Notes :</p>
          </v-row>
          <v-row v-masonry item-selector=".noteList">
            <v-col
              class="noteList"
              v-for="(note, index) in todayNotes"
              :key="`note-${index}`"
              v-masonry-tile
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <Card
                :note="note"
                :date="date"
                :tags="tags"
                @modifyNote="modifyNote"
                @deleteNote="deleteNote"
              />
            </v-col>
          </v-row>
        </div>

        <div v-if="isTagMode" class="tagNotesContainer">
          <v-row>
            <p>Tag : {{ tag }}</p>
          </v-row>
          <v-row v-masonry item-selector=".tagNoteList">
            <v-col
              class="tagNoteList"
              v-for="(tagNote, index) in tagNotes"
              :key="`tagNote-${index}`"
              v-masonry-tile
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <Card
                :note="tagNote"
                :date="date"
                :tags="tags"
                @modifyNote="modifyNote"
                @deleteNote="deleteNote"
              />
            </v-col>
          </v-row>
        </div>

        <div v-if="isSearch" class="searchNotesContainer">
          <v-row>
            <p>Search Notes :</p>
          </v-row>
          <v-row v-masonry item-selector=".searchNoteList">
            <v-col
              class="searchNoteList"
              v-for="(searchNote, index) in searchNotes"
              :key="`searchNote-${index}`"
              v-masonry-tile
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <Card
                :note="searchNote"
                :date="date"
                :tags="tags"
                @modifyNote="modifyNote"
                @deleteNote="deleteNote"
              />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import CalendarBtn from "./components/CalendarBtn";
import Card from "./components/Card";
import TopBtn from "./components/TopBtn";
import CategoryBtn from "./components/CategoryBtn";

export default {
  components: {
    Header,
    WriteBtn,
    CalendarBtn,
    Card,
    TopBtn,
    CategoryBtn,
  },

  data() {
    return {
      notes: [],
      todayNotes: [],
      importantNotes: [],
      searchNotes: [],
      mouseHover: false,
      date: "",
      tags: [],
      isTagMode: false,
      tagNotes: [],
      tag: "",

      isMobile: false,
      isSearch: false,
      isNormal: true,
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

    if (localStorage.getItem("tags"))
      this.tags = JSON.parse(localStorage.getItem("tags"));

    let intFrameWidth = window.innerWidth;
    // 최초 PC 뷰
    if (intFrameWidth <= 600) {
      document.querySelector(".noteContainer").style.marginTop = "0px";
    }
    // 최초 mobile 뷰
    else {
      document.querySelector(".noteContainer").style.marginTop = "0px";
    }

    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
        this.todayNotes = this.notes.filter((note) => note.date === this.date);
        this.importantNotes = this.notes.filter(
          (note) => note.important === true
        );

        this.$nextTick(() => this.$redrawVueMasonry());
      },
    },

    date: {
      handler() {
        this.todayNotes = this.notes.filter((note) => note.date === this.date);

        this.$nextTick(() => this.$redrawVueMasonry());
      },
      deep: true,
    },

    tags: {
      handler() {
        var newTags = this.tags;
        localStorage.setItem("tags", JSON.stringify(newTags));

        this.$nextTick(() => this.$redrawVueMasonry());
      },
    },
  },

  methods: {
    newNote(title, text, theme, time, date, guid, isImportant, tags) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        time: time,
        date: date,
        guid: guid,
        important: isImportant,
        tags: tags,
      });
    },

    modifyNote(
      title,
      text,
      theme,
      time,
      date,
      originDate,
      guid,
      important,
      tags
    ) {
      const index = this.notes.findIndex((note) => note.guid === guid);

      let tempObj = {};
      tempObj.title = title;
      tempObj.text = text;
      tempObj.theme = theme;
      tempObj.time = `edited ${date} ${time}`;
      tempObj.guid = guid;
      tempObj.date = originDate;
      tempObj.important = important;
      tempObj.tags = tags;

      this.notes.splice(index, 1);
      this.notes.splice(index, 0, tempObj);
    },

    deleteNote(guid) {
      const index = this.notes.findIndex((note) => note.guid === guid);

      this.notes.splice(index, 1);
    },

    selectDate(picker) {
      if (this.date !== picker) this.date = picker;
    },

    searchNote(memo) {
      this.isNormal = false;
      this.isTagMode = false;
      this.isSearch = true;
      let notes = JSON.parse(localStorage.getItem("notes"));
      if (memo === "") {
        this.isSearch = false;
        this.isTagMode = false;
        this.isNormal = true;
        this.todayNotes = notes.filter((note) => note.date === this.date);
      } else {
        let todayNotes = notes.filter((note) => note.date === this.date);

        this.searchNotes = todayNotes.filter(
          (note) => note.title.includes(memo) || note.text.includes(memo)
        );
      }
    },

    initTags(tags) {
      this.tags = tags;
    },

    deleteTag(index) {
      this.tags.splice(index, 1);
    },

    selectTag(index) {
      this.isNormal = false;
      this.isSearch = false;
      this.isTagMode = true;

      this.tag = this.tags[index];
      this.tagNotes = this.todayNotes.filter((note) =>
        note.tags.includes(this.tags[index])
      );
    },

    reloadOrigin() {
      this.isTagMode = false;
      this.isSearch = false;
      this.isNormal = true;
    },

    handleResize() {
      let intFrameWidth = window.innerWidth;
      if (intFrameWidth <= 600) {
        document.querySelector(".noteContainer").style.marginTop = "0px";
      } else {
        document.querySelector(".noteContainer").style.marginTop = "0px";
      }
    },
  },
};
</script>

<style scoped>
.noteContainer {
  margin-left: 25px;
  margin-right: 25px;

  font-family: nanum;
  /* font */
}

hr {
  border: dashed 2px lightgray;
}

p {
  font-family: "Sansita Swashed", cursive;
  font-size: 20px;
  color: #2196f3;
}

.reloadBtn {
  right: 5%;
  position: fixed;
  bottom: 45%;
  z-index: 10;
}
</style>
