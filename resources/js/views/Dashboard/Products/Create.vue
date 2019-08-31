<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        New Product
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="handleSubmit()">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="form.name" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('name')}" id="name" placeholder="e.g. Apple TV">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('name')">
                                    <strong>
                                        {{ errors.name[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select v-model="form.category" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('category')}" id="category">
                                    <option value="" selected disabled>Select</option>
                                    <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                </select>

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('category')">
                                    <strong>
                                        {{ errors.category[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea v-model="form.description" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('description')}" cols="30" rows="3" placeholder="Description"></textarea>

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('description')">
                                    <strong>
                                        {{ errors.description[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input v-model="form.price" pattern="[0-9]+([,\.][0-9]+)?" title="e.g 9,999.99" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('price')}" id="price">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('price')">
                                    <strong>
                                        {{ errors.price[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price">Image</label>
                                <input type="file" class="form-control-file" :class="{'is-invalid': errors.hasOwnProperty('image')}" ref="image" v-on:change="handleFileUpload()">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('image')">
                                    <strong>
                                        {{ errors.image[0] }}
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
import { getCategories } from '~/services/categories.service';
import { storeProduct } from '~/services/products.service';

export default {
    name: "Create",
    async mounted() {
        this.categories = await getCategories();
    },
    data: () => ({
        categories: [],
        form: {
            name: '',
            category: '',
            description: '',
            price: '',
            image: ''
        },
        loading: false,
        errors: []
    }),
    methods: {
        handleSubmit: function () {
            this.loading = true;

            storeProduct(this.form)
                .then(product => {
                    Object.assign(this.$data, this.$options.data());
                    alert(`Product ${product.name} created!`);
                })
                .catch(errors => this.errors = errors)
                .finally(() => this.loading = false);
        },
        handleFileUpload: function () {
            this.form.image = this.$refs.image.files[0];
        },
    }
}
</script>

<style scoped>

</style>
