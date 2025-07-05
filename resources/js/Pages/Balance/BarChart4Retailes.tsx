// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart4Retailes = ({ data, title, legend=true /* see data tab */ }) => (<>
    <div className='text-center text-white p-0 m-0' style={{marginBottom:"-45px"}}><b>{title}</b></div>
    <br />
    <ResponsiveBar
        data={data}
        keys={[
            'credito', 'debito'
        ]}
        indexBy="mese"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#97e3d5', '#f47560', '#e25c3b']}
        borderColor="#fff"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'darkblue',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'lightblue',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'creditoNO'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'debitoNO'
                },
                id: 'lines'
            }
        ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'rivenditori',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
            
        }}
        axisLeft={{
            
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'euro',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
            
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={"red"}
        enableLabel={false}
        legends={legend ? [
            {
                itemTextColor: '#fff',
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]: []}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        markers={[{
            axis: 'y',
            value: 0,
            lineStyle: {
              stroke: 'lightblue',
              strokeWidth: 3
            },
            //legend: 'y marker at 300',
            legendOrientation: 'vertical'
          }]}
    /></>
)


export default BarChart4Retailes;