<template>
  <div>
    <button @click="hallOfFame">get data</button>
  </div>
  <div>
  <ul>
    <li v-for="user in userScore" v-bind:key="user.index">{{user.name}} with {{ adj() }} score of {{ user.score }}</li>
  </ul>
  </div>
</template>

<script>
export default {
  props:['totalGuessedWords'],
  data() {
    return {
      userScore: [],
    };
  },
  methods: {
    hallOfFame() {

      fetch(
        "https://guessaword-a4a67-default-rtdb.europe-west1.firebasedatabase.app/hall-of-fame.json").then( (response) => {
          if(response.ok){
            return response.json();
            }
            }).then((data) => {
          const results = [];
          for (const id in data){
            results.push({
              id: id,
              name: data[id].name,
              score: data[id].record
            })
          }
          this.userScore = results
          console.log(this.userScore)
        })
        },
        adj() {
        let adjectives = ['an amazing','a fantastic','the terrific','an exceptional','an unbeliveable','a jawdropping']
        return adjectives[Math.floor(Math.random() * adjectives.length)]
      }
    },
    computed:{

    }
  }
</script>

<style scoped>
div {
  font: inherit;
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}


</style>
