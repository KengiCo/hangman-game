<template>
  <div class="letter">
    <div
      class="thecard"
      :class="[guessedLetter ? 'thecard-guessed' : '']"
      @click="$emit('hint-reveal')"
    >
      <div  class="thefront">
        <h1>*</h1>
      </div>

      <div class="theback">
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["letter"],
  computed: {
    guessedLetter() {
      if (this.letter == "_") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>

.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: none;
  border-radius: 80%;
  top: 50%;
  left: 50%;
  transform: translate(0%, 0%);
}

/* HOLDS THE FRONT AND BACK  */
.thecard {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0,.79,.75,.71);
}

/* THE PSUEDO CLASS CONTROLS THE FLIP */
.thecard-guessed {
  transform: rotateY(900deg);
  transition-duration: 2s;  
}

/* THE FRONT FACE OF THE CARD */
.thefront {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  background: #ffc728;
  color: #000;
  text-align: center;
  font-size: 140px;
}

/* THE BACK FACE OF THE CARD, SHOWS WHEN LETTER IS GUESSED */
.theback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  background: #fafafa;
  color: #333;
  font-size: 60px;
  text-align: center;
  transform: rotateY(180deg);
}

.thefront h1,
.theback h1 {
  font-family: "zilla slab", sans-serif;
  font-weight: bold;
  font-size: 110px;
  text-align: center;
  margin: 0px;
}

@media screen and (min-width:550px) and (max-width:900px) {

.letter {
  width: 40px;
  height: 40px;
}
.thefront h1 {
  font-size: 50px;
}

.theback {
  font-size: 30px;
}
}
@media screen and (max-width:550px){

.letter {
  width: 30px;
  height: 30px;
}
.thefront h1,
.theback h1 {
  font-size: 40px;
}
.theback {
  font-size: 20px;
}
}

</style>
