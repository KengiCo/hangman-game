<template>
  <div>
    <div v-for="rows in keys" :key="rows.index">
      <button
        v-for="button in rows"
        :key="button"
        @click="pressedOnScreen(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keys: ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
    };
  },
  methods: {
    pressedOnScreen(button) {
      this.$emit('pressedOnScreen', button);
    },
}
}
</script>
<style scoped>
button {
    width: 2rem;
    font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
	padding: 0.4em .5em 0.3em .5em;
	line-height: 1;
	color: inherit;
	background: lighten(#7ba7bc, 30%);
	font-size: .75em;
	box-shadow: 4px 4px 0 0 #7ba7bc;
	position: relative;
	overflow: hidden;
	transform-origin: bottom right;
}
button:active {
		transform: translate(2px, 2px);
		box-shadow: 0 0 0 0 #7ba7bc;
	}
#button-board {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(1.5em, 1fr));
	grid-gap: 0.5rem;}
</style>