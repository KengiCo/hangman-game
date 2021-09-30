<template>
<li>
    <h2 class="wrong-keys animate__animated animate__headShake">{{ wrongLetter }}</h2>
</li>
</template>

<script>
export default{
    props: ['wrongLetter']
}
</script>

<style scoped>
.wrong-keys {
  font-size: 30px;
  color: red;
  text-shadow: #2c3e50;
}

</style>