uniform float time;
uniform vec2 uMouse;
uniform float uEnter;
uniform vec2 aspect;

varying vec2 vUv;
varying float vCircle;

void main(){
    vUv = uv;
    vec3 pos = position;
    
    vec2 aspectCorrectedMouse = vec2(uMouse.x * aspect.x / aspect.y, uMouse.y);
    vec2 aspectCorrectedUv = vec2(vUv.x * aspect.x / aspect.y, vUv.y);

    float radius = 0.8;
    float circle = smoothstep(radius, 0.0, distance(aspectCorrectedMouse, aspectCorrectedUv));


    float wave = sin(distance(aspectCorrectedMouse, aspectCorrectedUv) * 15.0 - time * 8.0) * radius;
    pos.z += wave * circle * uEnter * 20.0;
    vCircle = wave * circle * uEnter * 2.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}