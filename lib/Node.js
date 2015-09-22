define(function() {
    
    function Node(features) {
        if(!this instanceof Node) {
            return new Node(features);
        }
        
        for (var key in features) {
            this[key] = features[key];
        }
        
        return this;
    }
    
    Node.prototype.measureDistances = function(area_range_object, room_range_object) {
        var rooms_range = room_range_object.max - room_range_object.min;
        var area_range = area_range_object.max - area_range_object.min;
        
        for(var i in this.neighbors) {
            
            var neighbor = this.neighbors[i];
            
            var delta_rooms = neighbor.rooms - this.rooms;
            delta_rooms = (delta_rooms)/rooms_range;
            
            var delta_area = neighbor.area - this.area;
            delta_area = (delta_area)/area_range;
            
            neighbor.distance = Math.sqrt( Math.pow(delta_rooms,2) + Math.pow(delta_area,2) ); 
            
        }
    };
    
    Node.prototype.sortByDistance = function() {
        this.neighbors.sort(function(a,b) {
            return a.distance - b.distance;
        });
    };
    
    Node.prototype.guessType = function(k) {
        var types = {};
        
        for(var i in this.neighbors.slice(0,k)) {
            
            var neighbor = this.neighbors[i];
            if(!types[neighbor.type]) {
                types[neighbor.type] = 0;
            }
            types[neighbor.type] += 1;
            
            var guess = {type: false, count: 1};
            for(var type in types) {
                if(types[type] > guess.count) {
                    guess.type = type;
                    guess.count = types[type];
                }
            }
            this.guess = guess;
        }
        return this.guess;
    };
    
    return Node;
});