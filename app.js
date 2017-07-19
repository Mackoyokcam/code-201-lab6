'use strict';

var patStores = [];
var tableName = 'store_data'; // Match with table ID of sales.html
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

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
  this.customerCount = [];
  this.totalTossers = [];
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
    // Return two row elements on this array.
    // 0 for cookie data, 1 for staff data
    var cookieAndStaffRow = [];

    // Get unordered list with store ID
    var rowElement = document.createElement('tr');
    var staffRowElement = document.createElement('tr');

    // Render store name
    var tableDataElement = document.createElement('td');
    var staffTableDataElement = document.createElement('td');
    tableDataElement.textContent = this.name;
    staffTableDataElement.textContent = this.name;
    rowElement.appendChild(tableDataElement);
    staffRowElement.appendChild(staffTableDataElement);

    // Iterate over each hour
    for (var i = 0; i < this.hoursOpen; i++) {
      tableDataElement = document.createElement('td');
      staffTableDataElement = document.createElement('td');
      var customers = this.generateRandom();
      var numberOfCookies = Math.round(this.avgCookie * customers);

      // Render cookies to be made for the hour
      tableDataElement.textContent = numberOfCookies;
      rowElement.appendChild(tableDataElement);
      this.totalCookies.push(numberOfCookies);

      // Render # of cookie tossers to be assigned at this hour.
      var cookieTossers = Math.ceil(customers / 20);
      if (cookieTossers < 2) {
        cookieTossers = 2;
      }
      staffTableDataElement.textContent = cookieTossers;
      staffRowElement.appendChild(staffTableDataElement);
      this.customerCount.push(customers);
      this.totalTossers.push(cookieTossers);
    }
    // Render Total
    tableDataElement = document.createElement('td');
    tableDataElement.id = 'daily_location_total';
    tableDataElement.textContent = this.getCookieSum() + ' cookies';
    rowElement.appendChild(tableDataElement);

    cookieAndStaffRow.push(rowElement);
    cookieAndStaffRow.push(staffRowElement);

    return cookieAndStaffRow;
  };
  this.addToTable = function() {
    var tableElement = document.getElementById(tableName);
    var staffTableElement = document.getElementById('staff_data');
    var result = this.createRow();
    tableElement.appendChild(result[0]);
    staffTableElement.appendChild(result[1]);
  };
}

// Create store instances
for (var key in storeList) {
  var currentStore = storeList[key];
  patStores.push(new Store(key, currentStore.id, currentStore.minCust, currentStore.maxCust,
    currentStore.avgCookie, currentStore.openHour, currentStore.closeHour));
}

/* Create some Tables! */

// Header
function renderHeader() {
  // Location
  var tableElement = document.getElementById(tableName);
  var staffTableElement = document.getElementById('staff_data');
  var headerElement = document.createElement('th');
  var staffHeaderElement = document.createElement('th');
  headerElement.textContent = 'Location';
  staffHeaderElement.textContent = 'Location';
  tableElement.appendChild(headerElement);
  staffTableElement.appendChild(staffHeaderElement);

  // Time
  for(var i = 0; i < hours.length; i++) {
    headerElement = document.createElement('th');
    staffHeaderElement = document.createElement('th');
    headerElement.textContent = hours[i];
    staffHeaderElement.textContent = hours[i];
    tableElement.appendChild(headerElement);
    staffTableElement.appendChild(staffHeaderElement);
  }

  // Total
  headerElement = document.createElement('th');
  headerElement.textContent = 'Daily Location Total';
  tableElement.appendChild(headerElement);
}
renderHeader();

/* Render the store rows */
for(var i = 0; i < patStores.length; i++) {
  patStores[i].addToTable();
}

/* Render Total row */
var finalTotal = 0;
var staffFinalTotal = 0;
// The word 'Totals'
var tableElement = document.getElementById(tableName);
var staffTableElement = document.getElementById('staff_data');
var rowElement = document.createElement('td');
var staffRowElement = document.createElement('td');
rowElement.textContent = 'Totals';
staffRowElement.textContent = 'Totals';
tableElement.appendChild(rowElement);
staffTableElement.appendChild(staffRowElement);

// The data for total
for(i = 0; i < hours.length; i++) {
  rowElement = document.createElement('td');
  staffRowElement = document.createElement('td');
  rowElement.className = 'totals';
  staffRowElement.className = 'totals';
  var totalCookiesPerHour = 0;
  var totalCookieTossersPerHour = 0;
  for (var j = 0; j < patStores.length; j++) {
    totalCookiesPerHour += patStores[j].totalCookies[i];
    totalCookieTossersPerHour += patStores[j].totalTossers[i];
  }
  rowElement.textContent = totalCookiesPerHour;
  staffRowElement.textContent = totalCookieTossersPerHour;
  tableElement.appendChild(rowElement);
  staffTableElement.appendChild(staffRowElement);
  finalTotal += totalCookiesPerHour;
  staffFinalTotal += totalCookieTossersPerHour;
}

// The Final Total
rowElement = document.createElement('td');
staffRowElement = document.createElement('td');
rowElement.id = 'final_total';
staffRowElement.id = 'final_total';
rowElement.textContent = finalTotal + ' cookies';
staffRowElement.textContent = staffFinalTotal + ' Tossers';
tableElement.appendChild(rowElement);
staffTableElement.appendChild(staffRowElement);
