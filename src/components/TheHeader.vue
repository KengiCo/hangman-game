<template>
  <header>
    <h1 class="animate__animated animate__bounceInDown" id="title">GUESSaWORD</h1>
  <h2>Total coins: {{ coins }}</h2>
  <h2>Guessed words: {{ totalGuessedWords }}</h2>
  </header>
</template>

<script>
export default{
props: ['coins','totalGuessedWords']


}

</script>