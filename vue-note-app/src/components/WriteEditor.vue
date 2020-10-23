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
        <div class="divider"></div>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            Editor
            <v-sheet class="originText" color="white" elevation="5">
              <textarea
                placeholder="Take a note..."
                v-model="note.text"
                rows="17"
                style="width: 100%"
              >
              </textarea>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="6" lg="6" sm="12" xs="12">
            Previewer
            <v-sheet
              color="white"
              elevation="5"
              style="height: 401px; overflow: auto"
            >
              <Editor mode="viewer" v-model="note.text" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <Color :theme="note.theme" @selectedColor="initColor" />
        <v-icon
          class="starIcon"
          :class="{ important: note.isImportant }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="note.selectedTags"
          :menu-props="{ top: true, offsetY: true }"
          :items="tags"
          attach
          chips
          label="Tags"
          multiple
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="createNew"> register </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Editor } from "vuetify-markdown-editor";
import Color from "./Color";
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    tags: {
      type: Array,
      required: true,
    },
  },

  methods: {
    initColor(picker) {
      this.note.theme = picker;
    },
    createNew() {
      if (this.note.title === "" || this.note.text === "") {
        alert("제목이나 내용을 입력해주세요");
        return;
      }

      const dateObj = new Date();

      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const date = this.date;

      const time = `${hour}:${minutes}:${seconds}`;

      this.$emit(
        "noteAdded",
        this.note.title,
        this.note.text,
        this.note.theme,
        time,
        date,
        this.note.isImportant,
        this.note.selectedTags
      );

      this.note.isImportant = false;
    },

    addImportant() {
      this.note.isImportant = !this.note.isImportant;
    },
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

.important {
  color: yellow;
}

.divider {
  height: 20px;
}
</style>
