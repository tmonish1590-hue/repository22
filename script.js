// Initialize chess engine logic and visual board
var board = null
var game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // Game over or computer's turn? Block the player from moving
  if (game.game_over() || game.turn() === 'b') return false

  // Only allow player to move White pieces
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove () {
  var possibleMoves = game.moves()

  // Game over check
  if (possibleMoves.length === 0) return

  // Computer selects a random move from all available legal moves
  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  
  // Update the visual board with the computer's move
  board.position(game.fen())
}

function onDrop (source, target) {
  // Check if your move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' 
  })

  // If illegal, snap piece back
  if (move === null) return 'snapback'

  // If legal, wait 250 milliseconds and let the computer play
  window.setTimeout(makeRandomMove, 250)
}

function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('board', config)
