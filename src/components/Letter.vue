<template>
  <!-- <button class="letter">{{ letter }}</button> -->
 <div class="maincontainer">
  <div class="thecard">
    <div class="thefront">
      <h1>Front of Card</h1>
      <p>{{ letter }}
      </p>
    </div>

    <div class="theback">
      <h1>Back of Card</h1>
      <p>
{{ letter }}
      </p>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  props: ["letter"],
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
.maincontainer{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 35px;
  height: 35px;
  background: none;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

/* THE CARD HOLDS THE FRONT AND BACK FACES */
.thecard {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 0.8s ease;
}

/* THE PSUEDO CLASS CONTROLS THE FLIP ON MOUSEOVER AND MOUSEOUT */
.thecard:hover {
  transform: rotateY(180deg);
}

/* THE FRONT FACE OF THE CARD, WHICH SHOWS BY DEFAULT */
.thefront {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  overflow: hidden;
  background: #ffc728;
  color: #000;
}

/* THE BACK FACE OF THE CARD, WHICH SHOWS ON MOUSEOVER */
.theback {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  overflow: hidden;
  background: #fafafa;
  color: #333;
  text-align: center;
  transform: rotateY(180deg);
}

/*This block (starts here) is merely styling for the flip card, and is NOT an essential part of the flip code */
.thefront h1,
.theback h1 {
  font-family: "zilla slab", sans-serif;
  padding: 30px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

.thefront p,
.theback p {
  font-family: "zilla slab", sans-serif;
  padding: 30px;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
}
/*This block (ends here) is merely styling for the flip card, and is NOT an essential part of the flip code */
</style>
