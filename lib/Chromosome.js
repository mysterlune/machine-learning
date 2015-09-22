define(function() {
    
    var Chromosome = function(code) {
        if (!this instanceof Chromosome)
            return new Chromosome(code);
        if (code) this.code = code;
        this.cost = 9999;
        return this;
    };
    
    Chromosome.prototype.code = '';
    
    Chromosome.prototype.random = function(length) {
        while (length--) {
            this.code += String.fromCharCode(Math.floor(Math.random() * 255));
        }
    };
    
    Chromosome.prototype.mutate = function(chance) {
        if (Math.random() > chance) return;

        var index = Math.floor(Math.random() * this.code.length);
        var upOrDown = Math.random() <= 0.5 ? -1 : 1;
        var newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
        var newString = '';
        for (i = 0; i < this.code.length; i++) {
            if (i == index) newString += newChar;
            else newString += this.code[i];
        }

        this.code = newString;

    };
    
    Chromosome.prototype.mate = function(partner) {
        
        var pivot = Math.round(this.code.length / 2) - 1;

        var child1 = this.code.substr(0, pivot) + partner.code.substr(pivot);
        var child2 = partner.code.substr(0, pivot) + this.code.substr(pivot);

        return [new Chromosome(child1), new Chromosome(child2)];
    };
    
    Chromosome.prototype.calcCost = function(compareTo) {
        var total = 0;
        var difference;
        for (i = 0; i < this.code.length; i++) {
            difference = (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
            total += Math.pow(difference, 2);
        }
        this.cost = total;
    };
    
    return Chromosome;
    
});
