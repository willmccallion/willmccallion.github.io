import { config } from '../config.js';

export const builds = [
    {
        id: "vlsi",
        title: "PARE (Placement and Routing)",
        image: "assets/routed_aes.png",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: "A VLSI place-and-route tool in Rust. Global placement is Nesterov gradient descent with <span class='highlight'>FFT-based density</span> (cells as charges); Abacus legalization snaps cells to the row grid; routing is two-stage A* with Pathfinder rip-up-and-reroute. Runs on the ISPD / IBM benchmark suite up to ~313k cells.",
        tags: ["Rust", "EDA", "Algorithms"],
        terminal: {
            name: "vlsi-flow",
            date: "Jan 05",
            size: "69K",
            content: `
<span class="primary bold">PROJECT: PARE (Placement And Routing)</span>
=======================================
Place and route flow for digital ICs.

<span class="highlight bold">>> PLACEMENT</span>
<span class="dim">-</span> <span class="bold">Density:</span>    Poisson equation via FFT (O(N log N)).
                Cells act as electric charges, so high density
                gives repulsion.
<span class="dim">-</span> <span class="bold">Wirelength:</span> Weighted-average smooth HPWL approximation
<span class="dim">-</span> <span class="bold">Solver:</span>     Nesterov accelerated gradient descent
<span class="dim">-</span> <span class="bold">Legalize:</span>   Abacus: row-grid alignment with minimum displacement

<span class="highlight bold">>> ROUTING</span>
<span class="primary">*</span> <span class="bold">Global:</span>     Coarse A* · Pathfinder rip-up & reroute (history costs)
<span class="primary">*</span> <span class="bold">Detailed:</span>  Pattern routing + guide-constrained A* · spatial-batch parallel
<span class="primary">*</span> <span class="bold">Formats:</span>   LEF/DEF (Nangate45) · Bookshelf (ISPD)

<span class="highlight bold">>> BENCHMARKS (no shorts or opens)</span>
<span class="dim">IBM01:</span>    12,506 cells ·  11,507 nets · 85% util
<span class="dim">AES:</span>      20,533 cells ·  51,671 nets · Nangate45 10-layer
<span class="dim">IBM10:</span>    67,692 cells ·  64,227 nets · 49% util
<span class="dim">IBM14:</span>   145,492 cells · 143,202 nets · 49% util
<span class="dim">Netcard:</span> 252,978 cells · 290,354 nets · Nangate45 10-layer
<span class="dim">Leon3mp:</span> 312,529 cells · 406,912 nets · 53% util · 29s

<span class="ls-exec">cargo run --release -- flow configs/ibm14.toml</span>
<span class="ls-exec">cargo run --release -- flow configs/aes.toml</span>
`
        }
    },
    {
        id: "unikernel",
        title: "RISC-V Security Unikernel",
        image: "assets/security_kernel.png",
        link: `https://github.com/${config.github}/riscv-security-unikernel`,
        desc: "A bare-metal network security appliance in Rust for RISC-V, running in <span class='highlight'>64 KB of RAM</span>. Stateful flow tracker, Count-Min Sketch for DDoS heavy-hitter detection, Aho-Corasick DPI, and a small <span class='highlight'>eBPF VM</span> for runtime-injected packet filters. All structures statically allocated. egui control plane for rule injection and bytecode upload.",
        tags: ["Rust", "Kernel", "eBPF", "Security"],
        terminal: {
            name: "security-unikernel",
            date: "Dec 29",
            size: "94K",
            content: `
<span class="primary bold">PROJECT: RISC-V Security Unikernel</span>
=======================================
A bare-metal packet pipeline in 64 KB of RAM.

<span class="highlight bold">>> 6-STAGE PACKET PIPELINE</span>
<span class="dim">①</span> Count-Min Sketch  : probabilistic DDoS heavy-hitter detection
<span class="dim">②</span> Penalty Box       : 16-entry IP ban table (FIFO eviction)
<span class="dim">③</span> Token Bucket      : global 10k pps rate cap
<span class="dim">④</span> Flow Tracker      : 5-tuple stateful table · 74 entries
<span class="dim">⑤</span> eBPF VM           : 16 regs · 64 instr · runtime-injected bytecode
<span class="dim">⑥</span> DPI Engine        : Aho-Corasick · SQL injection · XSS · NOP sleds

<span class="highlight bold">>> MEMORY</span>
<span class="primary">*</span> No heap on the hot path. Every structure is statically allocated.
<span class="primary">*</span> VirtIO DMA buffers tuned to the Ethernet MTU (1536 B)

<span class="highlight bold">>> CONTROL PLANE (egui)</span>
Dashboard · SDN rule injection · eBPF Studio · traffic generator

<span class="ls-exec">make run   # QEMU + TAP interface</span>
<span class="ls-exec">make gui   # egui control plane</span>
`
        }
    },
    {
        id: "chess",
        title: "Chess Engine",
        image: "assets/chess.png",
        link: `https://github.com/${config.github}/chess`,
        desc: "A UCI chess engine in Rust, around <span class='highlight'>2900 ELO</span>. Magic bitboards for sliding-piece move generation, PVS alpha-beta with the usual pruning stack (LMR, LMP, null-move, futility, razoring, delta), and <span class='highlight'>NNUE</span> evaluation with an incremental accumulator. Hand-tuned piece-square tables as a fallback.",
        tags: ["Rust", "AI"],
        terminal: {
            name: "chess-engine",
            date: "Nov 01",
            size: "~6K",
            content: `
<span class="primary bold">PROJECT: Chess Engine</span>
=======================================
A UCI chess engine in Rust. ~2900 ELO.

<span class="highlight bold">>> MOVE GENERATION</span>
<span class="dim">-</span> <span class="bold">Bitboards:</span>  Magic-number lookup for sliding-piece attacks
<span class="dim">-</span> <span class="bold">Ordering:</span>   TT move → captures (SEE) → killers → history heuristic

<span class="highlight bold">>> SEARCH</span>
<span class="primary">*</span> Negamax PVS (Principal Variation Search)
<span class="primary">*</span> Iterative deepening · soft/hard time limits
<span class="primary">*</span> Transposition table (Zobrist) · quiescence search
<span class="primary">*</span> LMR · LMP · null-move · futility · razoring · delta pruning

<span class="highlight bold">>> EVALUATION</span>
NNUE: 41k inputs · two 32-neuron layers · SIMD dot product
Incremental accumulator: only changed pieces re-evaluated.
Hand-tuned PST tables as a fallback when no NNUE file is loaded.

<span class="highlight bold">>> EXTRAS</span>
<span class="dim">Rating:</span>  ~2900 ELO (Stockfish self-play suite)
<span class="dim">Opening:</span> Polyglot book (The Baron's repertoire)

<span class="ls-exec">cargo run --release -- perft 6</span>
<span class="ls-exec">cargo run --release -- play-cli --time 5000</span>
`
        }
    },
    {
        id: "hypercube",
        title: "Hypercube Network Simulator",
        image: null,
        link: `https://github.com/${config.github}/hypercube`,
        desc: "A packet routing simulator for <span class='highlight'>n-dimensional hypercube</span> networks. Compares greedy bit-fixing against <span class='highlight'>Valiant's randomized routing</span> across adversarial traffic patterns (bit-reversal, complement, transpose, butterfly, shuffle). Also does fault-tolerant routing around failed nodes/links and CSV-export sweep mode for parameter studies.",
        tags: ["Rust", "Networking", "Simulation"],
        terminal: {
            name: "hypercube",
            date: "Mar 23",
            size: "~4K",
            content: `
<span class="primary bold">PROJECT: Hypercube Network Simulator</span>
=======================================
Packet routing on n-dimensional hypercube topologies.

<span class="highlight bold">>> ROUTING STRATEGIES</span>
<span class="dim">-</span> <span class="bold">Bit-fixing:</span>  Greedy. Flip mismatched bits left to right.
<span class="dim">-</span> <span class="bold">Valiant:</span>     Randomized two-phase. Route via a random intermediate.
<span class="dim">-</span> <span class="bold">Fault-aware:</span> Route around failed nodes and links

<span class="highlight bold">>> TRAFFIC PATTERNS</span>
<span class="primary">*</span> Bit-reversal · complement · transpose · butterfly · shuffle · random

<span class="highlight bold">>> SWEEP MODE</span>
Batch runs across dimensions 3-16, all patterns, both strategies.
CSV export with congestion, latency, and per-dimension load stats.

<span class="ls-exec">cargo run --release -- --dim 10 --strategy valiant --traffic bit-reversal</span>
<span class="ls-exec">cargo run --release -- sweep --dims 3-14 --runs 3 -o results.csv</span>
`
        }
    },
    {
        id: "maxcut-sdp",
        title: "Max-Cut SDP Solver",
        image: null,
        link: `https://github.com/${config.github}/maxcut-sdp`,
        desc: "A <span class='highlight'>Goemans-Williamson</span> Max-Cut approximation in Rust. Solves the SDP relaxation with a primal-dual <span class='highlight'>interior-point method</span>, plus a low-rank <span class='highlight'>Burer-Monteiro</span> solver for larger instances. The linear algebra (Cholesky, eigendecomposition, matrix square roots) is hand-written; the only deps are clap, rand, and rayon. Tested on Gset benchmarks up to 20,000 nodes.",
        tags: ["Rust", "Optimization", "Algorithms"],
        terminal: {
            name: "maxcut-sdp",
            date: "Mar 22",
            size: "~4K",
            content: `
<span class="primary bold">PROJECT: Max-Cut SDP Solver</span>
=======================================
Goemans-Williamson 0.878-approximation for Max-Cut.

<span class="highlight bold">>> SDP SOLVERS</span>
<span class="dim">-</span> <span class="bold">Interior point:</span> Primal-dual · Nesterov-Todd scaling · Schur complement
<span class="dim">-</span> <span class="bold">Burer-Monteiro:</span> Low-rank X=RR^T · nonlinear CG · scales to 14k+ nodes

<span class="highlight bold">>> ROUNDING</span>
<span class="primary">*</span> Random hyperplane rounding
<span class="primary">*</span> Zwick outward rotations · iterated local search
<span class="primary">*</span> Population-based refinement

<span class="highlight bold">>> LINEAR ALGEBRA</span>
Cholesky · Jacobi eigendecomposition · matrix square root.
No BLAS/LAPACK; just clap, rand, rayon as dependencies.

<span class="highlight bold">>> GSET BENCHMARKS</span>
<span class="dim">Median gap:</span> 0.65% from best-known values
<span class="dim">11 of 15</span>  instances within 1% of best-known
<span class="dim">Runtime:</span>   10s (800 nodes) to 660s (20,000 nodes)

<span class="ls-exec">cargo run --release -- solve graphs/G1.txt</span>
<span class="ls-exec">cargo run --release -- solve --solver bm graphs/G22.txt</span>
`
        }
    },
];
