import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "RISC-V System Emulator",
        link: `https://github.com/${config.github}/rvsim`,
        desc: "Cycle-accurate <span class='highlight'>RV64IMAFDC</span> simulator modeling a full out-of-order superscalar core — physical register file, CAM-style issue queue with wakeup/select, ROB, non-blocking caches with MSHRs, DRAM row-buffer timing, and five branch predictors including TAGE. Exposes everything through a Python API for design-space exploration. Passes all 134 riscv-tests.",
        tags: ["Rust", "Architecture", "Simulation"],
        terminal: {
            name: "rvsim",
            date: "Feb 12",
            size: "224K",
            content: `
<span class="primary bold">PROJECT: RISC-V System Emulator</span>
=======================================
Cycle-accurate RV64IMAFDC simulator. Full out-of-order superscalar
pipeline with a composable Python API for architecture research.

<span class="highlight bold">>> OUT-OF-ORDER PIPELINE</span>
<span class="dim">-</span> <span class="bold">Frontend:</span>   Fetch1 → Fetch2 → Decode → Rename (PRF · free list)
<span class="dim">-</span> <span class="bold">Issue:</span>      CAM-style IQ · wakeup/select · speculative load wakeup
<span class="dim">-</span> <span class="bold">FUs:</span>        IntALU ×4 · IntMul · FPU · Branch · Load/Store
<span class="dim">-</span> <span class="bold">Commit:</span>     ROB · in-order · precise exceptions · mispred recovery

<span class="highlight bold">>> MEMORY SYSTEM</span>
<span class="primary">*</span> <span class="bold">Virtual mem:</span> SV39 · iTLB · dTLB · shared L2 TLB · HW page walker
<span class="primary">*</span> <span class="bold">Caches:</span>     L1i/L1d/L2/L3 · MSHRs · configurable prefetchers
<span class="primary">*</span> <span class="bold">DRAM:</span>       Row-buffer aware timing (tCAS · tRAS · row miss penalty)

<span class="highlight bold">>> BRANCH PREDICTION</span>
Static · GShare · Tournament · Perceptron · TAGE (with loop predictor)

<span class="highlight bold">>> PYTHON API</span>
<span class="ls-exec">pip install rvsim</span>
<span class="ls-exec">python scripts/analysis/width_scaling.py --bp TAGE --widths 1 2 4 8</span>
`
        }
    },
    {
        id: "hexz",
        title: "Deduplicated ML Checkpoint Storage",
        link: `https://github.com/hexz-org/hexz`,
        desc: "Content-addressable archive format for ML model weights. Chunks at <span class='highlight'>tensor boundaries</span> for stable deduplication, stores fine-tunes as <span class='highlight'>XOR deltas</span> against a base model, and streams random tensor access directly from S3 via HTTP byte-range requests. Zero-copy PyO3 Python bindings.",
        tags: ["Rust", "PyTorch", "Compression", "HPC"],
        terminal: {
            name: "hexz",
            date: "Feb 01",
            size: "213K",
            content: `
<span class="primary bold">PROJECT: Deduplicated ML Checkpoint Storage</span>
=======================================
Content-addressable .hxz archives for ML model weights.
Tensor-boundary chunking + XOR deltas for fine-tune storage.

<span class="highlight bold">>> STORAGE ENGINE</span>
<span class="dim">-</span> <span class="bold">Chunking:</span>   Tensor-boundary (safetensors header gives exact offsets)
<span class="dim">-</span> <span class="bold">Dedup:</span>      BLAKE3 block dedup across parent snapshot chains
<span class="dim">-</span> <span class="bold">Deltas:</span>     base XOR fine · byte-shuffle + zstd → low-magnitude diffs
<span class="dim">-</span> <span class="bold">Index:</span>      Two-level B-tree · O(log P + log B) random access

<span class="highlight bold">>> PYTHON API</span>
<span class="primary">*</span> <span class="bold">Load:</span>       ckpt.load("finetuned.hxz", keys=["lm_head.weight"])
<span class="primary">*</span> <span class="bold">Save:</span>       ckpt.save(state_dict, "ft.hxz", parent="base.hxz")
<span class="primary">*</span> <span class="bold">S3:</span>         hexz.open("s3://bucket/model.hxz") — byte-range only

<span class="highlight bold">>> VALIDATED</span>
CDC dedup: 92.4% on byte-shifted data vs 0% for fixed-size blocks.

<span class="ls-exec">pip install hexz</span>
<span class="ls-exec">hexz store finetuned.safetensors ft.hxz --base base.hxz</span>
`
        }
    },
    {
        id: "vlsi",
        title: "VLSI Physical Design Tool",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: "Digital IC placement and routing engine in Rust. Global placement models cell density as an electrostatic field and solves Poisson's equation via <span class='highlight'>FFT</span>, then minimizes wirelength with <span class='highlight'>Nesterov accelerated gradient descent</span>. Two-stage Pathfinder routing with 3D A* successfully routes the GCD benchmark end-to-end.",
        tags: ["Rust", "EDA", "Algorithms", "Optimization"],
        terminal: {
            name: "vlsi-flow",
            date: "Jan 05",
            size: "69K",
            content: `
<span class="primary bold">PROJECT: VLSI Physical Design Tool</span>
=======================================
Full placement and routing flow for digital ICs, built from scratch.

<span class="highlight bold">>> PLACEMENT</span>
<span class="dim">-</span> <span class="bold">Density:</span>    Solves Poisson equation via FFT (O(N log N))
                Models cells as electric charges — high density = repulsion
<span class="dim">-</span> <span class="bold">Wirelength:</span> Weighted Average smooth HPWL approximation
<span class="dim">-</span> <span class="bold">Solver:</span>     Nesterov accelerated gradient descent
<span class="dim">-</span> <span class="bold">Legalize:</span>   Abacus algorithm — row-grid alignment, min displacement

<span class="highlight bold">>> ROUTING</span>
<span class="primary">*</span> <span class="bold">Global:</span>     Coarse A* with Pathfinder rip-up & reroute (history costs)
<span class="primary">*</span> <span class="bold">Detailed:</span>  Fine-grid 3D A* · guide-constrained · spatial batch parallel
<span class="primary">*</span> <span class="bold">Formats:</span>   LEF/DEF · Bookshelf academic benchmarks

<span class="ls-exec">cargo run --release -p eda-cli -- generate --cells 2000 --nets 2000</span>
<span class="ls-exec">cargo run --release -p eda-cli -- flow</span>
`
        }
    },
    {
        id: "qec",
        title: "RISC-V Quantum Control Unit",
        link: `https://github.com/${config.github}/riscv-qcu`,
        desc: "Hardware-software co-design for real-time Quantum Error Correction on RISC-V. A zero-allocation Union-Find decoder achieves <span class='highlight'>~580 cycle deterministic latency</span> with under 50 cycle jitter. Includes a <span class='highlight'>SystemVerilog path-compression accelerator</span> verified cycle-accurately via Verilator co-simulation.",
        tags: ["Rust", "SystemVerilog", "RISC-V", "Embedded"],
        terminal: {
            name: "qcu-firmware",
            date: "Jan 15",
            size: "24K",
            content: `
<span class="primary bold">PROJECT: RISC-V Quantum Control Unit</span>
=======================================
Full-stack hardware-software co-design for Surface Code QEC.
Must decode within qubit coherence time (~1-100 µs).

<span class="highlight bold">>> FIRMWARE (RV64IMAC no_std)</span>
<span class="dim">-</span> <span class="bold">Decoder:</span>    Union-Find · path compression + halving · parity-aware
<span class="dim">-</span> <span class="bold">Memory:</span>     Bump allocator · zero dynamic allocation during decode
<span class="dim">-</span> <span class="bold">SMP:</span>        Lock-free SPMC ring buffer (512 slots) · Hart 0 → Hart 1-3

<span class="highlight bold">>> HARDWARE ACCELERATOR (SystemVerilog)</span>
<span class="primary">*</span> <span class="bold">Module:</span>     union_find.sv — path compression state machine
<span class="primary">*</span> <span class="bold">Verify:</span>     Verilator co-simulation · Rust FFI · cycle-accurate

<span class="highlight bold">>> PERFORMANCE (QEMU / RV64, 4 harts)</span>
<span class="dim">Latency:</span>    ~580 cycles (0.58 µs @ 1 GHz ASIC)
<span class="dim">Throughput:</span> ~55,000 shots/s
<span class="dim">Jitter:</span>     < 50 cycles

<span class="ls-exec">./scripts/run.py kernel --size 5</span>
`
        }
    },
    {
        id: "unikernel",
        title: "RISC-V Security Unikernel",
        link: `https://github.com/${config.github}/riscv-security-unikernel`,
        desc: "Bare-metal network security appliance in Rust for RISC-V. Packs a stateful firewall, <span class='highlight'>Count-Min Sketch</span> DDoS mitigation, Aho-Corasick DPI, and a custom <span class='highlight'>eBPF VM</span> for runtime-injected packet filters into a strict <span class='highlight'>64 KB RAM</span> budget — zero heap use on the hot path. Ships with a real-time egui control plane.",
        tags: ["Rust", "Kernel", "eBPF", "Security"],
        terminal: {
            name: "security-unikernel",
            date: "Dec 29",
            size: "94K",
            content: `
<span class="primary bold">PROJECT: RISC-V Security Unikernel</span>
=======================================
Full security stack — zero host OS — 64 KB RAM total.

<span class="highlight bold">>> 6-STAGE PACKET PIPELINE</span>
<span class="dim">①</span> Count-Min Sketch  — probabilistic DDoS heavy-hitter detection
<span class="dim">②</span> Penalty Box       — 16-entry IP ban table (FIFO eviction)
<span class="dim">③</span> Token Bucket      — global 10k pps rate cap
<span class="dim">④</span> Flow Tracker      — 5-tuple stateful table · 74 entries
<span class="dim">⑤</span> eBPF VM           — 16 regs · 64 instr · runtime-injected bytecode
<span class="dim">⑥</span> DPI Engine        — Aho-Corasick · SQL injection · XSS · NOP sleds

<span class="highlight bold">>> MEMORY ENGINEERING</span>
<span class="primary">*</span> Zero heap use on hot path — all structures statically allocated
<span class="primary">*</span> VirtIO DMA buffers tuned to exact Ethernet MTU (1536 B)

<span class="highlight bold">>> CONTROL PLANE (egui GUI)</span>
Dashboard · SDN rule injection · eBPF Studio · Traffic generator

<span class="ls-exec">make run   # QEMU + TAP interface</span>
<span class="ls-exec">make gui   # egui control plane</span>
`
        }
    },
    {
        id: "eithne",
        title: "x86_64 OS Kernel",
        link: `https://github.com/${config.github}/Eithne`,
        desc: "x86_64 OS kernel written in Rust, booting via UEFI. Implements an <span class='highlight'>O(1) buddy frame allocator</span> with XOR bitmap coalescing, a per-size-class slab heap, 4-level page tables, a 256-entry IDT with hand-written assembly stubs for every exception, and a <span class='highlight'>preemptive round-robin scheduler</span> with assembly context switching.",
        tags: ["Rust", "Kernel", "x86_64", "UEFI"],
        terminal: {
            name: "eithne",
            date: "Feb 20",
            size: "13K",
            content: `
<span class="primary bold">PROJECT: x86_64 OS Kernel (Eithne)</span>
=======================================
Boots via UEFI. Implements the full kernel foundation from scratch.

<span class="highlight bold">>> MEMORY MANAGEMENT</span>
<span class="dim">-</span> <span class="bold">Buddy alloc:</span>  O(1) · orders 0-10 (4 KiB → 2 MiB) · XOR bitmap coalesce
<span class="dim">-</span> <span class="bold">Slab heap:</span>    9 size classes · intrusive free lists · O(1) alloc/free
<span class="dim">-</span> <span class="bold">Paging:</span>       4-level (PML4→PDPT→PD→PT) · map/unmap/translate · INVLPG

<span class="highlight bold">>> INTERRUPTS</span>
<span class="primary">*</span> 256-entry IDT · assembly stubs for all CPU exceptions
<span class="primary">*</span> 8259 PIC remapped to vectors 32-47 · IST stacks in TSS

<span class="highlight bold">>> SCHEDULER</span>
Round-robin · cooperative + preemptive · 10-tick timeslice
Assembly context switch (callee-saved GPRs + RSP) · IRETQ resume

<span class="ls-exec">./run.sh   # OVMF + QEMU</span>

[eithne] initialization complete — entering scheduler loop.
[timer] 100 ticks  [heartbeat] still alive (500)
`
        }
    },
    {
        id: "chess",
        title: "Chess Engine (~2900 ELO)",
        link: `https://github.com/${config.github}/chess`,
        desc: "UCI-compliant chess engine in Rust rated ~<span class='highlight'>2900 ELO</span>. Uses <span class='highlight'>magic bitboards</span> for O(1) sliding-piece move generation, PVS alpha-beta with a full pruning stack, and NNUE evaluation with SIMD-accelerated incremental accumulator updates — only changed pieces re-evaluated per move.",
        tags: ["Rust", "HPC", "AI"],
        terminal: {
            name: "chess-engine",
            date: "Nov 01",
            size: "~6K",
            content: `
<span class="primary bold">PROJECT: Chess Engine</span>
=======================================
UCI-compliant engine. ~2900 ELO. ~6,000 lines of Rust.

<span class="highlight bold">>> MOVE GENERATION</span>
<span class="dim">-</span> <span class="bold">Bitboards:</span>  Magic number lookup — O(1) sliding piece attacks
<span class="dim">-</span> <span class="bold">Ordering:</span>   TT move → captures (SEE) → killers → history heuristic

<span class="highlight bold">>> SEARCH</span>
<span class="primary">*</span> Negamax PVS (Principal Variation Search)
<span class="primary">*</span> Iterative deepening · soft/hard time limits
<span class="primary">*</span> Transposition table (Zobrist) · quiescence search
<span class="primary">*</span> LMR · LMP · null-move · futility · razoring · delta pruning

<span class="highlight bold">>> EVALUATION</span>
NNUE · 41k inputs · two 32-neuron layers · SIMD dot product
Incremental accumulator — only changed pieces re-evaluated per move

<span class="highlight bold">>> BENCHMARKS</span>
<span class="dim">Rating:</span>  ~2900 ELO (Stockfish test suite)
<span class="dim">Opening:</span> Polyglot book (The Baron's opening repertoire)

<span class="ls-exec">cargo run --release -- perft 6</span>
<span class="ls-exec">cargo run --release -- play-cli --time 5000</span>
`
        }
    },
    {
        id: "f1",
        title: "F1 Trajectory Optimizer",
        link: `https://github.com/${config.github}/f1-optimizer`,
        desc: "Numerical optimization engine for F1 racing lines written in C. Solves for the time-optimal path using <span class='highlight'>Levenberg-Marquardt</span> non-linear least squares on a 2D physics model with friction circle, aerodynamic downforce, and elevation. Results rendered in 3D against real <span class='highlight'>Max Verstappen 2023 telemetry</span>.",
        tags: ["C", "Physics", "Numerical Methods"],
        terminal: {
            name: "f1-solver",
            date: "Dec 20",
            size: "4.2K",
            content: `
<span class="primary bold">PROJECT: F1 Racing Line Optimizer</span>
=======================================
Time-optimal racing line solver. Real F1 telemetry comparison.

<span class="highlight bold">>> OPTIMIZATION</span>
<span class="dim">-</span> <span class="bold">Algorithm:</span>  Levenberg-Marquardt (adaptive damping λ)
<span class="dim">-</span> <span class="bold">Residuals:</span>  path length · Menger curvature · boundary barrier · jerk
<span class="dim">-</span> <span class="bold">Jacobian:</span>   finite difference (h=1e-4)

<span class="highlight bold">>> PHYSICS MODEL (F1-2023 spec)</span>
<span class="primary">*</span> Friction circle: Glat² + Glong² ≤ μ²
<span class="primary">*</span> Aero: downforce Cl=6.10 · drag Cd=0.92 · mass 798 kg
<span class="primary">*</span> Speed profile: v_max = √(μ·g·R) per apex

<span class="highlight bold">>> VISUALIZATION (Raylib 3D)</span>
Elevation heatmap · optimized line · ghost car (real telemetry)
G-force overlay · free camera + follow modes

<span class="ls-exec">./race_optimizer   # select Silverstone, Monaco, etc.</span>
`
        }
    },
    {
        id: "neural",
        title: "CNN from Scratch in C",
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
        id: "compiler",
        title: "C-to-RISC-V Compiler",
        link: `https://github.com/${config.github}/compiler`,
        desc: "Recursive descent compiler in Rust that targets <span class='highlight'>RV64 assembly</span>. Full pipeline from source through lexer, parser, type checker, IR lowering, optimizer, and code generator. Supports pointers, arrays, structs, enums, recursion, and all standard C control flow.",
        tags: ["Rust", "Compilers", "Assembly"],
        terminal: {
            name: "compiler",
            date: "Oct 15",
            size: "5.2K",
            content: `
<span class="primary bold">PROJECT: C-to-RISC-V Compiler</span>
=======================================
Full compiler pipeline. C subset → RV64 assembly → QEMU execution.

<span class="highlight bold">>> PIPELINE</span>
Lexer → Parser → TypeCheck → IR Lower → Optimizer → Codegen

<span class="highlight bold">>> SUPPORTED FEATURES</span>
<span class="dim">-</span> Types: int · pointers · arrays · structs · enums · typedefs
<span class="dim">-</span> Control: if/else · while · do-while · for · switch
<span class="dim">-</span> Functions: recursion · up to 8 args (a0-a7) · RISC-V lp64 ABI

<span class="highlight bold">>> EXAMPLE</span>
<span class="ls-exec">cargo run --quiet -- input.c > out.s</span>
<span class="ls-exec">riscv64-linux-gnu-gcc -static out.s -o prog</span>
<span class="ls-exec">qemu-riscv64 ./prog && echo $?</span>

int fib(int n) { if (n < 2) return n; return fib(n-1)+fib(n-2); }
int main() { return fib(10); }  // exit code: 55
`
        }
    }
];
