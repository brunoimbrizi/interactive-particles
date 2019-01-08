// @author brunoimbrizi / http://brunoimbrizi.com

// uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
	vec2 uv = vUv;
	vec4 color = vec4(1.0, 0.0, 0.0, 1.0);

	// color = texture2D(uTexture, uv);

	gl_FragColor = color;
}