<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Products import
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="handleSubmit()">
                            <div class="form-group">
                                <label for="csv">CSV File</label>
                                <input type="file" id="csv" class="form-control-file" :class="{'is-invalid': errors.hasOwnProperty('csv')}" ref="csv" v-on:change="handleFileUpload()">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('csv')">
                                    <strong>
                                        {{ errors.csv[0] }}
                                    </strong>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="loading">{{ loading ? 'Loading...' : 'Submit' }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { importCsv } from '~/services/products.service';
export default {
    name: "Import",
    data: () => ({
        errors: {},
        file: '',
        loading: false
    }),
    methods: {
        handleSubmit: function () {
            this.loading = true;

            importCsv(this.file)
                .then(res => alert(res.msg))
                .catch(errors => this.errors = errors)
                .finally(() => this.loading = false);
        },
        handleFileUpload: function () {
            this.file = this.$refs.csv.files[0];
        }
    }
}
</script>

<style scoped>

</style>
