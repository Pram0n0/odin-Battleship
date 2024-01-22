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
        this._shipsAlive = 0;
    }

    placeShip(x, y, alignment, ship) {
        for (let i = 0; i < ship.length; i++) {
            if (alignment === "horizontal") {
                this.board[y][x + i] = ship;
            } else if (alignment === "vertical") {
                this.board[y + i][x] = ship;
            }
        }
        this._shipsAlive++;
    }

    receiveAttack(x, y) {
        const targetShip = this.board[y][x];

        if (targetShip) {
            targetShip.hit();
            if (targetShip.isSunk()) {
                this._shipsAlive--;
            }
        } else {
            this.board[y][x] = "miss";
        }
    }

    allShipsSunk() {
        return this._shipsAlive === 0;
    }
}

class Player {
    constructor(player, board, enemyBoard) {
        this.player = player;
        this.board = board;
        this.enemyBoard = enemyBoard
    }

    attack(x, y) {
        this.enemyBoard.receiveAttack(x, y);
    }

    randomAttack() {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        this.attack(x, y);
    }
}


function gameloop() {
    const playerBoard = new Gameboard();
    const robotBoard = new Gameboard();

    const player = new Player("player1",playerBoard,robotBoard)
    const robot = new Player("player2",robotBoard,playerBoard)
    console.log("hi")   
}


export { Ship, Gameboard, Player, gameloop }