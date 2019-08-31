<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img class="img-fluid" :src="product.image" :alt="product.name"/>
                            </div>
                            <div class="col-md-8">
                                <h2>{{ product.name }}</h2>
                                <h4 class="text-muted">{{ product.category }}</h4>
                                <p>{{ product.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <router-link class="btn btn-dark" :to="{name: 'products.index'}">Back</router-link>
                        <h5 class="price">Price <strong>{{ product.price }}</strong></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProduct } from "~/services/products.service";

export default {
    name: "Show",
    data: () => ({
       product: {}
    }),
    async mounted() {
        this.product = await getProduct(this.$route.params.id);
    }
}
</script>

<style scoped>
.price {
    margin-top: 8px;
    float: right;
}
</style>
