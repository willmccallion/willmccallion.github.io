import { config } from '../config.js';

export const projects = [
    {
        id: "vlsi",
        title: "VLSI Physical Design Engine",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: "A modular digital IC design toolchain written in Rust. Implements <span class='highlight'>analytical placement</span> using electrostatic analogies (FFT-based density solving) and <span class='highlight'>congestion-aware routing</span> via the Pathfinder algorithm. Capable of placing and routing 10k+ nets.",
        tags: ["Rust", "VLSI", "Algorithms", "HPC"],
        terminal: {
            name: "eda-toolchain",
            date: "Jan 05",
            size: "52",
            content: `
<span class="primary bold">PROJECT: VLSI Physical Design Engine</span>
=======================================
A modular physical design toolchain for digital integrated circuits.
It transforms logical netlists (LEF/DEF) into physical layouts through
analytical placement and negotiation-based routing.

<span class="highlight bold">>> CORE ALGORITHMS</span>
<span class="dim">-</span> <span class="bold">Placement:</span>   Analytical solver using Electrostatic analogies.
                Solves Poisson's equation via <span class="highlight">FFT</span> to model density.
                Minimizes wirelength using Nesterov optimization.
<span class="dim">-</span> <span class="bold">Legalize:</span>    Abacus algorithm for cell alignment.
<span class="dim">-</span> <span class="bold">Routing:</span>     Pathfinder algorithm (Rip-up and Reroute).
                Uses 3D A* search on a multi-layer metal grid.

<span class="highlight bold">>> PERFORMANCE</span>
<span class="primary">*</span> <span class="bold">Scale:</span>      Handles designs with 10k+ nets (e.g., AES encryption).
<span class="primary">*</span> <span class="bold">Speed:</span>      Multithreaded routing using Rayon.
<span class="primary">*</span> <span class="bold">Output:</span>     Generates routed DEF files and visual heatmaps.

<span class="highlight bold">>> TECH STACK</span>
<span class="dim">Lang:</span>     Rust
<span class="dim">Math:</span>     RustFFT, Nalgebra
<span class="dim">Format:</span>   LEF/DEF Parsers

<span class="highlight bold">>> RUN DEMO</span>
<span class="ls-exec">cargo run --release -- flow</span>
`
        }
    },
    {
        id: "unikernel",
        title: "RISC-V Security Unikernel",
        link: `https://github.com/${config.github}/riscv-security-unikernel`,
        desc: "A bare-metal network security appliance written in Rust. Runs in Ring 0 on RISC-V with a strict <span class='highlight'>64KB RAM limit</span>. Features stateful firewalling, DDoS mitigation (Count-Min Sketch), Heuristic Analysis, and a custom eBPF VM. Includes a real-time GUI dashboard.",
        tags: ["Rust", "Kernel Dev", "Embedded", "eBPF"],
        terminal: {
            name: "security-unikernel",
            date: "Dec 29",
            size: "64",
            content: `
<span class="primary bold">PROJECT: RISC-V Security Unikernel</span>
=======================================
A high-performance network security appliance running bare-metal
on RISC-V (Ring 0). Engineered to function within a strict 
<span class="highlight bold">64KB RAM</span> hardware limit.

<span class="highlight bold">>> THE 64KB CHALLENGE</span>
To fit a full network stack + security suite in 64KB, this kernel uses:
<span class="dim">-</span> <span class="bold">Zero-Alloc Runtime:</span> No heap usage on hot paths.
<span class="dim">-</span> <span class="bold">Probabilistic Data:</span> Count-Min Sketch for DDoS tracking.
<span class="dim">-</span> <span class="bold">Static Flow Table:</span> Packed 5-tuple tracking (100% RAM usage).

<span class="highlight bold">>> SECURITY FEATURES</span>
<span class="primary">*</span> <span class="bold">Firewall:</span>   Stateful L4 tracking & Port Blocking.
<span class="primary">*</span> <span class="bold">DDoS:</span>       Volumetric mitigation via Penalty Box.
<span class="primary">*</span> <span class="bold">DPI:</span>        Aho-Corasick payload scanning (SQLi/XSS).
<span class="primary">*</span> <span class="bold">eBPF:</span>       Custom VM for dynamic packet filtering.
<span class="primary">*</span> <span class="bold">Heuristics:</span> Detects NOP sleds & Xmas scans.

<span class="highlight bold">>> CONTROL PLANE</span>
Includes a companion Rust GUI dashboard for real-time telemetry 
(Throughput, Active Flows, Alerts) and traffic simulation.

<span class="highlight bold">>> TECH STACK</span>
<span class="dim">Lang:</span>     Rust (no_std), Assembly
<span class="dim">Arch:</span>     RISC-V 64-bit
<span class="dim">Driver:</span>   VirtIO Net (DMA)
`
        }
    },
    {
        id: "cpu",
        title: "RISC-V CPU Simulator",
        link: "#",
        desc: "Cycle-accurate simulator for the RISC-V 64IM ISA. Features 5-stage pipeline visualization and GShare branch prediction. This project also comes with a bunch of little C programs that can be run on the micro-kernel provided.",
        tags: ["Rust", "Architecture", "Emulation"],
        terminal: {
            name: "riscv-cpu-sim",
            date: "Sep 20",
            size: "32",
            content: `
<span class="primary bold">RISC-V SYSTEM EMULATOR & MICROKERNEL</span>
=======================================
A cycle-accurate RISC-V (RV64IM) processor simulator written in Rust.
It boots a custom C-based microkernel with a 5-stage pipeline,
branch prediction, and cache hierarchy.

<span class="highlight bold">>> FEATURES :: CPU ARCHITECTURE</span>
<span class="dim">-</span> <span class="bold">ISA:</span>        RV64IM (Integer + Multiply/Divide)
<span class="dim">-</span> <span class="bold">Pipeline:</span>   5-Stage (Fetch, Decode, Execute, Memory, Writeback)
<span class="dim">-</span> <span class="bold">Prediction:</span> GShare (Global History), BTB, and RAS
<span class="dim">-</span> <span class="bold">Memory:</span>     L1 (16KB I/D), L2 (128KB), L3 (2MB)
<span class="dim">-</span> <span class="bold">MMU:</span>        Sv39-style translation with TLB

<span class="highlight bold">>> FEATURES :: OPERATING SYSTEM</span>
<span class="dim">-</span> <span class="bold">Bootloader:</span> M-Mode Assembly loader
<span class="dim">-</span> <span class="bold">Kernel:</span>     C-based S-Mode Microkernel
                <span class="dim">drivers: UART, VFS, ELF-loading, Malloc</span>
<span class="dim">-</span> <span class="bold">User Space:</span> Interactive Shell ('sh'), 'ls', and user programs

<span class="highlight bold">>> BUILD & RUN</span>
<span class="dim">1. Build Simulator:</span>  <span class="ls-exec">cargo build --release</span>
<span class="dim">2. Run System:</span>       <span class="ls-exec">cargo run --release</span>
<span class="dim">3. Pipeline Trace:</span>   <span class="ls-exec">cargo run --release -- --trace</span>
`
        }
    },
    {
        id: "chess",
        title: "Chess Engine",
        link: "#",
        desc: "High-performance UCI engine. Implements Magic Bitboards, Alpha-Beta pruning with PVS, NNUE evaluation, and Transposition Tables.",
        tags: ["Rust", "Algorithms", "Optimization"],
        terminal: {
            name: "chess",
            date: "Nov 01",
            size: "26",
            content: `
<span class="primary bold">PROJECT: Chess Engine (Rust)</span>
=======================================
A high-performance, UCI-compliant chess engine designed for 
correctness and strength. Features NNUE evaluation and 
Polyglot opening book support.

<span class="highlight bold">>> ENGINE FEATURES</span>
<span class="primary">*</span> <span class="bold">Search:</span>    Alpha-Beta Pruning with PVS & Transposition Tables.
<span class="primary">*</span> <span class="bold">Rules:</span>     Full support (Castling, En Passant, 50-move rule).
<span class="primary">*</span> <span class="bold">Eval:</span>      Supports NNUE (Neural Network).
<span class="primary">*</span> <span class="bold">Protocol:</span>  Universal Chess Interface (UCI) compatible.
<span class="primary">*</span> <span class="bold">Verify:</span>    Includes 'perft' move generation tester.

<span class="highlight bold">>> HOW TO USE</span>

<span class="dim"># 1. Play in Terminal (5 seconds per move)</span>
<span class="ls-exec">cargo run --release -- play-cli --time 5000</span>

<span class="dim"># 2. Run in GUI (Arena, Scid, etc)</span>
<span class="ls-exec">cargo run --release -- uci</span>

<span class="dim"># 3. Watch Self-Play (5 rounds)</span>
<span class="ls-exec">cargo run --release -- self-play --rounds 5 --time 1000</span>
`
        }
    },
    {
        id: "f1",
        title: "F1 Racing Optimizer",
        link: `https://github.com/${config.github}/f1-optimizer`,
        desc: "Numerical optimization engine for F1 racing lines. Uses the Levenberg-Marquardt algorithm and a 2D vehicle physics simulation to solve for time-optimal trajectories. Visualized in real-time with Raylib.",
        tags: ["C", "Physics", "Raylib", "Optimization"],
        terminal: {
            name: "f1-optimizer",
            date: "Dec 20",
            size: "42",
            content: `
<span class="primary bold">PROJECT: F1 Racing Line Optimizer</span>
=======================================
A numerical optimization engine written in C that calculates the
time-optimal racing line for Formula 1 circuits. It compares simulation
data against real-world telemetry (e.g., Max Verstappen's pole laps).

<span class="highlight bold">>> CORE FEATURES</span>
<span class="dim">-</span> <span class="bold">Solver:</span>     Levenberg-Marquardt non-linear least squares optimization.
<span class="dim">-</span> <span class="bold">Physics:</span>    2D simulation with Aero, Load Transfer, and Friction Circle.
<span class="dim">-</span> <span class="bold">Visuals:</span>    Real-time Raylib rendering (Heatmaps, G-Force, Telemetry).
<span class="dim">-</span> <span class="bold">Data:</span>       Python pipeline (FastF1) for GPS/Telemetry extraction.

<span class="highlight bold">>> TECH STACK</span>
<span class="dim">Lang:</span>     C99, Python
<span class="dim">Libs:</span>     Raylib, OpenMP, NumPy, SciPy
<span class="dim">Math:</span>     Cholesky Decomposition, Finite Differences

<span class="highlight bold">>> BUILD & RUN</span>
<span class="ls-exec">cmake -B build && cmake --build build</span>
<span class="ls-exec">./build/race_optimizer -f silverstone_2023.csv</span>
`
        }
    },
    {
        id: "neural",
        title: "Neural Network Engine",
        link: `https://github.com/${config.github}/c-neural-network`,
        desc: "Multithreaded Convolutional Neural Network built from scratch in C. Implements custom backpropagation, Adam optimizer, and real-time activation heatmaps using Raylib.",
        tags: ["C", "Machine Learning", "Raylib", "Concurrency"],
        terminal: {
            name: "neural-engine",
            date: "Jan 10",
            size: "38",
            content: `
<span class="primary bold">PROJECT: Neural Network Engine</span>
=======================================
A high-performance Convolutional Neural Network built entirely
from scratch in C. It visualizes internal network states (activations,
weights, gradients) in real-time while training.

<span class="highlight bold">>> CORE FEATURES</span>
<span class="dim">-</span> <span class="bold">Engine:</span>     Custom implementation of Conv2D, MaxPool, ReLU, Softmax.
<span class="dim">-</span> <span class="bold">Training:</span>   Stochastic Gradient Descent with Adam Optimizer.
<span class="dim">-</span> <span class="bold">System:</span>     Multithreaded architecture (Training thread + UI thread).
<span class="dim">-</span> <span class="bold">Visuals:</span>    Real-time heatmaps of feature maps and weight histograms.

<span class="highlight bold">>> TECH STACK</span>
<span class="dim">Lang:</span>     C99
<span class="dim">Libs:</span>     Raylib (Visualization), OpenMP (Parallelism), Pthreads
<span class="dim">Data:</span>     EMNIST + Google QuickDraw (Merged)

<span class="highlight bold">>> BUILD & RUN</span>
<span class="ls-exec">cmake -B build && cmake --build build</span>
<span class="ls-exec">./build/draw_predictor</span>
`
        }
    },
    {
        id: "compiler",
        title: "C Subset Compiler",
        link: "#",
        desc: "Recursive descent compiler targeting RISC-V Assembly. Handles pointers, stack allocation, and control flow.",
        tags: ["Rust", "Compilers", "Assembly"],
        terminal: {
            name: "compiler",
            date: "Oct 15",
            size: "28",
            content: `
<span class="primary bold">PROJECT: C to RISC-V Compiler</span>
=======================================
A Rust-based compiler that translates a C-subset language into 
RISC-V 64-bit Assembly (RV64I). Supports recursion and stack frames.

<span class="highlight bold">>> LANGUAGE SUPPORT</span>
<span class="dim">-</span> <span class="bold">Types:</span>    64-bit signed integers (int)
<span class="dim">-</span> <span class="bold">Control:</span>  if/else, while loops
<span class="dim">-</span> <span class="bold">Funcs:</span>    Recursive calls, arguments, return values
<span class="dim">-</span> <span class="bold">Ops:</span>      Arithmetic (+-*/) and Comparison (== != < >)

<span class="highlight bold">>> TECHNICAL DETAILS</span>
<span class="dim">Target:</span>   RISC-V 64-bit (RV64I)
<span class="dim">Method:</span>   Stack-machine based code generation
<span class="dim">Regs:</span>     Uses <span class="secondary">a0</span> (return/arg), <span class="secondary">s0</span> (frame ptr), <span class="secondary">sp</span> (stack)

<span class="highlight bold">>> USAGE PIPELINE</span>

<span class="dim"># 1. Compile Source (C -> Assembly)</span>
<span class="ls-exec">cargo run --quiet -- input.c > output.s</span>

<span class="dim"># 2. Assemble & Link (using GCC)</span>
<span class="ls-exec">riscv64-linux-gnu-gcc -static output.s -o program</span>

<span class="dim"># 3. Run (using QEMU)</span>
<span class="ls-exec">qemu-riscv64 ./program</span>
`
        }
    }
];
