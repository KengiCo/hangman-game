<template>
  <header class="animate__animated animate__bounceInDown">
    <h1 id="title">GUESSaWORD</h1>
  </header>
  <h2>Total coins: {{ coins }}</h2>
  <h2>Guessed words: {{ totalGuessWords }}</h2>

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

  <!-- <button v-if="!startedGame" @click="oneWord">START</button> -->
  <div class="user-input" v-if="startedGame">
    <h1>type the letter you want to guess</h1>
  </div>
  <button-start
    v-if="startedGame && !win && !lost"
    @close="restart"
  ></button-start>

  <div>
    <li class="wrong-keys" v-for="wrong in wrongLetters" :key="wrong.index">
      <h1 class="animate__animated animate__headShake">{{ wrong }}</h1>
    </li>
  </div>

  <transition name="modal">
    <base-modal v-if="lost" @close="restart">
      <template v-slot:header>
        <h1>Vaccaboia! You Lost</h1>
      </template>
      <template v-slot:body>
        <h3>The word was: {{ word }}</h3>
      </template>
      <template v-slot:footer>
        <!-- <button>DEAFULT BUTTON TO GET A NEW WORD</button> -->
      </template>
    </base-modal>
  </transition>

  <transition name="modal">
    <base-modal v-if="win" @close="restart">
      <template v-slot:header>
        <h1>You got it right!</h1>
      </template>
      <template v-slot:body>
        <h3>The word was: {{ word }}</h3>
        <div id="hint-footer">
          <button id="hint-button" @click="oneWord">
            LET'S GUESS THE NEXT
          </button>
        </div>
      </template>
    </base-modal>
  </transition>

  <transition name="modal">
    <base-modal v-if="showHint">
      <template v-slot:header>
        <h1>NEED A HAND OR TWO?</h1>
      </template>
      <template v-slot:body>
        <div v-if="hasDefinition">
          <h3>Pay 3 Coins and we will tell you something about the word</h3>
          <button v-if="!showDefinitionToggle" @click="showDefinition">
            YES, I WANNA KNOW!
          </button>
          <div v-if="showDefinitionToggle">
            <h3>{{ definition }}</h3>
          </div>
          <hr />
        </div>
        <h3>
          Pay 3 Coins to reveal one letter of the word(and all the other
          occerrences of the same letter!!)
        </h3>
        <button @click="hintRevealPay">
          YES, LET ME CHOOSE A LETTER TO REVEAL!
        </button>
        <div id="hint-footer">
          <button id="hint-button" @click="showHintToggle">
            NO THANKS I'VE CHANGED MY MIND
          </button>
        </div>
      </template>
    </base-modal>
  </transition>

  <button-start v-if="!startedGame" @close="oneWord">Start</button-start>

  <button
    v-if="startedGame"
    @click="
      showHintToggle();
      checkDictionary();
    "
  >
    WANNA PAY FOR SOME HINTS?
  </button>

  <!-- <button @click="checkDictionary">DICTIONARY</button> -->
</template>

<script>
import Letter from "./components/Letter";
import ButtonStart from "./components/ButtonStart";

export default {
  components: {
    Letter,
    ButtonStart,
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
      totalGuessWords: 0,
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
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word.toLowerCase()}`
      );
      const json = await res.json();
      // const result = JSON.stringify(json)
      //        this is syntax for datamuse
      //        this.definition = result[0].defs[0];
      this.definition = json[0]["meanings"][0]["definitions"][0]["definition"];
      console.log(this.definition);
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
