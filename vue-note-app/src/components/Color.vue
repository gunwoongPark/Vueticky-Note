<template>
<div>
    <v-dialog v-model="dialog" width="300">
        <template v-slot:activator="{on, attrs}">

            <v-icon v-bind="attrs" v-on="on" class="colorIcon" @click="initColor">mdi-palette</v-icon>

        </template>

        <v-card>

            <v-color-picker class="palette" hide-mode-switch v-model="picker" show-swatches></v-color-picker>

            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="selectColor">select</v-btn>
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

            picker: ""
        }
    },
    props: {
        theme: {
            type: String,
            required: true
        }
    },

    created() {
        this.picker = this.theme
    },

    methods: {
        selectColor() {
            this.dialog = false;
            this.$emit("selectedColor", this.picker);
        },
        initColor() {
            this.picker = this.theme
        }
    },

}
</script>

<style scoped>
.colorIcon:hover {
    cursor: pointer;
}
</style>
