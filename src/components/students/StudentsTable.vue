<template>
    <v-data-table :headers="headers" :items="students" :loading="isLoading" loading-text="Loading Students"
        @click:row="$emit('view', $event)" class="elevation-3 px-2">
        <template #item.imageUrl="{ item }">
            <v-avatar size="40">
                <img :src="item.imageUrl" alt="Avatar" />
            </v-avatar>
        </template>

        <template #item.actions="{ item }">
            <div class="d-flex gap-3">
                <EditBtn @click.stop="$emit('edit', item)" />
                <DeleteBtn @click.stop="$emit('delete', item)" />
            </div>
        </template>
    </v-data-table>

</template>

<script>
import EditBtn from "../ui/EditBtn.vue";
import DeleteBtn from "../ui/DeleteBtn.vue";

export default {
    name: "StudentsTable",
    components: { EditBtn, DeleteBtn },
    props: {
        students: { type: Array, required: true },
        headers: { type: Array, required: true },
        isLoading: Boolean,
    },
};
</script>
