import $ = require('jquery');
import Backbone = require('backbone');
import chai = require('chai');
var expect = chai.expect;


describe('Integration tests', function() {
  Backbone.history.start();

  var $app = $('.app');

  describe('Dashboard page sample testing', () => {
    it('should ask for first name on first render', () => {
      expect($app.find('label').first().text()).to.equal('First Name');
    });
  });
});