<template>
  <div>
    <!-- 날짜를 선택하고 반환하는 UI컴포넌트 활용 -->
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <!-- PC뷰 -->
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 calendarBtn hidden-sm-and-down"
          fab
          dark
          color="teal lighten-1"
        >
          <v-icon dark> mdi-calendar </v-icon>
        </v-btn>

        <!-- 모바일 뷰 -->
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2 calendarBtn hidden-md-and-up"
          fab
          dark
          small
          color="teal lighten-1"
        >
          <v-icon dark> mdi-calendar </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-date-picker
          color="teal"
          full-width
          v-model="picker"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="selectDate">select</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  created() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    this.picker = `${year}-${month}-${day}`;
  },
  data() {
    return {
      picker: "",
      dialog: false,
    };
  },
  methods: {
    selectDate() {
      this.dialog = false;
      this.$emit("selectDate", this.picker);
    },
  },
};
</script>

<style scoped>
.calendarBtn {
  right: 2%;
  position: fixed;
  bottom: 20%;
  z-index: 10;
}
</style>
