<template>
  <div>
    <v-card class="dialogBox">
      <v-card-title class="headline lighten-2">
        <textarea
          v-model="notes.title"
          cols="65"
          placeholder="Title"
        ></textarea>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <textarea
          v-model="notes.text"
          placeholder="Take a note..."
          cols="65"
          rows="20"
        ></textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <Color :theme="notes.theme" @selectedColor="initColor" />

        <v-spacer></v-spacer>
        <v-btn v-if="!isModify" color="black" text @click="createNew">
          register
        </v-btn>
        <v-btn v-if="isModify" color="black" text @click="modifyNote">
          modify
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Color from "./Color";
export default {
  data() {
    return {
      isModify: false,
    };
  },
  props: {
    notes: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    if (this.notes.text === "") this.isModify = false;
    else this.isModify = true;
  },

  methods: {
    createNew() {
      if (this.notes.title === "" || this.notes.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      //이런식으로 오늘 날짜 말고 선택한 날짜 받자!
      const dateObj = new Date();

      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const date = this.notes.date;

      const time = `${hour}:${minutes}:${seconds}`;

      this.$emit(
        "noteAdded",
        this.notes.title,
        this.notes.text,
        this.notes.theme,
        time,
        date
      );
    },

    modifyNote() {
      if (this.notes.title === "" || this.notes.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      const dateObj = new Date();

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const date = `${year}-${month}-${day}`;

      const time = `${hour}:${minutes}:${seconds}`;

      this.$emit(
        "noteModified",
        this.notes.title,
        this.notes.text,
        this.notes.theme,
        time,
        date
      );
    },

    initColor(theme) {
      this.notes.theme = theme;
    },
  },

  components: {
    Color,
  },
};
</script>

<style scoped>
textarea {
  padding: 10px;
  resize: none;
  border: none;
}

textarea:hover {
  outline: 0;
}

textarea:focus {
  outline: 0;
}

.dialogBox {
  overflow: hidden;
}
</style>
