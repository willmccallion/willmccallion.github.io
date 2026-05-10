import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "rvsim: RISC-V System Simulator",
        image: "assets/rvsim_stats.png",
        link: `https://github.com/${config.github}/rvsim`,
        desc: `<div style="font-size: 14.5px; color: var(--text-main); line-height: 1.55;">
<p style="margin: 0 0 16px 0;">Cycle-accurate <span class='highlight'>RISC-V system simulator</span> in Rust, around 54,000 lines of code. Two pluggable microarchitectural backends (an out-of-order superscalar core and an in-order scalar one) sit on top of the same memory hierarchy, SoC, and bootloader. The whole simulator is driven from a Python API for design-space exploration.</p>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">VALIDATION</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Passes all <b>8,576 / 8,576 riscv-tests</b> across every pipeline configuration</li>
<li>Passes <b>all riscv-vector-tests</b> at VLEN=128</li>
<li>Passes <b>all RISCOF tests</b> against the spike reference</li>
<li>Boots <b>Linux 6.6</b> through OpenSBI to a BusyBox shell</li>
<li>Out-of-order and in-order backends agree bit-for-bit on architectural state</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">ISA COVERAGE</div>
<ul style="margin: 0; padding-left: 20px;">
<li><b>RV64GC</b> base with full <b>RVV 1.0</b> vector extension</li>
<li>Full vector op coverage: element-wise, mask, segmented load/store, reductions, permute</li>
<li>Bitmanip subset: Zba, Zbb, Zbc, Zbs, Zbkb, Zbkx</li>
<li>Half-precision FP (Zfh) and cache-block ops (Zicbom, Zicboz)</li>
<li>Vector crypto: <b>AES</b> (Zvkned), <b>SHA-2</b> (Zvknha/b), <b>SM3</b> (Zvksh), <b>SM4</b> (Zvksed), <b>GHASH</b> (Zvkg)</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">PRIVILEGED ARCHITECTURE</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Machine, Supervisor, and User modes with trap delegation via medeleg/mideleg</li>
<li>Full machine and supervisor CSR sets</li>
<li><b>PMP</b>: 16 regions, TOR / NA4 / NAPOT, R/W/X/L bits</li>
<li>Precise traps detected at any pipeline stage, recovered via checkpoint</li>
<li>MRET, SRET, WFI, SFENCE.VMA all implemented</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">OUT-OF-ORDER MICROARCHITECTURE</div>
<ul style="margin: 0; padding-left: 20px;">
<li>11-stage pipeline, configurable <b>1 to 8 wide</b></li>
<li><b>64-entry ROB</b>, <b>32-entry CAM-style issue queue</b> with broadcast wakeup and oldest-first arbitration</li>
<li><b>32-entry load queue</b> with memory-ordering violation detection</li>
<li>Physical register files: 256 GPR, 128 FPR, 64 VPR (VLEN bits each)</li>
<li>Speculative + committed rename maps, free-list allocation</li>
<li><b>32-slot checkpointing</b> for O(1) branch recovery</li>
<li>Functional units: 4&times; IntALU, IntMul, IntDiv, 2&times; FpAdd, FpMul, FpFma, FpDivSqrt, Branch, 3 mem ports, 2&times; VecIntALU, VecMul/Div, VecFp/Fma/DivSqrt, VecMem, VecPermute</li>
<li>Memory dependence prediction (Store-Set, Chrysos &amp; Emer 1998) or blind LSQ enforcement</li>
<li>An in-order scalar backend on the same memory hierarchy serves as the IPC baseline</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">MEMORY SYSTEM</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Three-level TLB: 32-entry iTLB and dTLB, 512-entry 4-way shared L2 TLB</li>
<li>Hardware page-table walker for <b>Sv39, Sv48, Sv57</b> with superpages up to 256 TiB</li>
<li>L1i / L1d / L2 / L3 caches, all independently configurable</li>
<li>Replacement: LRU, PLRU, FIFO, Random, MRU. Inclusion: NINE, inclusive, exclusive</li>
<li><b>Non-blocking L1d</b> with MSHRs that coalesce requests and queue waiters per line</li>
<li>Four prefetcher types per level: next-line, stride, stream, tagged</li>
<li>16-entry scalar store buffer with three-way forwarding (hit, miss, partial-overlap stall)</li>
<li>8-entry vector store buffer with byte-mask forwarding</li>
<li><b>DRAM model</b> with per-bank row tracking; row hit costs ~tCAS, row miss costs tPRE + tRAS + tCAS; periodic refresh</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">BRANCH PREDICTION</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Five pluggable predictors: Static, GShare, Tournament, Perceptron, <b>TAGE</b></li>
<li>GShare: 4K entries, 2-bit counters</li>
<li>Tournament: 4K global + 1K local meta-predictor</li>
<li>Perceptron: 1K entries, 32-bit history</li>
<li>TAGE: 8 banks &times; 2K entries, history lengths 5 to 712</li>
<li>SC-L-TAGE variant adds a loop detector, GEHL statistical corrector, and ITTAGE for indirect targets</li>
<li>256-entry 4-way BTB; 8-entry RAS that recognises both x1 and x5 link registers</li>
<li>64-bit checkpointed global history; predictor updates deferred to commit for precise state</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">VECTOR (RVV 1.0)</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Runtime-configurable <b>VLEN</b> from 128 to 2048 bits</li>
<li>All four SEW widths (E8, E16, E32, E64)</li>
<li>All seven LMUL values, fractional and integer (Mf8 through M8)</li>
<li>Tail and masked-off policies: undisturbed or agnostic</li>
<li>Full coverage of integer ALU, FPU, mask, segmented load/store, reductions, permute, and crypto</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">SoC + BOOT</div>
<ul style="margin: 0; padding-left: 20px;">
<li>CLINT (timer + IPI), PLIC (platform interrupt controller)</li>
<li>16550-compatible UART with stdin/stdout integration</li>
<li>VirtIO block device, Goldfish RTC, SYSCON for PSCI power-off/reboot</li>
<li>HTIF for riscv-tests pass/fail signalling</li>
<li>Device tree blob generated automatically from the simulator config</li>
<li>Linux boots via OpenSBI to a BusyBox userspace</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">PYTHON TOOLING</div>
<ul style="margin: 0; padding-left: 20px;">
<li><code>pip install rvsim</code></li>
<li>Python API (PyO3) exposing Config, Cache, BranchPredictor, Environment, and Simulator</li>
<li>Superscalar width scaling sweeps (1 to 8 wide)</li>
<li>Branch-predictor accuracy comparison across all five predictors</li>
<li>Cache size sweeps and full design-space grid search</li>
<li>Stall-cycle attribution and top-down microarchitecture analysis</li>
<li>O3 vs in-order comparison on identical binaries</li>
</ul>

<div style="margin: 16px 0 6px 0; color: var(--highlight-color); font-weight: 700; letter-spacing: 0.04em;">NOTABLE TECHNICAL DECISIONS</div>
<ul style="margin: 0; padding-left: 20px;">
<li>Speculative load wakeup with replay on cache miss</li>
<li>CAM-style issue queue with broadcast wakeup and oldest-first arbitration</li>
<li>Non-blocking L1d with MSHR request coalescing</li>
<li>Store-to-load forwarding with partial-overlap stall detection</li>
<li>Checkpoint-based O(1) branch recovery</li>
<li>Memory dependence prediction via Store-Set (Chrysos &amp; Emer 1998)</li>
<li>Precise trap architecture across every pipeline stage</li>
</ul>
</div>`,
        tags: ["Rust", "Python", "Architecture", "Simulation"],
        terminal: {
            name: "rvsim",
            date: "Feb 12",
            size: "224K",
            content: `
<span class="primary bold">PROJECT: rvsim (RISC-V System Simulator)</span>
=========================================
Cycle-accurate RISC-V system simulator in Rust. Two pluggable
microarchitectural backends sit on top of the same memory hierarchy,
SoC, and bootloader: an out-of-order superscalar core and an in-order
scalar one. Passes the standard RISC-V test suites and boots mainline
Linux. The whole thing is driven from Python for design-space
exploration.

<span class="highlight bold">>> AT A GLANCE</span>
<span class="dim">Code:</span>         ~54k LOC Rust core, Python analysis + bindings (PyO3)
<span class="dim">ISA:</span>          RV64GC + RVV 1.0 + Zb* + Zfh + vector crypto
<span class="dim">Privilege:</span>    M / S / U modes, trap delegation, PMP (16 regions)
<span class="dim">Paging:</span>       Sv39 / Sv48 / Sv57, hardware page-table walker
<span class="dim">Backends:</span>     Out-of-order superscalar (1-8 wide) · in-order scalar
<span class="dim">Caches:</span>       L1i, L1d, L2, L3 (sizes, ways, replacement all configurable)
<span class="dim">Memory:</span>       DRAM model with row-buffer timing and refresh
<span class="dim">Predictors:</span>   Static · GShare · Tournament · Perceptron · TAGE
<span class="dim">SoC:</span>          CLINT · PLIC · 16550 UART · VirtIO block · Goldfish RTC
<span class="dim">Validation:</span>   riscv-tests · riscv-vector-tests · RISCOF · Linux 6.6
<span class="dim">Tooling:</span>      Python API, sweep + plot scripts, top-down analysis

<span class="highlight bold">>> ISA</span>
<span class="primary">*</span> <span class="bold">Base:</span>        RV64IMAFDC
<span class="primary">*</span> <span class="bold">Vector:</span>      RVV 1.0 with full element-wise, mask, segmented,
                          reduction, and permute coverage. Zvbb · Zvbc · Zvfh.
<span class="primary">*</span> <span class="bold">Vec crypto:</span>  Zvkned (AES) · Zvknha/b (SHA-2) · Zvksed (SM4) ·
                          Zvksh (SM3) · Zvkg (GHASH)
<span class="primary">*</span> <span class="bold">Bitmanip:</span>    Zba · Zbb · Zbc · Zbs · Zbkb · Zbkx
<span class="primary">*</span> <span class="bold">FP:</span>          Zfh (half-precision)
<span class="primary">*</span> <span class="bold">Cache ops:</span>   Zicbom · Zicboz

<span class="highlight bold">>> PRIVILEGED ARCHITECTURE</span>
<span class="dim">-</span> <span class="bold">Modes:</span>       Machine / Supervisor / User
<span class="dim">-</span> <span class="bold">CSRs:</span>        Full machine, supervisor, FP, and vector CSR sets
<span class="dim">-</span> <span class="bold">Delegation:</span>  medeleg / mideleg routing to S-mode
<span class="dim">-</span> <span class="bold">PMP:</span>         16 regions · TOR / NA4 / NAPOT · R/W/X/L bits
<span class="dim">-</span> <span class="bold">Traps:</span>       Detected at fetch / decode / execute / memory and
                       made precise via checkpoint recovery.
                       MRET / SRET / WFI / SFENCE.VMA all implemented.

<span class="highlight bold">>> MEMORY SYSTEM</span>
<span class="dim">-</span> <span class="bold">TLB hierarchy:</span>
                       iTLB 32-entry direct-mapped · dTLB 32-entry DM
                       Shared L2 TLB 512-entry, 4-way, 4-cycle latency
<span class="dim">-</span> <span class="bold">Page walker:</span> Hardware-managed. Superpages at 2 MiB, 1 GiB,
                       512 GiB, and 256 TiB. A/D bits handled at commit.
<span class="dim">-</span> <span class="bold">Caches:</span>      L1i, L1d, L2, L3, all independently configurable.
                       Replacement: LRU · PLRU · FIFO · Random · MRU.
                       Inclusion: NINE / inclusive / exclusive.
<span class="dim">-</span> <span class="bold">L1d:</span>         Non-blocking. MSHRs do request coalescing with
                       per-line waiter queues.
<span class="dim">-</span> <span class="bold">Prefetchers:</span> Next-line · stride · stream · tagged (per level)
<span class="dim">-</span> <span class="bold">Store buffer:</span>
                       16-entry scalar with three-way forwarding (hit,
                       miss, partial-overlap stall). 8-entry vector with
                       byte-mask forwarding.
<span class="dim">-</span> <span class="bold">DRAM:</span>        Per-bank row tracking. Row hit costs about tCAS,
                       row miss costs tPRE + tRAS + tCAS. Periodic
                       refresh via tREFI / tRFC.

<span class="highlight bold">>> OUT-OF-ORDER PIPELINE  (11 stages, 1-8 wide)</span>
<span class="dim">Frontend:</span>     Fetch1 → Fetch2 → Decode → Rename
<span class="dim">Backend:</span>      Issue → Execute → Memory1 → Memory2 → Writeback → Commit
<span class="dim">ROB:</span>          64 entries, in-order commit, precise exceptions
<span class="dim">Issue queue:</span>  32-entry CAM, broadcast wakeup, oldest-first select
<span class="dim">Load queue:</span>   32 entries, memory-ordering violation detection
<span class="dim">PRF:</span>          256 GPR · 128 FPR · 64 VPR (VLEN-bit) with ready bits
<span class="dim">Rename:</span>       Speculative + committed maps, free-list allocation
<span class="dim">Checkpoints:</span>  32 slots, O(1) branch recovery
<span class="dim">FUs:</span>          IntALU ×4 · IntMul · IntDiv · FpAdd ×2 · FpMul · FpFma
              FpDivSqrt · Branch · Mem ×3 · VecIntALU ×2 · VecMul/Div
              VecFp / Fma / DivSqrt · VecMem · VecPermute
<span class="dim">Memory deps:</span> Blind (default), Store-Set predictor, LSQ enforcement

<span class="highlight bold">>> IN-ORDER PIPELINE  (7 stages, 1 wide)</span>
Fetch1 → Fetch2 → Decode → Rename → Issue → Execute → Memory → Writeback → Commit
Scoreboard-blocked single issue. Shares the memory hierarchy and CSRs
with the O3 backend. Used as a baseline for IPC and stall-breakdown
comparisons.

<span class="highlight bold">>> BRANCH PREDICTION</span>
<span class="primary">*</span> Static · GShare (4K, 2-bit) · Tournament (4K global, 1K local meta)
<span class="primary">*</span> Perceptron (1K entries, 32-bit history)
<span class="primary">*</span> TAGE (8 banks × 2K, history lengths 5 to 712)
<span class="primary">*</span> SC-L-TAGE adds loop detector, GEHL statistical corrector, ITTAGE
<span class="primary">*</span> BTB: 256 entries, 4-way · RAS: 8 entries (recognises x1 and x5)
<span class="primary">*</span> GHR: 64-bit, checkpointed. Predictor updates deferred to commit.

<span class="highlight bold">>> VECTOR (RVV 1.0)</span>
<span class="dim">VLEN:</span>         128 to 2048 bits, default 128, runtime-configurable
<span class="dim">SEW:</span>          E8 / E16 / E32 / E64
<span class="dim">LMUL:</span>         Mf8 · Mf4 · Mf2 · M1 · M2 · M4 · M8 (fractional + integer)
<span class="dim">Policies:</span>     Tail-undisturbed / agnostic, masked-off-undisturbed / agnostic
<span class="dim">Coverage:</span>     Integer ALU, FPU, mask ops, segmented load/store,
              reductions, permute, crypto (AES, SHA-2, SM3, SM4, GHASH)

<span class="highlight bold">>> SoC</span>
<span class="dim">CLINT:</span>        Timer + IPI @ 0x0200_0000
<span class="dim">PLIC:</span>         Platform-level interrupt controller
<span class="dim">UART:</span>         16550-compatible @ 0x1000_0000, stdin/stdout integration
<span class="dim">VirtIO blk:</span>   MMIO @ 0x9000_0000, full virtio-block spec
<span class="dim">Goldfish RTC:</span> Real-time clock
<span class="dim">SYSCON:</span>       PSCI power-off / reboot
<span class="dim">HTIF:</span>         Host-target interface (riscv-tests pass/fail signalling)
<span class="dim">DTB:</span>          Device tree generated automatically from the config

<span class="highlight bold">>> VALIDATION</span>
<span class="primary">*</span> <span class="bold">riscv-tests:</span>          8,576 / 8,576 pass across all pipeline configs
<span class="primary">*</span> <span class="bold">riscv-vector-tests:</span>   all pass at VLEN=128
<span class="primary">*</span> <span class="bold">RISCOF:</span>               all tests pass against the spike reference
<span class="primary">*</span> <span class="bold">Linux:</span>                6.6 boots through OpenSBI to a BusyBox shell
<span class="primary">*</span> <span class="bold">Cross-check:</span>          O3 and in-order backends agree bit-for-bit on
                              architectural state

<span class="highlight bold">>> PYTHON API  (PyO3)</span>
<span class="ls-exec">pip install rvsim</span>

from rvsim import Config, Cache, BranchPredictor, Environment

config = Config(
    width=4,
    branch_predictor=BranchPredictor.TAGE(),
    l1d=Cache("32KB", ways=8, mshr_count=8),
    l2=Cache("256KB", ways=8, latency=10),
)
result = Environment(binary="prog.elf", config=config).run()
result.stats.query("ipc|branch|miss")

<span class="highlight bold">>> ANALYSIS SCRIPTS</span>
<span class="ls-exec">python scripts/analysis/width_scaling.py     # 1-8 wide IPC curve</span>
<span class="ls-exec">python scripts/analysis/branch_predict.py    # predictor comparison</span>
<span class="ls-exec">python scripts/analysis/cache_sweep.py       # L1d size vs miss rate</span>
<span class="ls-exec">python scripts/analysis/design_space.py      # width × cache grid sweep</span>
<span class="ls-exec">python scripts/analysis/stall_breakdown.py   # cycle attribution</span>
<span class="ls-exec">python scripts/analysis/top_down.py          # top-down microarch analysis</span>
<span class="ls-exec">python scripts/analysis/o3_inorder.py        # backend comparison</span>

<span class="highlight bold">>> NOTABLE</span>
<span class="primary">*</span> Speculative load wakeup with replay on cache miss
<span class="primary">*</span> CAM-style issue queue with broadcast wakeup and oldest-first select
<span class="primary">*</span> Non-blocking L1d with MSHR request coalescing and waiter queues
<span class="primary">*</span> Store-to-load forwarding with partial-overlap stall detection
<span class="primary">*</span> Checkpoint-based O(1) branch recovery
<span class="primary">*</span> Memory dependence prediction (Store-Set, Chrysos & Emer 1998)
<span class="primary">*</span> Precise trap architecture across every pipeline stage
`
        }
    },
];
