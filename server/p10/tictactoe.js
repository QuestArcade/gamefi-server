// define basic rules and game patterns
var field;
var inputs;
var playerFields = [];
var botFields = [];
var openFields = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var tiktaktoe = {
  lines: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ],
  neighbours: {
    1: [2, 4, 5],
    2: [1, 5, 3],
    3: [2, 5, 6],
    4: [1, 5, 7],
    5: [1, 2, 3, 4, 6, 7, 8, 9],
    6: [3, 5, 9],
    7: [4, 5, 8],
    8: [7, 5, 9],
    9: [8, 5, 6],
  }
}

document.addEventListener("DOMContentLoaded", function() {
  field = document.querySelector(".field");
  inputs = document.querySelectorAll("input");

  // Add event listener to the restart button
  document.getElementById("restart-button").addEventListener("click", function() {
    location.reload(); // Reload the page
  });

  inputs.forEach(i => {
    i.addEventListener("click", function() {
      de_activate(field);
      i.setAttribute("checked", "checked");
      i.setAttribute("player", "player");
      playerFields.push(parseInt(i.id));
      let index = openFields.indexOf(parseInt(i.id));
      if (index > -1) {
        openFields.splice(index, 1);
      }
      if (checkIfWon() !== false) {
        document.querySelector("h1").innerText = checkIfWon();
      } else {
        bot(i);
      }
    });
  });
});

function bot(i) {
  if (playerFields.length == 1) {
    if (openFields.includes(5)) {
      console.log("Choose middle field to avoid traps");
      makeMove(5);
    } else {
      console.log("Choose random Neighbour");
      makeMove(tiktaktoe.neighbours[i.id][Math.floor(Math.random() * tiktaktoe.neighbours[i.id].length)]); 
    }
  } else {
    let loosableLines = [];
    let winableLines = [];
    let makemoveableLines = [];

    for (let lineIndex = 0; lineIndex < tiktaktoe.lines.length; lineIndex++) {
      let currentLine = tiktaktoe.lines[lineIndex];

      let thisfreeFields = 0;
      let thisfreeFieldArray = [];
      let thisbotFields = 0;
      let thisplayerFields = 0;

      for (let fieldIndex = 0; fieldIndex < currentLine.length; fieldIndex++) {
        if (playerFields.includes(currentLine[fieldIndex])) {
          thisplayerFields++;
        }

        if (botFields.includes(currentLine[fieldIndex])) {
          thisbotFields++;
        }

        if (openFields.includes(currentLine[fieldIndex])) {
          thisfreeFields++;
          thisfreeFieldArray.push(currentLine[fieldIndex]);
        }
      }

      if (thisbotFields == 2 && thisfreeFields == 1) {
        winableLines.push(lineIndex);
      }

      if (thisplayerFields == 2 && thisfreeFields == 1) {
        loosableLines.push(lineIndex);
      }

      if (thisbotFields == 1 && thisfreeFields == 2) {
        makemoveableLines.push(lineIndex);
      }
    }

    if (winableLines.length > 0) {
      console.log("Try to win");
      tiktaktoe.lines[winableLines[0]].forEach(lineField => {
        if (openFields.includes(lineField)) {
          makeMove(lineField);
        }
      });
    } else if (loosableLines.length > 0) {
      console.log("Try to avoid lose");
      tiktaktoe.lines[loosableLines[0]].forEach(lineField => {
        if (openFields.includes(lineField)) {
          makeMove(lineField);
        }
      });
    } else if (makemoveableLines.length > 0) {
      console.log("Try to get a row myself");
      let thismoveableLine = tiktaktoe.lines[makemoveableLines[Math.floor(Math.random() * makemoveableLines.length)]];

      let thismoveableline_shuffled = shuffleArray(thismoveableLine);

      for (let i = 0; i < thismoveableline_shuffled.length; i++) {
        if (openFields.includes(thismoveableline_shuffled[i])) {
          makeMove(thismoveableline_shuffled[i]);
          break;
        }
      }
    } else {
      console.log("Try random move because Player is weird and doesnt even try anything");
      makeMove(openFields[Math.floor(Math.random() * openFields.length)]);
    }
  }
}

function de_activate(e) {
  if (e.getAttribute("toggleActive") == "active" || !e.getAttribute("toggleActive")) {
    e.setAttribute("toggleActive", "deactive");
  } else {
    e.setAttribute("toggleActive", "active");
  }
}

function makeMove(y) {
  setTimeout(() => {
    inputs.forEach(input => {
      if (parseInt(input.id) === y) {
        input.setAttribute("checked", "checked");
        botFields.push(y);
        let index = openFields.indexOf(y);
        if (index > -1) {
          openFields.splice(index, 1);
        }
      }
    });
    if (checkIfWon()) {
      document.querySelector("h1").innerText = checkIfWon();
    } else {
      setTimeout(function() {
        de_activate(field);
      }, 100);
    }
  }, 800);
}

function checkIfWon() {
  let back = false;

  if (openFields.length > 0) {
    tiktaktoe.lines.forEach((line, index) => {
      if (line.every(elem => playerFields.includes(elem))) {
        back = "PLAYER WON";

        line.forEach(field => {
          document.querySelector(`[id='${field}']`).classList.add("playerWonField");
        });

        field.setAttribute("player", true);
        field.setAttribute("line", index);
      }

      if (line.every(elem => botFields.includes(elem))) {
        back = "BOT WON";

        line.forEach(field => {
          document.querySelector(`[id='${field}']`).classList.add("botWonField");
        });

        field.setAttribute("bot", true);
        field.setAttribute("line", index);
      }
    });
  } else {
    back = "DRAW";
  }

  return back;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
}
