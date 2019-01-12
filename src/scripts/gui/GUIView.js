import ControlKit from '@brunoimbrizi/controlkit';
import Stats from 'stats.js';

export default class GUIView {

	constructor(app) {
		this.app = app;

		this.particlesHitArea = false;
		this.particlesRandom = 2;
		this.particlesDepth = 4;
		this.particlesSize = 1.5;
		
		this.touchRadius = 0.15;

		this.range = [0, 1];
		this.rangeRandom = [1, 10];
		this.rangeSize = [0, 3];
		this.rangeDepth = [1, 10];
		this.rangeRadius = [0, 0.5];

		this.initControlKit();
		// this.initStats();

		// this.disable();
	}

	initControlKit() {
		this.controlKit = new ControlKit();
		this.controlKit.addPanel({ width: 300, enable: false })

		.addGroup({label: 'Touch', enable: true })
		.addCanvas({ label: 'trail', height: 64 })
		.addSlider(this, 'touchRadius', 'rangeRadius', { label: 'radius', onChange: this.onTouchChange.bind(this) })
		
		.addGroup({label: 'Particles', enable: true })
		// .addCheckbox(this, 'particlesHitArea', { label: 'hit area', onChange: this.onParticlesChange.bind(this) })
		.addSlider(this, 'particlesRandom', 'rangeRandom', { label: 'random', onChange: this.onParticlesChange.bind(this) })
		.addSlider(this, 'particlesDepth', 'rangeDepth', { label: 'depth', onChange: this.onParticlesChange.bind(this) })
		.addSlider(this, 'particlesSize', 'rangeSize', { label: 'size', onChange: this.onParticlesChange.bind(this) })

		// store reference to canvas
		const component = this.controlKit.getComponentBy({ label: 'trail' });
		if (!component) return;

		this.touchCanvas = component._canvas;
		this.touchCtx = this.touchCanvas.getContext('2d');
	}

	initStats() {
		this.stats = new Stats();

		document.body.appendChild(this.stats.dom);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		// draw touch texture
		if (this.touchCanvas) {
			if (!this.app.webgl) return;
			if (!this.app.webgl.particles) return;
			if (!this.app.webgl.particles.touch) return;
			const source = this.app.webgl.particles.touch.canvas;
			const x = Math.floor((this.touchCanvas.width - source.width) * 0.5);
			this.touchCtx.fillRect(0, 0, this.touchCanvas.width, this.touchCanvas.height);
			this.touchCtx.drawImage(source, x, 0);
		}
	}

	enable() {
		this.controlKit.enable();
		if (this.stats) this.stats.dom.style.display = '';
	}

	disable() {
		this.controlKit.disable();
		if (this.stats) this.stats.dom.style.display = 'none';
	}

	toggle() {
		if (this.controlKit._enabled) this.disable();
		else this.enable();
	}

	onTouchChange() {
		if (!this.app.webgl) return;
		if (!this.app.webgl.particles) return;

		this.app.webgl.particles.touch.radius = this.touchRadius;
	}
	
	onParticlesChange() {
		if (!this.app.webgl) return;
		if (!this.app.webgl.particles) return;

		this.app.webgl.particles.object3D.material.uniforms.uRandom.value = this.particlesRandom;
		this.app.webgl.particles.object3D.material.uniforms.uDepth.value = this.particlesDepth;
		this.app.webgl.particles.object3D.material.uniforms.uSize.value = this.particlesSize;

		this.app.webgl.particles.hitArea.material.visible = this.particlesHitArea;
	}

	onPostProcessingChange() {
		if (!this.app.webgl.composer) return;
		this.app.webgl.composer.enabled = this.postProcessing;
	}
}
