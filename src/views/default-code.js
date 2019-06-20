const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: '我是动态组件'
            }
        }
    }
</script>
<style>
.componentName {
    color: green;
}
</style>   
`;

export default code;