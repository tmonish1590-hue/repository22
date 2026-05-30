// Initialize the chess logic engine and the visual board
var board = null
var game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // Do not allow moving pieces if the game is already over
  if (game.game_over()) return false

  // Only allow the correct side to move their own pieces
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // Check if the move is legal according to chess rules
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // Automatically promote pawns to a queen for simplicity
  })

  // If the move is illegal, snap the piece back to its original square
  if (move === null) return 'snapback'
}

function onSnapEnd () {
  // Update the board position after a piece is dropped
  board.position(game.fen())
}

// Configuration options for the chessboard display
var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

// Render the board inside the HTML div
board = Chessboard('board', config)
