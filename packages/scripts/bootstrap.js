(function(d, e, s){
	const url = "http://localhost:3000/widget/script";
	let tag = d.createElement(s);
	tag.setAttribute('src', url);
	tag.setAttribute('type', 'application/javascript');
	e.appendChild(tag);
})(document, document.body, "script")