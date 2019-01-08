const easeInQuad = (t, b, c, d) => {
	t /= d;
	return c * t * t + b;
};

const easeOutQuad = (t, b, c, d) => {
	t /= d;
	return -c * t * (t - 2) + b;
};

const easeInOutQuad = (t, b, c, d) => {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c/2 * (t * (t - 2) - 1) + b;
};

const easeInOutQuart = (t, b, c, d) => {
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t + b;
	} else {
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
};

const easeInSine = (t, b, c, d) => {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

const easeOutSine = (t, b, c, d) => {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

const easeInOutSine = (t, b, c, d) => {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};

export { easeInQuad, easeOutQuad, easeInOutQuad, easeInOutQuart, easeInSine, easeOutSine, easeInOutSine };