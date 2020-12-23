function nonRepeatingRandomInts( total ) {
	let arr = Array.from( { "length" : total } , ( v , i ) => i );
	for ( let i = 0; i < total - 1; i++ ) {
		const j = Math.floor( Math.random() * ( total ) );
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr
}

export function makeGrid( research ) {
	const size = 3 //for 3x3 grid
	document.getElementById( "gridGrid" ).style["grid-template-columns"] = " 40px".repeat( size );
	const arr = nonRepeatingRandomInts( size**2 );
	arr.forEach( ( v , i ) => {
		const t = document.getElementById( "gridTemplate" ).content.cloneNode( true ).firstElementChild;
		if ( v < 4 ) {
			t.classList.add( "wall" );
		}
		document.getElementById( "gridGrid" ).append( t );
	} );
}