define(['./Chromosome'], function(ChromosomeObj) {

    var Population = function(goal, size) {
        this.members = [];
        this.goal = goal;
        this.generationNumber = 0;

        var my_size = size;
        while (my_size) {
            var Chromosome = new ChromosomeObj();
            Chromosome.random(this.goal.length);
            this.members.push(Chromosome);
            my_size--;
        }
        return;
    };
    
    Population.prototype.display = function() {
        console.log('generation: ' + this.generationNumber);
        var i;
        for (i = 0; i < this.members.length; i++) {
            console.log(this.members[i].code + " (" + this.members[i].cost + ")");
        }
    };
    Population.prototype.sort = function() {
        this.members.sort(function(a, b) {
            return a.cost - b.cost;
        });
    };
    
    Population.prototype.generation = function() {
        var i;
        for (i = 0; i < this.members.length; i++) {
            this.members[i].calcCost(this.goal);
        }

        this.sort();
        this.display();
        var children = this.members[0].mate(this.members[1]);
        this.members.splice(this.members.length - 2, 2, children[0], children[1]);

        for (i = 0; i < this.members.length; i++) {
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
            if (this.members[i].code == this.goal) {
                this.sort();
                this.display();
                return true;
            }
        }
        this.generationNumber++;
        var scope = this;
        setTimeout(function() {
            scope.generation();
        }, 20);
        
        return false;
        
    };

    return Population;
});
