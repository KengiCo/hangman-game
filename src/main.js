import { createApp } from 'vue'
import App from './App.vue'
import Letter from "./components/Letter.vue";

const app = createApp(App);

app.component("letter", Letter)


app.mount("#app");
