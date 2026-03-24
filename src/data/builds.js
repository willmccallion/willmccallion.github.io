import { config } from '../config.js';

export const builds = [
    {
        id: "eithne",
        title: "x86_64 OS Kernel",
        image: "assets/kernel.png",
        link: `https://github.com/${config.github}/Eithne`,
        desc: "x86_64 OS kernel in Rust, booting via UEFI. <span class='highlight'>O(1) buddy frame allocator</span> with XOR bitmap coalescing, per-size-class slab heap, 4-level page tables, 256-entry IDT with hand-written assembly stubs, and a <span class='highlight'>preemptive round-robin scheduler</span> with assembly context switching.",
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
        image: "assets/chess.png",
        link: `https://github.com/${config.github}/chess`,
        desc: "UCI-compliant chess engine in Rust, ~<span class='highlight'>2900 ELO</span>. <span class='highlight'>Magic bitboards</span> for O(1) sliding-piece move generation, PVS alpha-beta with a full pruning stack, and NNUE evaluation with SIMD-accelerated incremental accumulator updates. Only changed pieces re-evaluated per move.",
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
        id: "netpath",
        title: "netpath — Network Path Analyser",
        image: "assets/netpath.png",
        link: `https://github.com/${config.github}/netpath`,
        desc: "Network diagnostic tool in C. Traces the full path to a host with <span class='highlight'>security-relevant observations</span> at every layer: DNS, routing, TLS, HTTP, and anycast. DNS wire format, ICMP/UDP/TCP probing, TLS handshake parsing, and X.509 DER decoding all written from scratch. <span class='highlight'>No external dependencies</span>, <span class='highlight'>zero heap allocation</span>, single 4 MiB bump-pointer arena.",
        tags: ["C", "Networking", "Security"],
        terminal: {
            name: "netpath",
            date: "Mar 15",
            size: "~8K",
            content: `
<span class="primary bold">PROJECT: netpath — Network Path Analyser</span>
=======================================
Single command. Five layers. Security flags with remediation hints.

<span class="highlight bold">>> PHASES</span>
<span class="dim">-</span> <span class="bold">DNS:</span>        A/AAAA resolution · CNAME chains · DNSSEC · TTL
<span class="dim">-</span> <span class="bold">Route:</span>      ICMP/UDP/TCP traceroute · Paris (ECMP-stable) · ASN · bar chart RTT
<span class="dim">-</span> <span class="bold">TLS:</span>        Partial handshake · version/cipher · X.509 SANs · OCSP staple
<span class="dim">-</span> <span class="bold">HTTP:</span>       GET · HSTS · CSP · X-Frame-Options · X-Content-Type-Options
<span class="dim">-</span> <span class="bold">Anycast:</span>    ECMP probe variation · TTL/cert serial/RTT divergence detection

<span class="highlight bold">>> DESIGN</span>
<span class="primary">*</span> <span class="bold">No dependencies:</span>  DNS, ICMP, TLS, HTTP, X.509 all from scratch
<span class="primary">*</span> <span class="bold">No heap:</span>          4 MiB bump-pointer arena — zero malloc() anywhere
<span class="primary">*</span> <span class="bold">Bounds checked:</span>   DNS compression loop bitmap · ASN.1 length validation · HTTP cap
<span class="primary">*</span> <span class="bold">Arch opts:</span>        x86_64 NASM (checksum, byte search, timestamps) · aarch64/riscv64 C fallback

<span class="highlight bold">>> SECURITY FLAGS (35+ across all phases)</span>
<span class="dim">DNS</span>     No DNSSEC · short TTL · CNAME depth · NXDOMAIN · SERVFAIL
<span class="dim">Route</span>   Routing loop · blackhole · excessive hops · private hops
<span class="dim">TLS</span>     Weak cipher · old version · expired cert · short key · no OCSP
<span class="dim">HTTP</span>    Missing HSTS · no CSP · insecure cookies · server version leak
<span class="dim">Anycast</span> Detected · inconsistent PoP responses

<span class="ls-exec">netpath google.com</span>
<span class="ls-exec">netpath --json --no-http example.com | jq .dns</span>
<span class="ls-exec">netpath -v --dnssec --show-asn 8.8.8.8</span>
`
        }
    },
    {
        id: "pbuild",
        title: "pbuild — Parallel Build System",
        image: "assets/pbuild.png",
        link: `https://github.com/${config.github}/pbuild-rs`,
        desc: "Incremental parallel build system in Rust. Rules declared in <span class='highlight'>pbuild.toml</span>, inputs SHA-256 hashed to skip unchanged work. Independent rules run in parallel on a wave-based topological scheduler over a Rayon thread pool. Depfile header tracking, named profiles, <span class='highlight'>shell completions</span>, watch mode, and Graphviz dependency graph.",
        tags: ["Rust", "Tools", "Build Systems"],
        terminal: {
            name: "pbuild",
            date: "Mar 07",
            size: "~3K",
            content: `
<span class="primary bold">PROJECT: pbuild — Parallel Build System</span>
=======================================
Hash-based incremental builds. Wave-parallel execution.

<span class="highlight bold">>> HOW IT WORKS</span>
<span class="dim">-</span> <span class="bold">Inputs:</span>     SHA-256 hashed; rules skipped when all hashes match lock file
<span class="dim">-</span> <span class="bold">Scheduler:</span>  Topological waves — all ready rules run in parallel (Rayon)
<span class="dim">-</span> <span class="bold">Output:</span>     Single rule → live stream; multiple rules → atomic buffered

<span class="highlight bold">>> FEATURES</span>
<span class="primary">*</span> <span class="bold">Depfiles:</span>   Injects -MF; discovers & tracks transitive header deps
<span class="primary">*</span> <span class="bold">Profiles:</span>   [config.profiles.ci] — switch presets with -p
<span class="primary">*</span> <span class="bold">Watch:</span>      Rebuilds on file change (notify)
<span class="primary">*</span> <span class="bold">Graph:</span>      ASCII tree + Graphviz DOT export

<span class="highlight bold">>> CLI</span>
<span class="ls-exec">pbuild                  # build default target</span>
<span class="ls-exec">pbuild fmt lint test    # multi-target sequential</span>
<span class="ls-exec">pbuild graph --dot | dot -Tsvg > graph.svg</span>
<span class="ls-exec">pbuild --watch          # rebuild on change</span>
<span class="ls-exec">pbuild retry            # re-run last failed target</span>
`
        }
    },
    {
        id: "hypercube",
        title: "Hypercube Network Simulator",
        image: null,
        link: `https://github.com/${config.github}/hypercube`,
        desc: "Packet routing simulator for <span class='highlight'>n-dimensional hypercube</span> networks in Rust. Compares bit-fixing and <span class='highlight'>Valiant's randomized routing</span> across adversarial traffic patterns (bit-reversal, complement, transpose, butterfly, shuffle). Supports fault-tolerant routing around failed nodes/links and sweep mode for batch parameter studies with CSV export.",
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
<span class="dim">-</span> <span class="bold">Bit-fixing:</span>  Greedy — flip mismatched bits left to right
<span class="dim">-</span> <span class="bold">Valiant:</span>     Randomized two-phase — route via random intermediate
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
        desc: "<span class='highlight'>Goemans-Williamson</span> Max-Cut approximation in Rust. Solves the SDP relaxation via a primal-dual <span class='highlight'>interior point method</span> with Nesterov-Todd scaling, plus a scalable <span class='highlight'>Burer-Monteiro</span> low-rank solver for larger instances. All linear algebra (Cholesky, eigendecomposition, matrix square roots) written from scratch with no BLAS/LAPACK. Tested on Gset benchmarks up to 20,000 nodes.",
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
<span class="dim">-</span> <span class="bold">Burer-Monteiro:</span> Low-rank X=RR^T factorization · nonlinear CG · scales to 14k+ nodes

<span class="highlight bold">>> ROUNDING</span>
<span class="primary">*</span> Random hyperplane rounding
<span class="primary">*</span> Zwick outward rotations · iterated local search
<span class="primary">*</span> Population-based refinement

<span class="highlight bold">>> LINEAR ALGEBRA (from scratch)</span>
Cholesky · eigendecomposition · matrix square root · no BLAS/LAPACK

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
