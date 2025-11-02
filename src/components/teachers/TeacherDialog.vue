<!-- 
<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
            <v-card-title>
                {{ dialogType === 'view' ? 'Teacher Details' :
                    dialogType === 'edit' ? 'Edit Teacher' : 'Add Teacher' }}
            </v-card-title>

            <v-card-text>
                <v-form v-if="dialogType !== 'view'" ref="form" v-model="valid">
                    <v-text-field v-model="localTeacher.firstName" :label="$t('firstName')" required />
                    <v-text-field v-model="localTeacher.lastName" :label="$t('lastName')" required />
                    <v-text-field v-model="localTeacher.phone" :label="$t('phone')" />
                    <v-text-field v-model="localTeacher.email" :label="$t('email')" required />
                    <v-select :items="subjects" v-model="localTeacher.subjectId" :label="$t('subject')"
                        item-title="title" item-value="id" required />
                    <v-text-field v-model="localTeacher.salaryPerSession" :label="$t('salaryPerSession')"
                        type="number" />
                    <v-textarea v-model="localTeacher.notes" :label="$t('notes')" />
                    <v-text-field v-model="localTeacher.bod" :label="$t('bod')" type="date" />
                    <v-text-field v-model="localTeacher.educationLevel" :label="$t('educationLevel')" />
                    <v-text-field v-model="localTeacher.universityDegree" :label="$t('universityDegree')" />
                    <v-text-field v-model="localTeacher.yearsOfExperience" :label="$t('yearsOfExperience')"
                        type="number" />
                    <v-switch v-model="localTeacher.isActive" :label="$t('isActive')" />
                    <v-select :items="['MALE', 'FEMALE']" v-model="localTeacher.gender" :label="$t('gender')" required />
                    <v-text-field v-model="localTeacher.sessionsCountInMonth" :label="$t('sessionsCountInMonth')"
                        type="number" />
                </v-form>

                <div v-else>
                    <p><strong>{{ $t("firstName") }}:</strong> {{ localTeacher.firstName }}</p>
                    <p><strong>{{ $t("lastName") }}:</strong> {{ localTeacher.lastName }}</p>
                    <p><strong>{{ $t("email") }}:</strong> {{ localTeacher.email }}</p>
                    <p><strong>{{ $t("phone") }}:</strong> {{ localTeacher.phone }}</p>
                    <p><strong>{{ $t("subject") }}:</strong> {{ localTeacher.subjectName || "" }}</p>
                    <p><strong>{{ $t("salaryPerSession") }}:</strong> {{ localTeacher.salaryPerSession }}</p>
                    <p><strong>{{ $t("notes") }}:</strong> {{ localTeacher.notes }}</p>
                    <p><strong>{{ $t("bod") }}:</strong> {{ localTeacher.bod }}</p>
                    <p><strong>{{ $t("educationLevel") }}:</strong> {{ localTeacher.educationLevel }}</p>
                    <p><strong>{{ $t("universityDegree") }}:</strong> {{ localTeacher.universityDegree }}</p>
                    <p><strong>{{ $t("yearsOfExperience") }}:</strong> {{ localTeacher.yearsOfExperience }}</p>
                    <p><strong>{{ $t("isActive") }}:</strong> {{ localTeacher.isActive ? $t("Yes") : $t("No") }}</p>
                    <p><strong>{{ $t("gender") }}:</strong> {{ localTeacher.gender }}</p>
                    <p><strong>{{ $t("sessionsCountInMonth") }}:</strong> {{ localTeacher.sessionsCountInMonth }}</p>
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
        dialogType: { type: String, default: "add" } // add | edit | view
    },
    emits: ["update:modelValue", "save"],
    data() {
        return {
            dialogVisible: this.modelValue,
            valid: true,
            localTeacher: this.teacher ? { ...this.teacher } : this.emptyTeacher(),
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
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                subjectId: null,
                salaryPerSession: null,
                notes: "",
                bod: "",
                educationLevel: "",
                universityDegree: "",
                yearsOfExperience: null,
                isActive: true,
                gender: "MALE",
                sessionsCountInMonth: null,
            };
        },
        close() { this.dialogVisible = false; },
        submit() {
            this.$refs.form?.validate?.();
            if (this.valid) {
                this.$emit("save", this.localTeacher);
                this.close();
            }
        }
    }
};
</script> -->

<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card>
            <v-card-title>
                {{ dialogType === 'view' ? 'Teacher Details' :
                    dialogType === 'edit' ? 'Edit Teacher' : 'Add Teacher' }}
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-if="dialogType !== 'view'" v-model="valid">
                    <v-text-field v-model="localTeacher.firstName" label="First Name" required />
                    <v-text-field v-model="localTeacher.lastName" label="Last Name" required />
                    <v-text-field v-model="localTeacher.email" label="Email" required />
                    <v-text-field v-model="localTeacher.phone" label="Phone" />
                    <v-select :items="subjects" v-model="localTeacher.subjectId" label="Subject" item-title="title"
                        item-value="id" required />
                    <v-text-field v-model="localTeacher.salaryPerSession" label="Salary per Session" type="number" />
                    <v-textarea v-model="localTeacher.notes" label="Notes" />
                    <v-text-field v-model="localTeacher.bod" label="Birth Date" type="date" />
                    <v-text-field v-model="localTeacher.educationLevel" label="Education Level" />
                    <v-text-field v-model="localTeacher.universityDegree" label="University Degree" />
                    <v-text-field v-model="localTeacher.yearsOfExperience" label="Years of Experience" type="number" />
                    <v-switch v-model="localTeacher.isActive" label="Is Active" />
                    <v-select :items="['MALE', 'FEMALE']" v-model="localTeacher.gender" label="Gender" />
                    <v-text-field v-if="dialogType === 'add'" v-model="localTeacher.password" label="Password"
                        type="password" required />
                    <v-text-field v-model="localTeacher.sessionsCountInMonth" label="Sessions/Month" type="number" />
                </v-form>

                <div v-else>
                    <!-- View Mode -->
                    <p><strong>First Name:</strong> {{ localTeacher.firstName }}</p>
                    <p><strong>Last Name:</strong> {{ localTeacher.lastName }}</p>
                    <p><strong>Email:</strong> {{ localTeacher.email }}</p>
                    <p><strong>Phone:</strong> {{ localTeacher.phone }}</p>
                    <p><strong>Subject:</strong> {{ localTeacher.subjectName || '' }}</p>
                    <p><strong>Salary:</strong> {{ localTeacher.salaryPerSession }}</p>
                    <p><strong>Notes:</strong> {{ localTeacher.notes }}</p>
                    <p><strong>Birth Date:</strong> {{ localTeacher.bod }}</p>
                    <p><strong>Education Level:</strong> {{ localTeacher.educationLevel }}</p>
                    <p><strong>University Degree:</strong> {{ localTeacher.universityDegree }}</p>
                    <p><strong>Experience:</strong> {{ localTeacher.yearsOfExperience }}</p>
                    <p><strong>Active:</strong> {{ localTeacher.isActive ? 'Yes' : 'No' }}</p>
                    <p><strong>Gender:</strong> {{ localTeacher.gender }}</p>
                    <p><strong>Sessions/Month:</strong> {{ localTeacher.sessionsCountInMonth }}</p>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn text @click="close">{{ dialogType === 'view' ? 'Close' : 'Cancel' }}</v-btn>
                <v-btn v-if="dialogType !== 'view'" color="primary" :disabled="!valid" @click="submit">Save</v-btn>
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
            localTeacher: this.teacher ? { ...this.teacher } : this.emptyTeacher()
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
                firstName: '', lastName: '', phone: '', email: '', subjectId: null,
                salaryPerSession: null, notes: '', bod: '', educationLevel: '',
                universityDegree: '', yearsOfExperience: null, isActive: true, gender: 'MALE',
                sessionsCountInMonth: null, password: ''
            };
        },
        close() { this.dialogVisible = false; },
        submit() {
            this.$refs.form?.validate?.();
            if (this.valid) this.$emit('save', { ...this.localTeacher });
        }
    }
};
</script>
