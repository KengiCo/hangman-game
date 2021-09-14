import { createApp } from 'vue'
import App from './App.vue'
import Letter from "./components/Letter.vue";
import Modal from "./components/Modal.vue";

const app = createApp(App);

app.component("letter", Letter)
app.component("modal", Modal)


app.mount("#app");
