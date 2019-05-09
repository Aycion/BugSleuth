(function(d, e, s){
	const url = "http://localhost:3000/scripts/widget";
	let tag = d.createElement(s);
	tag.setAttribute('src', url);
	tag.setAttribute('type', 'application/javascript');
	e.appendChild(tag);
})(document, document.body, "script")