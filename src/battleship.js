const BOARD_SIZE = 10;

class Ship {
    constructor(length) {
        this.length = length;
        this.beenHit = 0;
    }

    hit() {
        this.beenHit++;
    }

    isSunk() {
        return this.beenHit >= this.length;
    }
}

class Gameboard {
    constructor() {
        this.board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
        this.shipsAlive = 0;
    }

    placeShip(x, y, alignment, ship) {
        if (this.isValidShipPlacement(x, y, alignment, ship)) {
            for (let i = 0; i < ship.length; i++) {
                if (alignment === "horizontal") {
                    this.board[y][x + i] = ship;
                } else if (alignment === "vertical") {
                    this.board[y + i][x] = ship;
                }
            }

            this.shipsAlive++;
            return true;
        }
        return false;
    }

    isValidShipPlacement(x, y, alignment, ship) {
        for (let i = 0; i < ship.length; i++) {
            let currentX = x;
            let currentY = y;

            if (alignment === "horizontal") {
                currentX += i;
            } else if (alignment === "vertical") {
                currentY += i;
            }

            if (
                currentX < 0 || currentX >= BOARD_SIZE ||
                currentY < 0 || currentY >= BOARD_SIZE ||
                this.board[currentY][currentX] !== null
            ) {
                return false;
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        const targetShip = this.board[y][x];

        if (targetShip) {
            targetShip.hit();
            if (targetShip.isSunk()) {
                this.shipsAlive--;
            }
            console.log("hit")
        } else {
            this.board[y][x] = "miss";
            console.log("miss")
        }
    }

    allShipsSunk() {
        return this.shipsAlive === 0;
    }
}

class Player {
    constructor(player, board, enemyBoard) {
        this.player = player;
        this.board = board;
        this.enemyBoard = enemyBoard;
        this.hitsRecord = [];
        this.ShipList = [];
    }

    isValidAttack(x, y) {
        return (
            0 <= x && x < BOARD_SIZE &&
            0 <= y && y < BOARD_SIZE &&
            !this.hitsRecord.some(coord => coord[0] === x && coord[1] === y)
        );
    }

    attack(x, y) {
        if (this.isValidAttack(x, y)) {
            this.enemyBoard.receiveAttack(x, y);
            console.log(`attacked ${x},${y}`)
            this.hitsRecord.push([x, y]);
            return true;
        }
        return false;
    }

    randomAttack() {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        this.attack(x, y);
    }

    createShips() {
        this.ShipList = [
            new Ship(2),
            new Ship(3),
            new Ship(3),
            new Ship(4),
            new Ship(5)
        ];
    }

    randomShipPlacement() {
        this.ShipList.forEach(ship => {
            let x, y, alignment;

            do {
                x = Math.floor(Math.random() * BOARD_SIZE);
                y = Math.floor(Math.random() * BOARD_SIZE);
                alignment = Math.random() < 0.5 ? "horizontal" : "vertical";
            } while (!this.board.placeShip(x, y, alignment, ship));
        });
    }
}

function initialiseGame() {
    const playerBoard = new Gameboard();
    const npcBoard = new Gameboard();

    const player = new Player("Player", playerBoard, npcBoard);
    player.createShips();
    player.randomShipPlacement();

    const npc = new Player("NPC", npcBoard, playerBoard);
    npc.createShips();
    npc.randomShipPlacement();

    return { player, npc };
}

function determineStartingPlayer(player, npc) {
    const number = Math.ceil(Math.random() * 2);
    return number === 1 ? player : npc;
}

function playRound(activePlayer) {
    console.log(`${activePlayer.player}'s turn`)
    if (activePlayer.player === "NPC") {
        activePlayer.randomAttack();
    } else {
        let x, y, alignment;

        do {
            x = prompt("x: ");
            y = prompt("y: ");
            alignment = prompt("Alignment: ");
        } while (!activePlayer.attack(x, y, alignment));
    }

    if (checkForWinner(activePlayer)) {
        console.log(`${activePlayer.player} wins!`);
        return true;
    } else {
        return false;
    }
}

function checkForWinner(activePlayer) {
    return activePlayer.enemyBoard.shipsAlive === 0;
}

function gameController() {
    const { player, npc } = initialiseGame();

    let activePlayer = determineStartingPlayer(player, npc);
    console.log(`${activePlayer.player}'s starts`)

    let gameEnd = false;

    while (!gameEnd) {
        gameEnd = playRound(activePlayer);
        activePlayer = activePlayer === player ? npc : player;
    }
}


export default gameController