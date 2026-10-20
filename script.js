const card = document.querySelector('.trading-card');
const boostButtons = document.querySelectorAll('.boost-button');
const statValues = document.querySelectorAll('.stats strong');
const battleButton = document.getElementById('battleButton');
const battleResult = document.getElementById('battleResult');

// Roll a random whole number between the minimum and maximum, inclusive.
function rollNumber(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

boostButtons.forEach((boostButton) => {
  boostButton.addEventListener('click', (event) => {
    event.stopPropagation();

    // Add 10 to each stat, without letting any stat exceed 100.
    statValues.forEach((stat) => {
      const currentValue = Number(stat.textContent);
      stat.textContent = String(Math.min(currentValue + 10, 100));
    });

    card.classList.add('is-boosted');

    setTimeout(() => {
      card.classList.remove('is-boosted');
    }, 250);
  });
});

card.addEventListener('click', (event) => {
  if (event.target.closest('button')) {
    return;
  }

  // Click or tap the card to flip it without interfering with its buttons.
  card.classList.toggle('is-flipped');
});

battleButton.addEventListener('click', () => {
  // Add up Sabrina's card stats, including any boosts from the button.
  const sabrinaStats = [...document.querySelectorAll('.stats strong')]
    .map((stat) => Number(stat.textContent))
    .reduce((total, stat) => total + stat, 0);

  // Give the mystery rival three random stats and both sides a dice roll.
  const rivalStats = rollNumber(50, 100) + rollNumber(50, 100) + rollNumber(50, 100);
  const sabrinaRoll = rollNumber(2, 20);
  const rivalRoll = rollNumber(1, 20);
  const sabrinaScore = sabrinaStats + sabrinaRoll;
  const rivalScore = rivalStats + rivalRoll;

  battleButton.disabled = true;
  battleResult.classList.add('is-rolling');

  // Change the dice faces quickly to make a simple rolling animation.
  const rollAnimation = setInterval(() => {
    battleResult.textContent = `🎲 ${rollNumber(1, 20)}  ⚔️  🎲 ${rollNumber(1, 20)}`;
  }, 90);

  setTimeout(() => {
    clearInterval(rollAnimation);
    battleResult.classList.remove('is-rolling');

    let winner = "IT'S A TIE!";
    if (sabrinaScore > rivalScore) {
      winner = 'SABRINA WINS!';
    } else if (rivalScore > sabrinaScore) {
      winner = 'YERBA BANDIT WINS!';
    }

    battleResult.innerHTML = `
      <span class="winner">${winner}</span>
      <span class="scores">Sabrina: ${sabrinaScore} &nbsp;|&nbsp; Yerba Bandit: ${rivalScore}</span>
    `;
    battleButton.disabled = false;
  }, 1200);
});
