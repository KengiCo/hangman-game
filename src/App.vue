<template>
  <div><h1>Hello Hangman</h1></div>
  <div class="secret-letters">
    <letter
      v-bind:key="letter.index"
      v-for="letter in secretWord"
      :letter="letter"
    ></letter>
  </div>

  <!-- <button v-if="!startedGame" @click="oneWord">START</button> -->
  <div class="user-input" v-if="startedGame">
    <h1>type the letter you want to guess</h1>
  </div>
  <button-start
    :style="{ content: RESTART }"
    v-if="startedGame && !win && !lost"
    @close="restart"
  ></button-start>

  <div>
    <li class="wrong-keys" v-for="wrong in wrongLetters" :key="wrong.index">
      {{ wrong }}
    </li>
  </div>
  <!-- <div v-if="lost">
    <h2>YOU LOST YOU DONKEY</h2>
    <div><button v-if="startedGame" @click="restart">RESTART</button></div>
  </div>
  <div v-if="win">
    <h2>YOU WIN YOU DUMBASS</h2>
    <div><button v-if="startedGame" @click="restart">RESTART</button></div>
  </div> -->

  <transition name="modal">
    <modal v-if="lost" @close="restart">
      <template v-slot:header>
        <h3>Vaccaboia! You Lost</h3>
      </template>
      <template v-slot:body>
        <h3>The word was: {{ word }}</h3>
      </template>
    </modal>
  </transition>

  <transition name="modal">
    <modal v-if="win" @close="restart">
      <template v-slot:header>
        <h3>You Win</h3>
      </template>
      <template v-slot:body>
        <h3>Winner</h3>
      </template>
    </modal>
  </transition>

    <transition name="modal">
      
    <modal v-if="hasDefinition">
      <template v-slot:body>
        <h3>Psst..Do you want a little help?</h3>
        <div v-if="showHint"><h3>{{ definition }}</h3></div>
        <button @click="showHintToggle">SHOW HINT</button>
        <button @click="closeHintModal"> CLOSE </button>
    </template>
    </modal>
</transition>



  <button-start v-if="!startedGame" @close="oneWord">Start</button-start>
<button @click="checkDictionary">DICTIONARY</button>


</template>
<script>
import Letter from "./components/Letter";
import Modal from "./components/Modal";
import ButtonStart from "./components/ButtonStart";

export default {
  components: {
    Letter,
    Modal,
    ButtonStart
  },
  data() {
    return {
      word: "",
      secretWord: "",
      startedGame: false,
      guessedLetter: "",
      wrongLetters: [],
      lost: false,
      win: false,
      definition: "",
      hasDefinition : false,
      showHint : false
    };
  },
  mounted: function() {
    window.addEventListener("keydown", this.pressedKey);
    console.log("listening");
  },
  methods: {
    async oneWord() {
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const result = await res.json();
      this.word = result[0].toUpperCase();
      console.log(this.word);
      this.startGame();
    },
    restart() {
      this.lost = false;
      this.win = false;
      this.wrongLetters = [];
      this.startedGame = true;
      this.oneWord();
    },
    checkPressed() {
      if (this.word.includes(this.guessedLetter)) {
        for (let i = 0; i < this.word.length; i++) {
          const char = this.word[i];
          if (char == this.guessedLetter) {
            this.secretWord[i] = this.guessedLetter;
            this.checkWin();
          }
        }
      } else {
        this.wrongLetters.push(this.guessedLetter);
      }
    },
    pressedKey(e) {
      if (e.key >= "a" && e.key <= "z") {
        this.guessedLetter = e.key.toUpperCase();
        console.log(this.guessedLetter);
        this.checkPressed();
      }
    },
    startGame() {
      this.secretWord = this.word.split("").map(() => "_");
      this.startedGame = true;
    },
    checkWin() {
      if (!this.secretWord.includes("_")) {
        this.startedGame = false;
        return (this.win = true);
      }
    },
      async checkDictionary() {
        // this checks on datamuse with sp = spelling and md=d definition
        // `https://api.datamuse.com/words?sp=${this.word.toLowerCase()}&md=d`
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word.toLowerCase()}`
      );
      const json = await res.json();
      // const result = JSON.stringify(json)
//        this is syntax for datamuse
//        this.definition = result[0].defs[0];
          this.definition = json[0]['meanings'][0]['definitions'][0]['definition']
          console.log(this.definition)
},
      showHintToggle(){
        return this.showHint = !this.showHint
      },
      closeHintModal(){
        return this.hasDefinition = false
      }
  },
  computed: {
    wrongTotal: function() {
      return this.wrongLetters.length;
    },
  },
  watch: {
    wrongTotal() {
      if (this.wrongTotal > 6) {
        this.lost = true
        this.startedGame = false;
      }
    },
    definition(){
      if (this.definition.length > 0) {
        return this.hasDefinition = true
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin: 2rem;
}
.secret-letters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.user-input {
  padding: 10px;
  margin: 1rem 0rem -1rem 2rem;
}
.wrong-keys {
  font-size: 30px;
  color: red;
  text-shadow: #2c3e50;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
