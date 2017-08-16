<template>
<p>{{ id }} - {{ slug }}</p>
</template>
<script>
export default {
    name: 'result',
    props: ['id', 'slug']
}
</script>
