<template>
    <v-data-table :headers="headers" :loading="isLoading" loading-text="Loading Teachers" :items="students"
        class="elevation-3 px-2">
        <!-- <template v-slot:item.imageUrl="{ item }">
            <v-avatar size="40">
                <img :src="item.imageUrl" alt="Avatar" />
            </v-avatar>
        </template> -->



        <!-- <template v-slot:item.status="{ item }">
            <span :class="item.isActive ? 'text-green' : 'text-red'">
                {{ item.isActive ? $t("Active") : $t("Inactive") }}
            </span>
        </template> -->

        <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-3">
                <EditBtn @click="$emit('edit', item)" />
                <DeleteBtn @click="$emit('delete', item)" />
            </div>
        </template>
    </v-data-table>
</template>

<script>
import DeleteBtn from '../ui/DeleteBtn.vue';

import EditBtn from '../ui/EditBtn.vue';

export default {
    name: "CoursesTable",
    components: {
        EditBtn,
        DeleteBtn
    },
    props: {
        students: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        isLoading: Boolean
    },
};
</script>
