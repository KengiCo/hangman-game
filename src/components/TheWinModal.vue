<template>
  <transition name="modal">
    <base-modal>
      <template v-slot:header>
        <h1>You got it right!</h1>
      </template>
      <template v-slot:body>
        <h3>The word was: {{ word }}</h3>
        <div id="hint-footer">
          <button id="hint-button" @click="nextWord">
            LET'S GUESS THE NEXT
          </button>
        </div>
      </template>
    </base-modal>
  </transition>
</template>

<script>
export default {
  props: ["word"],
  methods:{ 
      nextWord() {
      this.$emit('next-word')
      },
  },
};
</script>

<style></style>
