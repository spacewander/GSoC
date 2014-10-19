// test the commandline opt
var should = require('chai').should();
var fs = require('fs');
var path = require('path');
require('shelljs/global');

var script = './index.js';

describe('commandline options: ', function(){
  before(function(){
    var file = path.resolve(process.cwd() + '/test/fixtures/GSoCProjects.json');
    var newFile = path.resolve(process.cwd() + '/GSoCProjects.json');
    fs.createReadStream(file).pipe(fs.createWriteStream(newFile));
  });

  describe('List projects ', function(){
    it('GSoC', function(){
      exec(script, {silent: true}).output.should.equal('\u001b[33mRails\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n\u001b[33mSciRuby\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });

    it('GSoC 2013', function(){
      exec(script + ' 2013', {silent: true}).output.should.equal('\u001b[33mAbiWord\u001b[39m\u001b[36m\n\t: wordProcess\u001b[39m\n\u001b[33mRails\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });

    it('GSoC 2013-2014', function(){
      exec(script + ' 2013-2014', {silent: true}).output.should.equal('\u001b[33mRails\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });
  });

  describe('list with tags ', function(){
    it('GSoC -t ruby', function(){
      exec(script + ' -t ruby', {silent: true}).output.should.equal('\u001b[33mRails\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n\u001b[33mSciRuby\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });

    it('GSoC -t ruby -t web', function(){
      exec(script + ' -t ruby -t web', {silent: true}).output.should.equal('\u001b[31mNot result found.\u001b[39m\n');
    });
  });

  describe('list with name ', function(){
    it('GSoC -n R', function(){
      exec(script + ' -n R', {silent: true}).output.should.equal('\u001b[33mRails\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n\u001b[33mSciRuby\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });

    it('GSoC 2009-2012 -n a', function(){
      exec(script + ' 2009-2012 -n a', {silent: true}).output.should.equal('\u001b[33mAbiWord\u001b[39m\u001b[36m\n\t: wordProcess\u001b[39m\n');
    });
  });

  describe('list with both tags and name', function(){
    it('GSoC 2014 -n c -t ruby', function(){
      exec(script + ' -n c -t ruby', {silent: true}).output.should.equal('\u001b[33mSciRuby\u001b[39m\u001b[36m\n\t: ruby\u001b[39m\n');
    });

    it('GSoC 2010 -n de -t c -t java', function(){
      exec(script + ' 2010 -n de -t c -t java', {silent: true}).output.should.equal('\u001b[33mDebian Project\u001b[39m\u001b[36m\n\t: c,java,python\u001b[39m\n');
    });
  });

});
