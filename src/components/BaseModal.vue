<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"> </slot>
        </div>

        <div class="modal-body">
          <slot name="body"> </slot>
        </div>

        <div class="modal-footer">
          <footer v-if="$slots.footer">
            <slot name="footer">
              <span>
                <a @click="$emit('close')">
                </a>
              </span>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.modal-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: "Montserrat", sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  margin-top: 2rem;
}
span {
  position: relative;
  display: inline-flex;
  width: 180px;
  height: 55px;
  margin: 0 15px;
  perspective: 1000px;
}
span a {
  font-size: 19px;
  letter-spacing: 1px;
  transform-style: preserve-3d;
  transform: translateZ(-25px);
  transition: transform 0.25s;
  font-family: "Montserrat", sans-serif;
}
span a:before,
span a:after {
  position: absolute;
  content: "RESTART";
  height: 55px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid black;
  box-sizing: border-box;
  border-radius: 5px;
}
span a:before {
  color: #fff;
  background: #000;
  transform: rotateY(0deg) translateZ(25px);
}
span a:after {
  color: #000;
  transform: rotateX(90deg) translateZ(25px);
}
span a:hover {
  transform: translateZ(-25px) rotateX(-90deg);
}
</style>
