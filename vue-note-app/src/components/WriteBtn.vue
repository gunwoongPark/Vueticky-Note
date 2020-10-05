<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 plusBtn"
          fab
          dark
          color="black"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <textarea v-model="title" cols="60" placeholder="Title"></textarea>
        </v-card-title>

        <v-card-text>
          <textarea
            v-model="text"
            placeholder="Take a note..."
            cols="60"
            rows="20"
          ></textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="createNew"> register </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,

      title: "",
      theme: "",
      text: "",
    };
  },
  methods: {
    createNew() {
      this.$emit("noteAdded", this.title, this.text, this.theme);
      this.dialog = false;
      this.title = "";
      this.text = "";
      this.theme = "";
    },
  },
};
</script>

<style scoped>
.plusBtn {
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 10;
}

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
</style>