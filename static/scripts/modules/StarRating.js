'use strict';

import React from 'react';


class Star extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        let clipPath = {
            id: `clip-${this.state.id}`,
            url: `url(#clip-${this.state.id})`,
            width: this.state.isClipped ? this.state.clipWidth : this.state.width
        };
        return (
            <g className="star" transform={this.state.transform}>
                <clipPath id={clipPath.id}>
                    <rect cx="0" cy="0" width={clipPath.width} height={this.state.height}></rect>
                </clipPath>
                <path
                    d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                    strokeWidth="2"
                    fill="transparent"
                    stroke="#555555"
                    className="outline"
                ></path>
                <path
                    d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                    fill="transparent"
                    stroke="#CD2E1B"
                    strokeWidth="2"
                    className="highlight"
                    clipPath={clipPath.url}
                ></path>
            </g>
        );
    }
}

class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: parseInt(props.width, 10) || 50,
            height: parseInt(props.height, 10) || 50,
            rows: parseInt(props.rows, 10) || 1,
            outOf: parseInt(props.outOf, 10) || 5,
            rating: parseFloat(props.rating),
            id: props.id
        };
    }
    render() {
        let lastFullStar = Math.floor(this.state.rating);
        let rowMod = Math.floor(this.state.outOf / this.state.rows);
        let svgWidth = this.state.width * rowMod;
        let svgHeight = this.state.height * this.state.rows;
        let svgViewBox = `0, 0, ${svgWidth}, ${svgHeight}`;
        let stars = Array.from(Array(this.state.outOf).keys()).map((index) => {
            let isClipped = index === lastFullStar;
            let isFilled = index <= lastFullStar;
            let xTransform = (index % rowMod) * this.state.width;
            let yTransform = Math.floor(index / rowMod) * this.state.height;
            let transform = `translate(${xTransform}, ${yTransform})`;
            let clipWidth = this.state.rating - lastFullStar;
            return (
                <Star
                    key={index}
                    id={index}
                    transform={transform}
                    width={this.state.width}
                    height={this.state.height}
                    clipWidth={clipWidth}
                />
            )
        });

        return (
            <svg version="1.1" width={svgWidth} height={svgHeight} viewBox={svgViewBox}>
                {stars}
            </svg>
        );
    }
}

export default StarRating;
