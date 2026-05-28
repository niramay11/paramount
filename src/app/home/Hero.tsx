'use client'

import Image from "next/image";
import Scientist from "../../../public/scientist.png";
import { ArrowUpRightIcon, ShieldCheckIcon, AwardIcon, ClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/* ─── static data ────────────────────────────────────── */

const SERVICES = [
  { title: "Pay Your Bill",   description: "Settle your payments online securely and effortlessly.",        button: "Pay Now",  path: "/" },
  { title: "Test Dictionary", description: "Explore our comprehensive list of available diagnostic tests.", button: "Explore",  path: "/test-dictionary" },
  { title: "PSC Location",    description: "Locate a patient service centre conveniently near you.",        button: "Find Now", path: "/contact" },
  { title: "Lab Form",        description: "Locate the right lab form in just a few clicks.",               button: "Search",   path: "/laboratory-forms" },
];

const TRUST = [
  { icon: ShieldCheckIcon, text: "CLIA Certified" },
  { icon: AwardIcon,       text: "NJ State Licensed" },
  { icon: ClockIcon,       text: "Fast Turnaround" },
];

/* ─── diagonal DNA helix — light elegant style ───────── */

const DNAHelixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const setSize = () => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const NUM_RUNGS   = 46;
    const BB_PTS      = 120;
    const TURNS       = 4.8;
    const FOV         = 300;
    const SPEED       = 0.004;
    const DIAG_ANGLE  = Math.PI / 3.6;   // ≈ 50° diagonal

    let rot = 0, raf: number;

    type DrawOp = { z: number; fn: () => void };
    const proj = (x: number, z: number) => {
      const s = FOV / (FOV + z);
      return { sx: x * s, scale: s };
    };

    const frame = () => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { raf = requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      rot += SPEED;

      const diag = Math.sqrt(W * W + H * H);
      const R  = Math.min(W, H) * 0.21;
      const HH = diag * 1.15;

      ctx.save();
      ctx.translate(W * 0.62, H * 0.5);
      ctx.rotate(DIAG_ANGLE);

      const ops: DrawOp[] = [];
      type BPt = { sx: number; sy: number; z: number; scale: number };
      const bbA: BPt[] = [], bbB: BPt[] = [];

      for (let k = 0; k <= BB_PTS; k++) {
        const t     = k / BB_PTS;
        const y     = -HH / 2 + t * HH;
        const angle = rot + t * TURNS * Math.PI * 2;
        const zA    = R * Math.cos(angle);
        const { sx: sxA, scale: scA } = proj(R * Math.sin(angle), zA);
        bbA.push({ sx: sxA, sy: y, z: zA, scale: scA });
        const zB    = R * Math.cos(angle + Math.PI);
        const { sx: sxB, scale: scB } = proj(R * Math.sin(angle + Math.PI), zB);
        bbB.push({ sx: sxB, sy: y, z: zB, scale: scB });
      }

      /* backbone strands — white/light blue */
      for (let k = 0; k < BB_PTS; k++) {
        const a = bbA[k], b = bbA[k + 1];
        const avgZA  = (a.z + b.z) / 2;
        const avgSA  = (a.scale + b.scale) / 2;
        const alpA   = 0.18 + 0.38 * ((avgZA + R) / (2 * R));
        ops.push({ z: avgZA, fn: () => {
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(190,215,235,${alpA.toFixed(2)})`;
          ctx.lineWidth   = Math.max(0.8, 3.0 * avgSA);
          ctx.lineCap = "round"; ctx.stroke();
        }});
        const c = bbB[k], d = bbB[k + 1];
        const avgZB  = (c.z + d.z) / 2;
        const avgSB  = (c.scale + d.scale) / 2;
        const alpB   = 0.18 + 0.38 * ((avgZB + R) / (2 * R));
        ops.push({ z: avgZB, fn: () => {
          ctx.beginPath(); ctx.moveTo(c.sx, c.sy); ctx.lineTo(d.sx, d.sy);
          ctx.strokeStyle = `rgba(215,195,210,${alpB.toFixed(2)})`;
          ctx.lineWidth   = Math.max(0.8, 3.0 * avgSB);
          ctx.lineCap = "round"; ctx.stroke();
        }});
      }

      /* rungs + nodes — white spheres with subtle color */
      for (let i = 0; i < NUM_RUNGS; i++) {
        const t     = (i + 0.5) / NUM_RUNGS;
        const y     = -HH / 2 + t * HH;
        const angle = rot + t * TURNS * Math.PI * 2;
        const zA    = R * Math.cos(angle);
        const { sx: sxA, scale: scA } = proj(R * Math.sin(angle), zA);
        const zB    = R * Math.cos(angle + Math.PI);
        const { sx: sxB, scale: scB } = proj(R * Math.sin(angle + Math.PI), zB);
        const avgZ  = (zA + zB) / 2;
        const avgS  = (scA + scB) / 2;
        const aA    = 0.22 + 0.42 * ((zA + R) / (2 * R));
        const aB    = 0.22 + 0.42 * ((zB + R) / (2 * R));

        /* rung bar */
        ops.push({ z: avgZ, fn: () => {
          const rg = ctx.createLinearGradient(sxA, y, sxB, y);
          rg.addColorStop(0,   `rgba(190,215,235,${aA.toFixed(2)})`);
          rg.addColorStop(0.5, `rgba(220,210,220,${((aA + aB) / 2 * 0.8).toFixed(2)})`);
          rg.addColorStop(1,   `rgba(215,195,210,${aB.toFixed(2)})`);
          ctx.beginPath(); ctx.moveTo(sxA, y); ctx.lineTo(sxB, y);
          ctx.strokeStyle = rg;
          ctx.lineWidth   = Math.max(0.6, 2.2 * avgS);
          ctx.lineCap = "round"; ctx.stroke();
        }});

        /* node A — white/light blue sphere */
        ops.push({ z: zA, fn: () => {
          const nr   = Math.max(3.5, 7.5 * scA);
          const halo = ctx.createRadialGradient(sxA, y, 0, sxA, y, nr * 2.6);
          halo.addColorStop(0, `rgba(180,215,240,${(0.22 * scA).toFixed(2)})`);
          halo.addColorStop(1, "rgba(180,215,240,0)");
          ctx.beginPath(); ctx.arc(sxA, y, nr * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = halo; ctx.fill();
          const sp = ctx.createRadialGradient(sxA - nr * 0.32, y - nr * 0.38, nr * 0.05, sxA, y, nr);
          sp.addColorStop(0,   `rgba(255,255,255,${(0.95 * scA).toFixed(2)})`);
          sp.addColorStop(0.45,`rgba(210,232,248,${(0.88 * scA).toFixed(2)})`);
          sp.addColorStop(1,   `rgba(155,195,225,${(0.80 * scA).toFixed(2)})`);
          ctx.beginPath(); ctx.arc(sxA, y, nr, 0, Math.PI * 2);
          ctx.fillStyle = sp; ctx.fill();
        }});

        /* node B — white/light pink sphere */
        ops.push({ z: zB, fn: () => {
          const nr   = Math.max(3.5, 7.5 * scB);
          const halo = ctx.createRadialGradient(sxB, y, 0, sxB, y, nr * 2.6);
          halo.addColorStop(0, `rgba(220,200,215,${(0.22 * scB).toFixed(2)})`);
          halo.addColorStop(1, "rgba(220,200,215,0)");
          ctx.beginPath(); ctx.arc(sxB, y, nr * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = halo; ctx.fill();
          const sp = ctx.createRadialGradient(sxB - nr * 0.32, y - nr * 0.38, nr * 0.05, sxB, y, nr);
          sp.addColorStop(0,   `rgba(255,255,255,${(0.95 * scB).toFixed(2)})`);
          sp.addColorStop(0.45,`rgba(245,225,235,${(0.88 * scB).toFixed(2)})`);
          sp.addColorStop(1,   `rgba(210,175,195,${(0.80 * scB).toFixed(2)})`);
          ctx.beginPath(); ctx.arc(sxB, y, nr, 0, Math.PI * 2);
          ctx.fillStyle = sp; ctx.fill();
        }});
      }

      ops.sort((a, b) => a.z - b.z);
      for (const op of ops) op.fn();
      ctx.restore();
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />;
};

/* ─── animated ECG heartbeat line ───────────────────── */

const ECGLine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const setSize = () => { if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; } };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const ecgY = (phase: number): number => {
      const p = ((phase % 1) + 1) % 1;
      if (p < 0.10) return 0;
      if (p < 0.22) { const t = (p - 0.10) / 0.12; return 0.16 * Math.sin(t * Math.PI); }
      if (p < 0.32) return 0;
      if (p < 0.36) { const t = (p - 0.32) / 0.04; return -0.24 * Math.sin(t * Math.PI); }
      if (p < 0.42) { const t = (p - 0.36) / 0.06; return Math.sin(t * Math.PI); }
      if (p < 0.46) { const t = (p - 0.42) / 0.04; return -0.26 * Math.sin(t * Math.PI); }
      if (p < 0.58) return 0;
      if (p < 0.78) { const t = (p - 0.58) / 0.20; return 0.30 * Math.sin(t * Math.PI); }
      return 0;
    };

    let dotX = 0, raf: number;
    const frame = () => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { raf = requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      const period = W / 2.8, amp = H * 0.38, baseline = H * 0.52;
      dotX = (dotX + 2.2) % (W + 80);

      ctx.beginPath();
      for (let x = 0; x <= W; x++) { const y = baseline - ecgY(x / period) * amp; x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.strokeStyle = "rgba(21,69,101,0.11)"; ctx.lineWidth = 1.0; ctx.stroke();

      const trailLen = 115, tx0 = Math.max(0, dotX - trailLen);
      if (dotX > 0 && tx0 < W) {
        const grad = ctx.createLinearGradient(tx0, 0, Math.min(dotX, W), 0);
        grad.addColorStop(0, "rgba(21,69,101,0)");
        grad.addColorStop(0.6, "rgba(21,69,101,0.30)");
        grad.addColorStop(1, "rgba(21,69,101,0.78)");
        ctx.save();
        ctx.beginPath(); ctx.rect(tx0, 0, Math.min(dotX, W) - tx0, H); ctx.clip();
        ctx.beginPath();
        for (let x = Math.floor(tx0); x <= Math.min(Math.ceil(dotX), W); x++) {
          const y = baseline - ecgY(x / period) * amp;
          x === Math.floor(tx0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = grad; ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.stroke();
        ctx.restore();
      }

      if (dotX >= 0 && dotX <= W) {
        const dy = baseline - ecgY(dotX / period) * amp;
        const phase = (dotX / period) % 1;
        const isR = phase > 0.36 && phase < 0.42;
        const glowR = isR ? 15 : 9, dotR = isR ? 4 : 2.8;
        const dotColor = isR ? "rgba(121,49,70," : "rgba(21,69,101,";
        const glow = ctx.createRadialGradient(dotX, dy, 0, dotX, dy, glowR);
        glow.addColorStop(0, `${dotColor}0.52)`); glow.addColorStop(1, `${dotColor}0)`);
        ctx.beginPath(); ctx.arc(dotX, dy, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(dotX, dy, dotR, 0, Math.PI * 2); ctx.fillStyle = `${dotColor}0.95)`; ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" />;
};

/* ─── hero ───────────────────────────────────────────── */

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative pt-8 pb-10">

      {/* Background */}
      <div className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0" style={{ background: "#f4f8fb" }} />

      {/* Diagonal DNA helix */}
      <DNAHelixBackground />

      <div className="relative z-10">

        {/* ══ Hero row ══ */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[320px] lg:min-h-[380px]">

          {/* Left: text */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                CLIA Certified · NJ State Licensed
              </span>
            </div>
            <h1 className="text-[2.35rem] sm:text-[2.9rem] lg:text-[3.1rem] font-inter font-bold leading-[1.12] text-[#0d2b45]">
              Next-Level{" "}
              <span className="text-[#154565]">Lab Care</span>
            </h1>
            <p className="mt-2 text-xl sm:text-2xl font-inter font-light text-[#2a6070]">
              For Today&apos;s Health
            </p>
            <p className="mt-5 text-[15px] text-[#4a6070] leading-relaxed max-w-[430px] mx-auto lg:mx-0">
              State of the art technology that meets certified expertise for
              unwavering diagnostic reliability at Paramount.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 justify-center lg:justify-start">
              {TRUST.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#154565]" />
                  <span className="text-xs font-medium text-[#4a6070]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: doctor — full height with gradient circle behind */}
          <div className="flex-shrink-0 mx-auto lg:mx-0 relative hidden sm:block" style={{ width: 360, height: 460 }}>
            {/* Gradient circle — large, covers head down to mid-body */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full z-0"
              style={{
                width: 360,
                height: 360,
                background: "linear-gradient(160deg, rgb(129,52,74) 0%, rgb(21,69,101) 100%)",
              }}
            />
            {/* Doctor image — full height, sits in front of circle */}
            <Image
              src={Scientist}
              alt="Paramount Diagnostic Lab specialist"
              fill
              sizes="360px"
              priority
              className="relative z-10 object-contain object-top drop-shadow-2xl"
            />
          </div>

        </div>

        {/* ══ ECG heartbeat strip ══ */}
        <div className="relative h-[52px] mt-3 mb-1 overflow-hidden rounded-lg">
          <ECGLine />
        </div>

        {/* ══ Quick Access Cards ══ */}
        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              onClick={() => router.push(service.path)}
              className="group relative rounded-xl flex flex-col justify-between p-5 bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-[#154565]/20 hover:shadow-md cursor-pointer transition-all duration-200 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#154565] to-[#793146] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div>
                <h2 className="font-semibold font-poppins text-[14.5px] text-[#154565] mb-1.5">{service.title}</h2>
                <p className="font-light font-poppins text-[12.5px] text-[#64748b] mb-4 leading-snug">{service.description}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); router.push(service.path); }}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold font-sora text-[#154565] group-hover:text-[#793146] transition-colors duration-200"
              >
                <ArrowUpRightIcon className="w-3 h-3" />
                {service.button}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
