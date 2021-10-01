<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="user-name">Your Name</label>
      <input v-model="userName" id="user-name" name="user-name" type="text" />
    </div>
    <div>
      <button>JOIN THE HALL OF FAME</button>
    </div>
  </form>
</template>

<script>
export default {
  props:['totalGuessedWords'],
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.userName);
      console.log(this.totalGuessedWords)
      this.validation();
      fetch(
        "https://guessaword-a4a67-default-rtdb.europe-west1.firebasedatabase.app/hall-of-fame.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.userName,
            record: this.totalGuessedWords,
          }),
        }
      );
    },
    validation() {
      if (this.userName.length == 0 || this.userName.length > 30) {
        throw new Error("INPUT IS INVALID");
      }
    },
  },
};
</script>

<style scoped>
form {
  font: inherit;
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

button {
  font: inherit;
  border: 1px solid #1e2529;
  background-color: #2e383d;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 0px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
