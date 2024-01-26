import analyseArray from "./analyseArray";

test('normal number array', () => {
  expect(analyseArray([1, 2, 3, 4, 5])).toEqual({
    average: 3,
    min: 1,
    max: 5,
    length: 5,
  });
});

test('array-like object (string)', () => {
  expect(analyseArray('12345')).toBe('Not an array');
});

test('array empty', () => {
  expect(analyseArray([])).toBe('Array is empty');
});

test('array with non-number', () => {
  expect(analyseArray([1, 2, 3, 4, '5'])).toBe('Array contains non-numeric elements');
});

// const BOARD_SIZE = 10;

// const startBtn = document.querySelector(".startBtn")

// const htmlPlayerBoard = document.querySelector(".player-board")
// const htmlNpcBoard = document.querySelector(".npc-board")

// class Ship {
//     constructor(length) {
//         this.length = length;
//         this.beenHit = 0;
//     }

//     hit() {
//         this.beenHit++;
//     }

//     isSunk() {
//         return this.beenHit >= this.length;
//     }
// }

// class Gameboard {
//     constructor() {
//         this.board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
//         this.shipsAlive = 0;
//     }

//     placeShip(x, y, alignment, ship) {
//         if (this.isValidShipPlacement(x, y, alignment, ship)) {
//             for (let i = 0; i < ship.length; i++) {
//                 if (alignment === "horizontal") {
//                     this.board[y][x + i] = ship;
//                 } else if (alignment === "vertical") {
//                     this.board[y + i][x] = ship;
//                 }
//             }

//             this.shipsAlive++;
//             return true;
//         }
//         return false;
//     }

//     isValidShipPlacement(x, y, alignment, ship) {
//         for (let i = 0; i < ship.length; i++) {
//             let currentX = x;
//             let currentY = y;

//             if (alignment === "horizontal") {
//                 currentX += i;
//             } else if (alignment === "vertical") {
//                 currentY += i;
//             }

//             if (
//                 currentX < 0 || currentX >= BOARD_SIZE ||
//                 currentY < 0 || currentY >= BOARD_SIZE ||
//                 this.board[currentY][currentX] !== null
//             ) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     receiveAttack(x, y) {
//         const targetShip = this.board[y][x];

//         if (targetShip) {
//             targetShip.hit();
//             if (targetShip.isSunk()) {
//                 this.shipsAlive--;
//             }
//             console.log("hit")
//         } else {
//             this.board[y][x] = "miss";
//             console.log("miss")
//         }
//     }

//     allShipsSunk() {
//         return this.shipsAlive === 0;
//     }
// }

// class Player {
//     constructor(player, board, enemyBoard) {
//         this.player = player;
//         this.board = board;
//         this.enemyBoard = enemyBoard;
//         this.hitsRecord = [];
//         this.ShipList = [];
//     }

//     isValidAttack(x, y) {
//         return (
//             0 <= x && x < BOARD_SIZE &&
//             0 <= y && y < BOARD_SIZE &&
//             !this.hitsRecord.some(coord => coord[0] === x && coord[1] === y)
//         );
//     }

//     attack(x, y) {
//         if (this.isValidAttack(x, y)) {
//             this.enemyBoard.receiveAttack(x, y);
//             console.log(`attacked ${x},${y}`)
//             this.hitsRecord.push([x, y]);
//             return true;
//         }
//         return false;
//     }

//     randomAttack() {
//         const x = Math.floor(Math.random() * BOARD_SIZE);
//         const y = Math.floor(Math.random() * BOARD_SIZE);
//         this.attack(x, y);
//     }

//     createShips() {
//         this.ShipList = [
//             new Ship(2),
//             new Ship(3),
//             new Ship(3),
//             new Ship(4),
//             new Ship(5)
//         ];
//     }

//     randomShipPlacement() {
//         this.ShipList.forEach(ship => {
//             let x, y, alignment;

//             do {
//                 x = Math.floor(Math.random() * BOARD_SIZE);
//                 y = Math.floor(Math.random() * BOARD_SIZE);
//                 alignment = Math.random() < 0.5 ? "horizontal" : "vertical";
//             } while (!this.board.placeShip(x, y, alignment, ship));
//         });
//     }
// }

// function initialiseGame() {
//     const playerBoard = new Gameboard();
//     const npcBoard = new Gameboard();

//     const player = new Player("Player", playerBoard, npcBoard);
//     player.createShips();
//     player.randomShipPlacement();

//     const npc = new Player("NPC", npcBoard, playerBoard);
//     npc.createShips();
//     npc.randomShipPlacement();

//     updateBoard(htmlPlayerBoard, playerBoard.board, player.hitsRecord, true);
//     updateBoard(htmlNpcBoard, npcBoard.board, npc.hitsRecord, false);

//     return { player, npc };
// }

// function determineStartingPlayer(player, npc) {
//     const number = Math.ceil(Math.random() * 2);
//     return number === 1 ? player : npc;
// }

// function getPlayerMove(player) {
//     let x, y;
//     do {
//         x = parseInt(prompt("Enter x coordinate: "));
//         y = parseInt(prompt("Enter y coordinate: "));
//     } while (!player.attack(x, y));
// }

// async function playRoundWithDelay(activePlayer, player, npc, roundCount, isPlayerBoard) {
//     console.log(`Round ${roundCount}: ${activePlayer.player}'s turn`);
//     const targetBoard = isPlayerBoard ? htmlPlayerBoard : htmlNpcBoard;

//     if (roundCount === 0) {
//         // Initial delay before the first round
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
//     }

//     if (activePlayer.player === "NPC") {
//         activePlayer.randomAttack();
//     } else {
//         getPlayerMove(activePlayer);
//     }

//     updateBoard(targetBoard, activePlayer.enemyBoard.board, activePlayer.hitsRecord, isPlayerBoard);

//     if (checkForWinner(activePlayer)) {
//         console.log(`${activePlayer.player} wins!`);
//     } else {
//         await new Promise(resolve => setTimeout(resolve, 0));
//         activePlayer = activePlayer === player ? npc : player;
//         await playRoundWithDelay(activePlayer, player, npc, roundCount + 1, !isPlayerBoard);
//     }
// }


// function checkForWinner(activePlayer) {
//     return activePlayer.enemyBoard.shipsAlive === 0;
// }

// function gameController() {
//     const { player, npc } = initialiseGame();
//     let activePlayer = determineStartingPlayer(player, npc);
//     console.log(`${activePlayer.player}'s starts`);

//     playRoundWithDelay(activePlayer, player, npc, 0);
// }

// function startGame() {
//     startBtn.addEventListener("click", () => {
//         console.log("Start Game")
//         gameController()
//     })
// }

// function updateBoard(boardElement, boardData, hitsRecord, isPlayerBoard) {
//     console.log(`Updating board: ${boardElement.className}`);
//     boardElement.innerHTML = "";

//     for (let i = 0; i < BOARD_SIZE; i++) {
//         for (let j = 0; j < BOARD_SIZE; j++) {
//             const coordinateValue = boardData[i][j];

//             const cell = document.createElement("div");
//             cell.className = "cell";

//             if (coordinateValue) {
//                 if (coordinateValue === "miss") {
//                     cell.style.backgroundColor = "red";
//                     cell.innerHTML = "&#10060;"
//                 } else {
//                     if (isPlayerBoard) {
//                         cell.innerHTML = "Ship"
//                     } else {
//                         cell.innerHTML = ""
//                     }
//                     const isAttacked = hitsRecord.some(coord => coord[1] === i && coord[0] === j);
//                     console.log(isAttacked)
//                     cell.style.backgroundColor = isAttacked ? "green" : "";
//                 }
//             } else {
//                 cell.innerHTML = ""
//             }
//             boardElement.appendChild(cell);
//         }
//     }
// }

// export default startGame