let testArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];

// d3.select('.main').selectAll('svg')
//     .data(testArray)
//     .enter()
//     .append('svg')
//     .attr('width', '50')
//     .attr('height', '50')
//     .attr('class', 'circle')


const width = 750;
const height = 600;
//Create SVG element
let svg = d3.select('.svgcontainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

function update() {

    svg.selectAll('svg')
        .data(testArray)
        .text((d) => {return d})
        .enter()
        .append('rect')
        .attr('x', `${Math.random() * 700}`)
        .attr('y', `${Math.random() * 550}`)
        .attr('width', 25)
        .attr('height', 25)
        .attr('fill', 'indianred')
        .attr('stroke', 'black');
    
    // svg.selectAll('rect')
    //     .data([])
    //     .exit()
    //     .remove()

}

// d3.interval(() => {
//     update();
// }, 3000);


// const width = 50;
// const height = 50;

// let svg = d3.select('.svgcontainer')
//    .append('svg')
//    .attr('width', width)
//    .attr('height', height);

// console.log(svg);

// svg.append('circle')
//     .attr('cx', `25`)
//     .attr('cy', `25`)
//     .attr('radius', '18')
//     .attr('stroke', 'black')
//     .attr('stroke-width', '2.5')
//     .attr('fill', 'indianred')