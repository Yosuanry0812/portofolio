"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Braces,
  GitBranch,
  MoveHorizontal,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { useI18n } from "@/lib/i18n";

const rows = ["Q W E R T Y U I O P", "A S D F G H J K L", "Z X C V B N M , ."];
const views = [
  { x: -9, y: -18, z: 0 },
  { x: -4, y: 13, z: 0.8 },
  { x: -15, y: -31, z: -1.2 },
];
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
type Pose = (typeof views)[number];
type Gesture = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  time: number;
  vx: number;
  vy: number;
  moved: boolean;
  pose: Pose;
  panX: number;
  panY: number;
};

export default function SculpturalScene({
  paused = false,
}: {
  paused?: boolean;
}) {
  const reduced = useMotionPreference();
  const { lang } = useI18n();
  const id = lang === "id";
  const still = reduced || paused;
  const hintId = useId();
  const sceneRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const pose = useRef<Pose>({ ...views[0] });
  const [view, setView] = useState(0);
  const [freeView, setFreeView] = useState(false);
  const x = useMotionValue(views[0].x),
    y = useMotionValue(views[0].y),
    z = useMotionValue(0);
  const panX = useMotionValue(0),
    panY = useMotionValue(0);
  const spring = { stiffness: 68, damping: 18, mass: 1.15 };
  const rotateX = useSpring(x, spring),
    rotateY = useSpring(y, spring),
    rotateZ = useSpring(z, spring);
  const positionX = useSpring(panX, spring),
    positionY = useSpring(panY, spring);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.min(
        (entry.contentRect.width - 48) / 540,
        (entry.contentRect.height - 18) / 470,
        1.08,
      );
      sceneRef.current?.style.setProperty(
        "--workspace-scale",
        String(Math.max(0.38, scale)),
      );
    });
    observer.observe(surface);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!still) return;
    const active = gesture.current;
    gesture.current = null;
    surfaceRef.current?.removeAttribute("data-dragging");
    if (active && surfaceRef.current?.hasPointerCapture(active.id))
      surfaceRef.current.releasePointerCapture(active.id);
    rotateX.jump(x.get());
    rotateY.jump(y.get());
    rotateZ.jump(z.get());
    positionX.jump(panX.get());
    positionY.jump(panY.get());
  }, [
    still,
    x,
    y,
    z,
    panX,
    panY,
    rotateX,
    rotateY,
    rotateZ,
    positionX,
    positionY,
  ]);

  const applyPose = (next: Pose) => {
    pose.current = { ...next };
    x.set(next.x);
    y.set(next.y);
    z.set(next.z);
    panX.set(0);
    panY.set(0);
    if (still) {
      rotateX.jump(next.x);
      rotateY.jump(next.y);
      rotateZ.jump(next.z);
      positionX.jump(0);
      positionY.jump(0);
    }
  };
  const reset = () => {
    applyPose(views[0]);
    setView(0);
    setFreeView(false);
  };
  const cycleView = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (still) return;
    const next = (view + 1) % views.length;
    setView(next);
    setFreeView(false);
    applyPose(views[next]);
  };
  const startGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (still || !event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    gesture.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      time: performance.now(),
      vx: 0,
      vy: 0,
      moved: false,
      pose: { x: x.get(), y: y.get(), z: z.get() },
      panX: panX.get(),
      panY: panY.get(),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (still) return;
    const active = gesture.current;
    if (!active) {
      if (event.pointerType === "touch") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      x.set(pose.current.x - dy * 6);
      y.set(pose.current.y + dx * 10);
      z.set(pose.current.z + dx * 0.9);
      return;
    }
    if (active.id !== event.pointerId) return;
    const dx = event.clientX - active.startX,
      dy = event.clientY - active.startY;
    if (!active.moved && Math.hypot(dx, dy) < 6) return;
    active.moved = true;
    event.currentTarget.setAttribute("data-dragging", "true");
    const now = performance.now(),
      dt = Math.max(8, now - active.time);
    active.vx = clamp((event.clientX - active.lastX) / dt, -2, 2);
    active.vy = clamp((event.clientY - active.lastY) / dt, -2, 2);
    active.lastX = event.clientX;
    active.lastY = event.clientY;
    active.time = now;
    x.set(clamp(active.pose.x - dy * 0.16, -27, 14));
    y.set(clamp(active.pose.y + dx * 0.24, -40, 40));
    z.set(clamp(active.pose.z + dx * 0.012, -3, 3));
    panX.set(clamp(active.panX + dx * 0.16, -28, 28));
    panY.set(clamp(active.panY + dy * 0.11, -16, 16));
  };
  const endGesture = (
    event: PointerEvent<HTMLDivElement>,
    cancelled = false,
  ) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    gesture.current = null;
    event.currentTarget.removeAttribute("data-dragging");
    if (event.currentTarget.hasPointerCapture(active.id))
      event.currentTarget.releasePointerCapture(active.id);
    suppressClick.current = active.moved && !cancelled;
    if (!active.moved) return;
    if (cancelled) {
      applyPose(active.pose);
      return;
    }
    const fresh = performance.now() - active.time < 90;
    const vx = fresh ? active.vx : 0,
      vy = fresh ? active.vy : 0;
    const next = {
      x: clamp(x.get() - vy * 3, -27, 14),
      y: clamp(y.get() + vx * 5, -40, 40),
      z: z.get(),
    };
    pose.current = next;
    x.set(next.x);
    y.set(next.y);
    panX.set(clamp(panX.get() + vx * 5, -28, 28));
    panY.set(clamp(panY.get() + vy * 3, -16, 16));
    setFreeView(true);
  };
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" || event.key === "Home") {
      event.preventDefault();
      reset();
      return;
    }
    if (still) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cycleView();
      return;
    }
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const next = { ...pose.current };
    if (event.key === "ArrowLeft") next.y -= 5;
    if (event.key === "ArrowRight") next.y += 5;
    if (event.key === "ArrowUp") next.x -= 4;
    if (event.key === "ArrowDown") next.x += 4;
    next.x = clamp(next.x, -27, 14);
    next.y = clamp(next.y, -40, 40);
    applyPose(next);
    setFreeView(true);
  };

  return (
    <div
      ref={sceneRef}
      className={`developer-scene${still ? " is-still" : ""}`}
      data-view={freeView ? "free" : String(view)}
      role="group"
      aria-label={id ? "Workstation developer 3D" : "3D developer workstation"}
    >
      <div
        ref={surfaceRef}
        className="workspace-interaction"
        role="button"
        tabIndex={0}
        aria-disabled={still}
        aria-label={
          id
            ? "Putar workstation. Klik untuk mengganti sudut, geser atau gunakan tombol panah untuk memutar."
            : "Rotate workstation. Click to change view, drag or use arrow keys to rotate."
        }
        aria-describedby={hintId}
        onPointerDown={startGesture}
        onPointerMove={moveGesture}
        onPointerUp={(event) => endGesture(event)}
        onPointerCancel={(event) => endGesture(event, true)}
        onPointerLeave={() => {
          if (!gesture.current) {
            x.set(pose.current.x);
            y.set(pose.current.y);
            z.set(pose.current.z);
          }
        }}
        onClick={cycleView}
        onDoubleClick={reset}
        onKeyDown={keyboard}
      >
        <div className="workspace-shadow" aria-hidden="true" />
        <div className="workspace-fit" aria-hidden="true">
          <div className="workspace-float">
            <motion.div
              className="developer-rig"
              style={{ rotateX, rotateY, rotateZ, x: positionX, y: positionY }}
            >
              <div className="monitor-back" />
              <div className="developer-monitor">
                <div className="editor-title">
                  <div className="window-controls">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>portofolio</span>
                  <Braces size={12} />
                </div>
                <div className="editor-tabs">
                  <span>
                    <b>TSX</b> page.tsx
                  </span>
                  <span>profile.ts</span>
                </div>
                <div className="editor-code">
                  <div className="line-numbers">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
                    <br />
                    10
                  </div>
                  <pre>
                    <code>
                      <span className="syntax-purple">import</span>{" "}
                      {"{ projects }"}{" "}
                      <span className="syntax-purple">from</span>
                      {"\n"}
                      <span className="syntax-lime">
                        {" "}
                        &quot;@/data/profile&quot;
                      </span>
                      ;{"\n\n"}
                      <span className="syntax-purple">
                        export default function
                      </span>
                      {"\n"}
                      <span className="syntax-blue"> Portfolio</span>() {"{"}
                      {"\n"} <span className="syntax-purple">return</span> (
                      {"\n"} &lt;<span className="syntax-lime">main</span>&gt;
                      {"\n"} {"{projects.map(renderProject)}"}
                      {"\n"} &lt;/<span className="syntax-lime">main</span>&gt;
                      {"\n"} );{"\n"}
                      {"}"}
                      <span className="editor-caret" />
                    </code>
                  </pre>
                </div>
                <div className="editor-status">
                  <span>
                    <GitBranch size={10} /> main
                  </span>
                  <span>
                    TypeScript React <span className="status-dot" />
                  </span>
                </div>
              </div>
              <div className="monitor-post" />
              <div className="monitor-foot" />
              <div className="developer-keyboard">
                <div className="keyboard-function-row">
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                {rows.map((row, i) => (
                  <div className="keyboard-row" key={i}>
                    {row.split(" ").map((key, k) => (
                      <span
                        key={key}
                        style={{ animationDelay: `${(i + k) * 0.09}s` }}
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="keyboard-bottom">
                  <span />
                  <span className="space-key" />
                  <span />
                </div>
              </div>
              <div className="developer-terminal">
                <div>
                  <Terminal size={12} />
                  <span>Terminal</span>
                  <i />
                </div>
                <p>
                  <span>~/portofolio</span> <GitBranch size={9} /> main
                </p>
                <p>
                  <span className="terminal-prompt">❯</span> pnpm dev
                </p>
                <p className="terminal-url">
                  localhost:3000 <span className="terminal-caret" />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="workspace-controls">
        <p id={hintId}>
          <MoveHorizontal size={15} />
          <span>
            {still
              ? id
                ? "Animasi dijeda"
                : "Motion paused"
              : id
                ? "Klik ganti sudut · Geser untuk putar"
                : "Click to switch · Drag to rotate"}
          </span>
        </p>
        <button
          type="button"
          className="workspace-reset"
          onClick={reset}
          aria-label={
            id ? "Kembalikan sudut workstation" : "Reset workstation view"
          }
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
