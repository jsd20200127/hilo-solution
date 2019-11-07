$(function () {
  let randomNumber = generateRandomNumber()
  let guess
  let numberOfGuessesRemaining = 5

  $('#guessForm').submit((event) => {
    // prevent default behavior of form
    event.preventDefault()
    console.log('form was submitted')

    // grab value entered into the form
    const stringGuess = $('#guess').val()
    guess = parseInt(stringGuess)

    if (isNaN(guess)) {
      alert('Please enter in a valid number')
      return
    }

    if (guess > 100 || guess < 1) {
      alert('Please enter a number between 1 and 100')
      return
    }

    /* alternative to converting the value to an
      integer using 1 line of code

      const guess = parseInt($('#guess').val())
    */

    console.log(guess)
    compare()
    clearGuess()
  })

  $('#reset').click(() => {
    console.log('reset button clicked')
    resetGame()
  })

  function compare () {
    console.log(`randomNumber: ${randomNumber}`)
    // compare guess to randomNumber
    if (guess > randomNumber) {
      console.log('too high')
      displayMessage('Too high')
      numberOfGuessesRemaining = numberOfGuessesRemaining - 1
      checkGuessesRemaining()
    } else if (guess < randomNumber) {
      console.log('too low')
      displayMessage('Too low')
      numberOfGuessesRemaining = numberOfGuessesRemaining - 1
      checkGuessesRemaining()
    } else if (guess === randomNumber) {
      console.log('guessed correctly')
      gameOverWon()
    } else {
      console.log('something wrong happened')
    }

    console.log(numberOfGuessesRemaining)
    displayGuessCount()
  }

  // display
  function displayMessage (message) {
    $('.message').text(message)
  }

  // display updated guess count in UI
  function displayGuessCount () {
    $('#numberOfGuessesRemaining').text(numberOfGuessesRemaining)
  }

  function clearGuess () {
    $('#guess').val('')
  }

  function checkGuessesRemaining () {
    // if user runs out of guesses, call gameOverFail()
    if (numberOfGuessesRemaining === 0) {
      gameOverFail()
    }
  }

  function generateRandomNumber () {
    return Math.floor(Math.random() * 100) + 1
  }

  function resetGame () {
    // reset the number of guesses to 5
    numberOfGuessesRemaining = 5

    // display updated number of guesses
    displayGuessCount()

    // clear message box text and additional classes (i.e .success or .error)
    $('.message').attr('class', 'message')
    $('.message').text('')

    // re-enable the guess button
    $('#guessForm button').attr('disabled', false)

    // pick a new random number
    randomNumber = generateRandomNumber()

    // clear text field
    clearGuess()
  }

  function gameOverFail () {
    // display fail messagae
    displayMessage('You lose!')

    // add error class
    $('.message').addClass('error')

    // disable guess button
    $('#guessForm button').attr('disabled', true)
  }

  function gameOverWon () {
    // display success messagea
    displayMessage('Congrats!!!! Guessed Correctly')

    // add success class
    $('.message').addClass('success')

    // disable guess button
    $('#guessForm button').attr('disabled', true)
  }
})
