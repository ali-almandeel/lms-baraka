<template>
    <v-btn class="!p-0" icon @click="$emit('click')">
        <v-icon color="orange">mdi-pencil</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "EditButton",
};
</script>
