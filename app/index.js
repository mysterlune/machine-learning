var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});

requirejs(['../lib/Chromosome', '../lib/Population'], function(chromosome, population) {
    var town = new population('Mutants rule', 20);
    town.generation();
});
