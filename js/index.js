$(function () {
  let randomNumber = generateRandomNumber()
  let remainingGuesses = 5

  function generateRandomNumber () {
    return Math.floor(Math.random() * 100) + 1
  }

  $('#numberOfGuessesRemaining').text(remainingGuesses)

  $('#reset').click(() => {
    console.log('reset game')

    // set the remaining guesses back to 5
    remainingGuesses = 5

    // update page with updated remaining guesses count
    $('#numberOfGuessesRemaining').text(remainingGuesses)

    // clear out message container
    $('.message').text('')

    // disable guess button
    $('#guessBtn').attr('disabled', false)

    // generate new random number
    randomNumber = generateRandomNumber()
  })

  $('#guessForm').submit((event) => {
    event.preventDefault()
    console.log('form is submitting')

    console.log(`random number: ${randomNumber}`)

    // grab value from input field & convert to number
    const guess = parseInt($('#guess').val())
    console.log(guess)

    if (isNaN(guess)) {
      console.log('not a number')
      alert('Please enter in a number')

      // clear text field
      $('#guess').val('')

      // exit .submit() function
      return
    }

    // clear text field
    $('#guess').val('')

    if (guess > randomNumber) {
      console.log('too high')
      remainingGuesses = remainingGuesses - 1

      // update page with message
      $('.message').text('Too High')

      // update page with updated remaining guesses count
      $('#numberOfGuessesRemaining').text(remainingGuesses)
    } else if (guess < randomNumber) {
      console.log('too low')

      // update page with message
      $('.message').text('Too Low')
      remainingGuesses = remainingGuesses - 1

      // update page with updated remaining guesses count
      $('#numberOfGuessesRemaining').text(remainingGuesses)
    } else {
      // they are the same
      console.log('winner - you guessed correctly')

      // update page with message
      $('.message').text('You Guessed Correctly!!!')

      // disable guess button
      $('#guessBtn').attr('disabled', true)
    }

    // check if user has run out of guesses

    if (remainingGuesses === 0) {
      console.log('Game over, you lose')

      $('.message').text('Game over, you lose')
      // disable guess button
      $('#guessBtn').attr('disabled', true)
    }

    console.log(`remaining guesses: ${remainingGuesses}`)
  })
})
