<template>
  <v-data-table :headers="headers" :items="teachers" :loading="isLoading" loading-text="Loading Teachers"
    class="elevation-3 px-2">
    <!-- Row click triggers view -->
    <template #item="{ item }">
      <tr @click="handleRowClick(item)">
        <td>
          <v-avatar size="40">
            <img :src="item.imageUrl" alt="Avatar" />
          </v-avatar>
        </td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.subjectName }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.email }}</td>
        <td>
          <span :class="item.isActive ? 'text-green' : 'text-red'">
            {{ item.isActive ? $t("Active") : $t("Inactive") }}
          </span>
        </td>
        <td>
          <div class="d-flex gap-3" @click.stop>
            <EditBtn @click="$emit('edit', item)" />
            <DeleteBtn @click="$emit('delete', item)" />
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import EditBtn from '../ui/EditBtn.vue';
import DeleteBtn from '../ui/DeleteBtn.vue';

export default {
  name: "TeachersTable",
  components: { EditBtn, DeleteBtn },
  props: {
    teachers: { type: Array, required: true },
    headers: { type: Array, required: true },
    subjects: { type: Array, required: true },
    isLoading: Boolean,
  },
  methods: {
    handleRowClick(item) {
      this.$emit('view', item);
    },
  },
};
</script>
