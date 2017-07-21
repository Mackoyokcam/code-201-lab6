'use strict';

var cookieStands = [];
var tableName = 'store_data'; // Match with table ID of sales.html
var staffTableName = 'staff_data'; // Match with staff table ID of sales.html
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var storeForm = document.getElementById('store_form');

// Table globals
var tableElement = document.getElementById(tableName);
var staffTableElement = document.getElementById(staffTableName);

var rowElement;
var staffRowElement;
var dataElement;
var staffDataElement;

var storeList = {
  'First and Pike': {
    id: 'firstAndPike',
    minCust: 23,
    maxCust: 65,
    avgCookie: 6.3,
  },
  'SeaTac Airport': {
    id: 'seaTacAirport',
    minCust: 3,
    maxCust: 24,
    avgCookie: 1.2,
  },
  'Seattle Center': {
    id: 'seattleCenter',
    minCust: 11,
    maxCust: 38,
    avgCookie: 3.7,
  },
  'Capitol Hill': {
    id: 'capitolHill',
    minCust: 20,
    maxCust: 38,
    avgCookie: 2.3,
  },
  'Alki': {
    id: 'alki',
    minCust: 2,
    maxCust: 16,
    avgCookie: 4.6,
  }
};

var tableFunctions = {
  createData: function(data, staffData) {
    dataElement = document.createElement('td');
    dataElement.textContent = data;
    staffDataElement = document.createElement('td');
    staffDataElement.textContent = staffData;
  },
  createHeaderData: function(data, staffData) {
    dataElement = document.createElement('th');
    dataElement.textContent = data;
    staffDataElement = document.createElement('th');
    staffDataElement.textContent = staffData;
  },
  createRow: function() {
    rowElement = document.createElement('tr');
    staffRowElement = document.createElement('tr');
  },
  addToRow: function() {
    rowElement.appendChild(dataElement);
    staffRowElement.appendChild(staffDataElement);
  },
  addToTable: function() {
    tableElement.appendChild(rowElement);
    staffTableElement.appendChild(staffRowElement);
  }
};

var CookieStand = function(name, id, minCust, maxCust, avgCookie) {
  this.name = name;
  this.id = id;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.totalCookiesPerHour = [];
  this.totalTossersPerHour = [];
  this.customerCount = [];
  this.generateRandom = function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  };
  this.renderLocation = function() {
    tableFunctions.createData(this.name, this.name);
    tableFunctions.addToRow();
  };
  this.renderData = function() {
    var cookies, tossers, random;
    for (var i = 0; i < hours.length; i++) {
      random = this.generateRandom();
      cookies = Math.round(random * this.avgCookie);
      tossers = Math.ceil(random / 20);
      if (tossers < 2) {
        tossers = 2;
      }
      this.totalCookiesPerHour.push(cookies);
      this.totalTossersPerHour.push(tossers);
      this.customerCount.push(random);

      tableFunctions.createData(cookies, tossers);
      tableFunctions.addToRow();
    }
  };
  this.renderTotal = function() {
    var total = 0;
    var staffTotal = 0;
    for(var i = 0; i < hours.length; i++) {
      total += this.totalCookiesPerHour[i];
      staffTotal += this.totalTossersPerHour[i];
    }
    tableFunctions.createData(total, staffTotal);
    tableFunctions.addToRow();
  };
  this.renderAll = function() {
    tableFunctions.createRow();
    rowElement.id = this.name;
    staffRowElement.id = 'staff' + this.name;
    this.renderLocation();
    this.renderData();
    this.renderTotal();
    tableFunctions.addToTable();
  };
};

// Instantiate objects
for (var key in storeList) {
  var currentStore = storeList[key];
  cookieStands.push(new CookieStand(key, currentStore.id, currentStore.minCust, currentStore.maxCust, currentStore.avgCookie));
}

/* ----------------------- RENDERING --------------------------*/

// Header
var renderHeader = function() {
  tableFunctions.createRow();

  // Location
  tableFunctions.createHeaderData('Location', 'Location');
  tableFunctions.addToRow();

  // Time
  hours.forEach(function(hour) {
    console.log('Hour: ' + hour);
    tableFunctions.createHeaderData(hour, hour);
    tableFunctions.addToRow();
  });

  // Total
  tableFunctions.createHeaderData('Daily Location Total', 'Daily Location Total');
  tableFunctions.addToRow();

  // Append to table
  tableFunctions.addToTable();
};

// Body Data
var renderBody = function() {
  for(var i = 0; i < cookieStands.length; i++) {
    cookieStands[i].renderAll();
  }
};

// Footer
var renderFooter = function() {
  tableFunctions.createRow();
  rowElement.id = 'theTotes';
  staffRowElement.id = 'staffTheTotes';
  // the word "Total"
  tableFunctions.createData('Total', 'Total');
  tableFunctions.addToRow();

  // The data for totals
  var total = 0;
  var staffTotal = 0;
  var finalTotal = 0;
  var staffFinalTotal = 0;
  for(var i = 0; i < hours.length; i++) {
    for(var j = 0; j < cookieStands.length; j++) {
      currentStore = cookieStands[j];
      total += currentStore.totalCookiesPerHour[i];
      staffTotal += currentStore.totalTossersPerHour[i];
    }
    tableFunctions.createData(total, staffTotal);
    tableFunctions.addToRow();
    finalTotal += total;
    staffFinalTotal += staffTotal;
    total = 0;
    staffTotal = 0;
  }


  // The final total
  tableFunctions.createData(finalTotal, staffFinalTotal);
  tableFunctions.addToRow();

  tableFunctions.addToTable();
};

// Check to see if form is being used to update existing store
function updatingCheck(location) {
  for(var i = 0; i < cookieStands.length; i++) {
    if (location === cookieStands[i].name) {
      return cookieStands[i];
    }
  }
  return false;
}

renderHeader();
renderBody();
renderFooter();

// Event Handlers
function handleFormSubmit(event) {

  var short = event.target; // shortcut for event.target

  // All values
  var location = short.location.value;
  var minCustomer = short.min_customer.value;
  var maxCustomer = short.max_customer.value;
  var avgCookie = short.avg_cookie.value;

  // get totals row
  var totalRow = document.getElementById('theTotes');
  var staffTotalRow = document.getElementById('staffTheTotes');

  event.preventDefault(); // gotta have it for this purpose. prevents page reload on a 'submit' event

  // Blank validation
  if (location === '' || minCustomer === '' || maxCustomer === '' || avgCookie === '') {
    return alert('All fields are required.');
  }

  // Int validation
  if (isNaN(minCustomer) || isNaN(maxCustomer)) {
    return alert('Please enter integer values for customer inputs.');
  }

  // Float validation
  if (isNaN(avgCookie)) {
    return alert('Please enter decimal values for average cookie sales.');
  }

  // remove totals row
  tableElement.removeChild(totalRow);
  staffTableElement.removeChild(staffTotalRow);

  var standBeingUpdated;
  // Check if user is updating
  if (standBeingUpdated = updatingCheck(location)) {

    // Update stand object
    standBeingUpdated.minCust = parseInt(minCustomer);
    standBeingUpdated.maxCust = parseInt(maxCustomer);
    standBeingUpdated.avgCookie = parseFloat(avgCookie);
    standBeingUpdated.totalCookiesPerHour = [];
    standBeingUpdated.totalTossersPerHour = [];

    // Get row being updated
    var rowBeingUpdated = document.getElementById(standBeingUpdated.name);
    var staffRowBeingUpdated = document.getElementById('staff' + standBeingUpdated.name);

    // Clear row
    rowBeingUpdated.innerHTML = '';
    staffRowBeingUpdated.innerHTML = '';

    // Add new data to row
    // Location
    tableFunctions.createData(standBeingUpdated.name, standBeingUpdated.name);
    rowBeingUpdated.appendChild(dataElement);
    staffRowBeingUpdated.appendChild(staffDataElement);

    // Data
    for(var i = 0; i < hours.length; i++) {
      standBeingUpdated.customerCount[i] = standBeingUpdated.generateRandom();
      var newData = avgCookie * standBeingUpdated.customerCount[i];
      var staffNewData = Math.ceil(standBeingUpdated.customerCount[i] / 2);

      // Min of two employees
      if (staffNewData < 2) {
        staffNewData = 2;
      }

      standBeingUpdated.totalCookiesPerHour.push(newData);
      standBeingUpdated.totalTossersPerHour.push(staffNewData);
      tableFunctions.createData(newData, staffNewData);
      rowBeingUpdated.appendChild(dataElement);
      staffRowBeingUpdated.appendChild(staffDataElement);

    }

    // Total
    var total = 0;
    var staffTotal = 0;
    for(i = 0; i < hours.length; i++) {
      total += standBeingUpdated.totalCookiesPerHour[i];
      staffTotal += standBeingUpdated.totalTossersPerHour[i];
    }
    tableFunctions.createData(total, staffTotal);
    rowBeingUpdated.appendChild(dataElement);
    staffRowBeingUpdated.appendChild(staffDataElement);

  } else { // adding

    // Instantiate and add to global object
    cookieStands.push(new CookieStand(short.location.value, 'beta', parseInt(short.min_customer.value),
    parseInt(short.max_customer.value), parseFloat(short.avg_cookie.value)));

    // Add new store
    cookieStands[cookieStands.length - 1].renderAll();

  }

  // Recalculate total
  renderFooter();

  // Reset form
  storeForm.reset();
}

// Event Listeners
storeForm.addEventListener('submit', handleFormSubmit);
