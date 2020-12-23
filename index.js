import { makeGrid } from './grid.js';
let state = {
	"resources" : {
		"things" : 0 ,
	} ,
	"producers" : {
		"thingers" : 0 ,
	} ,
	"researched" : {

	} ,
}
let resources = state.resources;
let producers = state.producers;
let researched = state.researched;
const thingerCost = () => Math.floor( 5 + producers.thingers + 1.15 ** producers.thingers - 1 );
const isAffordable = cost => cost.every( v => resources[v[0]] >= v[1] );
const makeCostString = cost => cost.map( v => v[1] + " " + v[0] ).join( ", " );
function makeThinger() {
	if ( resources.things >= thingerCost() ) {
		const button = buttons["thinger"];
		resources.things -= thingerCost();
		producers.thingers++;
		button.cost[0][1] = thingerCost();
		document.getElementById( "thingers" ).textContent = producers.thingers;
		document.getElementById( "thingerCost" ).textContent = button.cost[0][1] + " " + button.cost[0][0];
	}
}
async function mainLoop() {
	while ( true ) {
		await new Promise( r => setTimeout( r , 50 ) );
		resources.things += producers.thingers / 20;
		document.getElementById( "things" ).textContent = Math.floor( resources.things );
		Object.values( buttons ).forEach( v => {
			if ( v.affordable && !isAffordable( v.cost ) ) {
				v.affordable = false;
				v.button.disabled = true;
				v.button.dataset.affordable = "false";
			}
			if ( !v.affordable && isAffordable( v.cost ) ) {
				v.affordable = true;
				v.button.disabled = false;
				v.button.dataset.affordable = "true";
			}
		} );
	}
}
function buttonClick( e ) {
	const buttonName = e.currentTarget.dataset.button;
	const button = buttons[buttonName];
	if ( button.affordable ) {
		button.cost.forEach( v => resources[v[0]] -= v[1] );
		button.effect();
		if ( button.type = "research" ) {
			button.button.remove();
			delete buttons[button];
			state.researched[buttonName] = true;
		}
	}
}
function makeResearchButton( title ) {
	const t = document.getElementById( "researchTemplate" ).content.cloneNode( true ).firstElementChild;
	const costString = "(" + makeCostString( research[title].cost ) + ")";
	t.querySelector( ".researchTitle" ).textContent = research[title].title;
	t.querySelector( ".researchCost" ).textContent = costString;
	t.querySelector( ".researchDescription" ).textContent = research[title].description;
	t.dataset.affordable = "false";
	t.dataset.button = title;
	t.onclick = buttonClick;
	buttons[title] = {
		"cost" : research[title].cost ,
		"type" : "research" ,
		"affordable" : false ,
		"button" : t ,
		"effect" : research[title].effect ,
	}
	document.getElementById( "researchList" ).append( t );
}
const research = {
	"grid" : {
		"title" : "Grid" ,
		"cost" : [["things" , 0]] ,
		"description" : "Unlocks the grid mechanic." ,
		"effect" : () => {
			document.getElementById( "grid" ).style.display = "";
			console.log( "dongs" );
			makeGrid();
		} ,
	} ,
}
let buttons = {
	"thing" : {
		"cost" : [] ,
		"type" : "basic" ,
		"affordable" : false ,
		"button" : document.getElementById( "thingButton" ) ,
		"effect" : () => resources.things++ ,
	} ,
	"thinger" : {
		"cost" : [["things" , 5]] ,
		"type" : "basic" ,
		"affordable" : false ,
		"button" : document.getElementById( "thingerButton" ) ,
		"effect" : () => makeThinger() ,
	} ,
}
Object.values( buttons ).forEach( v => {
	// v.affordable = false;
	// v.button.disabled = true;
	v.button.onclick = v.effect;
} );
makeResearchButton( "grid" );
mainLoop();


// mechanic idea 1
// square grid the some blocked squares
// hex grid maybe
// place various things on squares to do things
// adjacency to other things increases efficiency
// many squares are blocked
// when upgrading, some middle squares are opened and/or the grid increases in size.