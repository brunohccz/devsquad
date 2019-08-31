<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card" v-if="ready">
                    <div class="card-header">
                        {{ product.name }}
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="handleSubmit()">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="product.name" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('name')}" id="name" placeholder="e.g. Apple TV">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('name')">
                                    <strong>
                                        {{ errors.name[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select v-model="product.category" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('category')}" id="category">
                                    <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                </select>

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('category')">
                                    <strong>
                                        {{ errors.category[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea v-model="product.description" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('description')}" cols="30" rows="3" placeholder="Description"></textarea>

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('description')">
                                    <strong>
                                        {{ errors.description[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input v-model="product.price" pattern="[0-9]+([,\.][0-9]+)?" title="e.g 9,999.99" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('price')}" id="price">

                                <div class="invalid-feedback" v-if="errors.hasOwnProperty('price')">
                                    <strong>
                                        {{ errors.price[0] }}
                                    </strong>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-4">
                                    <img class="img-thumbnail" width="150" ref="image" :src="this.product.image" :alt="product.name">
                                </div>
                                <div class="col-md-8 form-group d-flex align-items-center">
                                    <input type="file" class="form-control-file" :class="{'is-invalid': errors.hasOwnProperty('image')}" ref="image" v-on:change="handleFileUpload()">

                                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('image')">
                                        <strong>
                                            {{ errors.image[0] }}
                                        </strong>
                                    </div>
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
import { editProduct, getProduct } from '~/services/products.service';

export default {
    name: "Create",
    async mounted() {
        this.categories = await getCategories();
        this.product = await getProduct(this.$route.params.id);
    },
    data: () => ({
        categories: [],
        product: {},
        loading: false,
        errors: []
    }),
    methods: {
        handleSubmit: function () {
            this.loading = true;

            editProduct({
                ...this.product,
                image: this.product.newimage,
            })
            .then(product => {
                this.product = product;
                this.errors = [];
                alert(`Product edited`);
            })
            .catch(errors => this.errors = errors)
            .finally(() => this.loading = false);
        },
        handleFileUpload: function () {
            this.product.newimage = this.$refs.image.files[0];
        },
    },
    computed: {
        ready () {
            return _.isEmpty(this.product) === false;
        }
    }
}
</script>

<style scoped>

</style>
