"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  Polygon,
  Graticule,
  Mesh,
  Svg,
  Tile,
  isTooltipUpdate,
  tileFunc,
  scale as domainScaleFunc,
  projection as projectionFunc,
  geoPath as geoPathFunc
} from 'react-d3-map-core';

export default class Choropleth extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  render() {
    const {
      width,
      height,
      showGraticule,
      dataPolygon,
      dataMesh,
      scale,
      translate,
      precision,
      rotate,
      center,
      clipAngle,
      parallels,
      projection,
      domain,
      domainData,
      domainValue,
      domainKey,
      mapKey,
      onMouseOut,
      onMouseOver,
      showTile
    } = this.props;

    var proj = projectionFunc({
      projection: projection,
      scale: scale,
      translate: translate,
      precision: precision,
      rotate: rotate,
      center: center,
      clipAngle: clipAngle,
      parallels: parallels
    });
    var geoPath = geoPathFunc(proj);

    var domainScale = domainScaleFunc(domain);
    var byId = d3.map();

    domainData.forEach((d) => {
      byId.set(domainKey(d), domainValue(d));
    })

    var graticule, mesh, polygon, tile;

    if(showTile && projection === 'mercator') {
      var tiles= tileFunc({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: ([width, height])
      })

      tile= (<Tile
        tiles= {tiles}
      />)
    }

    if(showGraticule){
      graticule = (
        <Graticule
          geoPath= {geoPath}
        />
      )
    }

    if(dataPolygon) {
      if(!Array.isArray(dataPolygon)) {
        var val = byId.get(mapKey(d));
        var polygonClass = domainScale(val);

        d.properties[mapKey(d)] = val;

        polygon = (
          <Polygon
            data = {dataPolygon}
            geoPath= {geoPath}
            onMouseOver= {onMouseOver}
            onMouseOut= {onMouseOut}
          />
        )
      }else {
        polygon = dataPolygon.map((d, i) => {
          var val = byId.get(mapKey(d));
          var polygonClass = domainScale(val);

          d.properties[mapKey(d)] = val;

          return (
            <Polygon
              key = {i}
              data = {d}
              geoPath= {geoPath}
              polygonClass= {polygonClass}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
            />
          )
        })
      }
    }

    if(dataMesh) {
      if(!Array.isArray(dataMesh)) {
        mesh = (
          <Mesh
            data = {dataMesh}
            geoPath= {geoPath}
          />
        )
      } else {
        mesh = dataMesh.map((d, i) => {
          return (
            <Mesh
              key = {i}
              data = {d}
              geoPath= {geoPath}
            />
          )
        })
      }
    }

    return (
      <Svg
        width={width}
        height={height}
      >
        {tile}
        {graticule}
        {polygon}
        {mesh}
      </Svg>
    )
  }
}
