varying vec2 vUv;
uniform sampler2D uTexture;
varying float vCircle;

void main(){
    gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = vec4(vCircle, 0, 0, 1) ;
    gl_FragColor = texture2D(uTexture, vUv);
}