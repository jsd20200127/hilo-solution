$(function () {
  // declare global variables
  let secretNumber = generateRandomNumber()
  let remainingGuesses = 5

  // hide game over message when page first loads
  hideGameOverMessage()

  console.log('secretNumber', secretNumber)

  // listening for a submit event
  $('#guessForm').submit((event) => {
    event.preventDefault()

    // grab value from text field
    // and convert to Integer
    const guess = parseInt($('#guess').val())
    console.log(guess)

    // display error message when users
    // enter invalid data (i.e. non number)
    if (isNaN(guess)) {
      alert('Invalid input, please enter number')
      clearGuessField()

      // user "return" keyword exit out of
      // submit listener when user enters invalid input
      return
    }

    compare(guess)
    clearGuessField()

    console.log('num of guesses', remainingGuesses)
  })

  $('#reset').click(() => {
    console.log('clicked on reset button')
    reset()
  })

  function compare (userGuess) {
    if (userGuess > secretNumber) {
      console.log('Too high')
      updateMessage('Too high')

      remainingGuesses -= 1
      displayGuessesRemaining()
    } else if (userGuess < secretNumber) {
      console.log('Too low')
      updateMessage('Too low')

      remainingGuesses -= 1
      displayGuessesRemaining()
    } else if (userGuess === secretNumber) {
      console.log('you guessed correctly!!!')
      updateMessage('You guessed correctly!!!')

      // disable guess button after you win
      disableGuessButton()
    } else {
      console.log('something wrong happened')
    }

    // check if user has run out of guesses
    if (remainingGuesses === 0) {
      console.log('game over, try again')
      showGameOverMessage()
      updateMessage(`Secret Number was ${secretNumber}`)

      // disable guess button after you win
      disableGuessButton()
    }
  }

  function clearGuessField () {
    $('#guess').val('')
  }

  function updateMessage (message) {
    $('.message').text(message)
  }

  function generateRandomNumber () {
    return Math.floor(Math.random() * 100) + 1
  }

  function displayGuessesRemaining () {
    $('#numberOfGuessesRemaining').text(remainingGuesses)
  }

  function disableGuessButton () {
    $('#guessBtn').attr('disabled', true)
  }

  function enableGuessButton () {
    $('#guessBtn').attr('disabled', false)
  }

  function showGameOverMessage () {
    $('#gameOverMessage').show()
  }

  function hideGameOverMessage () {
    $('#gameOverMessage').hide()
  }

  function reset () {
    // set numberOfGuessesRemaining back to 5
    remainingGuesses = 5
    displayGuessesRemaining()

    // clear out the message container
    updateMessage('')

    // hide the game over message
    hideGameOverMessage()

    // activate the guess button
    enableGuessButton()

    // clear text field if it contains a value
    clearGuessField()

    // generate new secretNumber
    secretNumber = generateRandomNumber()
    console.log('secretNumber', secretNumber)
  }
})
