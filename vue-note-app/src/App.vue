<template>
  <v-app>
    <v-main class="main">
      <Header
        style="z-index: 10"
        :tags="tags"
        @searchNote="searchNote"
        @selectTag="selectTag"
      />

      <v-btn
        v-if="isTagMode"
        class="mx-2 reloadBtn"
        fab
        dark
        color="error"
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

      <ChangeMode class="modeChangeBtn" />

      <!-- masonry 활용 -->
      <div class="noteContainer">
        <hr />
        <!-- 검색 후 렌더링 하니 masonry가 제대로 작동하지 않아 v-if를 v-show로 변경하니 정상 작동 -> 초기 렌더링 비용과 관계가 있어 보임-->
        <!-- 중요노트기능 -->
        <div v-show="isNormal" class="importantNotesContainer">
          <v-row>
            <p>Important Notes</p>
          </v-row>
          <v-row v-masonry item-selector=".imNoteList">
            <v-col
              class="imNoteList"
              v-for="(imNote, index) in importantNotes"
              :key="`imNote-${index}`"
              v-masonry-tile
              cols="12"
              lg="2"
              md="3"
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

        <!-- 일반 노트 기능 -->
        <div v-if="isNormal" class="normalNotesContainer">
          <v-row>
            <p>{{ showDate }}</p>
          </v-row>
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
                :note="note"
                :date="date"
                :tags="tags"
                @modifyNote="modifyNote"
                @deleteNote="deleteNote"
              />
            </v-col>
          </v-row>
        </div>

        <!-- 태그 검색 시 -->
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
              lg="2"
              md="3"
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

        <!-- 검색 시 -->
        <div v-if="isSearch" class="searchNotesContainer">
          <v-row>
            <p>Searched Notes</p>
          </v-row>
          <v-row v-masonry item-selector=".searchNoteList">
            <v-col
              class="searchNoteList"
              v-for="(searchNote, index) in searchNotes"
              :key="`searchNote-${index}`"
              v-masonry-tile
              cols="12"
              lg="2"
              md="3"
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
import ChangeMode from "./components/ChangeMode";

export default {
  components: {
    Header,
    WriteBtn,
    CalendarBtn,
    Card,
    TopBtn,
    CategoryBtn,
    ChangeMode,
  },

  data() {
    return {
      notes: [],
      todayNotes: [],
      importantNotes: [],
      searchNotes: [],
      mouseHover: false,
      date: "",
      showDate: "",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      tags: [],
      isTagMode: false,
      tagNotes: [],
      tag: "",

      isSearch: false,
      isNormal: true,
    };
  },

  computed: {
    isDark() {
      return this.$store.getters.getDark;
    },
  },

  // 최초 1회 날짜와 그 날짜에 맞는 노트를 받아옴
  mounted() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    this.date = `${year}-${month}-${day}`;

    let monthIndex = month - 1;

    // 보여줄 날짜
    this.showDate = `Notes of ${this.monthNames[monthIndex]} ${day}, year`;

    // 노트들 불러오기
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));

    // 각 노트의 태그들 불러오기
    if (localStorage.getItem("tags"))
      this.tags = JSON.parse(localStorage.getItem("tags"));

    this.$store.commit("initMode");

    // 최초 모드 적용
    if (this.$store.getters.getDark)
      document.querySelector(".main").style.background = "rgb(53,53,53)";
    else document.querySelector(".main").style.background = "white";
  },

  watch: {
    // 노트 변수를 감시하며 변경될때마다 로컬스토리 초기화
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
        this.todayNotes = this.notes.filter((note) => note.date === this.date);
        this.importantNotes = this.notes.filter(
          (note) => note.important === true
        );
        // vue-masonry 의 다시 그려주는 기능
        this.$nextTick(() => this.$redrawVueMasonry());
      },
    },

    // 날짜를 변경할 때 그 날짜에 맞는 노트를 받아옴
    date: {
      handler() {
        this.todayNotes = this.notes.filter((note) => note.date === this.date);

        let year = Number(this.date.slice(0, 4));
        let monthIndex = Number(this.date.slice(5, 7)) - 1;
        let day = Number(this.date.slice(8, 10));

        this.showDate = `Notes of ${this.monthNames[monthIndex]} ${day}, ${year}`;

        this.$nextTick(() => this.$redrawVueMasonry());
      },
      deep: true,
    },

    // 태그 변경할 때 해당 태그를 받아옴
    tags: {
      handler() {
        var newTags = this.tags;
        localStorage.setItem("tags", JSON.stringify(newTags));

        this.$nextTick(() => this.$redrawVueMasonry());
      },
    },

    isDark: {
      handler() {
        if (this.isDark)
          document.querySelector(".main").style.background = "rgb(53,53,53)";
        else document.querySelector(".main").style.background = "white";
      },
    },
  },
  computed: {
    brightness() {
      return this.$store.getters.getBrightness;
    },
  },
  methods: {
    // 노트 생성
    newNote(title, text, theme, time, date, guid, isImportant, tags) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        brightness: this.brightness,
        time: time,
        date: date,
        guid: guid,
        important: isImportant,
        tags: tags,
      });
    },

    // 노트 수정
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
      tempObj.brightness = this.brightness;
      tempObj.time = `Edited ${date} ${time}`;
      tempObj.guid = guid;
      tempObj.date = originDate;
      tempObj.important = important;
      tempObj.tags = tags;

      this.notes.splice(index, 1);
      this.notes.splice(index, 0, tempObj);
    },

    // 고유값을 이용한 노트 삭제
    deleteNote(guid) {
      const index = this.notes.findIndex((note) => note.guid === guid);

      this.notes.splice(index, 1);
    },

    // 달력에서 고른 날짜를 변수에 초기화
    selectDate(picker) {
      if (this.date !== picker) this.date = picker;
    },

    // 노트 검색 기능
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

    // 태그 변경 시 고른 태그를 변수에 초기화
    initTags(tags) {
      this.tags = tags;
    },

    // 태그 삭제
    deleteTag(index) {
      this.tags.splice(index, 1);
    },

    // 태그를 선택하여 출력을 태그모드로 변경
    selectTag(index) {
      this.isNormal = false;
      this.isSearch = false;
      this.isTagMode = true;

      this.tag = this.tags[index];
      this.tagNotes = this.todayNotes.filter((note) =>
        note.tags.includes(this.tags[index])
      );
    },

    // 태그 모드에서 다시 돌아오는 기능
    reloadOrigin() {
      this.isTagMode = false;
      this.isSearch = false;
      this.isNormal = true;
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
  font-size: 20px;
  color: gray;
}

.reloadBtn {
  right: 5%;
  position: fixed;
  bottom: 45%;
  z-index: 10;
}
</style>
