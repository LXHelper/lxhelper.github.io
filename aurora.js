/* ============================================================
   LuXTech Innovation — shared WebGL aurora background
   Same shader as the homepage (index.html), extracted so the
   service subpages can reuse it without duplicating ~90 lines
   of GLSL per file. Requires Three.js (r128) to be loaded first
   and a #gl host element in the DOM. Falls back silently to the
   host's CSS background if WebGL/Three.js is unavailable.
   ============================================================ */
window.addEventListener('load', function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.THREE) return;
  try {
    var host = document.getElementById('gl');
    if (!host) return;
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    host.appendChild(renderer.domElement);
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    var uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      cA: { value: new THREE.Color('#5B8CFF') },
      cB: { value: new THREE.Color('#8E7BFF') },
      cC: { value: new THREE.Color('#E3B26B') },
      cBg: { value: new THREE.Color('#06080F') }
    };

    var frag = `
      precision highp float;
      uniform float uTime, uScroll; uniform vec2 uRes;
      uniform vec3 cA, cB, cC, cBg;
      vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
        vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
        vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
        i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
        vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
        m=m*m; m=m*m;
        vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
        m*=1.79284291-0.85373472*(a0*a0+h*h);
        vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.0*dot(m,g);
      }
      float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*snoise(p); p*=2.02; a*=0.5;} return s; }
      void main(){
        vec2 uv=gl_FragCoord.xy/uRes.xy;
        vec2 p=uv; p.x*=uRes.x/uRes.y;
        float t=uTime*0.05 + uScroll*0.6;
        float n1=fbm(p*1.6 + vec2(t, t*0.6));
        float n2=fbm(p*2.4 - vec2(t*0.7, t*0.4) + n1);
        float m=smoothstep(-0.6,0.9,n1);
        vec3 col=mix(cBg,cA,smoothstep(0.1,0.8,m));
        col=mix(col,cB,smoothstep(0.3,1.0,n2*0.7+0.4));
        col=mix(col,cC,pow(smoothstep(0.55,1.0,n2),2.2)*0.5);
        float vig=smoothstep(1.25,0.2,length(uv-0.5));
        col*=mix(0.55,1.0,vig);
        col=mix(cBg,col,0.9);
        gl_FragColor=vec4(col,1.0);
      }`;
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms, fragmentShader: frag,
      vertexShader: `void main(){ gl_Position=vec4(position,1.0); }`
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    var scrollN = 0;
    window.addEventListener('scroll', function () {
      var max = document.body.scrollHeight - window.innerHeight;
      scrollN = max > 0 ? window.scrollY / max : 0;
    }, { passive: true });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize);

    var clock = new THREE.Clock();
    (function loop() {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value += (scrollN - uniforms.uScroll.value) * 0.05;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  } catch (e) { /* fallback gradient stays */ }
});
