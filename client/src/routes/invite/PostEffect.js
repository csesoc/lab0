import postFragmentShader from "./_shaders/postFragmentShader.shader";
import postVertexShader from "./_shaders/postVertexShader.shader";

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
          fragmentShader: postFragmentShader,
          vertexShader: postVertexShader
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