// 기본 변수 설정
let scene, camera, renderer, controls, model;
let wireframeMode = false;

// 초기화 함수
function init() {
    // 씬 생성
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // 카메라 설정
    const canvas = document.querySelector('.webgl');
    const sizes = {
        width: canvas.parentElement.clientWidth,
        height: canvas.parentElement.clientHeight
    };
    
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    scene.add(camera);
    
    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
    
    // 컨트롤 설정
    controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI;
    
    // GLTF 로더 설정
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    
    // GLB 모델 로드
    gltfLoader.load(
        './model/untitled.glb', // 모델 경로
        (gltf) => {
            model = gltf.scene;
            
            // 모델 크기 조정
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            
            // 모델 중심 위치 조정
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;
            
            // 모델 크기 조정 (화면에 맞게)
            const scale = 3 / size;
            model.scale.set(scale, scale, scale);
            
            // 그림자 설정
            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.material.needsUpdate = true;
                }
            });
            
            scene.add(model);
            
            // 모델이 로드된 후 카메라 위치 조정
            camera.position.set(0, 0, 10);
            controls.update();
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% 로드됨');
        },
        (error) => {
            console.error('모델 로드 중 오류 발생:', error);
        }
    );
    
    // 바닥 추가 (선택 사항)
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xf0f0f0,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);
    
    // 윈도우 리사이즈 이벤트
    window.addEventListener('resize', () => {
        // 크기 업데이트
        sizes.width = canvas.parentElement.clientWidth;
        sizes.height = canvas.parentElement.clientHeight;
        
        // 카메라 업데이트
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        
        // 렌더러 업데이트
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // 버튼 이벤트 설정
    document.getElementById('reset-view').addEventListener('click', resetView);
    document.getElementById('wireframe-toggle').addEventListener('click', toggleWireframe);
    
    // 애니메이션 시작
    animate();
}

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// 뷰 초기화 함수
function resetView() {
    camera.position.set(0, 0, 10);
    controls.reset();
}

// 와이어프레임 토글 함수
function toggleWireframe() {
    if (!model) return;
    
    wireframeMode = !wireframeMode;
    
    model.traverse((node) => {
        if (node.isMesh) {
            node.material.wireframe = wireframeMode;
        }
    });
}

// 페이지 로드 시 초기화
window.addEventListener('load', init);
