<template>
<div>
    <v-card>
        <v-card-title class="headline grey lighten-2">
            <textarea v-model="notes.title" cols="60" placeholder="Title"></textarea>
        </v-card-title>

        <v-card-text>
            <textarea v-model="notes.text" placeholder="Take a note..." cols="60" rows="20"></textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
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
        if (this.notes.text === "") {
            this.isModify = false;
        } else {
            this.isModify = true;
        }
    },

    methods: {
        createNew() {
            this.$emit(
                "noteAdded",
                this.notes.title,
                this.notes.text,
                this.notes.theme
            );
        },

        modifyNote() {
            this.$emit(
                "noteModified",
                this.notes.title,
                this.notes.text,
                this.notes.theme
            );
        },
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
</style>
