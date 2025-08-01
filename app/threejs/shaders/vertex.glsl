uniform float time;
varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 pos = position;

    pos.z += sin(vUv.x * 10.0 + time) * 5.0;
    pos.z += sin(vUv.y * 10.0 + time) * 5.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}