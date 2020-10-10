<template>
<div>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{on, attrs}">

            <v-btn v-bind="attrs" v-on="on" class="mx-2 calendarBtn" fab dark color="black">
                <v-icon dark> mdi-calendar </v-icon>
            </v-btn>

        </template>

        <v-card>
            <v-date-picker color="black" full-width v-model="picker" year-icon="mdi-calendar-blank" prev-icon="mdi-skip-previous" next-icon="mdi-skip-next"></v-date-picker>
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
    data() {
        return {
            picker: new Date().toISOString().substr(0, 10),

            dialog: false,
        }
    },
    methods: {
        selectDate() {
            this.dialog = false;
            this.$emit("selectDate", this.picker);
        }
    }
};
</script>

<style scoped>
.calendarBtn {
    position: fixed;
    right: 5%;
    bottom: 15%;
    z-index: 10;
}
</style>
