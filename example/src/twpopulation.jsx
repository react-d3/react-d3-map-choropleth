"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var MapChoropleth = require('../../lib').MapChoropleth;

var css= require('./css/twpopulation.css');

// Example
(function() {
  var width = 960,
  height = 800;

  var topodata = require('json!../data/twTown1982.topo.json');
  var population = require('json!../data/population.json')['102']

  // data should be a MultiLineString
  var dataMeshCounties = topojson.mesh(topodata, topodata.objects["twTown1982.geo"], function(a, b) { return a !== b; });
  /// data should be polygon
  var dataCounties = topojson.feature(topodata, topodata.objects["twTown1982.geo"]).features;

  dataCounties.forEach(function(d, i) {
		if(d.properties.TOWNID === "1605" || d.properties.TOWNID === "1603" ||  d.properties.TOWNID=== "1000128") {
			dataCounties.splice(i, 1);
		}
	})

  var valArr = []

  for (var key in population) {
    for (var reg in population[key]) {
      valArr.push({
        "region": key.trim() + '/' + reg.trim(),
        "value": +population[key][reg]
      });
    }
  }

  // domain
  var domain = {
    scale: 'quantize',
    domain: d3.extent(valArr, function(d) {return d.value;}),
    range: d3.range(11).map(function(i) { return "q" + i + "-11"; })
  };
  var domainValue = function(d) { return +d.value; };
  var domainKey = function(d) {return d.region};
  var mapKey = function(d) {return d.properties.name.trim()};

  var scale = 10000;
  var center = [120.979531, 23.978567];
  var projection = 'mercator';

  var tooltipContent = function(d) { return d.properties;}

  ReactDOM.render(
    <MapChoropleth
      width= {width}
      height= {height}
      dataPolygon= {dataCounties}
      dataMesh= {dataMeshCounties}
      scale= {scale}
      domain= {domain}
      domainData= {valArr}
      domainValue= {domainValue}
      domainKey= {domainKey}
      mapKey = {mapKey}
      center= {center}
      projection= {projection}
      showGraticule= {false}
      tooltipContent= {tooltipContent}
      showTooltip= {true}
      showTile= {true}
    />
  , document.getElementById('blank-twpopulation')
  )

})()
