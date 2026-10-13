import { config } from '../config.js';

export const experiments = [
    {
        id: "eithne",
        title: "x86_64 OS Kernel",
        image: "assets/kernel.png",
        link: `https://github.com/${config.github}/Eithne`,
        desc: "A small x86_64 OS kernel in Rust, booted via UEFI. <span class='highlight'>O(1) buddy frame allocator</span> with XOR bitmap coalescing, slab heap, 4-level paging, 256-entry IDT with hand-written assembly stubs, and a preemptive round-robin scheduler with an assembly context switch. No filesystem and no userspace; just the kernel foundation.",
        tags: ["Rust", "Kernel", "x86_64", "UEFI"],
        terminal: {
            name: "eithne",
            date: "Feb 20",
            size: "13K",
            content: `
<span class="primary bold">PROJECT: x86_64 OS Kernel (Eithne)</span>
=======================================
Boots via UEFI. Implements the kernel foundation. No filesystem,
no userspace.

<span class="highlight bold">>> MEMORY</span>
<span class="dim">-</span> <span class="bold">Buddy alloc:</span>  O(1) · orders 0-10 (4 KiB → 2 MiB) · XOR bitmap coalesce
<span class="dim">-</span> <span class="bold">Slab heap:</span>    9 size classes · intrusive free lists
<span class="dim">-</span> <span class="bold">Paging:</span>       4-level (PML4→PDPT→PD→PT) · map/unmap/translate · INVLPG

<span class="highlight bold">>> INTERRUPTS</span>
<span class="primary">*</span> 256-entry IDT · assembly stubs for all CPU exceptions
<span class="primary">*</span> 8259 PIC remapped to vectors 32-47 · IST stacks in TSS

<span class="highlight bold">>> SCHEDULER</span>
Round-robin · cooperative + preemptive · 10-tick timeslice
Assembly context switch (callee-saved GPRs + RSP) · IRETQ resume

<span class="ls-exec">./run.sh   # OVMF + QEMU</span>

[eithne] initialization complete. Entering scheduler loop.
[timer] 100 ticks  [heartbeat] still alive (500)
`
        }
    },
    {
        id: "miniproof",
        title: "Dependently-Typed Proof Checker",
        image: null,
        link: `https://github.com/${config.github}/miniproof`,
        desc: "A small dependently-typed proof checker for a custom language, written in Haskell. <span class='highlight'>Bidirectional</span> type checking over Pi types, inductive data, and propositional equality via J. <span class='highlight'>Normalization by evaluation</span> with de Bruijn indices and closures. Universe-level polymorphism with cumulativity, dependent pattern matching, and a REPL.",
        tags: ["Haskell", "Type Theory"],
        terminal: {
            name: "miniproof",
            date: "Mar 08",
            size: "~3K",
            content: `
<span class="primary bold">PROJECT: Dependently-Typed Proof Checker</span>
=======================================
Bidirectional type checker for a small dependently-typed language.

<span class="highlight bold">>> TYPE THEORY</span>
<span class="dim">-</span> <span class="bold">Types:</span>      Pi types · inductive data · propositional equality (Id/J)
<span class="dim">-</span> <span class="bold">Universes:</span>  Type hierarchy with cumulativity · level polymorphism
<span class="dim">-</span> <span class="bold">Recursion:</span>  fix combinator · dependent pattern match with motive
<span class="dim">-</span> <span class="bold">Refinement:</span> Impossible branches excluded via index mismatch

<span class="highlight bold">>> IMPLEMENTATION</span>
<span class="primary">*</span> NbE evaluator: de Bruijn indices (terms) + levels (values)
<span class="primary">*</span> Closures for lazy evaluation, no explicit substitution
<span class="primary">*</span> Bidirectional check/infer with subtype coercion
<span class="primary">*</span> Megaparsec parser · pretty-printed error messages

<span class="highlight bold">>> EXAMPLE</span>
id : forall (l : Level) -> forall (A : Type l) -> A -> A
   = \\(l : Level) -> \\(A : Type l) -> \\(a : A) -> a

<span class="ls-exec">cabal run miniproof -- proof.pf</span>
`
        }
    },
    {
        id: "fluid",
        title: "GPU Fluid Simulation",
        image: "assets/fluid.png",
        link: `https://github.com/${config.github}/fluidsim`,
        desc: "A 2D real-time fluid simulator running on the GPU. Staggered MAC grid Navier-Stokes with <span class='highlight'>Jacobi pressure projection</span>, semi-Lagrangian advection, and vorticity confinement, written as <span class='highlight'>OpenGL 4.3 compute shaders</span>. Paint forces, draw obstacles, wind-tunnel mode.",
        tags: ["C", "GLSL", "Raylib", "GPU"],
        terminal: {
            name: "fluid-sim",
            date: "Jan 20",
            size: "~5K",
            content: `
<span class="primary bold">PROJECT: GPU Fluid Simulation</span>
=======================================
Real-time 2D Navier-Stokes on compute shaders.

<span class="highlight bold">>> SOLVER</span>
<span class="dim">-</span> <span class="bold">Grid:</span>       2560x1280 staggered MAC grid
<span class="dim">-</span> <span class="bold">Pressure:</span>   Jacobi iteration (divergence-free projection)
<span class="dim">-</span> <span class="bold">Advection:</span>  Semi-Lagrangian
<span class="dim">-</span> <span class="bold">Vorticity:</span>  Confinement to preserve swirling motion

<span class="highlight bold">>> GPU PIPELINE</span>
<span class="primary">*</span> All solvers are OpenGL 4.3 compute shaders
<span class="primary">*</span> Tracer particle system for flow visualization
<span class="primary">*</span> Auto-exposure with smoothed statistics

<span class="highlight bold">>> INTERACTION</span>
Paint forces · draw obstacles · wind-tunnel mode
Multiple viz modes: RGB / pressure tint / velocity tint

<span class="ls-exec">./build/fluid</span>
`
        }
    },
    {
        id: "slimemold",
        title: "Slime Mold Simulation",
        image: "assets/slime.png",
        link: `https://github.com/${config.github}/slimesim`,
        desc: "A <span class='highlight'>Physarum polycephalum</span> simulation in Zig with 200,000 agents. Agents deposit and sense chemical trails (stigmergy); diffusion is a 3×3 box blur each frame and there's a ~1.2% decay. Live parameter tuning and a few colour palettes. SDL2.",
        tags: ["Zig", "SDL2", "Simulation"],
        terminal: {
            name: "slimemold",
            date: "Dec 15",
            size: "~2K",
            content: `
<span class="primary bold">PROJECT: Slime Mold Simulation</span>
=======================================
200,000 agents · emergent branching · 60 FPS.

<span class="highlight bold">>> AGENT MODEL</span>
<span class="dim">-</span> <span class="bold">Agents:</span>     200k particles with (x, y, angle)
<span class="dim">-</span> <span class="bold">Sense:</span>      Three forward-facing sensors sample the trail map
<span class="dim">-</span> <span class="bold">Steer:</span>      Turn toward strongest signal → branching networks
<span class="dim">-</span> <span class="bold">Deposit:</span>    Chemical trail left at each step

<span class="highlight bold">>> TRAIL PHYSICS</span>
<span class="primary">*</span> Diffusion: 3×3 box blur each frame
<span class="primary">*</span> Decay: ~1.2% per frame
<span class="primary">*</span> All parameters tunable live via keyboard

<span class="highlight bold">>> VISUALS</span>
6 colour schemes: Amber · Plasma · Acid Green
                  Deep Ocean · Lava · Greyscale

<span class="ls-exec">zig build run</span>
`
        }
    },
    {
        id: "haskell-raytracer",
        title: "Path Tracer (Haskell)",
        image: "assets/haskell_ray_tracer.png",
        link: `https://github.com/${config.github}/haskell-ray-tracer`,
        desc: "A Monte Carlo path tracer in Haskell, following <span class='highlight'>Ray Tracing in One Weekend</span>. Lambertian, metal, and dielectric materials, recursive ray bouncing, BVH acceleration, and defocus blur. Parallel rendering via parListChunk with strict per-row accumulation to avoid thunk buildup.",
        tags: ["Haskell", "Graphics", "Parallel"],
        terminal: {
            name: "hs-pathtracer",
            date: "Nov 20",
            size: "~3K",
            content: `
<span class="primary bold">PROJECT: Path Tracer (Haskell)</span>
=======================================
RTIOW-style Monte Carlo path tracer. Functional pipeline.

<span class="highlight bold">>> FEATURES</span>
<span class="dim">-</span> <span class="bold">Materials:</span>  Lambertian · metal (fuzz) · dielectric (refraction)
<span class="dim">-</span> <span class="bold">Accel:</span>     BVH (Bounding Volume Hierarchy) · AABB traversal
<span class="dim">-</span> <span class="bold">Camera:</span>    Configurable FOV · defocus blur (depth of field)
<span class="dim">-</span> <span class="bold">AA:</span>        Monte Carlo multi-sample per pixel

<span class="highlight bold">>> PARALLELISM</span>
<span class="primary">*</span> parListChunk strategy · strict accumulation
<span class="primary">*</span> Lazy evaluation managed to avoid thunk buildup

<span class="ls-exec">cabal run haskell-ray-tracer</span>
`
        }
    },
    {
        id: "rs-raytracer",
        title: "Ray Tracer (Rust)",
        image: null,
        link: `https://github.com/${config.github}/rs-ray-tracer`,
        desc: "A small JSON-driven ray tracer in Rust with sphere and <span class='highlight'>triangle-mesh</span> support. <span class='highlight'>Diffuse shading</span> with point lights, nothing fancier. Rayon-parallel per-pixel rendering, OBJ import, and a Blender export script for scene authoring.",
        tags: ["Rust", "Graphics", "Blender"],
        terminal: {
            name: "rs-raytracer",
            date: "Nov 15",
            size: "~2K",
            content: `
<span class="primary bold">PROJECT: Ray Tracer (Rust)</span>
=======================================
A small JSON-driven ray tracer with Blender integration.

<span class="highlight bold">>> FEATURES</span>
<span class="dim">-</span> <span class="bold">Geometry:</span>  Spheres · triangle meshes (OBJ import)
<span class="dim">-</span> <span class="bold">Shading:</span>   Diffuse + point lights · anti-aliasing
<span class="dim">-</span> <span class="bold">Scenes:</span>    JSON scene format · Blender export script
<span class="dim">-</span> <span class="bold">Parallel:</span>  Rayon per-pixel · progress bar + ETA

<span class="highlight bold">>> PIPELINE</span>
<span class="primary">*</span> Blender → export script → JSON scene → renderer → PNG
<span class="primary">*</span> OBJ converter for external 3D models
<span class="primary">*</span> Multi-crate workspace (tracer, converter, definitions)

<span class="ls-exec">cargo run --release -- scenes/cornell.json</span>
`
        }
    },
];
