var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});

var SudokuSolver = function( data ) {

  var tmp;
  for(var i=0; i<=9; i++) {
    if( !data[i] ) {
      data[i] = [];
    }
  }
  console.log(data);
}


var data = [];
SudokuSolver( data );
