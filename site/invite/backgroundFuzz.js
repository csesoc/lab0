// Shout out to ykob (github.com/ykob/sketch-threejs)

(function() {
  // var THREE = require('three')

  const debounce = function(callback, duration) {
    var timer;
    return function(event) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        callback(event);
      }, duration);
    };
  };

  const normalizeVector2 = function(vector) {
    vector.x = (vector.x / document.body.clientWidth) * 2 - 1;
    vector.y = -(vector.y / window.innerHeight) * 2 + 1;
  };

  var BackgroundImage_vertexShader = `
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main(void) {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

  var BackgroundImage_fragmentShader = `
precision highp float;

uniform vec2 resolution;
uniform vec2 imageResolution;
uniform sampler2D texture;

varying vec2 vUv;

void main(void) {
  vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );

  vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  gl_FragColor = texture2D(texture, uv);
}
`;

  class BackgroundImage {
    constructor() {
      this.uniforms = {
        resolution: {
          type: "v2",
          value: new THREE.Vector2(
            document.body.clientWidth,
            window.innerHeight
          )
        },
        imageResolution: {
          type: "v2",
          value: new THREE.Vector2(2048, 1356)
        },
        texture: {
          type: "t",
          value: null
        }
      };
      this.obj;
    }

    init(callback) {
      const loader = new THREE.TextureLoader();
      loader.load("background.png", tex => {
        this.uniforms.texture.value = tex;
        this.obj = this.createObj();
        callback();
      });
    }

    createObj() {
      return new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2, 2),
        new THREE.RawShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: BackgroundImage_vertexShader,
          fragmentShader: BackgroundImage_fragmentShader
        })
      );
    }

    resize() {
      this.uniforms.resolution.value.set(
        document.body.clientWidth,
        window.innerHeight
      );
    }
  }

  var PostEffect_vertexShader = `
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

  var PostEffect_fragmentShader = `
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec2 vUv;

// White-noise generator
float random(vec2 c){
  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// github.com/ashima/webgl-nois
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise3(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }



const float interval = 3.0;

void main(void){
  float strength = smoothstep(interval * 0.5, interval, interval - mod(time, interval));
  vec2 shake = vec2(strength * 8.0 + 0.5) * vec2(
    random(vec2(time)) * 2.0 - 1.0,
    random(vec2(time * 2.0)) * 2.0 - 1.0
  ) / resolution;

  float y = vUv.y * resolution.y;
  float rgbWave = (
      snoise3(vec3(0.0, y * 0.01, time * 400.0)) * (2.0 + strength * 32.0)
      * snoise3(vec3(0.0, y * 0.02, time * 200.0)) * (1.0 + strength * 4.0)
      + step(0.9995, sin(y * 0.005 + time * 1.6)) * 12.0
      + step(0.9999, sin(y * 0.005 + time * 2.0)) * -18.0
    ) / resolution.x;
  float rgbDiff = (6.0 + sin(time * 500.0 + vUv.y * 40.0) * (20.0 * strength + 1.0)) / resolution.x;
  float rgbUvX = vUv.x + rgbWave;
  float r = texture2D(texture, vec2(rgbUvX + rgbDiff, vUv.y) + shake).r;
  float g = texture2D(texture, vec2(rgbUvX, vUv.y) + shake).g;
  float b = texture2D(texture, vec2(rgbUvX - rgbDiff, vUv.y) + shake).b;

  float whiteNoise = (random(vUv + mod(time, 10.0)) * 2.0 - 1.0) * (0.15 + strength * 0.15);

  float bnTime = floor(time * 20.0) * 200.0;
  float noiseX = step((snoise3(vec3(0.0, vUv.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);
  float noiseY = step((snoise3(vec3(0.0, vUv.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);
  float bnMask = noiseX * noiseY;
  float bnUvX = vUv.x + sin(bnTime) * 0.2 + rgbWave;
  float bnR = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask;
  float bnG = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask;
  float bnB = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask;
  vec4 blockNoise = vec4(bnR, bnG, bnB, 1.0);

  float bnTime2 = floor(time * 25.0) * 300.0;
  float noiseX2 = step((snoise3(vec3(0.0, vUv.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);
  float noiseY2 = step((snoise3(vec3(0.0, vUv.y * 8.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);
  float bnMask2 = noiseX2 * noiseY2;
  float bnR2 = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask2;
  float bnG2 = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask2;
  float bnB2 = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask2;
  vec4 blockNoise2 = vec4(bnR2, bnG2, bnB2, 1.0);

  float waveNoise = (sin(vUv.y * 1200.0) + 1.0) / 2.0 * (0.15 + strength * 0.2);

  gl_FragColor = vec4(r, g, b, 1.0) * (1.0 - bnMask - bnMask2) + (whiteNoise + blockNoise + blockNoise2 - waveNoise);
}
`;

  class PostEffect {
    constructor(texture) {
      this.uniforms = {
        time: {
          type: "f",
          value: 0
        },
        resolution: {
          type: "v2",
          value: new THREE.Vector2(
            document.body.clientWidth,
            window.innerHeight
          )
        },
        texture: {
          type: "t",
          value: texture
        }
      };
      this.obj = this.createObj();
    }

    createObj() {
      return new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2, 2),
        new THREE.RawShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: PostEffect_vertexShader,
          fragmentShader: PostEffect_fragmentShader
        })
      );
    }

    render(time) {
      this.uniforms.time.value += time;
    }

    resize() {
      this.uniforms.resolution.value.set(
        document.body.clientWidth,
        window.innerHeight
      );
    }
  }

  (function() {
    const canvas = document.getElementById("backgroundCanvas");
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: canvas
    });
    const renderBack1 = new THREE.WebGLRenderTarget(
      document.body.clientWidth,
      window.innerHeight
    );
    const scene = new THREE.Scene();
    const sceneBack = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const cameraBack = new THREE.PerspectiveCamera(
      45,
      document.body.clientWidth / window.innerHeight,
      1,
      10000
    );
    const clock = new THREE.Clock();

    const vectorTouchStart = new THREE.Vector2();
    const vectorTouchMove = new THREE.Vector2();
    const vectorTouchEnd = new THREE.Vector2();

    let isDrag = false;

    const bgImg = new BackgroundImage();
    const postEffect = new PostEffect(renderBack1.texture);

    const resizeWindow = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = window.innerHeight;
      cameraBack.aspect = document.body.clientWidth / window.innerHeight;
      cameraBack.updateProjectionMatrix();
      bgImg.resize();
      postEffect.resize();
      renderBack1.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setSize(document.body.clientWidth, window.innerHeight);
    };
    const render = () => {
      const time = clock.getDelta();
      renderer.render(sceneBack, cameraBack, renderBack1);
      postEffect.render(time);
      renderer.render(scene, camera);
    };
    const renderLoop = () => {
      render();
      requestAnimationFrame(renderLoop);
    };
    const touchStart = isTouched => {
      isDrag = true;
    };
    const touchMove = isTouched => {
      if (isDrag) {
      }
    };
    const touchEnd = isTouched => {
      isDrag = false;
    };
    const on = () => {
      window.addEventListener(
        "resize",
        debounce(() => {
          resizeWindow();
        }),
        1000
      );
      canvas.addEventListener("mousedown", function(event) {
        event.preventDefault();
        vectorTouchStart.set(event.clientX, event.clientY);
        normalizeVector2(vectorTouchStart);
        touchStart(false);
      });
      document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        vectorTouchMove.set(event.clientX, event.clientY);
        normalizeVector2(vectorTouchMove);
        touchMove(false);
      });
      document.addEventListener("mouseup", function(event) {
        event.preventDefault();
        vectorTouchEnd.set(event.clientX, event.clientY);
        normalizeVector2(vectorTouchEnd);
        touchEnd(false);
      });
      canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
        vectorTouchStart.set(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        normalizeVector2(vectorTouchStart);
        touchStart(event.touches[0].clientX, event.touches[0].clientY, true);
      });
      canvas.addEventListener("touchmove", function(event) {
        event.preventDefault();
        vectorTouchMove.set(event.touches[0].clientX, event.touches[0].clientY);
        normalizeVector2(vectorTouchMove);
        touchMove(true);
      });
      canvas.addEventListener("touchend", function(event) {
        event.preventDefault();
        vectorTouchEnd.set(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        );
        normalizeVector2(vectorTouchEnd);
        touchEnd(true);
      });
    };

    const init = () => {
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setClearColor(0x555555, 1.0);
      cameraBack.position.set(1000, 1000, 1000);
      cameraBack.lookAt(new THREE.Vector3());

      bgImg.init(() => {
        sceneBack.add(bgImg.obj);
        scene.add(postEffect.obj);
      });

      on();
      resizeWindow();
      renderLoop();
    };
    init();
  })();
})();
