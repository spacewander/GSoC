var should = require('chai').should;

var GSoC = require('../lib/GSoC.js');

describe('search projects', function(){

  it('search with 2014, "R"', function(){
    searchProjects(2014, 'R').should.equal({
        "Rails": ["ruby"],
        "SciRuby": ["ruby"]
    });
  });

  it('search with 2014, "Rails"', function(){
    searchProjects(2014, 'Rails').should.equal({ "Rails": ["ruby"]});
  });

  it('search with true, "R"', function(){
    searchProjects(true, "R").should.equal({});
  });

  it('search with 2014, "B"', function(){
    searchProjects(2014, "B").should.equal({});
  });
  
  // should trim before searching
  it('search with 2011, " "', function(){
    searchProjects(2011, " ").should.equal({});
  });

});
