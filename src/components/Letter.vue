<template>
  <!-- <button class="letter">{{ letter }}</button> -->
  <div class="letter">
    <div
      class="thecard"
      :class="[guessedLetter ? 'thecard-guessed' : '']"
    >
      <div class="thefront">
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
        return  false } else {return true}
  }}
};
</script>

<style scoped>
/* button {
  position: relative;
  background-color: #e1cbcb;
  border-radius: 46%;
  padding: 15px;
  margin: 10px;
  width: 45px;
  height: 45px;
  font-size: 17px;
  font-weight: bold;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
} */
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
  /* transform: translate(-50%, -50%); */
  transform: translate(0%, 0%);
}

/* THE CARD HOLDS THE FRONT AND BACK FACES */
.thecard {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transform-style: preserve-3d;
  transition: all 0.8s ease;
}

/* THE PSUEDO CLASS CONTROLS THE FLIP ON MOUSEOVER AND MOUSEOUT */
.thecard-guessed {
  transform: rotateY(900deg);
  transition-duration: 2s;
}

/* THE FRONT FACE OF THE CARD, WHICH SHOWS BY DEFAULT */
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

/* THE BACK FACE OF THE CARD, WHICH SHOWS ON MOUSEOVER */
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

/*This block (starts here) is merely styling for the flip card, and is NOT an essential part of the flip code */
.thefront h1,
.theback h1 {
  font-family: "zilla slab", sans-serif;
  font-weight: bold;
  font-size: 110px;
  text-align: center;
  margin: 0px;
}

/* .thefront p,
.theback p {
  font-family: "zilla slab", sans-serif;
  padding: 30px;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
} */
/*This block (ends here) is merely styling for the flip card, and is NOT an essential part of the flip code */
</style>
