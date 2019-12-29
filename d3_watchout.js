const enemies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let gameScore = 0;
let highScore = 0;

//Populate Scoreboard Values
let scoreboard = d3.select('.currentscore')
    .text(gameScore);

let highScoreboard = d3.select('.highscore')
    .text(gameScore);

//Create SVG GameArea element
let svg = d3.select('.svgcontainer')
    .append('svg')
        .attr('width',750)
        .attr('height', 600);

//Create player SVG element
const circleData = [{
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
    .call(d3.drag().on('drag', drag));

//Create DragHandler
function drag(d) {
    d3.select(this)
        .attr('cx', d.x = d3.event.x)
        .attr('cy', d.y = d3.event.y);
}

//Render random starting positions
let mappedData = enemies.map(item => {
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
        .attr('x', data => data.x)
        .attr('y', data => data.y)
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
            .attr('x', data => data.x)
            .attr('y', data => data.y);

}

//Collision Handler
function collisionHandler () {
    const enemies = mappedData;
    const player = circleData;
    let collided = false;
    let playerX = player['0'].x;
    let playerY = player['0'].y;


    enemies.forEach(enemy => {
        let enemyX = enemy.x;
        let enemyY = enemy.y;
        let yDistance = (playerY - enemyY) ** 2;
        let xDistance = (playerX - enemyX) ** 2;
        let distance = Math.sqrt(yDistance + xDistance);
        if (distance < 48) {
            if (gameScore > highScore) {
                highScore = gameScore;
            }
            gameScore = 0;
        }
    })
}

//Interval for the game to be played on
d3.interval(() => {
    update();
}, 2000);

d3.interval(() => {
    gameScore += 1;
    scoreboard.text(gameScore);
    highScoreboard.text(highScore);
}, 50)

d3.timer(collisionHandler);