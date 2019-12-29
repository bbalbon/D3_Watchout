let testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const width = 750;
const height = 600;

//Create SVG element
let svg = d3.select('.svgcontainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

//Create player SVG element
let circleData = [{
    x: 390,
    y: 300
}];
svg.selectAll('svg')
    .data(circleData)
    .enter()
    .append('circle')
        .attr('class', 'player')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', '18')
        .attr('fill', 'black')
        .attr('stroke', 'white')
    .call(d3.drag().on('drag', dragmove));

function dragmove(d) {
    d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
}

//Render random starting positions
let mappedData = testData.map(item => {
    return {
        value: item,
        x: Math.random() * 700,
        y: Math.random() * 550
    }
});


//Display intial enemies 
svg.selectAll('svg')
    .data(mappedData)
    .enter()
    .append('rect')
    .attr('x', function(data) {
        return data.x;
    })
    .attr('y', function(data) {
        return data.y;
    })
    .attr('width', 25)
    .attr('height', 25)
    .attr('fill', 'indianred')
    .attr('stroke', 'black');


function update() {

    let newMappedData = mappedData.map(item => {
        item.x = Math.random() * 700
        item.y = Math.random() * 550
        return item;
    })

    d3.select('svg').selectAll('rect')
        .data(newMappedData)
        .transition().duration(1500)
        .attr('x', function(data) {
            return data.x;
        })
        .attr('y', function(data) {
            return data.y
        })

}

d3.interval(() => {
    update();
}, 2000);
