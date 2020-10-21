<template>
<div>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 categoryBtn" fab dark color="blue">
                <v-icon dark> mdi-tag-multiple </v-icon>
            </v-btn>
        </template>

        <v-card>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    }

}
</script>

<style scoped>
.categoryBtn {
    position: fixed;
    right: 5%;
    bottom: 35%;
    z-index: 10;
}
</style>
