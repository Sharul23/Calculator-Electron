const { contextBridge } = require('electron');
const calculator = require('./build/Release/calculator');

contextBridge.exposeInMainWorld('calculator', {
  add: (a, b) => calculator.add(a, b)
});
