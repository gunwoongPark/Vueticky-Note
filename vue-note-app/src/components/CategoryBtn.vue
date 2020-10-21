<template>
<div>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 categoryBtn" fab dark color="blue" @click="initData">
                <v-icon dark> mdi-tag-multiple </v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="cardTitle">Category</v-card-title>
            <v-card-text class="mt-5">
                <p>Registered Categories</p>

                <v-chip class="category" v-for="(tag, index) in tags" :key="`category-${index}`" close @click:close="deleteTag(index)">
                    {{ tag }}
                </v-chip>

                <v-divider></v-divider>

                <v-row class="inputContainer">
                    <v-col cols="12" lg="8" md="8" sm="12">
                        <v-text-field color="blue" placeholder="Type your category..." hide-details prepend-icon="mdi-tag" single-line type="text" v-model="text"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12" style="text-align:center;">
                        <v-btn text @click="registerCategory">register</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            tags: [],
            text: ""
        }
    },
    mounted() {
        if (localStorage.getItem("category"))
            this.tags = JSON.parse(localStorage.getItem('category'));
    },

    watch: {
        tags: {
            handler() {
                var newTags = this.tags;
                localStorage.setItem("category", JSON.stringify(newTags));
            }
        }
    },

    methods: {
        initData() {
            this.text = ""
        },

        deleteTag(index) {
            this.tags.splice(index, 1);
        },

        registerCategory() {
            if (this.text === "") {
                alert("카테고리를 입력해주세요");
                return;
            }
            this.tags.push(this.text);
            this.text = "";
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

.cardTitle {
    background: #2196f3;
    color: white;
}

.inputContainer {
    display: flex;
    align-items: center;
}

.category {
    margin: 2px;
}
</style>
