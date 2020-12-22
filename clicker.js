let things = 0;
let thingers = 0;
const thingerCost = () => Math.floor( 4 + 1.5 ** thingers );

function makeThinger() {
	const cost = thingerCost();
	if ( things >= cost ) {
		things -= cost;
		thingers++;
		document.getElementById( "thingers" ).textContent = thingers;
		document.getElementById( "thingerCost" ).textContent = thingerCost();
	}
}
async function mainLoop() {
	while ( true ) {
		await new Promise( r => setTimeout( r , 50 ) );
		things += thingers / 20;
		document.getElementById( "things" ).textContent = Math.floor( things );
	}
}
mainLoop();
document.getElementById( "thingerCost" ).textContent = thingerCost();
document.getElementById( "thingButton" ).onclick = () => things++;
document.getElementById( "thingerButton" ).onclick = () => makeThinger();


// mechanic idea 1
// square grid the some blocked squares
// hex grid maybe
// place various things on squares to do things
// adjacency to other things increases efficiency
// many squares are blocked
// when upgrading, some middle squares are opened and/or the grid increases in size.