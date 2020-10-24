<template>
  <div>
    <v-card class="dialogBox">
      <v-card-title
        class="headline lighten-2"
        :style="{ backgroundColor: note.theme }"
      >
        <textarea
          v-model="note.title"
          placeholder="Title"
          style="width: 100%"
        ></textarea>

        <div class="time">{{ note.time }}</div>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            Editor:
            <v-sheet class="mb-2 mt-2" color="white" elevation="5">
              <v-container fluid>
                <textarea
                  placeholder="Take a note..."
                  @input="bindKor"
                  :value="note.text"
                  rows="16"
                  style="width: 100%"
                ></textarea>
              </v-container>
            </v-sheet>
            <a href="https://heropy.blog/2017/09/30/markdown/" target="_blank"
              >How to Use MarkDown</a
            >
          </v-col>

          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            Previewer:
            <v-sheet
              class="mt-2"
              color="white"
              elevation="5"
              style="height: 403px; overflow: auto"
            >
              <Editor mode="viewer" v-model="note.text" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

      <hr class="Vdivider" />
      <v-card-actions class="cardFooter">
        <Color :theme="note.theme" @selectedColor="initColor" />
        <v-icon
          class="starIcon"
          :class="{ important: note.important }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="note.tags"
          :menu-props="{ top: true, offsetY: true }"
          :items="tags"
          attach
          chips
          label="Tags"
          multiple
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="modifyNote"> modify </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  Editor
} from "vuetify-markdown-editor";
import Color from "./Color";
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },

  methods: {
    initColor (picker) {
      this.note.theme = picker;
    },

    modifyNote () {
      if (this.note.title === "" || this.note.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      const originDate = this.note.date;

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
        this.note.title,
        this.note.text,
        this.note.theme,
        time,
        date,
        originDate,
        this.note.important,
        this.note.tags
      );
    },
    addImportant () {
      this.note.important = !this.note.important;
    },

    bindKor (event) {
      this.note.text = event.target.value;
    }
  },

  components: {
    Color,
    Editor,
  },
};
</script>

<style scoped>
textarea {
  padding: 10px;
  resize: none;
  border: none;
  /* font */
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

.time {
  color: rgb(102, 102, 102);
  font-size: 15px;
  margin-bottom: -10px;
  text-align: right;
  width: 100%;
}

.important {
  color: red;
}
.Vdivider {
  margin-top: -10px;
}

.cardFooter {
  margin-top: -20px;
}
</style>
