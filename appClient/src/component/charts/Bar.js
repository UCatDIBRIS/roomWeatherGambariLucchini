import React from 'react';
import { StyleSheet, View, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';

const {
    Surface,
    Group,
    Rectangle,
    ClippingRectangle,
    LinearGradient,
    Shape,
    Text,
    Path,
    Transform
} = ART;

import {
    max,
    ticks
} from 'd3-array'

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as path from 'd3-path';


const d3 = {
    scale,
    shape,
    format,
    axis,
    path,
};

import {
    scaleLinear,
    scaleBand,
    scaleTime
}  from 'd3-scale';

const colours = {
    black: 'black',
    blue: 'steelblue',
    brown: 'brown'
}


class Bar extends React.Component {

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.drawLine = this.drawLine.bind(this);            
        this.getRandomColor = this.getRandomColor.bind(this);
        this.state = {
            data : [
                {temp: 20, time: '8.00'},
                {temp: 23, time: '10.00'},
                {temp: 33, time: '12.00'},
                {temp: 12, time: '14.00'},
                {temp: 5, time: '16.00'},
                {temp: 21, time: '18.00'}
            ]
        }
    };


    getRandomColor() {
        return '#' + Math.random().toString(16).substr(-6);
    }               

    drawLine(startPoint, endPoint) {
        var path = d3.path.path();
        path.lineTo(startPoint, endPoint);
        return path;
    }

    createBarChart(x, y, w, h) {
        var path = d3.path.path();
        path.rect(x, y, w, h);
        return path;
    }


    componentWillReceiveProps(newProps){
        //console.log(temp_room)
        var temp_room = newProps.temp
        this.setState({
            data : [
                {temp: temp_room.eight, time: '8.00'},
                {temp: temp_room.ten, time: '10.00'},
                {temp: temp_room.twelve, time: '12.00'},
                {temp: temp_room.fourteen, time: '14.00'},
                {temp: temp_room.sixteen, time: '16.00'},
                {temp: temp_room.eighteen, time: '18.00'}
            ]
        })
    }

    render() {
        
        const screen = Dimensions.get('window');
        const margin = {top: 50, right: 25, bottom: 50, left: 25}
        const width = screen.width - margin.left - margin.right
        const height = screen.height - margin.top - (margin.bottom*5)

        const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0.4)
            .domain(this.state.data.map(d => d.time))


        const maxFrequency = max(this.state.data, d => d.temp+4)

        const y = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

        const firstLetterX = x(this.state.data[0].time)
        const secondLetterX = x(this.state.data[1].time)
        const lastLetterX = x(this.state.data[this.state.data.length - 1].time)
        const labelDx = (secondLetterX - firstLetterX) / 2

        const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]

        const bottomAxisD = d3.shape.line()
                                .x(d => d + labelDx)
                                .y(() => 0)
                                (bottomAxis)

        const leftAxis = ticks(0, maxFrequency, 17)

        const leftAxisD = d3.shape.line()
                            .x(() => bottomAxis[0] + labelDx)
                            .y(d => y(d) - height)
                            (leftAxis)
        const notch = 7
        const labelDistance = 9
        const emptySpace = "";
        return(
            <View>
            <Surface width={screen.width} height={screen.height - 200}>
                <Group x={margin.left} y={margin.top}>
                    <Group x={0} y={height}>
                        <Group key={-1}>
                            <Shape d={bottomAxisD} stroke={colours.black} key="-1"/>
                              {
                                this.state.data.map((d, i) =>(
                                    <Group
                                        x={x(d.time) + labelDx - 5}
                                        y={0}
                                        key={i + 1}
                                    >
                                        <Shape d={this.drawLine(0, notch)} y2={notch} stroke={colours.black}/>
                                        <Text
                                          y={labelDistance}
                                          fill={colours.black}
                                          font="18px helvetica"
                                          x={-20}
                                        >
                                          {d.time}
                                        </Text>
                                    </Group>
                                ))
                              }
                        </Group>
                        <Group key={-2} >
                            <Shape stroke={colours.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <Group x={0} y={y(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colours.black} x={9}/>
                                        <Text
                                            fill={colours.black}
                                            x={-15}
                                            y={-labelDistance}
                                            font="18px helvetica"
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        {
                            this.state.data.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.time)+5, y(d.temp) - height, x.bandwidth(), height - y(d.temp))}
                                        fill={'#D32F2F'}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </Group>
                </Group>
            </Surface>
            </View>
        )
    }
}

const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'normal',
  }
};


export default Bar;