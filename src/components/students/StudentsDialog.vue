<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
            <v-card-title>
                {{ dialogType === "view" ? $t("student_details") : dialogType === "edit" ? $t("editStudent") :
                    $t("addStudent") }}
            </v-card-title>

            <v-card-text>
                <v-form v-if="dialogType !== 'view'" ref="form" v-model="valid">
                    <v-text-field v-model="localStudent.imageUrl" :label="$t('image')"
                        placeholder="https://example.com/avatar.jpg" clearable />
                    <v-text-field v-model="localStudent.firstName" :label="$t('firstName')" required />
                    <v-text-field v-model="localStudent.lastName" :label="$t('lastName')" required />
                    <v-text-field v-model="localStudent.bod" :label="$t('birth_date')" type="date" />
                    <v-text-field v-model="localStudent.notes" :label="$t('notes')" />
                    <v-select v-model="localStudent.gender"
                        :items="[{ title: $t('male'), value: 'MALE' }, { title: $t('female'), value: 'FEMALE' }]"
                        :label="$t('gender')" />
                </v-form>

                <div v-else>
                    <div v-for="field in viewFields" :key="field.key">
                        <template v-if="field.key === 'imageUrl'">
                            <img v-if="localStudent.imageUrl" :src="localStudent.imageUrl" alt="Student Image"
                                style="width:100px; height:100px; object-fit:cover; border-radius:8px; margin-bottom:8px" />
                            <p v-else>{{ $t("no_image") }}</p>
                        </template>
                        <template v-else>
                            <p>
                                <strong>{{ $t(field.labelKey) }}:</strong>
                                {{ formatValue(field.key) }}
                            </p>
                        </template>
                        <v-divider thickness="2"></v-divider>
                    </div>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn text @click="close">{{ dialogType === "view" ? $t("close") : $t("cancel") }}</v-btn>
                <v-btn v-if="dialogType !== 'view'" color="primary" :disabled="!valid" @click="submit">{{ $t("save")
                    }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "StudentDialog",
    props: {
        modelValue: Boolean,
        student: Object,
        dialogType: { type: String, default: "add" },
    },
    emits: ["update:modelValue", "save"],
    data() {
        return {
            dialogVisible: this.modelValue,
            valid: true,
            localStudent: this.student ? { ...this.student } : this.emptyStudent(),
            viewFields: [
                { labelKey: "image", key: "imageUrl" },
                { labelKey: "firstName", key: "firstName" },
                { labelKey: "lastName", key: "lastName" },
                { labelKey: "birth_date", key: "bod" },
                { labelKey: "gender", key: "gender" },
                { labelKey: "notes", key: "notes" },
            ],
        };
    },
    watch: {
        modelValue(val) {
            this.dialogVisible = val;
        },
        dialogVisible(val) {
            this.$emit("update:modelValue", val);
        },
        student: { immediate: true, handler(val) { this.localStudent = val ? { ...val } : this.emptyStudent(); } }
    },
    methods: {
        emptyStudent() {
            return { imageUrl: "", firstName: "", lastName: "", bod: "", notes: "", gender: "MALE" };
        },
        formatValue(key) {
            const val = this.localStudent[key];
            if (key === "bod") return val ? new Date(val).toLocaleDateString() : "";
            return val ?? "";
        },
        close() { this.dialogVisible = false; },
        submit() {
            this.$refs.form?.validate?.();
            if (this.valid) this.$emit("save", { ...this.localStudent });
        }
    }
};
</script>
