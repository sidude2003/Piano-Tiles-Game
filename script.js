document.addEventListener("DOMContentLoaded", function () {
  let keySequence;
  let clickEnable = false;
  let gameOver = false;
  let roundClicks = 0;
  // document.querySelectorAll("td").forEach(function (td) {
  //   td.onclick = function (e) {
  //     td.addEventListener(
  //       "click",
  //       (e) => (e.target.style.background = "rgb(4, 252, 231)")
  //     );
  //     setTimeout(() => {
  //       e.target.style.background = "rgb(8, 252, 109)";
  //     }, 500);
  //     addToSequence();
  //     console.log(keySequence);
  //   };
  // });
  console.log("test");
  let playAgainButton = document.querySelector("button");
  let introText = document.querySelector("#randtext");
  let outroText = document.querySelector("#gameover");
  playAgainButton.style.display = "none";
  outroText.style.display = "none";
  document.querySelector("#gameover").textContent = "GAME OVER!!";
  document.querySelector("#randtext").textContent =
    "CLICK ON THE HIGHLIGHTED TILES IN ORDER";
  const correctS = document.querySelector("#correctSound");
  const wrongS = document.querySelector("#wrongAnswer");
  keySequence = new Map();
  playRound();

  let allKeys = document.querySelectorAll("td");
  allKeys.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (clickEnable) clickToLight(e);
    });
  });

  //function to light the tile on clicking
  function clickToLight(e) {
    roundClicks++;

    const key = e.target;
    key.style.backgroundColor = "rgb(4,252,231)";

    if (e.target.getAttribute("id") === keySequence.get(roundClicks)) {
      key.style.backgroundColor = "rgb(4,252,231)";
      setTimeout(() => {
        key.style.backgroundColor = "rgb(4,252,231)";
        correctS.play();
      }, 500);
    } else {
      key.style.backgroundColor = "rgb(255,0,0)";
      gameOver = true;
      clickEnable = false;
      playAgainButton.style.display = "block";
      introText.style.display = "none";
      outroText.style.display = "block";
      wrongS.play();
    }

    if (keySequence.size === roundClicks && !gameOver) {
      playRound();
    }

    console.log(keySequence);

    setTimeout(() => {
      key.style.backgroundColor = "rgb(123, 63, 0)";
    }, 500);
  }

  //function to generate random numbers
  function randomNum() {
    let rand = Math.random() * 16;
    return Math.floor(rand) + 1;
  }

  function addToSequence() {
    const randomKeyNumber = randomNum();
    keySequence.set(keySequence.size + 1, `key-${randomKeyNumber}`);
  }

  function lightSequence() {
    clickEnable = false; //player cannot click while sequence is being lit

    setTimeout(() => {
      clickEnable = true;
      roundClicks = 0; //here we are resetting number of clicks to 0
    }, keySequence.size * 1000);
    keySequence.forEach((value, key) => {
      const k = document.querySelector(`#${value}`);
      console.log(k);
      setTimeout(() => {
        lightKey(k);
      }, 1000 * key);
    });
  }

  function lightKey(key) {
    key.style.backgroundColor = "rgb(255, 255, 255)";

    console.log(keySequence);

    setTimeout(() => {
      key.style.backgroundColor = "rgb(123, 63, 0)";
    }, 500);
  }
  

  function playRound() {
    addToSequence();
    document.querySelector(
      "#displayRound"
    ).textContent = `ROUND: ${keySequence.size}`; //diplays round number (scoring system of the game)
    lightSequence();
  }
});
