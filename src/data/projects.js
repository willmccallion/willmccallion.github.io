import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "RISC-V System Emulator",
        image: "assets/rvsim_stats.png",
        link: `https://github.com/${config.github}/rvsim`,
        desc: "Cycle-accurate <span class='highlight'>RV64IMAFDC</span> simulator with a full out-of-order superscalar core: physical register file, CAM-style issue queue with wakeup/select, ROB, non-blocking caches with MSHRs, DRAM row-buffer timing, and five branch predictors including TAGE. Python API for design-space exploration. Passes all 134 riscv-tests.",
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
        id: "vlsi",
        title: "PARE — Placement And Routing Engine",
        image: "assets/routed_aes.png",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: "Digital IC placement and routing engine in Rust. Global placement solves Poisson's equation via <span class='highlight'>FFT</span> with Nesterov accelerated gradient descent, Abacus legalization snaps cells to the row grid, and two-stage <span class='highlight'>Pathfinder routing</span> runs on an edge-capacity gcell grid. Places and routes real benchmarks up to <span class='highlight'>313k cells / 407k nets</span> with no shorts or opens.",
        tags: ["Rust", "EDA", "Algorithms", "Optimization"],
        terminal: {
            name: "vlsi-flow",
            date: "Jan 05",
            size: "69K",
            content: `
<span class="primary bold">PROJECT: PARE — Placement And Routing Engine</span>
=======================================
Full physical design flow for digital ICs, built from scratch.

<span class="highlight bold">>> PLACEMENT</span>
<span class="dim">-</span> <span class="bold">Density:</span>    Poisson equation via FFT (O(N log N))
                cells as electric charges — high density = repulsion
<span class="dim">-</span> <span class="bold">Wirelength:</span> Weighted Average smooth HPWL approximation
<span class="dim">-</span> <span class="bold">Solver:</span>     Nesterov accelerated gradient descent
<span class="dim">-</span> <span class="bold">Legalize:</span>   Abacus — row-grid alignment, min displacement

<span class="highlight bold">>> ROUTING</span>
<span class="primary">*</span> <span class="bold">Global:</span>     Coarse A* · Pathfinder rip-up & reroute (history costs)
<span class="primary">*</span> <span class="bold">Detailed:</span>  Pattern routing + guide-constrained A* · spatial batch parallel
<span class="primary">*</span> <span class="bold">Formats:</span>   LEF/DEF (Nangate45) · Bookshelf (ISPD benchmarks)

<span class="highlight bold">>> BENCHMARKS (No openings or shorts)</span>
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
        desc: "Bare-metal network security appliance in Rust for RISC-V. Stateful firewall, <span class='highlight'>Count-Min Sketch</span> DDoS mitigation, Aho-Corasick DPI, and a custom <span class='highlight'>eBPF VM</span> for runtime-injected packet filters, all within <span class='highlight'>64 KB RAM</span>. Zero heap use on the hot path. Real-time egui control plane.",
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
        id: "qec",
        title: "RISC-V Quantum Control Unit",
        image: "assets/qcu_hil.png",
        link: `https://github.com/${config.github}/riscv-qcu`,
        desc: "Hardware-software co-design for real-time Quantum Error Correction on RISC-V. Zero-allocation Union-Find decoder at <span class='highlight'>~580 cycle deterministic latency</span> with under 50 cycle jitter. <span class='highlight'>SystemVerilog path-compression accelerator</span> verified cycle-accurately via Verilator co-simulation.",
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
        id: "hexz",
        title: "Hexz — Deduplicated Archive Format",
        link: `https://github.com/hexz-org/hexz`,
        desc: "Deduplicated archive format in Rust. <span class='highlight'>Content-Defined Chunking</span> for block-level dedup, <span class='highlight'>O(1) seekable</span> random access via hierarchical B-tree indexing, and FUSE mounting for transparent filesystem access. Thin delta archives, LZ4/Zstd compression, AES-256-GCM encryption, and git-like checkout/commit workspaces in a single <span class='highlight'>.hxz</span> file.",
        tags: ["Rust", "Storage", "FUSE", "Systems"],
        terminal: {
            name: "hexz",
            date: "Mar 15",
            size: "37K",
            content: `
<span class="primary bold">PROJECT: Hexz — Deduplicated Archive Format</span>
=======================================
Seekable, deduplicated archives for large-scale data distribution.

<span class="highlight bold">>> ARCHIVE ENGINE</span>
<span class="dim">-</span> <span class="bold">Chunking:</span>   FastCDC content-defined chunking — dedup across versions
<span class="dim">-</span> <span class="bold">Index:</span>      Hierarchical B-tree — O(1) random access to any byte
<span class="dim">-</span> <span class="bold">Compress:</span>   LZ4 (~2 GB/s) · Zstd (~500 MB/s) · per-block independent
<span class="dim">-</span> <span class="bold">Encrypt:</span>    AES-256-GCM · Ed25519 signing · BLAKE3 hashing

<span class="highlight bold">>> FUSE / NBD MOUNTING</span>
<span class="primary">*</span> <span class="bold">FUSE:</span>       Mount .hxz as block device — transparent read/write
<span class="primary">*</span> <span class="bold">Overlay:</span>    Copy-on-write layer for writable workspaces
<span class="primary">*</span> <span class="bold">Latency:</span>    ~80 μs cached · ~1 ms uncached · <150 MB memory

<span class="highlight bold">>> GIT-LIKE WORKSPACES</span>
<span class="dim">checkout</span>  → mount archive into writable directory
<span class="dim">status</span>   → diff changed blocks against base
<span class="dim">commit</span>   → write only changed blocks as thin delta archive

<span class="highlight bold">>> STORAGE BACKENDS</span>
Local (mmap) · HTTP (range requests) · S3-compatible object storage

<span class="ls-exec">hexz pack ./dataset.bin data.hxz --compression zstd</span>
<span class="ls-exec">hexz mount data.hxz /mnt/data</span>
<span class="ls-exec">hexz checkout data.hxz ./workspace && hexz commit v2.hxz</span>
`
        }
    },
];
