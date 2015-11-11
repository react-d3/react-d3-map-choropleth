"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as Choropleth
} from './choropleth';

import {
  Tooltip
} from 'react-d3-map-core';

export default class MapChoropleth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xTooltip: null,
      yTooltip: null,
      contentTooltip: null
    }
  }

  _onMouseOver (dom, d, i) {
    const {
      tooltipContent
    } = this.props

    this.setState({
      xTooltip: d3.event.clientX,
      yTooltip: d3.event.clientY,
      contentTooltip: tooltipContent(d)
    })
  }

  _onMouseOut (dom, d, i) {
    this.setState({
      xTooltip: null,
      yTooltip: null,
      contentTooltip: null
    })
  }

  render() {
    const {
      showTooltip,
      tooltipContent
    } = this.props;

    var tooltip;

    if(showTooltip) {
      var tooltip = (
        <Tooltip
          {...this.state}
          content= {tooltipContent}
        />
      )
    }

    return (
      <div>
        {tooltip}
        <Choropleth {...this.props} {...this.state} onMouseOut= {this._onMouseOut.bind(this)} onMouseOver= {this._onMouseOver.bind(this)}/>
      </div>
    )
  }

}
