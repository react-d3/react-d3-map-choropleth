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
  projection as projectionFunc,
  geoPath as geoPathFunc
} from 'react-d3-map-core';

export default class Map extends Component {
  constructor(props) {
    super(props);
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
      projection
    } = this.props;

    var graticule, mesh, polygon;

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

    if(showGraticule){
      graticule = (
        <Graticule
          geoPath= {geoPath}
        />
      )
    }

    if(dataPolygon && !Array.isArray(dataPolygon)) {
      polygon = (
        <Polygon
          data = {dataPolygon}
          geoPath= {geoPath}
        />
      )
    }else {
      polygon = dataPolygon.map((d, i) => {
        return (
          <Polygon
            key = {i}
            data = {d}
            geoPath= {geoPath}
          />
        )
      })
    }

    if(dataMesh && !Array.isArray(dataMesh)) {
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

    return (
      <Svg
        width={width}
        height={height}
      >
        {graticule}
        {polygon}
        {mesh}
      </Svg>
    )
  }
}
