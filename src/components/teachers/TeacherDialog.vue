<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
            <v-card-title>
                {{ dialogType === 'view' ? $t('teacher_details') :
                    dialogType === 'edit' ? $t('edit_teacher') : $t('add_teacher') }}
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-if="dialogType !== 'view'" v-model="valid">
                    <v-text-field v-model="localTeacher.imageUrl" :label="$t('image_url')"
                        :placeholder="$t('placeholder_image')" clearable />

                    <v-text-field v-model="localTeacher.firstName" :label="$t('first_name')" required />
                    <v-text-field v-model="localTeacher.lastName" :label="$t('last_name')" required />
                    <v-text-field v-model="localTeacher.email" :label="$t('email')" required />
                    <v-text-field v-model="localTeacher.phone" :label="$t('phone')" />

                    <v-select :items="subjects" v-model="localTeacher.subjectId" :label="$t('subject')"
                        item-title="title" item-value="id" required />

                    <v-text-field v-model="localTeacher.salaryPerSession" :label="$t('salary_per_session')"
                        type="number" />
                    <v-textarea v-model="localTeacher.notes" :label="$t('notes')" />
                    <v-text-field v-model="localTeacher.bod" :label="$t('birth_date')" type="date" />
                    <v-text-field v-model="localTeacher.educationLevel" :label="$t('education_level')" />
                    <v-text-field v-model="localTeacher.universityDegree" :label="$t('university_degree')" />
                    <v-text-field v-model="localTeacher.yearsOfExperience" :label="$t('years_of_experience')"
                        type="number" />
                    <v-switch v-model="localTeacher.isActive" :label="$t('is_active')" />
                    <v-select :items="[{ title: $t('male'), value: 'MALE' }, { title: $t('female'), value: 'FEMALE' }]"
                        v-model="localTeacher.gender" :label="$t('gender')" />

                    <v-text-field v-if="dialogType === 'add'" v-model="localTeacher.password" :label="$t('password')"
                        type="password" required />
                    <v-text-field v-model="localTeacher.sessionsCountInMonth" :label="$t('sessions_per_month')"
                        type="number" />
                </v-form>

                <div v-else>
                    <div v-for="(field, index) in viewFields" :key="field.key">
                        <template v-if="field.key === 'imageUrl'">
                            <img v-if="localTeacher.imageUrl" :src="localTeacher.imageUrl" alt="Teacher Image"
                                style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
                            <p v-else>{{ $t('no_image') }}</p>
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
                <v-btn text @click="close">{{ dialogType === 'view' ? $t('close') : $t('cancel') }}</v-btn>
                <v-btn v-if="dialogType !== 'view'" color="primary" :disabled="!valid" @click="submit">{{ $t('save')
                    }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "TeacherDialog",
    props: {
        modelValue: Boolean,
        teacher: Object,
        subjects: Array,
        dialogType: { type: String, default: 'add' }
    },
    emits: ["update:modelValue", "save"],
    data() {
        return {
            dialogVisible: this.modelValue,
            valid: true,
            localTeacher: this.teacher ? { ...this.teacher } : this.emptyTeacher(),
            viewFields: [
                { labelKey: 'image_url', key: 'imageUrl' },
                { labelKey: 'first_name', key: 'firstName' },
                { labelKey: 'last_name', key: 'lastName' },
                { labelKey: 'email', key: 'email' },
                { labelKey: 'phone', key: 'phone' },
                { labelKey: 'subject', key: 'subjectName' },
                { labelKey: 'salary_per_session', key: 'salaryPerSession' },
                { labelKey: 'notes', key: 'notes' },
                { labelKey: 'birth_date', key: 'bod' },
                { labelKey: 'education_level', key: 'educationLevel' },
                { labelKey: 'university_degree', key: 'universityDegree' },
                { labelKey: 'years_of_experience', key: 'yearsOfExperience' },
                { labelKey: 'is_active', key: 'isActive' },
                { labelKey: 'gender', key: 'gender' },
                { labelKey: 'sessions_per_month', key: 'sessionsCountInMonth' },
            ],
        };
    },
    watch: {
        modelValue(val) { this.dialogVisible = val; },
        dialogVisible(val) { this.$emit("update:modelValue", val); },
        teacher: { immediate: true, handler(val) { this.localTeacher = val ? { ...val } : this.emptyTeacher(); } }
    },
    methods: {
        emptyTeacher() {
            return {
                imageUrl: '',
                firstName: '', lastName: '', phone: '', email: '', subjectId: null,
                salaryPerSession: null, notes: '', bod: '', educationLevel: '',
                universityDegree: '', yearsOfExperience: null, isActive: true, gender: 'MALE',
                sessionsCountInMonth: null, password: ''
            };
        },
        formatValue(key) {
            const value = this.localTeacher[key];
            if (key === 'isActive') return value ? this.$t('yes') : this.$t('no');
            if (key === 'bod') return value ? new Date(value).toLocaleDateString() : '';
            return value ?? '';
        },
        close() { this.dialogVisible = false; },
        submit() {
            this.$refs.form?.validate?.();
            if (this.valid) this.$emit('save', { ...this.localTeacher });
        }
    }
};
</script>
