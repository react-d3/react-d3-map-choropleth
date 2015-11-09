"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Map = require('../../lib').Map;

// Example
// http://bl.ocks.org/mbostock/4060606
(function() {
  var width = 960,
  height = 600;

  var topodata = require('json!../data/us.json');

  // data should be a MultiLineString
  var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
  var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;

  var scale = 1280;
  var translate = [width / 2, height / 2];
  var projection = 'albersUsa';

  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      dataPolygon= {dataCounties}
      dataMesh= {dataStates}
      scale= {scale}
      translate= {translate}
      projection= {projection}
      showGraticule= {true}
    />
    , document.getElementById('blank-map')
  )

})()
