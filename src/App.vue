<template>
  <the-header :coins="coins" :totalGuessedWords="totalGuessedWords" />

  <!-- these are the displayed coin that animate when guessing the word -->
  <div class="secret-letters">
    <letter
      class="animate__animated animate__flipInY"
      :style="{ cursor: hintRevealToggle ? 'pointer' : 'default' }"
      @hint-reveal="hintReveal(index)"
      v-bind:key="letter.index"
      v-for="(letter, index) of secretWord"
      v-bind:id="letter.index"
      :letter="letter"
    >
    </letter>
  </div>

 
  <div class="user-input" v-if="startedGame">
    <h1>type the letter you want to guess</h1>
  </div>

  <!-- start game button, should disappear when game starts -->

  <button-start v-if="!startedGame" @close="oneWord">Start</button-start>

  <button
    v-if="startedGame"
    @click="showHintToggle(); checkDictionary();">
    WANNA PAY FOR SOME HINTS?
  </button>
  <hr>
  <div v-if="wrongLetters.length > 0">
    <h2>Wrong Letters:</h2>
  </div>
    <wrong-letters
    v-for="wrongLetter in wrongLetters"
    :key="wrongLetter.index"
    :wrongLetter="wrongLetter"
  >
  </wrong-letters>

  <the-lose-modal
    v-if="lost"
    :word="word"
    @play-again="restart"
  ></the-lose-modal>

  <the-win-modal v-if="win" :word="word" @next-word="oneWord()"></the-win-modal>

  <the-hint-modal
    v-if="showHint"
    :hasDefinition="hasDefinition"
    :definition="definition"
    :showDefinitionToggle="showDefinitionToggle"
    @show-definition="showDefinition"
    @show-hint-toggle="showHintToggle"
    @hint-reveal-pay="hintRevealPay"
  ></the-hint-modal>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import Letter from "./components/Letter";
import ButtonStart from "./components/ButtonStart";
import TheWinModal from "./components/TheWinModal.vue";
import TheLoseModal from "./components/TheLoseModal.vue";
import TheHintModal from "./components/TheHintModal.vue";
import WrongLetters from "./components/WrongLetters.vue";

export default {
  components: {
    TheHeader,
    Letter,
    ButtonStart,
    TheWinModal,
    TheLoseModal,
    TheHintModal,
    WrongLetters,
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
      hasDefinition: false,
      showDefinitionToggle: false,
      hintRevealToggle: false,
      showHint: false,
      coins: 5,
      totalGuessedWords: 0,
      showHelp: false,
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
      this.definition = "";
      this.hasDefinition = false;
      this.showHint = false;
      this.coins = 5;
      this.totalGuessWords = 0;
      this.oneWord();
    },
    checkPressed() {
      if (this.word.includes(this.guessedLetter)) {
        for (let i = 0; i < this.word.length; i++) {
          const char = this.word[i];
          if (char == this.guessedLetter) {
            this.secretWord[i] = this.guessedLetter;
            this.coins++;
            this.checkWord();
          }
        }
      } else {
        if (!this.wrongLetters.includes(this.guessedLetter)) {
          this.wrongLetters.push(this.guessedLetter);
          this.coins--;
        }
      }
    },
    pressedKey(e) {
      if (e.key >= "a" && e.key <= "z") {
        this.guessedLetter = e.key.toUpperCase();
        console.log(this.guessedLetter);
        // condition to avoid double pressing, checks if pressed key has already been guessed
        if (!this.secretWord.includes(this.guessedLetter)) {
          this.checkPressed();
        }
      }
    },
    startGame() {
      this.secretWord = this.word.split("").map(() => "_");
      this.win = false;
      this.startedGame = true;
    },
    checkWord() {
      if (!this.secretWord.includes("_")) {
        this.startedGame = false;
        this.totalGuessWords++;
        this.coins = this.coins + 3;
        return (this.win = true);
      }
    },
    async checkDictionary() {
      // this checks on datamuse with sp = spelling and md=d definition
      // `https://api.datamuse.com/words?sp=${this.word.toLowerCase()}&md=d`
      try {const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word.toLowerCase()}`
      );
      const json = await res.json();
      // const result = JSON.stringify(json)
      //        this is syntax for datamuse
      //        this.definition = result[0].defs[0];
      this.definition = json[0]["meanings"][0]["definitions"][0]["definition"];
      console.log(this.definition);
        } catch (error) {
        throw new Error("not in the dictionary");
  }
    },
    showHintToggle() {
      this.showDefinitionToggle = false;
      return (this.showHint = !this.showHint);
    },
    closeHintModal() {
      return (this.hasDefinition = false);
    },
    hintReveal(letterIndex) {
      if (this.hintRevealToggle) {
        this.guessedLetter = this.word[letterIndex];
        this.checkPressed();
        return (this.hintRevealToggle = false);
      }
    },
    hintRevealPay() {
      this.coins = this.coins - 3;
      this.showHint = false;
      return (this.hintRevealToggle = true);
    },
    showDefinition() {
      this.coins = this.coins - 3;
      return (this.showDefinitionToggle = !this.showDefinitionToggle);
    },
  },
  computed: {
    wrongTotal: function() {
      return this.wrongLetters.length;
    },
  },
  watch: {
    coins() {
      if (this.coins <= 0) {
        this.lost = true;
      }
    },
    wrongTotal() {
      if (this.wrongTotal > 6) {
        this.lost = true;
        this.startedGame = false;
      }
    },
    definition() {
      if (this.definition.length > 0) {
        return (this.hasDefinition = true);
      }
    },
  },
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
#hint-button {
  position: absolute;
  bottom: -20px;
  right: -20px;
}
#hint-footer {
  margin-top: 50px;
}
#title {
  color: #111;
  font-size: 55px;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
