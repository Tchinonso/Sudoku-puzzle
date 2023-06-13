function drawBoard() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
     // Draw the grid lines
    for (var i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 50);
      ctx.lineTo(450, i * 50);
      ctx.stroke();
       ctx.beginPath();
      ctx.moveTo(i * 50, 0);
      ctx.lineTo(i * 50, 450);
      ctx.stroke();
    }
     // Draw the numbers on the board
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (answer[i * 9 + j] !== '.') {
          ctx.fillText(answer[i * 9 + j], j * 50 + 20, i * 50 + 35);
        }
      }
    }
  }

  function solve() {
    // Call the solver function
    mySolver.solve();
     // Get the answer from the solver
    var answer = mySolver.getAnswer();
     // Draw the board on the canvas
    drawBoard(answer);
  }