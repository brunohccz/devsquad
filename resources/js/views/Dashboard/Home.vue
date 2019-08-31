<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Home
                    </div>
                    <div class="card-body">
                        Welcome {{ $auth.user().name }},<br />
                        This is your e-commerce dashboard
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>

</style>
