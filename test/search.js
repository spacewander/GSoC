var should = require('chai').should();
var fs = require('fs');
var path = require('path');

var searchProjects = require('../lib/GSoC.js').searchProjects;

describe('search ', function(){
  before(function(){
    var file = path.join(__dirname + '/fixtures/GSoCProjects.json');
    fs.createReadStream(file).pipe(fs.createWriteStream(file));
  });

  describe('search projects', function(){

    it('search with 2014, "R"', function(){
      searchProjects(2014, 'R', function(res) {
        res.should.have.property('Rails');
        res.should.have.property('SciRuby');
      });
    });

    it('search with 2014, "Rails"', function(){
      searchProjects(2014, 'Rails', function(res) {
        res.should.have.property('Rails');
      });
    });

    it('search with 2014, "z"', function(){
      searchProjects(2014, "z", function(res){
        JSON.stringify(res).should.equal('{}');
      });
    });
    
    // should trim before searching
    it('search with 2011, " "', function(){
      searchProjects(2011, " ", function(res){
        JSON.stringify(res).should.equal('{}');
      });
    });

    it('search with [2009, 2011], "A"', function(){
      searchProjects([2009, 2011], "A", function(res){
        res.should.have.property('AbiWord');
      });
    });

    it('search with [2010, 2011], "B"', function(){
      searchProjects([2010, 2011], "B", function(res){
        res.should.have.property('AbiWord');
        res.should.have.property('Blender Foudation');
        res.should.have.property('BlueZ');
      });
    });

  });
});
