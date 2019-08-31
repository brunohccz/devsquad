<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Products
                        <div class="float-right">
                            <router-link :to="{name: 'products.create'}" class="btn btn-sm btn-primary">Create Product</router-link>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>
                                    <input type="text" class="form-control form-control-sm" v-model="search" placeholder="Search...">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products.data" :key="product.id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.category }}</td>
                                <td>
                                    <router-link :to="{name: 'products.show', params: { id: product.id, slug: product.slug }}" class="btn btn-sm btn-dark">See</router-link>
                                    <router-link :to="{name: 'products.edit', params: { id: product.id, slug: product.slug }}" class="btn btn-sm btn-dark">Edit</router-link>
                                    <a href="javascript:void(0);" @click="deleteProduct(product.id)" class="btn btn-sm btn-danger">Delete</a>
                                </td>
                            </tr>
                            <tr v-if="products.meta.total <= 0">
                                <td colspan="4">
                                    <div class="alert alert-info text-center">
                                        No products were found
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-2">
                    <pagination :pagination="products.meta" @paginate="getProducts()" :offset="10"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProducts, deleteProduct } from '~/services/products.service';
import pagination from '~/components/Pagination';

export default {
    name: "Index",
    data: () => ({
        products: {
            data: [],
            meta: {}
        },
        search: ''
    }),
    created () {
        this.$watch('search', _.debounce( async query => {
            this.products = await getProducts(1, query);
        }, 500));
    },
    async mounted() {
        this.products = await getProducts();
    },
    methods: {
        getProducts: async function () {
            this.products = await getProducts(this.products.meta.current_page, this.search)
        },
        deleteProduct: async function (id) {
            const res = confirm('Are you sure you want to delete this product?');
            if (res) {
                await deleteProduct(id);
                await this.getProducts();
                alert('Product deleted');
            }
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped>

</style>
