<template>
    <error code="403" message="Forbidden" />
</template>

<script>
import Error from '~/components/Error';
export default {
    name: "Forbidden",
    components: {
        Error
    }
}
</script>
