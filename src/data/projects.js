import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "RISC-V System Emulator",
        link: `https://github.com/${config.github}/riscv-system-emulator`,
        desc: "A cycle-accurate <span class='highlight'>RV64IMAFD</span> emulator. Features a 5-stage superscalar pipeline with <span class='highlight'>perceptron branch prediction</span>, SV39 MMU, and L1/L2 cache modeling. Used for hardware design space exploration.",
        tags: ["Rust", "Architecture", "Simulation"],
        terminal: {
            name: "riscv-sim",
            date: "Feb 12",
            size: "48",
            content: `
<span class="primary bold">PROJECT: RISC-V System Emulator</span>
=======================================
A high-fidelity system emulator for the RISC-V 64-bit architecture.
Models the full hardware stack from the pipeline up to the OS.

<span class="highlight bold">>> MICROARCHITECTURE</span>
<span class="dim">-</span> <span class="bold">Core:</span>       5-Stage Superscalar Pipeline (IF, ID, EX, MEM, WB).
<span class="dim">-</span> <span class="bold">Hazards:</span>    Full data forwarding and stall logic.
<span class="dim">-</span> <span class="bold">Prediction:</span> Perceptron Branch Predictor with global history.
<span class="dim">-</span> <span class="bold">Memory:</span>     Configurable L1/L2 Caches (MESI) + TLB.

<span class="highlight bold">>> SOFTWARE ECOSYSTEM</span>
<span class="primary">*</span> <span class="bold">Kernel:</span>     Custom microkernel with VFS and syscalls.
<span class="primary">*</span> <span class="bold">Userland:</span>   Runs Raytracer and Matrix Multiplication benchmarks.

<span class="highlight bold">>> DESIGN SPACE EXPLORATION</span>
Includes a genetic algorithm engine to evolve optimal hardware
configurations (Cache Size vs IPC) for specific workloads.
`
        }
    },
    {
        id: "hexz",
        title: "Seekable Compression Engine",
        link: `https://github.com/Alethic-Systems/hexz`,
        desc: "A high-performance PyTorch data loader with <span class='highlight'>seekable compressed archives</span>. Streams datasets directly from S3 with <span class='highlight'>random access</span> and deduplication. Enables training on massive datasets without local storage.",
        tags: ["Rust", "PyTorch", "Compression", "HPC"],
        terminal: {
            name: "hexz-loader",
            date: "Feb 01",
            size: "36",
            content: `
<span class="primary bold">PROJECT: Seekable Compression Engine (Hexz)</span>
=======================================
A zero-copy data streaming system for training ML models on
massive compressed datasets stored in cloud object storage.

<span class="highlight bold">>> CORE INNOVATION</span>
<span class="dim">-</span> <span class="bold">Archive:</span>    Custom seekable compression format.
<span class="dim">-</span> <span class="bold">Access:</span>     O(1) random-access to compressed samples.
<span class="dim">-</span> <span class="bold">Streaming:</span>  Direct S3 reads via HTTP Range requests.
<span class="dim">-</span> <span class="bold">Dedup:</span>      Content-addressed deduplication.

<span class="highlight bold">>> PERFORMANCE</span>
<span class="primary">*</span> <span class="bold">Throughput:</span> 10GB/s decompression (Multi-threaded).
<span class="primary">*</span> <span class="bold">Memory:</span>     Zero-copy via PyTorch C++ extension.
<span class="primary">*</span> <span class="bold">Latency:</span>    Sub-millisecond sample fetch.

<span class="highlight bold">>> USE CASE</span>
Train ImageNet-scale models without downloading the entire dataset.
Ideal for multi-node distributed training on ephemeral cloud VMs.

<span class="ls-exec">python train.py --data s3://bucket/archive.hexz</span>
`
        }
    },
    {
        id: "vlsi",
        title: "VLSI Physical Design Tool",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: "A digital IC placement and routing engine. Implements <span class='highlight'>electrostatic global placement</span> (ePlace algorithm) using FFTs and <span class='highlight'>negotiation-based routing</span> (Pathfinder). Handles synthetic benchmarks up to 10k nets.",
        tags: ["Rust", "EDA", "Algorithms", "Optimization"],
        terminal: {
            name: "vlsi-flow",
            date: "Jan 05",
            size: "52",
            content: `
<span class="primary bold">PROJECT: VLSI Physical Design Prototype</span>
=======================================
A from-scratch implementation of core Electronic Design Automation (EDA) 
algorithms for placing and routing digital integrated circuits.

<span class="highlight bold">>> ALGORITHMIC IMPLEMENTATION</span>
<span class="dim">-</span> <span class="bold">Placement:</span>   Electrostatic analogy (ePlace). Models cells as 
                electric charges and density as electric potential.
                Solved via <span class="highlight">FFT</span> and Nesterov optimization.
<span class="dim">-</span> <span class="bold">Legalize:</span>    Abacus algorithm for standard cell row alignment.
<span class="dim">-</span> <span class="bold">Routing:</span>     Pathfinder (Rip-up and Reroute) strategy using
                multithreaded 3D A* search on a routing graph.

<span class="highlight bold">>> CAPABILITIES</span>
<span class="primary">*</span> <span class="bold">Input:</span>      Parses industry-standard LEF/DEF files.
<span class="primary">*</span> <span class="bold">Scale:</span>      Optimized for designs up to ~10k nets.
<span class="primary">*</span> <span class="bold">Concurrency:</span> Parallelized routing stage using Rayon.

<span class="highlight bold">>> RUN DEMO</span>
<span class="ls-exec">cargo run --release -- flow --bench superblue1</span>
`
        }
    },
    {
        id: "qec",
        title: "RISC-V Quantum Control Unit",
        link: `https://github.com/${config.github}/riscv-qcu`,
        desc: "A hardware-software co-design for real-time Quantum Error Correction. Features a <span class='highlight'>SystemVerilog accelerator</span> and a bare-metal Rust firmware. Achieves <span class='highlight'>~580 cycle latency</span> for Surface Code decoding on RISC-V soft-cores.",
        tags: ["Rust", "SystemVerilog", "RISC-V", "Embedded"],
        terminal: {
            name: "qcu-firmware",
            date: "Jan 15",
            size: "24",
            content: `
<span class="primary bold">PROJECT: RISC-V Quantum Control Unit</span>
=======================================
A full-stack embedded architecture for decoding Surface Code quantum
errors within the coherence time of superconducting qubits.

<span class="highlight bold">>> SYSTEM ARCHITECTURE</span>
<span class="dim">-</span> <span class="bold">Firmware:</span>    Bare-metal Rust (no_std) kernel for RV64IMAC.
<span class="dim">-</span> <span class="bold">Hardware:</span>    Custom SystemVerilog accelerator for Union-Find.
<span class="dim">-</span> <span class="bold">Memory:</span>      Bump-allocated static arenas (Zero-GC/Malloc).
<span class="dim">-</span> <span class="bold">IPC:</span>         Lock-free SPSC ring buffers for core synchronization.

<span class="highlight bold">>> PERFORMANCE METRICS (QEMU/RV64)</span>
<span class="primary">*</span> <span class="bold">Latency:</span>    ~580 Clock Cycles (0.58 µs @ 1GHz).
<span class="primary">*</span> <span class="bold">Throughput:</span> ~55,000 shots/s (3 Worker Cores).
<span class="primary">*</span> <span class="bold">Jitter:</span>     < 50 Cycles (Deterministic execution).

<span class="highlight bold">>> VERIFICATION</span>
<span class="dim">Flow:</span>     Stim Circuit -> B8 Syndrome Data -> Firmware -> Decoder
<span class="dim">Co-Sim:</span>   Verilator integration for cycle-accurate hardware testing.

<span class="highlight bold">>> BOOT KERNEL</span>
<span class="ls-exec">./scripts/run.py kernel --size 5</span>
`
        }
    },
    {
        id: "unikernel",
        title: "RISC-V Security Unikernel",
        link: `https://github.com/${config.github}/riscv-security-unikernel`,
        desc: "A bare-metal network appliance running in Ring 0. Engineered for a strict <span class='highlight'>64KB RAM limit</span>. Features a custom <span class='highlight'>JIT-compiled eBPF VM</span> for packet filtering and probabilistic data structures for DDoS mitigation.",
        tags: ["Rust", "Kernel", "eBPF", "Security"],
        terminal: {
            name: "security-unikernel",
            date: "Dec 29",
            size: "64",
            content: `
<span class="primary bold">PROJECT: RISC-V Security Unikernel</span>
=======================================
A high-performance network security appliance running bare-metal
on RISC-V. Engineered to function within a strict <span class="highlight bold">64KB RAM</span>
hardware limit (L1 Cache size).

<span class="highlight bold">>> MEMORY OPTIMIZATION strategy</span>
<span class="dim">-</span> <span class="bold">Zero-Alloc:</span> No heap usage on hot paths.
<span class="dim">-</span> <span class="bold">Sketching:</span>  Count-Min Sketch for O(1) heavy-hitter detection.
<span class="dim">-</span> <span class="bold">Flow Table:</span> Cuckoo Hashing for compact state tracking.

<span class="highlight bold">>> SECURITY FEATURES</span>
<span class="primary">*</span> <span class="bold">Firewall:</span>   Stateful L4 tracking & Port Blocking.
<span class="primary">*</span> <span class="bold">DDoS:</span>       Volumetric mitigation via Penalty Box.
<span class="primary">*</span> <span class="bold">DPI:</span>        Aho-Corasick payload scanning.
<span class="primary">*</span> <span class="bold">eBPF:</span>       Custom VM for dynamic packet filtering rules.

<span class="highlight bold">>> TELEMETRY</span>
Includes a companion Rust GUI dashboard for real-time visualization
of throughput, active flows, and dropped packets.
`
        }
    },
    {
        id: "chess",
        title: "High-Perf Chess Engine",
        link: `https://github.com/${config.github}/chess-engine`,
        desc: "A UCI-compliant chess engine. Features <span class='highlight'>Magic Bitboards</span> for move generation, PVS search with Alpha-Beta pruning, and <span class='highlight'>NNUE</span> (Efficiently Updatable Neural Network) evaluation.",
        tags: ["Rust", "HPC", "AI"],
        terminal: {
            name: "chess-cli",
            date: "Nov 01",
            size: "26",
            content: `
<span class="primary bold">PROJECT: Chess Engine</span>
=======================================
A high-performance, UCI-compliant chess engine designed for 
correctness and strength.

<span class="highlight bold">>> ENGINE FEATURES</span>
<span class="primary">*</span> <span class="bold">Board Rep:</span> Magic Bitboards for O(1) sliding piece attacks.
<span class="primary">*</span> <span class="bold">Search:</span>    Principal Variation Search (PVS) & Transposition Tables.
<span class="primary">*</span> <span class="bold">Eval:</span>      NNUE (Neural Network) trained on 50M positions.
<span class="primary">*</span> <span class="bold">Protocol:</span>  Universal Chess Interface (UCI) compatible.

<span class="highlight bold">>> BENCHMARKS</span>
<span class="dim">NPS:</span>      > 2,500,000 nodes/sec (Single Thread)
<span class="dim">Rating:</span>   ~2800 ELO (Estimated)

<span class="ls-exec">cargo run --release -- bench</span>
`
        }
    },
    {
        id: "f1",
        title: "F1 Trajectory Optimizer",
        link: `https://github.com/${config.github}/f1-optimizer`,
        desc: "Numerical optimization engine for vehicle dynamics. Uses <span class='highlight'>Levenberg-Marquardt</span> non-linear least squares to solve for time-optimal racing lines based on a 2D physics model.",
        tags: ["C", "Physics", "Numerical Methods"],
        terminal: {
            name: "f1-solver",
            date: "Dec 20",
            size: "42",
            content: `
<span class="primary bold">PROJECT: F1 Racing Line Optimizer</span>
=======================================
A numerical optimization engine that calculates the time-optimal 
racing line for Formula 1 circuits.

<span class="highlight bold">>> CORE FEATURES</span>
<span class="dim">-</span> <span class="bold">Solver:</span>     Levenberg-Marquardt optimization algorithm.
<span class="dim">-</span> <span class="bold">Physics:</span>    2D point-mass model with Aero, Load Transfer, 
                and Friction Circle constraints.
<span class="dim">-</span> <span class="bold">Data:</span>       Ingests telemetry from FastF1 (Python).

<span class="highlight bold">>> VISUALIZATION</span>
Real-time rendering using Raylib. Displays friction circle usage,
G-Force heatmaps, and delta-time comparisons against real pole laps.

<span class="ls-exec">./build/race_optimizer -f silverstone_2024.csv</span>
`
        }
    },
    {
        id: "neural",
        title: "C Neural Network",
        link: `https://github.com/${config.github}/c-neural-network`,
        desc: "A multithreaded Convolutional Neural Network built from scratch in C99. Implements custom backpropagation, <span class='highlight'>Adam optimizer</span>, and real-time activation heatmaps.",
        tags: ["C", "ML", "Raylib"],
        terminal: {
            name: "neural-engine",
            date: "Jan 10",
            size: "38",
            content: `
<span class="primary bold">PROJECT: Neural Network Engine</span>
=======================================
A low-level implementation of a Convolutional Neural Network (CNN)
without external ML libraries.

<span class="highlight bold">>> CORE FEATURES</span>
<span class="dim">-</span> <span class="bold">Layers:</span>     Conv2D, MaxPool, ReLU, Softmax (Manual implementation).
<span class="dim">-</span> <span class="bold">Training:</span>   Stochastic Gradient Descent with Adam.
<span class="dim">-</span> <span class="bold">Parallel:</span>   OpenMP for matrix multiplication acceleration.
<span class="dim">-</span> <span class="bold">Visuals:</span>    Real-time heatmaps of weights and gradients.

<span class="highlight bold">>> DATASET</span>
Trained on EMNIST (Letters) and Google QuickDraw.

<span class="ls-exec">./build/draw_predictor</span>
`
        }
    },
    {
        id: "compiler",
        title: "C Subset Compiler",
        link: `https://github.com/${config.github}/c-compiler`,
        desc: "Recursive descent compiler targeting <span class='highlight'>RISC-V Assembly</span>. Supports pointers, stack allocation, and control flow structures.",
        tags: ["Rust", "Compilers", "Assembly"],
        terminal: {
            name: "c-compiler",
            date: "Oct 15",
            size: "28",
            content: `
<span class="primary bold">PROJECT: C to RISC-V Compiler</span>
=======================================
A compiler that translates a C-subset language into RISC-V 
64-bit Assembly (RV64I).

<span class="highlight bold">>> TECHNICAL DETAILS</span>
<span class="dim">Target:</span>   RISC-V 64-bit (RV64I)
<span class="dim">Method:</span>   Recursive Descent Parser -> AST -> Code Gen.
<span class="dim">ABI:</span>      Compliant with RISC-V calling convention (lp64).

<span class="highlight bold">>> FEATURES</span>
<span class="dim">-</span> Stack frame management (prologue/epilogue).
<span class="dim">-</span> Pointer arithmetic and dereferencing.
<span class="dim">-</span> Recursive function calls.

<span class="ls-exec">cargo run --quiet -- input.c > output.s</span>
`
        }
    }
];
