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
          cols="100"
          placeholder="Title"
        ></textarea>

        <textarea
          v-else
          style="color: white"
          v-model="note.title"
          cols="100"
          placeholder="Title"
        ></textarea>
        <v-spacer></v-spacer>
        <div v-if="this.Brightness" class="time" style="color: rgb(95, 95, 95)">
          {{ note.time }}
        </div>
        <div v-else class="time" style="color: rgb(220, 220, 220)">
          {{ note.time }}
        </div>
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
          :class="{ important: note.important }"
          @click="addImportant"
          >mdi-star</v-icon
        >
        <v-select
          class="ml-2 mr-2"
          v-model="selectedItem"
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
    }
  },

  data () {
    return {
      selectedItem: this.note.tags,
      Brightness: true

    }


  },
  mounted () {
    this.setBrightness(this.note.theme)

  },

  methods: {
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
    initColor (picker) {
      this.note.theme = picker;
      this.setBrightness(this.note.theme)

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
        this.selectedItem
      );
    },
    addImportant () {
      this.note.important = !this.note.important
    },
    onClickOutside () {
      this.selectedItem = this.note.tags;
    }

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

.time {
  font-size: 15px;
  margin-bottom: -10px;
}

.important {
  color: red;
}

.newline {
  height: 20px;
}
</style>
