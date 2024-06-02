class EarthGlobe {
    #canvas = document.querySelector('.canvas-earth-globe');
    #scene = new THREE.Scene();
    #camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    #renderer = new THREE.WebGLRenderer({ canvas: this.#canvas });
    #sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
    #rotationSpeed = 0.0025;
    #texturePath = './app/dist/assets/images/earth-texture.jpg';
    #textureLoader = new THREE.TextureLoader();
    #texture = this.#textureLoader.load(this.#texturePath);
    #material = new THREE.MeshBasicMaterial({ map: this.#texture });
    #sphereMesh = new THREE.Mesh(this.#sphereGeometry, this.#material);

    init() {
        this.SetSceneBackground();
        this.SetRendererSize();
        this.AddSphereToScene();
        this.SetCameraPosition();
        this.AddEventWindowResize();
        this.Animate();
    }

    SetSceneBackground() {
        this.#scene.background = new THREE.Color(0x040114);
    }

    SetRendererSize() {
        const width = this.#canvas.clientWidth;
        const height = this.#canvas.clientHeight;
        this.#renderer.setSize(width, height);
        this.#camera.aspect = width / height;
        this.#camera.updateProjectionMatrix();
    }

    AddSphereToScene() {
        this.#scene.add(this.#sphereMesh);
    }

    SetCameraPosition() {
        this.#camera.position.z = 14;
    }

    Animate() {
        requestAnimationFrame(this.Animate.bind(this));
        this.#sphereMesh.rotation.y += this.#rotationSpeed;
        this.#renderer.render(this.#scene, this.#camera);
    }

    AddEventWindowResize() {
        window.addEventListener('resize', () => {
            this.SetRendererSize();
        });
    }
}