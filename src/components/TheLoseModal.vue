<template>
  <transition name="modal">
    <base-modal @close="playAgain">
      <template v-slot:header>
        <h1>Vaccaboia! You Lost</h1>
      </template>
      <template v-slot:body>
        <h3>The word was: {{ word }}</h3>
      </template>
      <template v-slot:footer>
        <!-- <button>DEAFULT BUTTON TO GET A NEW WORD</button> -->
      </template>
    </base-modal>
  </transition>
</template>

<script>
export default {
  props: ["word","lost"],
  methods:{ 
      playAgain() {
      this.$emit('play-again')
      },
  },
};
</script>

<style></style>
