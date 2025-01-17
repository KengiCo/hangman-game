# Hangman Game

Hangman is a simple game that revolves around guessing a randomly chosen word.

The player gets to choose an alphabet every round.
If the alphabet does not exist in the chosen word, the player will receive one strike.
After receiving a certain number of strikes, the player loses the game.
The player will win the game if he/she/it correctly guesses all the alphabets.


## Rules and Usage
1. Initialize this project with `npm` running `npm init`
2. Install and configure `Jest` as a testing library
3. To run the tests, run `npm run test`
4. Write the code following the **TDD** (Test Driven Development) approach

## The Three Rules of TDD
1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

Which means the workflow is:

1. Write a failing test. Stop writing the test as soon as it fails.
2. Write the minimal production code required for the test to pass. Stop writing any code once the test passes.
3. Refactor the test code and the production code without altering the functionality. All tests should pass.




Before starting any of the tasks in this Learning Path, please READ the following rules
===============================

What do you need to start this Learning Path:
----------------
1. A GitHub account
3. A Local IDE or Editor
5. Git Environment
6. A http://toggl.com/ account and Chrome Extension
7. A Netlify account

Rules that you MUST follow:
----------------
- **Fork this repo into your own Github Account** as a **public** Repository
- **Create a Github Project** connected to the repository
- Read **carefully** the task description
- Analyze the task, and **create relative subtasks** to track any requirement and knowledge needed
- **Assign an estimate to each created subtask**
- Define a **deadline for the main task**
- **Provide a Flowchart within the project**
- Where required, involve other members of the community to support you on the development
- When working on a task, move it to the **In progress** column and start tracking it
- After each task completion, **move it to the "Done" column** and stop tracking it
- After the main task completion, share the solution (e.g. your GitHub repo) over the community

Following some useful materials for your work:
----------------

[Git and GitHub configuration and usage](https://www.loom.com/share/6b86aa3bc0aa4f2d88a315bc9d3209c4)

[Pseudo Code Methodology](https://wtmatter.com/pseudocode/)

# To-do

* LOGIC

- grab random word from api
- create a start game function
- make the word secret so it will display _ instead of letters
- listen to key press and link it to guesses
- if pressed key is a letter included in the word, the world should appear
- if the key is not, a list of wrong pressed key should also appear
- set game over limit at 6 tries
- set game win if all letters in the word are pressed


* UI

- make letter to be guessed in circle resembling coin, with one side with a common background and the other with the letter
- when letter is guessed animate the coin and flip it
- animate the wrong tries in some way
- animate game win
- animate game over and show the word
- button component for restart game to put in app and modal

* EXTRA wannabe

- instead of tries, use money to bet on letters
- add hints that you can trade with money
- hint: get the definition of the word, with a call at the dictionary
- hint: reveal a letter(pay and click to reveal a letter)
- for mobiles, add custom on screen keyboard
- different languages and a kid's level(this could be even with pictures for kids who are starting to learn how to write)

* COIN LOGIC

- player start with a set amount of gold coins
- he gets more gold for every word he guesses, plus some more
if he gets the whole word
- he loses money everytime he misses
- he can pay for hints

* DESING

- hint modal and buttons
- total coins and guessed words
- better show of wrong letters
- clearer graphic theme
- font consistency







