import { config } from '../config.js';

export const builds = [
    {
        id: "unikernel",
        title: "RISC-V Security Unikernel",
        image: "assets/security_kernel.png",
        link: `https://github.com/${config.github}/riscv-security-unikernel`,
        desc: "A bare-metal network security appliance in Rust for RISC-V, running in <span class='highlight'>64 KB of RAM</span>. Count-Min Sketches and HyperLogLogs for flood, subnet and port-scan detection, a flow tracker, Aho-Corasick DPI, and a small <span class='highlight'>BPF-style VM</span> for packet filters uploaded at runtime. All state is statically allocated. An egui control plane sends SipHash-authenticated commands and verifies the kernel's signed reports.",
        tags: ["Rust", "Kernel", "BPF", "Security"],
        terminal: {
            name: "security-unikernel",
            date: "Nov 20",
            size: "94K",
            content: `
<span class="primary bold">PROJECT: RISC-V Security Unikernel</span>
=======================================
A bare-metal packet pipeline in 64 KB of RAM.

<span class="highlight bold">>> PACKET PIPELINE</span>
<span class="dim">①</span> Penalty box     : bans hosts >100 pps, /24s >1k, /16s >5k, port scans
<span class="dim">②</span> Token bucket    : global rate limit
<span class="dim">③</span> Flow table      : 74 five-tuple entries, LRU eviction
<span class="dim">④</span> TCP heuristics  : Xmas and null scans
<span class="dim">⑤</span> BPF VM          : 16 regs, 64 instructions, validated on upload
<span class="dim">⑥</span> Port firewall
<span class="dim">⑦</span> Network stack   : ARP, ICMP echo, SYN cookies
<span class="dim">⑧</span> Payload checks  : x86 and RISC-V NOP sleds
<span class="dim">⑨</span> DPI             : Aho-Corasick plus runtime patterns

<span class="highlight bold">>> DETECTORS</span>
<span class="primary">*</span> Count-Min Sketches (conservative update, decay) for hosts and subnets
<span class="primary">*</span> HyperLogLog for spoofed-source floods
<span class="primary">*</span> Virtual HyperLogLog for port scans

<span class="highlight bold">>> MEMORY</span>
<span class="primary">*</span> 60.4 KB of the 64 KB budget, no heap, PMP W^X
<span class="primary">*</span> Same engine runs as a Linux daemon: ~1.3 Mpps per core

<span class="highlight bold">>> CONTROL PLANE (egui)</span>
SipHash-authenticated commands · signed reports · BPF Studio · traffic generator

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
        desc: "A UCI chess engine in Rust, roughly <span class='highlight'>3650-3750 Elo</span> on the CCRL Blitz scale, estimated from local matches against Carp, Sirius and Stockfish 18. Magic bitboards and PVS alpha-beta with the usual pruning stack. Evaluation is a port of <span class='highlight'>Stockfish 18's NNUE</span>, alongside a self-play pipeline that trains the engine's own network. Includes a terminal coach: games at your level, move-by-move review, puzzles from your mistakes, and opening and endgame drills.",
        tags: ["Rust", "AI"],
        terminal: {
            name: "chess-engine",
            date: "Nov 09",
            size: "~6K",
            content: `
<span class="primary bold">PROJECT: Chess Engine</span>
=======================================
A UCI chess engine in Rust. ~3650-3750 Elo (CCRL Blitz scale).

<span class="highlight bold">>> MOVE GENERATION</span>
<span class="dim">-</span> <span class="bold">Bitboards:</span>  Magic-number lookup for sliding-piece attacks
<span class="dim">-</span> <span class="bold">Ordering:</span>   TT move, captures by SEE, killers, history
<span class="dim">-</span> <span class="bold">Checked:</span>    perft against Stockfish on tricky positions

<span class="highlight bold">>> SEARCH</span>
<span class="primary">*</span> Negamax PVS · iterative deepening · aspiration windows
<span class="primary">*</span> Transposition table (Zobrist) · quiescence search
<span class="primary">*</span> LMR · LMP · null-move · futility · razoring · ProbCut · singular extensions
<span class="primary">*</span> Parameters tuned by SPSA, changes tested by SPRT

<span class="highlight bold">>> EVALUATION</span>
<span class="dim">-</span> <span class="bold">Stockfish:</span>  Port of Stockfish 18's big and small networks,
              AVX2 with lazy incremental accumulators
<span class="dim">-</span> <span class="bold">Own net:</span>    (768 -> 128)x2 -> 1, trained from self-play only

<span class="highlight bold">>> STRENGTH (200 games each, 60+0.6)</span>
<span class="dim">vs Carp 3.0.1:</span>        143-57      ≈3690
<span class="dim">vs Sirius 9.0:</span>        148.5-51.5  ≈3710
<span class="dim">vs Stockfish 18:</span>      76.5-123.5  ≈3690

<span class="highlight bold">>> COACH</span>
Play at your level · game review · spaced-repetition puzzles ·
opening repertoire drills · endgame practice · progress stats

<span class="ls-exec">cargo run --release -- play --mode learn</span>
<span class="ls-exec">cargo run --release -- perft 5</span>
`
        }
    },
    {
        id: "sat-solver",
        title: "CDCL SAT Solver",
        image: null,
        link: `https://github.com/${config.github}/sat-solver`,
        desc: "A CDCL SAT solver in Zig: two-watched-literal propagation over a flat clause arena, 1-UIP learning with recursive minimization, Glucose-style restarts, VSIDS, and inprocessing (subsumption, equivalent literals, bounded variable elimination, probing, vivification). Emits <span class='highlight'>DRAT proofs</span>. Of 5,826 SATLIB and DIMACS instances it solves all but the 10 par32 ones, with every model checked against its formula and every UNSAT proof <span class='highlight'>accepted by drat-trim</span>.",
        tags: ["Zig", "Logic", "Algorithms"],
        terminal: {
            name: "sat-solver",
            date: "Nov 04",
            size: "~5K",
            content: `
<span class="primary bold">PROJECT: CDCL SAT Solver</span>
=======================================
A CDCL SAT solver in Zig with SAT Competition-format I/O.

<span class="highlight bold">>> SEARCH</span>
<span class="dim">-</span> <span class="bold">BCP:</span>        Two watched literals with blockers, binary fast path
<span class="dim">-</span> <span class="bold">Learning:</span>   1-UIP · recursive minimization (MiniSat litRedundant)
<span class="dim">-</span> <span class="bold">Restarts:</span>   Glucose LBD EMAs · trail-length blocking
<span class="dim">-</span> <span class="bold">Branching:</span>  VSIDS · phase saving · rephasing · chrono backtracking

<span class="highlight bold">>> INPROCESSING (level 0)</span>
<span class="primary">*</span> Subsumption and self-subsuming resolution
<span class="primary">*</span> Equivalent literals (SCCs of the binary implication graph)
<span class="primary">*</span> Bounded variable elimination · failed-literal probing · vivification
<span class="primary">*</span> LBD-based clause database reduction · arena compaction

<span class="highlight bold">>> CORRECTNESS</span>
<span class="primary">*</span> DRAT proofs for UNSAT, checked by drat-trim
<span class="primary">*</span> Every SAT model checked against the original formula
<span class="primary">*</span> 5,816 of 5,826 SATLIB / DIMACS instances solved in 60 s each

<span class="ls-exec">zig build -Doptimize=ReleaseFast</span>
<span class="ls-exec">./zig-out/bin/sat --proof formula.drat formula.cnf</span>
`
        }
    },
    {
        id: "maxcut-sdp",
        title: "Max-Cut SDP Solver",
        image: null,
        link: `https://github.com/${config.github}/maxcut-sdp`,
        desc: "A from-scratch <span class='highlight'>Goemans-Williamson</span> Max-Cut solver in Rust. The SDP relaxation is solved by a primal-dual <span class='highlight'>interior-point method</span> or, for large graphs, a low-rank <span class='highlight'>Burer-Monteiro</span> solver, and the upper bound it reports is certified by a dual solution. The linear algebra is hand-written, with no BLAS. On 15 Gset instances of up to 20,000 nodes the median gap to the best-known cut is 0.65%.",
        tags: ["Rust", "Optimization", "Algorithms"],
        terminal: {
            name: "maxcut-sdp",
            date: "Nov 21",
            size: "~4K",
            content: `
<span class="primary bold">PROJECT: Max-Cut SDP Solver</span>
=======================================
Goemans-Williamson 0.878-approximation for Max-Cut.

<span class="highlight bold">>> SDP SOLVERS</span>
<span class="dim">-</span> <span class="bold">Interior point:</span> Primal-dual · Nesterov-Todd scaling · Schur complement
<span class="dim">-</span> <span class="bold">Burer-Monteiro:</span> Low-rank X=RR^T · nonlinear CG · up to 20k nodes
<span class="dim">-</span> <span class="bold">Bound:</span>          Certified by a dual solution (BM: up to 3,000 nodes)

<span class="highlight bold">>> ROUNDING</span>
<span class="primary">*</span> Random hyperplane rounding (Zwick outward rotations optional)
<span class="primary">*</span> One-flip local search · iterated local search
<span class="primary">*</span> Parallel population refinement under a time budget

<span class="highlight bold">>> LINEAR ALGEBRA</span>
Cholesky · Jacobi eigendecomposition · matrix square root.
No BLAS/LAPACK; just clap, rand, rayon as dependencies.

<span class="highlight bold">>> GSET BENCHMARKS</span>
<span class="dim">Median gap:</span> 0.65% from best-known values
<span class="dim">11 of 15</span>  instances within 1% of best-known
<span class="dim">Runtime:</span>   10s (800 nodes) to 660s (20,000 nodes)

<span class="ls-exec">./target/release/maxcut-sdp graph.txt --solver bm --time 300</span>
<span class="ls-exec">./target/release/maxcut-sdp graph.txt --solver ipm --exact</span>
`
        }
    },
];
