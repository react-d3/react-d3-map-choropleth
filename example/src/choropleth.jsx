"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var MapChoropleth = require('../../lib').MapChoropleth;

var css= require('./css/choropleth.css');

// Example
// http://bl.ocks.org/mbostock/4060606
(function() {
  var width = 960,
  height = 600;

  var topodata = require('json!../data/us.json');
  var unemploy = require('dsv?delimiter=\t!../data/unemployment.tsv')

  // data should be a MultiLineString
  var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
  /// data should be polygon
  var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;

  // domain
  var domain = {
    scale: 'quantize',
    domain: [0, .15],
    range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
  };
  var domainValue = function(d) { return +d.rate; };
  var domainKey = function(d) {return +d.id};
  var mapKey = function(d) {return +d.id};

  var scale = 1280;
  var translate = [width / 2, height / 2];
  var projection = 'albersUsa';

  ReactDOM.render(
    <MapChoropleth
      width= {width}
      height= {height}
      dataPolygon= {dataCounties}
      dataMesh= {dataStates}
      scale= {scale}
      domain= {domain}
      domainData= {unemploy}
      domainValue= {domainValue}
      domainKey= {domainKey}
      mapKey = {mapKey}
      translate= {translate}
      projection= {projection}
      showGraticule= {true}
    />
  , document.getElementById('blank-choropleth')
  )

})()
