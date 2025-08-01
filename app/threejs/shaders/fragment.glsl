varying vec2 vUv;

void main() {
    // 創建四角漸層效果
    vec3 color1 = vec3(0.0, 1.0, 0.0); // 綠色 (左上)
    vec3 color2 = vec3(1.0, 1.0, 0.0); // 黃色 (右上)
    vec3 color3 = vec3(0.0, 0.0, 0.0); // 黑色 (左下)
    vec3 color4 = vec3(1.0, 0.0, 0.0); // 紅色 (右下)
    
    // 使用 UV 座標進行插值
    vec3 topColor = mix(color1, color2, vUv.x);
    vec3 bottomColor = mix(color3, color4, vUv.x);
    vec3 finalColor = mix(topColor, bottomColor, vUv.y);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
