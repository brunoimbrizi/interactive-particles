import 'three';
import 'three-examples/controls/TrackballControls';

import 'three-examples/shaders/CopyShader';
import 'three-examples/shaders/SobelOperatorShader';

import 'three-examples/postprocessing/EffectComposer';
import 'three-examples/postprocessing/RenderPass';
import 'three-examples/postprocessing/ShaderPass';

import InteractiveControls from './controls/InteractiveControls';
import Particles from './particles/Particles';

const glslify = require('glslify');

export default class WebGLView {

	constructor(app) {
		this.app = app;

		this.initThree();
		this.initParticles();
		this.initControls();
		this.initPostProcessing();
	}

	initThree() {
		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 300;

		// renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // clock
		this.clock = new THREE.Clock(true);
	}

	initControls() {
		this.interactive = new InteractiveControls(this.camera, this.renderer.domElement);
	}

	initParticles() {
		this.particles = new Particles(this);
		this.scene.add(this.particles.container);

		// TEMP
		this.particles.init('images/sample-02.png');
	}

	initPostProcessing() {
		this.composer = new THREE.EffectComposer(this.renderer);

		const renderPass = new THREE.RenderPass(this.scene, this.camera);
		// renderPass.renderToScreen = true;
		this.composer.addPass(renderPass);

		const sobelPass = new THREE.ShaderPass(THREE.SobelOperatorShader);
		sobelPass.renderToScreen = true;
		this.composer.addPass(sobelPass);
		this.sobelPass = sobelPass;
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		const delta = this.clock.getDelta();

		if (this.particles) this.particles.update(delta);
	}

	draw() {
		if (this.composer && this.composer.enabled) this.composer.render();
		else this.renderer.render(this.scene, this.camera);
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		if (!this.renderer) return;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.fovHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;

		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.composer.setSize(window.innerWidth, window.innerHeight);
		this.sobelPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);

		if (this.interactive) this.interactive.resize();
		if (this.particles) this.particles.resize();
	}
}
