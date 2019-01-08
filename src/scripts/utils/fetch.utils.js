const fetchJSON = async (uri) => {
	return await (await fetch(uri)).json();
};

export { fetchJSON };