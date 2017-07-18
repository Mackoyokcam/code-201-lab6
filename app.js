'use strict';

var patStores = [];
var tableName = 'store_data'; // Match with table ID of sales.html
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var storeList = {
  'First and Pike': {
    id: 'firstAndPike',
    minCust: 23,
    maxCust: 65,
    avgCookie: 6.3,
    openHour: 6,
    closeHour: 20,
  },
  'SeaTac Airport': {
    id: 'seaTacAirport',
    minCust: 3,
    maxCust: 24,
    avgCookie: 1.2,
    openHour: 6,
    closeHour: 20,
  },
  'Seattle Center': {
    id: 'seattleCenter',
    minCust: 11,
    maxCust: 38,
    avgCookie: 3.7,
    openHour: 6,
    closeHour: 20,
  },
  'Capitol Hill': {
    id: 'capitolHill',
    minCust: 20,
    maxCust: 38,
    avgCookie: 2.3,
    openHour: 6,
    closeHour: 20,
  },
  'Alki': {
    id: 'alki',
    minCust: 2,
    maxCust: 16,
    avgCookie: 4.6,
    openHour: 6,
    closeHour: 20,
  }
};

function Store(name, id, minCust, maxCust, avgCookie, openHour, closeHour) {
  this.name = name;
  this.id = id;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.openHour = openHour;
  this.closeHour = closeHour;
  this.hoursOpen = Math.abs(closeHour - openHour);
  this.totalCookies = [];
  this.generateRandom = function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  };
  this.getCookieSum = function() {
    var total = 0;
    for(var i = 0; i < this.totalCookies.length; i++) {
      total += this.totalCookies[i];
    }
    return total;
  };
  this.createRow = function() {
    // Get unordered list with store ID
    var rowElement = document.createElement('tr');

    // Render store name
    var tableDataElement = document.createElement('td');
    tableDataElement.textContent = this.name;
    rowElement.appendChild(tableDataElement);

    // Iterate over each hour
    for (var i = 0; i <= this.hoursOpen; i++) {
      tableDataElement = document.createElement('td');
      var numberOfCookies = Math.round(this.avgCookie * this.generateRandom());

      // Render cookies to be made for the hour
      tableDataElement.textContent = numberOfCookies;
      rowElement.appendChild(tableDataElement);
      this.totalCookies.push(numberOfCookies);
    }
    // Render Total
    tableDataElement = document.createElement('td');
    tableDataElement.textContent = this.getCookieSum() + ' cookies';
    rowElement.appendChild(tableDataElement);

    return rowElement;
  };
  this.addToTable = function() {
    var tableElement = document.getElementById(tableName);
    tableElement.appendChild(this.createRow());
  };
}

// Create store instances
for (var key in storeList) {
  var currentStore = storeList[key];
  patStores.push(new Store(key, currentStore.id, currentStore.minCust, currentStore.maxCust,
    currentStore.avgCookie, currentStore.openHour, currentStore.closeHour));
}

// Render Header

      // Logic for displaying the time of day
      // var time;
      // if (i + this.openHour <= 11) {           // AM
      //   time = (this.openHour + i) + 'am';
      // } else if (i + this.openHour === 12) {  // Noon
      //   time = (this.openHour + i) + 'pm';
      // } else {                                // PM
      //   time = (this.openHour + i - 12) + 'pm';
      // }

// Render the stores
for (var i = 0; i < patStores.length; i++) {
  patStores[i].addToTable();
}
