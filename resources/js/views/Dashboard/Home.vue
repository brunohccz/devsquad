<template>
    <p>home</p>
</template>

<script>
export default {
    name: "Home",
    methods: {
        logout() {
            this.$auth.logout({
                redirect: {name: 'login'}
            });
        }
    }
}
</script>

<style scoped>

</style>
