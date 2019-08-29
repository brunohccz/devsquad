<template>
    <div>
        <navbar />
        <main class="py-4">
            <router-view />
        </main>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar';
export default {
    name: "AppLayout",
    components: {
        Navbar
    }
}
</script>
