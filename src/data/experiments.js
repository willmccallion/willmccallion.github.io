import { config } from '../config.js';

export const experiments = [
    {
        id: "miniproof",
        title: "Dependently-Typed Proof Checker",
        image: null,
        link: `https://github.com/${config.github}/miniproof`,
        desc: "A dependently-typed proof checker in Haskell implementing <span class='highlight'>bidirectional type checking</span> over a calculus with Pi types, inductive data, recursive functions, and propositional equality via J. Evaluation uses <span class='highlight'>normalization by evaluation</span> (NbE) with de Bruijn indices. Features universe level polymorphism — functions generic over <span class='highlight'>Level</span> work at any universe — plus cumulativity, dependent pattern matching with index refinement, and a REPL.",
        tags: ["Haskell", "Type Theory", "Compilers"],
        terminal: {
            name: "miniproof",
            date: "Mar 08",
            size: "~3K",
            content: `
<span class="primary bold">PROJECT: Dependently-Typed Proof Checker</span>
=======================================
Bidirectional type checker for a dependently-typed language.

<span class="highlight bold">>> TYPE THEORY</span>
<span class="dim">-</span> <span class="bold">Types:</span>      Pi types · inductive data · propositional equality (Id/J)
<span class="dim">-</span> <span class="bold">Universes:</span>  Type hierarchy with cumulativity · Level polymorphism
<span class="dim">-</span> <span class="bold">Recursion:</span>  fix combinator · dependent pattern match with motive
<span class="dim">-</span> <span class="bold">Refinement:</span> Impossible branches auto-excluded via index mismatch

<span class="highlight bold">>> IMPLEMENTATION</span>
<span class="primary">*</span> NbE evaluator: de Bruijn indices (terms) + levels (values)
<span class="primary">*</span> Closures for lazy evaluation — no explicit substitution
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
        desc: "Real-time 2D incompressible fluid solver on the GPU. Staggered-grid <span class='highlight'>Navier-Stokes</span> with Jacobi pressure projection, semi-Lagrangian advection, and vorticity confinement — all running as <span class='highlight'>OpenGL 4.3 compute shaders</span> at 2560x1280. Interactive force painting, obstacle placement, and a wind-tunnel mode for aerodynamic analysis.",
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
<span class="dim">-</span> <span class="bold">Advection:</span>  Semi-Lagrangian / PIC
<span class="dim">-</span> <span class="bold">Vorticity:</span>  Confinement to preserve swirling motion

<span class="highlight bold">>> GPU PIPELINE</span>
<span class="primary">*</span> All solvers are OpenGL 4.3 compute shaders
<span class="primary">*</span> Tracer particle system for flow visualization
<span class="primary">*</span> Auto-exposure with smoothed statistics

<span class="highlight bold">>> INTERACTION</span>
Paint forces · draw obstacles · wind tunnel mode
Multiple viz: RGB / pressure tint / velocity tint

<span class="ls-exec">./build/fluid</span>
`
        }
    },
    {
        id: "compiler",
        title: "C-to-RISC-V Compiler",
        image: null,
        link: `https://github.com/${config.github}/compiler`,
        desc: "Recursive-descent compiler translating a C subset to <span class='highlight'>RV64 assembly</span>. Full pipeline: lexer, parser, type checker, IR lowering, optimizer (<span class='highlight'>constant folding, DCE, peephole</span>), and stack-machine code gen with ABI-compliant calling conventions. Runs on QEMU and RARS.",
        tags: ["Rust", "Compilers", "RISC-V"],
        terminal: {
            name: "c-compiler",
            date: "Feb 01",
            size: "~8K",
            content: `
<span class="primary bold">PROJECT: C-to-RISC-V Compiler</span>
=======================================
Recursive-descent compiler. C subset → RV64 assembly.

<span class="highlight bold">>> PIPELINE</span>
<span class="dim">-</span> <span class="bold">Lexer:</span>      60+ token types
<span class="dim">-</span> <span class="bold">Parser:</span>     Recursive descent · functions, structs, enums, pointers
<span class="dim">-</span> <span class="bold">Type check:</span> Consistency validation · typedef resolution
<span class="dim">-</span> <span class="bold">IR:</span>         Flattened instruction list · temporaries + stack slots
<span class="dim">-</span> <span class="bold">Optimizer:</span>  Constant folding · dead code elimination · peephole
<span class="dim">-</span> <span class="bold">Codegen:</span>    Stack-machine model · lp64 ABI · 16-byte aligned frames

<span class="highlight bold">>> LANGUAGE FEATURES</span>
<span class="primary">*</span> Types: i64, pointers, arrays, structs, enums, typedefs
<span class="primary">*</span> Control: if/else, while, do-while, for, switch
<span class="primary">*</span> Functions: recursion, up to 8 args (a0-a7)

<span class="ls-exec">cargo run -- input.c -o output.s</span>
<span class="ls-exec">qemu-riscv64 output</span>
`
        }
    },
    {
        id: "neural",
        title: "CNN from Scratch in C",
        image: "assets/cnn_prediction.png",
        link: `https://github.com/${config.github}/c-neural-network`,
        desc: "Convolutional Neural Network built from scratch in C99 — no ML frameworks, no BLAS. Hand-coded backpropagation through conv, pooling, and dense layers, <span class='highlight'>Adam optimizer</span>, OpenMP matrix parallelism, and real-time Raylib visualization with activation heatmaps. Trained on a merged 70-class dataset (EMNIST + Google QuickDraw).",
        tags: ["C", "ML", "Raylib"],
        terminal: {
            name: "cnn-visualizer",
            date: "Jan 10",
            size: "~4K",
            content: `
<span class="primary bold">PROJECT: CNN from Scratch in C</span>
=======================================
No ML frameworks. Manual backprop through every layer.

<span class="highlight bold">>> ARCHITECTURE</span>
Conv(16)→Pool → Conv(32)→Pool → Conv(64)→Pool → Dense(256) → 70-class

<span class="highlight bold">>> IMPLEMENTATION</span>
<span class="dim">-</span> <span class="bold">Forward:</span>    3×3 sliding-window conv · Leaky ReLU · 2×2 max-pool
<span class="dim">-</span> <span class="bold">Backward:</span>   Chain rule · error maps × rotated weights (full conv)
<span class="dim">-</span> <span class="bold">Optimizer:</span>  Adam (per-weight m/v estimates) · He initialization
<span class="dim">-</span> <span class="bold">Parallel:</span>   OpenMP (matmul) · Pthreads (train/render separation)

<span class="highlight bold">>> VISUALIZATION (Raylib)</span>
<span class="primary">*</span> Live feature map heatmaps · weight histograms
<span class="primary">*</span> Real-time loss/accuracy curves · top-5 prediction overlay
<span class="primary">*</span> Interactive 28×28 draw canvas

<span class="ls-exec">./draw_predictor</span>
`
        }
    },
    {
        id: "slimemold",
        title: "Slime Mold Simulation",
        image: "assets/slime.png",
        link: `https://github.com/${config.github}/slimesim`,
        desc: "Real-time <span class='highlight'>Physarum polycephalum</span> simulation with 200,000 autonomous agents exhibiting emergent network-formation behavior. Agents deposit and sense chemical trails (<span class='highlight'>stigmergy</span>), producing organic branching patterns. Diffusion via box blur, tunable parameters, and 6 color schemes.",
        tags: ["Zig", "SDL2", "Simulation"],
        terminal: {
            name: "slimemold",
            date: "Dec 15",
            size: "~2K",
            content: `
<span class="primary bold">PROJECT: Slime Mold Simulation</span>
=======================================
200,000 agents · emergent network formation · 60 FPS.

<span class="highlight bold">>> AGENT MODEL</span>
<span class="dim">-</span> <span class="bold">Agents:</span>     200k particles with (x, y, angle)
<span class="dim">-</span> <span class="bold">Sense:</span>      Three forward-facing sensors sample trail map
<span class="dim">-</span> <span class="bold">Steer:</span>      Turn toward strongest signal → branching networks
<span class="dim">-</span> <span class="bold">Deposit:</span>    Chemical trail left at each step

<span class="highlight bold">>> TRAIL PHYSICS</span>
<span class="primary">*</span> Diffusion: 3×3 box blur each frame
<span class="primary">*</span> Decay: ~1.2% per frame
<span class="primary">*</span> All parameters tunable live via keyboard

<span class="highlight bold">>> VISUALS</span>
6 color schemes: Amber · Plasma · Acid Green
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
        desc: "Monte Carlo path tracer in Haskell based on <span class='highlight'>Ray Tracing in One Weekend</span>. Lambertian, metal, and dielectric materials with recursive ray bouncing. <span class='highlight'>BVH acceleration</span>, defocus blur, configurable anti-aliasing, and parallel rendering via Haskell's strategic chunking.",
        tags: ["Haskell", "Graphics", "Parallel"],
        terminal: {
            name: "hs-pathtracer",
            date: "Nov 20",
            size: "~3K",
            content: `
<span class="primary bold">PROJECT: Path Tracer (Haskell)</span>
=======================================
Monte Carlo path tracer. Functional rendering pipeline.

<span class="highlight bold">>> FEATURES</span>
<span class="dim">-</span> <span class="bold">Materials:</span>  Lambertian · Metal (fuzz) · Dielectric (refraction)
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
        desc: "JSON-configurable ray tracer in Rust with sphere and <span class='highlight'>triangle mesh</span> support. Includes an OBJ-to-JSON converter and a <span class='highlight'>Blender export script</span> for scene authoring. Parallel per-pixel rendering via Rayon with progress tracking.",
        tags: ["Rust", "Graphics", "Blender"],
        terminal: {
            name: "rs-raytracer",
            date: "Nov 15",
            size: "~2K",
            content: `
<span class="primary bold">PROJECT: Ray Tracer (Rust)</span>
=======================================
Scene-driven ray tracer with Blender integration.

<span class="highlight bold">>> FEATURES</span>
<span class="dim">-</span> <span class="bold">Geometry:</span>  Spheres · triangle meshes (OBJ import)
<span class="dim">-</span> <span class="bold">Shading:</span>   Diffuse · point lights · anti-aliasing
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
