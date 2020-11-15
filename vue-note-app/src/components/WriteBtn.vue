<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 writeBtn"
          fab
          dark
          color="teal darken-2"
          style="z-index: 10"
          @click="initData"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <WriteEditor
        :date="date"
        :note="note"
        @noteAdded="newNote"
        @closeDialog="closeDialog"
        :tags="tags"
      />
    </v-dialog>
  </div>
</template>

<script>
import cryptoRandomString from "crypto-random-string";
import WriteEditor from "./WriteEditor";
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      note: {
        title: "",
        text: "",
        theme: "#FFFFFFFF",
        isImportant: false,
        selectedTags: [],
      },

      dialog: false,
    };
  },

  methods: {
    // 버튼을 눌러 dialog에 진입 시 기존 데이터 초기화 -> 사용자가 입력 중 dialog가 비정상적으로 닫힐 경우 해당 내용을 기억하지 않고 초기화!
    initData () {
      this.note.title = "";
      this.note.text = "";
      this.note.theme = "rgb(240,240,240)";
      this.note.isImportant = false;
      this.note.selectedTags = [];
      this.note.Brightness = "true"
    },

    newNote (title, text, theme, Brightness, time, date, isImportant, tags) {
      this.dialog = false;
      this.$emit(
        "noteAdded",
        title,
        text,
        theme,
        Brightness,
        time,
        date,
        cryptoRandomString({
          length: 10,
        }),
        isImportant,
        tags
      );
    },

    closeDialog () {
      this.dialog = false;
    },
  },

  components: {
    WriteEditor,
  },
};
</script>

<style scoped>
.writeBtn {
  right: 5%;
  position: fixed;
  bottom: 15%;
  z-index: 10;
}
</style>
