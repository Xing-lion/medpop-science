'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface SystemInfo {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const SYSTEMS: SystemInfo[] = [
  { id: 'skeletal', name: '骨骼', color: '#e2d9ba', description: '骨骼构成身体的支撑框架，保护器官，并为肌肉提供附着点。' },
  { id: 'muscular', name: '肌肉', color: '#a85b50', description: '骨骼肌通过拉动附着点产生运动，与肌腱一起移动关节、稳定姿势。' },
  { id: 'cardiac', name: '心脏', color: '#b96760', description: '心脏是具有四个腔室的肌肉泵，其瓣膜引导血液通过肺循环和体循环。' },
  { id: 'sensory', name: '感官', color: '#b0c8ce', description: '这些结构参与视觉、听觉和平衡等特殊感觉。' },
  { id: 'arterial', name: '动脉', color: '#c05245', description: '心脏驱动血液通过循环系统。动脉将血液从心脏输送到组织。' },
  { id: 'venous', name: '静脉', color: '#527c9f', description: '静脉将血液送回心脏。浅表和深部网络从组织收集血液。' },
  { id: 'nervous', name: '神经', color: '#d8b565', description: '大脑、脊髓和外周神经传递和处理信号，支持感觉、运动和协调。' },
  { id: 'respiratory', name: '呼吸', color: '#b98991', description: '气道将空气输送到肺部，氧气和二氧化碳在空气和血液之间交换。' },
  { id: 'digestive', name: '消化', color: '#b8916b', description: '消化道分解食物，吸收营养物质和水，并将废物排出体外。' },
  { id: 'urinary', name: '泌尿', color: '#b47961', description: '肾脏过滤血液，调节液体、电解质和酸碱平衡。' },
  { id: 'lymphatic', name: '淋巴', color: '#879f7c', description: '淋巴管将多余的组织液送回循环系统。淋巴结支持免疫监视。' },
  { id: 'endocrine', name: '内分泌', color: '#c5a09a', description: '内分泌器官将激素释放到血液中，协调代谢、生长和应激反应。' },
  { id: 'reproductive', name: '生殖', color: '#bda098', description: '生殖结构参与精子生产、成熟、运输和性激素分泌。' },
  { id: 'integumentary', name: '体表', color: '#ba9b7d', description: '体表提供外部解剖参考，形成保护屏障，参与感觉和体温调节。' },
  { id: 'connective', name: '结缔', color: '#aec3bb', description: '软骨、韧带和其他结缔组织支撑、连接和分隔结构。' },
];

interface Part {
  id: string; name: string; system: string; chunk: number;
  positions: number; normals: number; indices: number;
  vertexCount: number; indexCount: number;
  bounds: [number[], number[]];
}
interface Chunk { url: string; bytes: number; gzip?: string; gzipBytes?: number; }
interface AtlasData { version: string; parts: Part[]; chunks: Chunk[]; triangles: number; }

interface Props {
  visibleSystems: string[];
  selectedSystem: string | null;
  explode: number;
  view: string;
  rotate: boolean;
  onSelect: (partId: string, system: string, name: string) => void;
  onProgress: (n: number) => void;
  onReady: () => void;
  onError: (s: string) => void;
}

export default function AnatomyViewer(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const el = containerRef.current!;
    let disposed = false;
    let frame = 0;
    let dirty = true;
    let amount = 0;
    let lastView = '';
    let lastSelected: string | null = null;
    let lastFocusedSystem: string | null = null;
    let cameraStart = new THREE.Vector3();
    let cameraEnd = new THREE.Vector3();
    let targetStart = new THREE.Vector3();
    let targetEnd = new THREE.Vector3();
    let cameraT = 0;
    let cameraAnimating = false;
    let selData: Uint8Array = new Uint8Array(0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      propsRef.current.onError('此浏览器无法启动3D查看器，请使用支持WebGL的浏览器。');
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.5 : 2));
    renderer.setClearColor('#f2f3f3');
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.005, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(1.4, 1.05, 3.6);
    controls.target.set(0, 0.85, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.085;
    controls.minDistance = 0.07;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI * 0.96;
    controls.addEventListener('change', () => { dirty = true; });

    scene.add(new THREE.HemisphereLight(0xffffff, 0xa7acb2, 1.05));
    const key = new THREE.DirectionalLight(0xfffaf4, 2.3);
    key.position.set(-2, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe9f0ff, 1.8);
    rim.position.set(2, 2, -3);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(30, 96),
      new THREE.MeshStandardMaterial({ color: 0xd5d9dc, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.019;
    scene.add(ground);

    let atlas: AtlasData;
    let data: Float32Array;
    let partTexture: THREE.DataTexture;
    let selectionTexture: THREE.DataTexture;
    let matMap: Map<string, THREE.MeshStandardMaterial> = new Map();
    let materials: THREE.Material[] = [];
    let geometries: THREE.BufferGeometry[] = [];
    let pickers: (THREE.Mesh | undefined)[] = [];
    let centers: THREE.Vector3[] = [];
    let bounds: THREE.Box3[] = [];
    let loadedChunks: Set<number> = new Set();
    let firstChunkReady = false;
    let modelFullyLoaded = false;

    const fit = (view: string) => {
      const mobile = el.clientWidth < 768;
      const distance = mobile ? 4.5 : 4;
      const direction = view === 'front' ? new THREE.Vector3(0, 0.02, 1)
        : view === 'back' ? new THREE.Vector3(0, 0.02, -1)
        : view === 'side' ? new THREE.Vector3(1, 0.02, 0)
        : new THREE.Vector3(0.35, 0.06, 1).normalize();
      controls.target.set(0, 0.85, 0);
      camera.position.copy(controls.target).addScaledVector(direction, distance);
      controls.update();
      dirty = true;
    };

    const resize = () => {
      const mobile = el.clientWidth < 768 || el.clientHeight < 600;
      renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
      dirty = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hitPoint = new THREE.Vector3();
    let pointerDownX = 0, pointerDownY = 0;
    const CLICK_THRESHOLD = 5; // px

    const onPointerDown = (e: PointerEvent) => {
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    const onPointerUp = (e: PointerEvent) => {
      if (!firstChunkReady) return;
      // Only treat as click if pointer didn't move much (avoid drag = click)
      const dx = e.clientX - pointerDownX;
      const dy = e.clientY - pointerDownY;
      if (Math.sqrt(dx * dx + dy * dy) > CLICK_THRESHOLD) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        (e.clientX - rect.left) / rect.width * 2 - 1,
        -(e.clientY - rect.top) / rect.height * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      let nearest = Infinity, found = -1;
      const visible = new Set(propsRef.current.visibleSystems);
      pickers.forEach((mesh, i) => {
        if (!mesh || !visible.has(atlas.parts[i].system)) return;
        if (!loadedChunks.has(atlas.parts[i].chunk)) return;
        const box = bounds[i].clone().translate(new THREE.Vector3(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]));
        if (!raycaster.ray.intersectBox(box, hitPoint)) return;
        const hits = raycaster.intersectObject(mesh, false);
        if (hits[0] && hits[0].distance < nearest) {
          nearest = hits[0].distance;
          found = i;
        }
      });
      if (found >= 0) {
        const part = atlas.parts[found];
        propsRef.current.onSelect(part.id, part.system, part.name);
      }
    };
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const contextLost = (e: Event) => {
      e.preventDefault();
      propsRef.current.onError('3D会话已暂停，请重新加载页面。');
    };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);

    (async () => {
      try {
        // Phase 0: fetch atlas metadata (1.3MB JSON)
        const res = await fetch('/models/atlas.json');
        atlas = await res.json();

        const width = THREE.MathUtils.ceilPowerOfTwo(atlas.parts.length);
        data = new Float32Array(width * 4);
        partTexture = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat, THREE.FloatType);
        partTexture.minFilter = THREE.NearestFilter;
        partTexture.magFilter = THREE.NearestFilter;
        partTexture.needsUpdate = true;

        selData = new Uint8Array(width * 4);
        selectionTexture = new THREE.DataTexture(selData, width, 1);
        selectionTexture.minFilter = THREE.NearestFilter;
        selectionTexture.magFilter = THREE.NearestFilter;
        selectionTexture.needsUpdate = true;

        matMap = new Map<string, THREE.MeshStandardMaterial>();
        for (const sys of SYSTEMS) {
          const m = new THREE.MeshStandardMaterial({
            color: sys.color,
            metalness: 0.08,
            roughness: 0.53,
            side: THREE.DoubleSide,
            transparent: sys.id === 'integumentary',
            opacity: sys.id === 'integumentary' ? 0.1 : 1,
            depthWrite: sys.id !== 'integumentary',
          });
          m.onBeforeCompile = (shader: any) => {
            shader.uniforms.partState = { value: partTexture };
            shader.uniforms.selectionState = { value: selectionTexture };
            shader.uniforms.stateWidth = { value: width };
            shader.vertexShader = 'attribute float partIndex; uniform sampler2D partState; uniform sampler2D selectionState; uniform float stateWidth; varying float partVisible; varying float partSelected;\n' + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvec2 stateUv = vec2((partIndex + 0.5) / stateWidth, 0.5); vec4 state = texture2D(partState, stateUv); transformed += state.xyz; partVisible = state.w; partSelected = texture2D(selectionState, stateUv).r;');
            shader.fragmentShader = 'varying float partVisible; varying float partSelected;\n' + shader.fragmentShader;
            shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nif (partVisible < 0.5) discard;');
            shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.85, 0.78), partSelected * 0.75);');
          };
          materials.push(m);
          matMap.set(sys.id, m);
        }

        centers = atlas.parts.map(p => new THREE.Vector3().fromArray(p.bounds[0]).add(new THREE.Vector3().fromArray(p.bounds[1])).multiplyScalar(0.5));
        bounds = atlas.parts.map(p => new THREE.Box3(new THREE.Vector3().fromArray(p.bounds[0]), new THREE.Vector3().fromArray(p.bounds[1])));

        const loadChunk = async (ci: number) => {
          if (disposed || loadedChunks.has(ci)) return;
          const chunk = atlas.chunks[ci];
          const compressed = !!chunk.gzip && typeof DecompressionStream !== 'undefined';
          const response = await fetch(compressed ? chunk.gzip! : chunk.url);
          let buffer: ArrayBuffer;
          if (compressed) {
            const ab = await response.arrayBuffer();
            const dv = new DataView(ab);
            const isGzip = dv.getUint8(0) === 0x1f && dv.getUint8(1) === 0x8b;
            if (isGzip) {
              buffer = await new Response(new Blob([ab]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
            } else {
              buffer = ab;
            }
          } else {
            buffer = await response.arrayBuffer();
          }
          if (disposed) return;

          const groups = new Map<string, THREE.BufferGeometry[]>();
          atlas.parts.forEach((p, i) => {
            if (p.chunk !== ci) return;
            const g = new THREE.BufferGeometry();
            g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buffer, p.positions, p.vertexCount * 3), 3));
            g.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(buffer, p.normals, p.vertexCount * 3), 3, true));
            g.setIndex(new THREE.BufferAttribute(new Uint32Array(buffer, p.indices, p.indexCount), 1));
            g.boundingBox = bounds[i].clone();
            g.computeBoundingSphere();
            const pick = new THREE.Mesh(g);
            pick.matrixAutoUpdate = false;
            pickers[i] = pick;
            geometries.push(g);
            g.setAttribute('partIndex', new THREE.BufferAttribute(new Float32Array(p.vertexCount).fill(i), 1));
            const list = groups.get(p.system) ?? [];
            list.push(g);
            groups.set(p.system, list);
          });

          groups.forEach((gs, system) => {
            const geometry = mergeGeometries(gs, false);
            if (!geometry) return;
            geometries.push(geometry);
            const mesh = new THREE.Mesh(geometry, matMap.get(system)!);
            mesh.frustumCulled = false;
            scene.add(mesh);
          });

          loadedChunks.add(ci);
          dirty = true;
        };

        // === PHASE 1: Load chunk 0 first — gives user an immediate 3D body ===
        await loadChunk(0);
        if (disposed) return;
        firstChunkReady = true;
        dirty = true;
        // Signal UI: interactive 3D view is ready
        propsRef.current.onReady();
        propsRef.current.onProgress(Math.round(1 / atlas.chunks.length * 100));

        // === PHASE 2: Load remaining chunks in parallel batches of 3 ===
        const remaining = Array.from({ length: atlas.chunks.length - 1 }, (_, i) => i + 1);
        let batchCursor = 0;

        await Promise.all(Array.from({ length: 3 }, async () => {
          while (batchCursor < remaining.length) {
            const ci = remaining[batchCursor++];
            if (!ci || disposed) return;
            await loadChunk(ci);
            if (!disposed) {
              const pct = Math.round(loadedChunks.size / atlas.chunks.length * 100);
              propsRef.current.onProgress(pct);
            }
          }
        }));

        if (!disposed) {
          modelFullyLoaded = true;
          dirty = true;
        }
      } catch (e) {
        if (!disposed) propsRef.current.onError(e instanceof Error ? e.message : '加载解剖模型失败');
      }
    })();

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const s = propsRef.current;

      if (!firstChunkReady) {
        controls.update();
        return;
      }

      const moving = Math.abs(amount - s.explode) > 0.001;
      if (moving) {
        amount = THREE.MathUtils.damp(amount, s.explode, 8, dt);
        dirty = true;
      }

      // Update selection texture whenever selectedSystem changes (independent of dirty/moving)
      const sel = s.selectedSystem;
      if (sel !== lastSelected) {
        lastSelected = sel;
        if (selData && selData.length > 0) {
          if (sel) {
            for (let i = 0; i < atlas.parts.length; i++) {
              selData[i * 4] = atlas.parts[i].system === sel ? 255 : 0;
            }
          } else {
            selData.fill(0);
          }
          selectionTexture.needsUpdate = true;
          dirty = true;
        }
      }

      if (dirty || moving) {
        const visible = new Set(s.visibleSystems);

        atlas.parts.forEach((p, i) => {
          const c = centers[i];
          const group = SYSTEMS.findIndex(sys => sys.id === p.system);
          const angle = group / SYSTEMS.length * Math.PI * 2;
          const t = amount;
          const dx = Math.sin(angle) * t * 0.48;
          const dy = (c.y - 0.85) * t * 0.28;
          const dz = Math.cos(angle) * t * 0.48;
          const chunkLoaded = loadedChunks.has(p.chunk);
          const isVisible = chunkLoaded && visible.has(p.system);
          data.set([dx, dy, dz, isVisible ? 1 : 0], i * 4);
          const mesh = pickers[i];
          if (mesh) {
            mesh.position.set(dx, dy, dz);
            mesh.updateMatrix();
            mesh.updateMatrixWorld(true);
          }
        });
        partTexture.needsUpdate = true;
        dirty = false;
      }

      // Auto-focus camera when selectedSystem changes
      if (s.selectedSystem !== lastFocusedSystem) {
        lastFocusedSystem = s.selectedSystem;
        if (s.selectedSystem) {
          const sysIdx = SYSTEMS.findIndex(sys => sys.id === s.selectedSystem);
          const sysAngle = sysIdx / SYSTEMS.length * Math.PI * 2;
          const camDist = 2.8;
          const camDir = new THREE.Vector3(Math.sin(sysAngle) * 0.3, 0.06, Math.cos(sysAngle) * 0.3 + 0.7).normalize();
          const camPos = new THREE.Vector3().addScaledVector(camDir, camDist).add(new THREE.Vector3(0, 0.85, 0));
          controls.target.set(0, 0.85, 0);
          // Smooth camera transition
          cameraStart.copy(camera.position);
          cameraEnd.copy(camPos);
          targetStart.copy(controls.target);
          targetEnd.set(0, 0.85, 0);
          cameraT = 0;
          cameraAnimating = true;
        }
      }

      // Animate camera to focus position
      if (cameraAnimating) {
        cameraT = Math.min(1, cameraT + dt * 2.5);
        const ease = cameraT < 0.5 ? 2 * cameraT * cameraT : 1 - Math.pow(-2 * cameraT + 2, 2) / 2;
        camera.position.lerpVectors(cameraStart, cameraEnd, ease);
        controls.target.lerpVectors(targetStart, targetEnd, ease);
        controls.update();
        dirty = true;
        if (cameraT >= 1) cameraAnimating = false;
      }

      if (s.view !== lastView) {
        fit(s.view);
        lastView = s.view;
      }

      controls.autoRotate = s.rotate && amount < 0.4;
      controls.autoRotateSpeed = 0.65;
      if (controls.autoRotate) dirty = true;
      ground.visible = amount < 0.5;
      controls.update();

      if (dirty) {
        renderer.render(scene, camera);
        dirty = false;
      }
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      if (partTexture) partTexture.dispose();
      if (selectionTexture) selectionTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px' }} />;
}