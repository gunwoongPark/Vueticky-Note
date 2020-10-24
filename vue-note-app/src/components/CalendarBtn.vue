<template>
<div>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 calendarBtn" fab dark color="blue">
                <v-icon dark> mdi-calendar </v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-date-picker color="blue" full-width v-model="picker" year-icon="mdi-calendar-blank" prev-icon="mdi-skip-previous" next-icon="mdi-skip-next"></v-date-picker>
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
    right: 5%;
    position: fixed;
    bottom: 25%;
    z-index: 10;
}
</style>
