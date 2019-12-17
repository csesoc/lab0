import backgroundFragmentShader from '../_shaders/backgroundFragmentShader.shader'
import backgroundVertexShader from '../_shaders/backgroundVertexShader.shader'

import * as THREE from 'three'

class BackgroundImage {
  constructor () {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(document.body.clientWidth, window.innerHeight)
      },
      imageResolution: {
        type: 'v2',
        value: new THREE.Vector2(2048, 1356)
      },
      texture: {
        type: 't',
        value: null
      }
    }
    this.obj
  }

  init (callback) {
    const loader = new THREE.TextureLoader()
    loader.load('invite/background.jpg', tex => {
      console.log('loaded')
      this.uniforms.texture.value = tex
      this.obj = this.createObj()
      callback()
    })
  }

  createObj () {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        fragmentShader: backgroundFragmentShader,
        vertexShader: backgroundVertexShader
      })
    )
  }

  resize () {
    this.uniforms.resolution.value.set(
      document.body.clientWidth,
      window.innerHeight
    )
  }
}

export default BackgroundImage
