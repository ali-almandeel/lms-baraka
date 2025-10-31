<template>
    <v-btn icon @click="$emit('click')">
        <v-icon color="red">mdi-delete</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "DeleteButton",
};
</script>
