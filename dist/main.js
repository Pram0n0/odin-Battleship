(()=>{"use strict";class t{constructor(){this.board=Array.from({length:10},(()=>Array(10).fill(null))),this._shipsAlive=0}placeShip(t,s,i,a){for(let r=0;r<a.length;r++)"horizontal"===i?this.board[s][t+r]=a:"vertical"===i&&(this.board[s+r][t]=a);this._shipsAlive++}receiveAttack(t,s){const i=this.board[s][t];i?(i.hit(),i.isSunk()&&this._shipsAlive--):this.board[s][t]="miss"}allShipsSunk(){return 0===this._shipsAlive}}class s{constructor(t,s,i){this.player=t,this.board=s,this.enemyBoard=i}attack(t,s){this.enemyBoard.receiveAttack(t,s)}randomAttack(){const t=Math.floor(10*Math.random()),s=Math.floor(10*Math.random());this.attack(t,s)}}!function(){const i=new t,a=new t;new s("player1",i,a),new s("player2",a,i),console.log("hi")}()})();