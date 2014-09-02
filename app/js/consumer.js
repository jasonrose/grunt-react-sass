/**
 * @jsx React.DOM
 */
var React = require('react');
var Component = require('./testexport');
React.renderComponent(
  <Component param="hello world!"/>,
  document.getElementById('react')
);
