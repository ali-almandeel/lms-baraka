<template>
    <v-btn density="comfortable" class="bg-white-darken-1" icon @click="$emit('click')">
        <v-icon color="red">mdi-delete</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "DeleteButton",
};
</script>
