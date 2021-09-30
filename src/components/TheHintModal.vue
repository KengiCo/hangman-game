<template>
  <transition name="modal">
    <base-modal>
      <template v-slot:header>
        <h1>NEED A HAND OR TWO?</h1>
      </template>
      <template v-slot:body>
        <div v-if="hasDefinition">
          <h3>Pay 3 Coins and we will tell you something about the word</h3>
          <button v-if="!showDefinitionToggle" @click="showDefinition">
            YES, I WANNA KNOW!
          </button>
          <div v-if="showDefinitionToggle">
            <h3>{{ definition }}</h3>
          </div>
          <hr />
        </div>
        <h3>
          Pay 3 Coins to reveal one letter of the word(and all the other
          occerrences of the same letter!!)
        </h3>
        <button @click="hintRevealPay">
          YES, LET ME CLICK ON THE LETTER TO REVEAL!
        </button>
        <div id="hint-footer">
          <button id="hint-button" @click="showHintToggle">
            NO THANKS I'VE CHANGED MY MIND
          </button>
        </div>
      </template>
    </base-modal>
  </transition>
</template>

<script>
export default {
  props: ["hasDefinition", "definition", "showDefinitionToggle"],
  methods: {
    showDefinition() {
      this.$emit("show-definition");
    },
    hintRevealPay() {
      this.$emit("hint-reveal-pay");
    },
    showHintToggle() {
      this.$emit("show-hint-toggle");
    },
  },
};
</script>

<style></style>
