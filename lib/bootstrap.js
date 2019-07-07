(function(d, e, s, loc){
	let sep, tag = d.createElement(s);

	if(!loc.endsWith(sep))
		loc += sep

	if (loc.includes('/')) {
		sep = '/'
	} else {
		sep = '\\'
	}
	
	tag.setAttribute('type', 'application/javascript');
	tag.setAttribute('data-bs-loc', loc);
	tag.setAttribute('id', 'bugsleuth-bootstrap')
	tag.setAttribute('src', 'file://' + loc + 'bugsleuth.js');
	
	e.appendChild(tag);
})(document, document.body, "script", "[BUGSLEUTH_ROOT_HERE");
