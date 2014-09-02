/**
 * @jsx React.DOM
 */
var Component = require('./testexport');
React.renderComponent(
  <Component param="hello world!"/>,
  document.getElementById('react')
);
