'use strict';

// For future use
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Get the sum of array
function getSum(array) {
  var total = 0;
  for(var i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}

/* Store-location objects */

var firstAndPike = {
  minCust: 23,
  maxCust: 65,
  avgCookie: 6.3,
  openHour: 6,
  closeHour: 20,
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function() {
    var firstAndPikeUl = document.getElementById('firstAndPike');

    // Iterate over each day
    var hoursOpen = Math.abs(this.closeHour - this.openHour);
    for(var i = 0; i < hoursOpen; i++) {
      var liEl = document.createElement('li');
      var numCookies = Math.round(this.avgCookie * this.generateRandom());
      var time;
      if (i + this.openHour <= 11) {
        time = (this.openHour + i) + 'am';
      } else if (i + this.openHour === 12) {
        time = (this.openHour + i) + 'pm';
      } else {
        time = (this.openHour + i - 12) + 'pm';
      }
      liEl.textContent = time + ': ' + numCookies + ' cookies';
      firstAndPikeUl.appendChild(liEl);
      this.totalCookies.push(numCookies);
    }
    liEl.textContent = 'Total: ' + getSum(this.totalCookies) + ' cookies';
  },
  totalCookies: [],
};

var seaTacAirport = {
  minCust: 3,
  maxCust: 24,
  avgCookie: 1.2,
  openHour: 6,
  closeHour: 20,
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function() {
    var seaTacUl = document.getElementById('seaTacAirport');
    // Iterate over each day
    var hoursOpen = Math.abs(this.closeHour - this.openHour);
    for(var i = 0; i < hoursOpen; i++) {
      // There are three parts to this process:
      // 1. Create an element
      var liEl = document.createElement('li');
      // 2. Give it content
      var numCookies = Math.round(this.avgCookie * this.generateRandom());
      var time;
      if (i + this.openHour <= 11) {
        time = (this.openHour + i) + 'am';
      } else if (i + this.openHour === 12) {
        time = (this.openHour + i) + 'pm';
      } else {
        time = (this.openHour + i - 12) + 'pm';
      }
      liEl.textContent = time + ' ' + numCookies + ' cookies';
      // 3. Append it to a certain place in the DOM
      // parentElement.appendChild(childElement)
      seaTacUl.appendChild(liEl);
      this.totalCookies.push(numCookies);
    }
    liEl.textContent = 'Total: ' + getSum(this.totalCookies) + ' cookies';
  },
  totalCookies: [],
};

var seattleCenter = {
  minCust: 11,
  maxCust: 38,
  avgCookie: 3.7,
  openHour: 6,
  closeHour: 20,
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function() {
    var seaCenterUl = document.getElementById('seattleCenter');
    // Iterate over each day
    var hoursOpen = Math.abs(this.closeHour - this.openHour);
    for(var i = 0; i < hoursOpen; i++) {
      // There are three parts to this process:
      // 1. Create an element
      var liEl = document.createElement('li');
      // 2. Give it content
      var numCookies = Math.round(this.avgCookie * this.generateRandom());
      var time;
      if (i + this.openHour <= 11) {
        time = (this.openHour + i) + 'am';
      } else if (i + this.openHour === 12) {
        time = (this.openHour + i) + 'pm';
      } else {
        time = (this.openHour + i - 12) + 'pm';
      }
      liEl.textContent = time + ' ' + numCookies + ' cookies';
      // 3. Append it to a certain place in the DOM
      // parentElement.appendChild(childElement)
      seaCenterUl.appendChild(liEl);
      this.totalCookies.push(numCookies);
    }
    liEl.textContent = 'Total: ' + getSum(this.totalCookies) + ' cookies';
  },
  totalCookies: [],
};

var capitolHill = {
  minCust: 20,
  maxCust: 38,
  avgCookie: 2.3,
  openHour: 6,
  closeHour: 20,
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function() {
    var capitolHillUl = document.getElementById('capitolHill');
    // Iterate over each day
    var hoursOpen = Math.abs(this.closeHour - this.openHour);
    for(var i = 0; i < hoursOpen; i++) {
      // There are three parts to this process:
      // 1. Create an element
      var liEl = document.createElement('li');
      // 2. Give it content
      var numCookies = Math.round(this.avgCookie * this.generateRandom());
      var time;
      if (i + this.openHour <= 11) {
        time = (this.openHour + i) + 'am';
      } else if (i + this.openHour === 12) {
        time = (this.openHour + i) + 'pm';
      } else {
        time = (this.openHour + i - 12) + 'pm';
      }
      liEl.textContent = time + ' ' + numCookies + ' cookies';
      // 3. Append it to a certain place in the DOM
      // parentElement.appendChild(childElement)
      capitolHillUl.appendChild(liEl);
      this.totalCookies.push(numCookies);
    }
    liEl.textContent = 'Total: ' + getSum(this.totalCookies) + ' cookies';
  },
  totalCookies: [],
};

var alki = {
  minCust: 2,
  maxCust: 16,
  avgCookie: 4.6,
  openHour: 6,
  closeHour: 20,
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  },
  render: function() {
    var alkiUl = document.getElementById('alki');
    // Iterate over each day
    var hoursOpen = Math.abs(this.closeHour - this.openHour);
    for(var i = 0; i < hoursOpen; i++) {
      // There are three parts to this process:
      // 1. Create an element
      var liEl = document.createElement('li');
      // 2. Give it content
      var numCookies = Math.round(this.avgCookie * this.generateRandom());
      var time;
      if (i + this.openHour <= 11) {
        time = (this.openHour + i) + 'am';
      } else if (i + this.openHour === 12) {
        time = (this.openHour + i) + 'pm';
      } else {
        time = (this.openHour + i - 12) + 'pm';
      }
      liEl.textContent = time + ' ' + numCookies + ' cookies';
      // 3. Append it to a certain place in the DOM
      // parentElement.appendChild(childElement)
      alkiUl.appendChild(liEl);
      this.totalCookies.push(numCookies);
    }
    liEl.textContent = 'Total: ' + getSum(this.totalCookies) + ' cookies';
  },
  totalCookies: [],
};

firstAndPike.render();
seaTacAirport.render();
seattleCenter.render();
capitolHill.render();
alki.render();
