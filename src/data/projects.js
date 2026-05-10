import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "rvsim: RISC-V System Simulator",
        image: "assets/rvsim_stats.png",
        link: `https://github.com/${config.github}/rvsim`,
        desc: "Cycle-accurate <span class='highlight'>RISC-V system simulator</span> in Rust. Two microarchitectural backends (out-of-order superscalar and in-order scalar) sit on top of one memory hierarchy, SoC, and bootloader. Full <span class='highlight'>RV64GC + RVV 1.0</span> with Zb*, Zfh, and vector crypto; M/S/U privilege; <span class='highlight'>Sv39 / Sv48 / Sv57</span> virtual memory; L1/L2/L3 caches with non-blocking MSHRs; DRAM row-buffer timing; and five branch predictors including TAGE. Passes <span class='highlight'>riscv-tests</span>, <span class='highlight'>riscv-vector-tests</span>, and <span class='highlight'>RISCOF</span>. Boots <span class='highlight'>Linux 6.6</span> through OpenSBI to a BusyBox shell. Driveable from Python for design-space exploration.",
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
