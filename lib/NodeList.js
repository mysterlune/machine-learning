define(['./Node'], function(node) {
    
    var NodeList = function(k) {
        if(!this instanceof NodeList) {
            return new NodeList(nodes);
        }
        
        this.nodes = [];
        this.k = k;
        
        return this;
    };

    NodeList.prototype.add = function(node) {
        this.nodes.push(node);
    };

    NodeList.prototype.determineUnknown = function() {
        this.calculateRanges(['rooms', 'area']);
        
        // Loop through our nodes and look for unknown types...
        for (var i in this.nodes) {
            
            if( !this.nodes[i].type ) {
                
                // If unknown type, clone node list and measure distances
                
                // Clone nodes
                this.nodes[i].neighbors = [];
                for (var j in this.nodes) {
                    if ( !this.nodes[j].type ) 
                        continue;
                    this.nodes[i].neighbors.push( new node(this.nodes[j]) );
                }
                
                // Measure distances
                this.nodes[i].measureDistances(this.area, this.rooms);
                
                // Sort by distance
                this.nodes[i].sortByDistance();
                
                // Guess type
                console.log(this.nodes[i].guessType(this.k));
                
            }
            
        }
    };

    NodeList.prototype.calculateRanges = function(features) {
        
        if(this.nodes.length === 0) {
            console.log('No nodes, mang...');
            return;
        }
        
        // Handles arbitrary features... 
        var ranges = {}, name;
        for (var feature in features) {
            ranges[features[feature]] = this[features[feature]] = {min: 1000000, max: 0};
        }
        
        // FIXME Icky nested looping... gotta be a better way
        // For every node, find the upper and lower bound value for each range type
        for(var i in this.nodes) {
            for(var n in ranges) {
                if(this.nodes[i].hasOwnProperty(n)) {
                    
                    if(this.nodes[i][n] < this[n].min) {
                        this[n].min = this.nodes[i][n];
                    }
                        
                    if(this.nodes[i].rooms > this[n].max) {
                        this[n].max = this.nodes[i][n];
                    }
                    
                }
            }                                             
        }
        
        return;
    };
    
    
    return NodeList;
});