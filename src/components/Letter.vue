<template>

    <button class="letter" >{{ letter }}</button>

</template>

<script>
export default {
    props: ['letter']
}

</script>

<style scoped>
button {
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
}



</style>