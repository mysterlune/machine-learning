// http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/
// k-nearest-neighbor algorithm.
// good for classification of "things" in supervised learning.
// 

var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});

var fs = require('fs');

requirejs(['./Node','./NodeList'], function(node, node_list) {

    var kNN_data = JSON.parse( fs.readFileSync( 'kNN_data.json', 'utf8' ) );

    var k = 4;
    var data = kNN_data.data;
    
    var list = new node_list(k);
    
    for(var i in data) {
        list.add( new node(data[i]) );
    }
    
    var random_rooms = Math.round( Math.random() * 10 );
    var random_area = Math.round( Math.random() * 2000 );
    console.log('rooms: ' + random_rooms + ' | area: ' + random_area );
    list.add( new node( { rooms: random_rooms, area: random_area, type: false } ) );

    list.determineUnknown();
    
});
