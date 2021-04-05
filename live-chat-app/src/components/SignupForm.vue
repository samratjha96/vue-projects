<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" required placeholder="Display name" v-model="displayName">
            <input type="text" required placeholder="Email" v-model="email">
            <input type="text" required placeholder="Password" v-model="password">
            <button>Sign up</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue"

    export default {
        setup() {
            const displayName = ref('')
            const email = ref('')
            const password = ref('')

            const handleSubmit =  () => {
                console.log(displayName.value, email.value, password.value)
            }
            return {
                displayName,
                email,
                password,
                handleSubmit
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>