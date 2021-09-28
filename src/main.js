import { createApp } from 'vue'
import App from './App.vue'
import Letter from "./components/Letter.vue";
import Modal from "./components/Modal.vue";
import ButtonStart from "./components/ButtonStart.vue";
import "animate.css"

const app = createApp(App);

app.component("letter", Letter)
app.component("modal", Modal)
app.component("button-start", ButtonStart)


app.mount("#app");
