<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Products
                        <div class="float-right">
                            <button class="btn btn-sm btn-primary">Create Product</button>
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
                                    <a href="" class="btn btn-sm btn-dark">See</a>
                                    <a href="" class="btn btn-sm btn-dark">Edit</a>
                                    <a href="" class="btn btn-sm btn-danger">Delete</a>
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
                    <pagination :pagination="products.meta" @paginate="getProducts()" :offset="2"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProducts } from '~/services/products.service';
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
            this.products = await getProducts(this.products.meta.current_page)
        },
    },
    components: {
        pagination
    }
}
</script>

<style scoped>

</style>
