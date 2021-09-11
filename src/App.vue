<template>
<div><h1>Hello Hangman</h1></div>
<div><Letter v-bind:key="letter.index" v-for="letter in secretWord" :letter="letter" ></Letter></div>


<button v-if="!startedGame" @click="oneWord">START</button>
<div class="user-input" v-if="startedGame"><h1>type the letter you want to guess</h1></div>
<button v-if="startedGame" @click="oneWord">RESTART</button>

<div><li class="wrong-keys" v-for="wrong in wrongLetters" :key="wrong.index">{{ wrong }}</li></div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Letter from './components/Letter';
export default {
  components: {
    Letter
  },
  data(){
    return{
    word: "",
    secretWord: "",
    startedGame : false,
    guessedLetter : "",
    wrongLetters :[]
  }},
  methods : {
    async oneWord() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=1')
    const result = await res.json()
     this.word = result[0].toUpperCase()
     console.log(this.word)
     this.startGame()
    },
    checkPressed(){
      if(this.word.includes(this.guessedLetter) ){
        for (let i = 0; i < this.word.length; i++) {
          const char = this.word[i];
          if (char == this.guessedLetter){
          this.secretWord[i] = this.guessedLetter}
        } 
      } else {
        this.wrongLetters.push(this.guessedLetter)
      }
    },
    startGame(){
      this.secretWord = this.word.split("").map(() => "_")
      this.startedGame = !this.startedGame
      window.addEventListener('keydown', (e) => {
      this.guessedLetter = e.key.toUpperCase()
      console.log(this.guessedLetter)
      this.checkPressed()
      })
    }
  }

}
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
.user-input{
  padding: 10px;
  margin: 1rem 0rem -1rem 2rem;
}
.wrong-keys{
  font-size: 30px;
  color: red;
  text-shadow: #2c3e50;
}
</style>
