"use client";

// Adapted from reactbits.dev "FloatingLines" — REWRITTEN on ogl (was three.js)
// to drop the ~150KB three dependency. Same vertex/fragment shader and uniforms
// → visually identical. Client-only; skipped for reduced-motion; pauses when
// off-screen / tab hidden.

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
precision highp int;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform float enableTop;
uniform float enableMiddle;
uniform float enableBottom;

uniform float topLineCount;
uniform float middleLineCount;
uniform float bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform float interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform float parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform float lineGradientCount;

vec3 gradStop(int i) {
  if (i <= 0) return uColor0;
  if (i == 1) return uColor1;
  if (i == 2) return uColor2;
  if (i == 3) return uColor3;
  if (i == 4) return uColor4;
  if (i == 5) return uColor5;
  if (i == 6) return uColor6;
  return uColor7;
}

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);
  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;
  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  int count = int(lineGradientCount + 0.5);
  if (count <= 0) {
    return baseColor;
  }
  vec3 gradientColor;
  if (count == 1) {
    gradientColor = uColor0;
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(count - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = idx + 1;
    if (idx2 > count - 1) idx2 = count - 1;
    gradientColor = mix(gradStop(idx), gradStop(idx2), f);
  }
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, float shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;
  if (shouldBend > 0.5) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }
  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  if (parallax > 0.5) {
    baseUv += parallaxOffset;
  }
  vec3 col = vec3(0.0);
  vec3 b = lineGradientCount > 0.5 ? vec3(0.0) : background_color(baseUv);
  vec2 mouseUv = vec2(0.0);
  if (interactive > 0.5) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  if (enableBottom > 0.5) {
    for (int i = 0; i < 16; ++i) {
      if (float(i) >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(bottomLineCount - 1.0, 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }
  if (enableMiddle > 0.5) {
    for (int i = 0; i < 16; ++i) {
      if (float(i) >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(middleLineCount - 1.0, 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi, baseUv, mouseUv, interactive
      );
    }
  }
  if (enableTop > 0.5) {
    for (int i = 0; i < 16; ++i) {
      if (float(i) >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(topLineCount - 1.0, 1.0);
      vec3 lineCol = getLineColor(t, b);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }
  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  // Alpha from line intensity → transparent where there are no lines, so the
  // effect shows on ANY background (light or dark), no blend needed.
  float a = clamp(max(max(color.r, color.g), color.b), 0.0, 1.0);
  gl_FragColor = vec4(color.rgb, a);
}
`;

const MAX_GRADIENT_STOPS = 8;

function hexToRGB(hex: string): [number, number, number] {
  let v = hex.trim();
  if (v.startsWith("#")) v = v.slice(1);
  let r = 255,
    g = 255,
    b = 255;
  if (v.length === 3) {
    r = parseInt(v[0] + v[0], 16);
    g = parseInt(v[1] + v[1], 16);
    b = parseInt(v[2] + v[2], 16);
  } else if (v.length === 6) {
    r = parseInt(v.slice(0, 2), 16);
    g = parseInt(v.slice(2, 4), 16);
    b = parseInt(v.slice(4, 6), 16);
  }
  return [r / 255, g / 255, b / 255];
}

type WavePos = { x?: number; y?: number; rotate?: number };

export type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: ("top" | "middle" | "bottom")[];
  lineCount?: number[] | number;
  lineDistance?: number[] | number;
  topWavePosition?: WavePos;
  middleWavePosition?: WavePos;
  bottomWavePosition?: WavePos;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
};

export function FloatingLines({
  linesGradient,
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode,
  className,
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getLineCount = (waveType: string) => {
    if (typeof lineCount === "number") return lineCount;
    if (!enabledWaves.includes(waveType as never)) return 0;
    return lineCount[enabledWaves.indexOf(waveType as never)] ?? 6;
  };
  const getLineDistance = (waveType: string) => {
    if (typeof lineDistance === "number") return lineDistance;
    if (!enabledWaves.includes(waveType as never)) return 0.1;
    return lineDistance[enabledWaves.indexOf(waveType as never)] ?? 0.1;
  };

  const topLineCount = enabledWaves.includes("top") ? getLineCount("top") : 0;
  const middleLineCount = enabledWaves.includes("middle") ? getLineCount("middle") : 0;
  const bottomLineCount = enabledWaves.includes("bottom") ? getLineCount("bottom") : 0;
  const topLineDistance = enabledWaves.includes("top") ? getLineDistance("top") * 0.01 : 0.01;
  const middleLineDistance = enabledWaves.includes("middle") ? getLineDistance("middle") * 0.01 : 0.01;
  const bottomLineDistance = enabledWaves.includes("bottom") ? getLineDistance("bottom") * 0.01 : 0.01;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // honour reduced-motion
    }

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // 8 individual vec3 color uniforms (ogl-safe; ogl does not reliably upload
    // vec3[] array uniforms, so we avoid them).
    const stopsIn =
      linesGradient && linesGradient.length ? linesGradient : ["#ffffff"];
    const stops = stopsIn.slice(0, MAX_GRADIENT_STOPS);
    const gradCount = linesGradient && linesGradient.length ? stops.length : 0;
    const colorUniforms: Record<string, { value: Float32Array }> = {};
    for (let i = 0; i < MAX_GRADIENT_STOPS; i++) {
      const [r, g, b] = hexToRGB(stops[Math.min(i, stops.length - 1)]);
      colorUniforms["uColor" + i] = { value: new Float32Array([r, g, b]) };
    }

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height, 1]) },
        animationSpeed: { value: animationSpeed },
        enableTop: { value: enabledWaves.includes("top") ? 1 : 0 },
        enableMiddle: { value: enabledWaves.includes("middle") ? 1 : 0 },
        enableBottom: { value: enabledWaves.includes("bottom") ? 1 : 0 },
        topLineCount: { value: topLineCount },
        middleLineCount: { value: middleLineCount },
        bottomLineCount: { value: bottomLineCount },
        topLineDistance: { value: topLineDistance },
        middleLineDistance: { value: middleLineDistance },
        bottomLineDistance: { value: bottomLineDistance },
        topWavePosition: {
          value: new Float32Array([
            topWavePosition?.x ?? 10.0,
            topWavePosition?.y ?? 0.5,
            topWavePosition?.rotate ?? -0.4,
          ]),
        },
        middleWavePosition: {
          value: new Float32Array([
            middleWavePosition?.x ?? 5.0,
            middleWavePosition?.y ?? 0.0,
            middleWavePosition?.rotate ?? 0.2,
          ]),
        },
        bottomWavePosition: {
          value: new Float32Array([
            bottomWavePosition?.x ?? 2.0,
            bottomWavePosition?.y ?? -0.7,
            bottomWavePosition?.rotate ?? 0.4,
          ]),
        },
        iMouse: { value: new Float32Array([-1000, -1000]) },
        interactive: { value: interactive ? 1 : 0 },
        bendRadius: { value: bendRadius },
        bendStrength: { value: bendStrength },
        bendInfluence: { value: 0 },
        parallax: { value: parallax ? 1 : 0 },
        parallaxStrength: { value: parallaxStrength },
        parallaxOffset: { value: new Float32Array([0, 0]) },
        ...colorUniforms,
        lineGradientCount: { value: gradCount },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width || 1, rect.height || 1);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.canvas.width;
      res[1] = gl.canvas.height;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    // Only render while on-screen / tab visible.
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    // Mouse / parallax (smoothed)
    const targetMouse: [number, number] = [-1000, -1000];
    const curMouse: [number, number] = [-1000, -1000];
    let targetInfluence = 0;
    let curInfluence = 0;
    const targetPar: [number, number] = [0, 0];
    const curPar: [number, number] = [0, 0];

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dpr = renderer.dpr;
      targetMouse[0] = x * dpr;
      targetMouse[1] = (rect.height - y) * dpr;
      targetInfluence = 1;
      if (parallax) {
        targetPar[0] = ((x - rect.width / 2) / rect.width) * parallaxStrength;
        targetPar[1] = (-(y - rect.height / 2) / rect.height) * parallaxStrength;
      }
    };
    const onLeave = () => {
      targetInfluence = 0;
    };
    if (interactive) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!isVisible || document.hidden) return;
      program.uniforms.iTime.value = t * 0.001;

      if (interactive) {
        curMouse[0] += (targetMouse[0] - curMouse[0]) * mouseDamping;
        curMouse[1] += (targetMouse[1] - curMouse[1]) * mouseDamping;
        const m = program.uniforms.iMouse.value as Float32Array;
        m[0] = curMouse[0];
        m[1] = curMouse[1];
        curInfluence += (targetInfluence - curInfluence) * mouseDamping;
        program.uniforms.bendInfluence.value = curInfluence;
      }
      if (parallax) {
        curPar[0] += (targetPar[0] - curPar[0]) * mouseDamping;
        curPar[1] += (targetPar[1] - curPar[1]) * mouseDamping;
        const p = program.uniforms.parallaxOffset.value as Float32Array;
        p[0] = curPar[0];
        p[1] = curPar[1];
      }
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (interactive) {
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
      }
      if (canvas.parentElement === container) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={mixBlendMode ? { mixBlendMode } : undefined}
    />
  );
}

export default FloatingLines;
