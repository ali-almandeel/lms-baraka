<template>
    <v-btn density="comfortable" icon @click="$emit('click', $event)">
        <v-icon color="orange">mdi-pencil</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "EditButton",
};
</script>
