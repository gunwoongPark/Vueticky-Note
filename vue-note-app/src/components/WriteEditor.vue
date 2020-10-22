<template>
  <div>
    <v-card class="dialogBox" v-click-outside="onClickOutside">
      <v-card-title
        class="headline lighten-2"
        :style="{ backgroundColor: note.theme }"
      >
        <textarea
          v-if="this.Brightness"
          style="color: black"
          v-model="note.title"
          cols="65"
          placeholder="Title"
        ></textarea>
        <textarea
          v-else
          style="color: white"
          v-model="note.title"
          cols="65"
          placeholder="Title"
        ></textarea>
        <div class="divider"></div>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <textarea
          v-model="note.text"
          placeholder="Take a note..."
          cols="65"
          rows="17"
        ></textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <Color :theme="note.theme" @selectedColor="initColor" />
        <v-icon
          class="starIcon"
          :class="{ important: isImportant }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="selectedTags"
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
    }
  },

  data () {
    return {
      selectedTags: [],
      isImportant: false,
      Brightness: true
    }
  },

  methods: {
    initColor (picker) {
      this.note.theme = picker;
      this.setBrightness(this.note.theme)
    },
    createNew () {
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
        this.isImportant,
        this.selectedTags
      );

      this.isImportant = false;
    },

    addImportant () {
      this.isImportant = !this.isImportant;
    },

    onClickOutside () {
      this.isImportant = false;
      this.selectedTags = [];
    },
    setBrightness (color) {
      let hexR = color.substring(1, 3);
      let hexG = color.substring(3, 5);
      let hexB = color.substring(5, 7);

      let decR = parseInt(hexR, 16);
      let decG = parseInt(hexG, 16);
      let decB = parseInt(hexB, 16);

      let v = (decR + decG + decB) / 3;
      //console.log(v);

      (v < 120) ? this.Brightness = false : this.Brightness = true;
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

.important {
  color: red;
}

.divider {
  height: 20px;
}
</style>
