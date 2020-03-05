$(function () {
  let randomNumber = generateRandomNumber()
  let userGuess
  let numGuessesRemaining = 5

  console.log(randomNumber)

  $("#guessForm").submit((event) => {
    // prevent form from trying to submit to
    // backend that doesn't exist
    event.preventDefault()
    console.log('submitting message ')

    // read value of the #guess text field
    const submittedGuess = $("#guess").val()
    userGuess = parseInt(submittedGuess)

    if (isNaN(userGuess)) {
      updateMessage("please enter a number")
      clearField()
      return
    }

    console.log(userGuess)

    compare()

    if (numGuessesRemaining === 0) {
      console.log('game over')
      gameOver()
    }

    clearField()
  })

  $("#reset").click(() => {
    resetGame()
  })

  function compare() {
    if (userGuess < randomNumber) {
      console.log('too low')

      // update messaging in ui
      updateMessage("Your guess is too low")

      // decrement number of guesses for incorrect guess
      numGuessesRemaining = numGuessesRemaining - 1
      console.log(numGuessesRemaining)

      updateGuessCount()

    } else if (userGuess > randomNumber) {
      console.log('too high')

      // update messaging in ui
      updateMessage("Your guess is too high")

      // decrement number of guesses for incorrect guess
      numGuessesRemaining = numGuessesRemaining - 1
      console.log(numGuessesRemaining)

      updateGuessCount()

    } else if (userGuess === randomNumber) {
      console.log('you win')

      updateMessage("congrats! you guessed correctly!")

      disableBtn()
    } else {
      console.log('something went wrong')
    }
  }

  function resetGame() {
    // enable #guess button
    enableBtn()

    // set numGuessesRemaining = 5
    numGuessesRemaining = 5

    updateGuessCount()

    // generate new random number
    randomNumber = generateRandomNumber()

    // clear message
    updateMessage("")
  }

  function clearField() {
    $("#guess").val("")
  }

  function disableBtn() {
    $("#guessBtn").attr("disabled", true)
  }

  function enableBtn() {
    $("#guessBtn").attr("disabled", false)
  }

  function updateMessage(message) {
    $('.message').text(message)
  }

  function updateGuessCount() {
    $('#numberOfGuessesRemaining').text(numGuessesRemaining)
  }

  function gameOver() {
    // disable button
    disableBtn()

    // display message letting them know they lost and also show the correct number
    updateMessage(`Sorry, you ran out of guesses; the correct number was ${randomNumber}`)
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
  }
})
