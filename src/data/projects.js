import { config } from '../config.js';

export const projects = [
    {
        id: "vlsi",
        title: "PARE (Placement and Routing)",
        image: "assets/bp_quad_routed.png",
        link: `https://github.com/${config.github}/vlsi-physical-design`,
        desc: `<div style="color: var(--text-main); line-height: 1.6;">
<p style="margin: 0 0 20px 0; font-size: 13px;">A placement and routing engine for digital ICs, written from scratch in Rust. From a floorplan it does what <span class='highlight'>OpenROAD-flow-scripts</span> does: netlist repair, timing-driven placement, clock trees, setup and hold repair, and global and detailed routing, then checks the result against the technology's design rules. Every routed design is also checked by OpenROAD's own <code>check_drc</code>, with a fix for one of its bugs applied.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">CLEAN AT 1.55M CELLS</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Nine Nangate45 designs, from gcd to <b>bp_quad</b></li>
<li>bp_quad: BlackParrot quad-core, 220 SRAM macros</li>
<li><b>Zero violations</b> by PARE's checker and OpenROAD's <code>check_drc</code></li>
<li>bp_quad placed and routed in 3 h 26 min</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">AGAINST OPENROAD'S ROUTER</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Both routers route the same placements</li>
<li>Both leave every design clean</li>
<li>OpenROAD uses 3 to 5% less wire</li>
<li>PARE is <b>4 to 7 times faster</b> and uses less memory</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">AGAINST OPENROAD-FLOW-SCRIPTS</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Both start from the same floorplan</li>
<li>Worst slack <b>within 0.02 ns</b> on aes, ibex and jpeg</li>
<li>Ahead on ariane133: -0.21 ns against -0.35 ns</li>
<li><b>2.9 to 3.6 times</b> less wall time</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">PLACEMENT</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Cells as charges: density field by an <b>FFT Poisson</b> solve</li>
<li>Nesterov's method, as in ePlace and RePlAce</li>
<li>Timing-driven net weights, congestion-driven inflation</li>
<li>OpenDP-style legalization and detailed placement</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">TIMING AND CLOCKS</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>OpenSTA-style timer, SDC read by a small Tcl interpreter</li>
<li>Buffer removal, port buffering, slew and load repair</li>
<li><b>TritonCTS</b>-style clock trees with dummy loads</li>
<li>Setup and hold repair, again on global-route parasitics</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">ROUTING AND DRC</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li><b>CUGR</b>-style global routing: 3D pattern routing, maze reroute</li>
<li><b>TritonRoute</b>-style detailed routing with negotiated repair</li>
<li>FlexGC-style checker: shorts, spacing tables, end-of-line, cuts</li>
<li>Reads LEF/DEF and Bookshelf</li>
</ul>
</div>

</div>
</div>`,
        tags: ["Rust", "EDA", "Algorithms"],
        terminal: {
            name: "vlsi-flow",
            date: "Nov 20",
            size: "69K",
            content: `
<span class="primary bold">PROJECT: PARE (Placement And Routing Engine)</span>
=======================================
Place and route for digital ICs, from floorplan to routed DEF.
No ISPD 2015, 2018 or 2019 design routes clean yet.

<span class="highlight bold">>> PLACEMENT AND TIMING</span>
<span class="dim">-</span> <span class="bold">Netlist:</span>    Remove synthesis buffers · buffer the ports
<span class="dim">-</span> <span class="bold">Global:</span>     Cells as charges, density field by FFT Poisson solve,
              Nesterov's method · timing-driven net weights
<span class="dim">-</span> <span class="bold">Legalize:</span>   OpenDP diamond search · set matching, swaps, mirroring
<span class="dim">-</span> <span class="bold">Clocks:</span>     TritonCTS-style trees · setup and hold repair
<span class="dim">-</span> <span class="bold">Timing:</span>     OpenSTA-style timer with an SDC (Tcl) reader

<span class="highlight bold">>> ROUTING</span>
<span class="primary">*</span> <span class="bold">Global:</span>     CUGR · Steiner trees · 3D pattern routing · maze reroute
<span class="primary">*</span> <span class="bold">Repair:</span>     Design and timing repair on global-route parasitics
<span class="primary">*</span> <span class="bold">Detailed:</span>  TritonRoute · region by region, negotiated repair
<span class="primary">*</span> <span class="bold">DRC:</span>       FlexGC-style · shorts, spacing tables, end-of-line, cuts

<span class="highlight bold">>> RESULTS (0 violations, PARE and OpenROAD check_drc)</span>
<span class="dim">gcd:</span>            676 cells ·   0.7 s
<span class="dim">aes:</span>         16,505 cells ·    39 s
<span class="dim">jpeg:</span>        66,214 cells · 2 min 6 s
<span class="dim">ariane133:</span>  179,806 cells · 11 min 29 s  (132 SRAM macros)
<span class="dim">leon3mp:</span>    312,529 cells · 18 min 21 s
<span class="dim">bp_quad:</span>  1,545,147 cells · 3 h 26 min  (220 SRAM macros)

<span class="highlight bold">>> AGAINST OPENROAD</span>
<span class="primary">*</span> Same placements: OpenROAD's router uses 3-5% less wire,
  PARE's is 4-7x faster
<span class="primary">*</span> Whole flow: worst slack within 0.02 ns of OpenROAD-flow-scripts
  on aes, ibex and jpeg, ahead on ariane133, 2.9-3.6x faster

<span class="ls-exec">cargo run --release -- run aes</span>
<span class="ls-exec">cargo run --release -- check aes --placement output/aes/routed.def</span>
`
        }
    },
    {
        id: "riscv-emulator",
        title: "rvsim: RISC-V System Simulator",
        image: "assets/rvsim_stats.png",
        link: `https://github.com/${config.github}/rvsim`,
        desc: `<div style="color: var(--text-main); line-height: 1.6;">
<p style="margin: 0 0 20px 0; font-size: 13px;">Cycle-level <span class='highlight'>RISC-V system simulator</span> in Rust. Two pluggable microarchitectural backends (an out-of-order superscalar core and an in-order one) share one frontend, memory hierarchy and SoC. It boots Linux 6.6 on eight coherent cores, and the whole simulator is driven from a Python API for design-space exploration. Calibrated to the Cortex-A72, it runs CoreMark within 6% of a Raspberry Pi 4.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">VALIDATED AGAINST THE SPEC</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Passes all <b>188 riscv-tests</b></li>
<li>Passes the <b>riscv-vector-tests</b> suite</li>
<li>Vector ops cross-checked against <b>spike</b></li>
<li>Boots <b>Linux 6.6</b> through OpenSBI on both backends</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">TWO PIPELINES, ONE STACK</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Out-of-order superscalar with physical register files</li>
<li>CAM issue queue, ROB, <b>branch checkpoints</b></li>
<li><b>Store-set</b> memory-dependence prediction</li>
<li>In-order baseline on the same frontend and memory</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">REALISTIC MEMORY</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li><b>Sv39 / Sv48 / Sv57</b> with a hardware page walker</li>
<li>Non-blocking caches at every level with <b>MSHR coalescing</b></li>
<li>Row-buffer DRAM or a <b>JEDEC DDR5</b> controller</li>
<li>Four prefetcher types per cache level</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">MULTI-CORE</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Private caches behind a <b>MESI</b> coherence fabric</li>
<li>Broadcast or snoop-filter home agent at the LLC</li>
<li>Crossbar, ring, mesh, torus or hypercube interconnect</li>
<li>Boots <b>8 SMP cores</b> over a mesh with DDR5-5600</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">BRANCH PREDICTION</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Seven predictors, from static to <b>TAGE</b></li>
<li><b>TAGE-SC-L</b> with ITTAGE for indirect targets</li>
<li>Defaults to Seznec's 64 KB CBP-5 configuration</li>
<li>RAS recognises both x1 and x5 as link registers</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">RVV 1.0 + VECTOR CRYPTO</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li>Configurable VLEN (default 256), ELEN 64</li>
<li>Zvfh half-precision, Zvbb / Zvbc bit manipulation</li>
<li>Crypto: <b>AES, SHA-2, SM3, SM4, GHASH</b></li>
<li>Bitmanip: Zba, Zbb, Zbc, Zbs, Zbkb, Zbkx</li>
</ul>
</div>

<div style="border-left: 2px solid var(--highlight-color); background: rgba(255,255,255,0.02); padding: 12px 16px;">
<div style="font-size: 10px; color: var(--text-dim); letter-spacing: 0.18em; font-weight: 600; margin-bottom: 8px;">PYTHON DESIGN-SPACE EXPLORATION</div>
<ul style="margin: 0; padding-left: 16px; font-size: 13px;">
<li><code>pip install rvsim</code> drives the simulator from Python</li>
<li>Parallel sweeps over binaries and configurations</li>
<li>Cycle-by-cycle control and pipeline snapshots</li>
<li><b>Top-down microarchitecture analysis</b></li>
</ul>
</div>

</div>
</div>`,
        tags: ["Rust", "Python", "Architecture", "Simulation"],
        terminal: {
            name: "rvsim",
            date: "Nov 10",
            size: "224K",
            content: `
<span class="primary bold">PROJECT: rvsim (RISC-V System Simulator)</span>
=========================================
Cycle-level RISC-V system simulator in Rust. Two pluggable
microarchitectural backends share one frontend, memory hierarchy
and SoC: an out-of-order superscalar core and an in-order one.
Passes the standard RISC-V test suites and boots Linux on eight
coherent cores. The whole thing is driven from Python for
design-space exploration.

It simulates every cycle but is not cycle-accurate to any one
machine: compute- and branch-bound kernels land within a few
percent of gem5's O3 CPU, and a Cortex-A72 configuration runs
CoreMark within 6% of a Raspberry Pi 4.

<span class="highlight bold">>> AT A GLANCE</span>
<span class="dim">Language:</span>     Rust core, Python bindings (PyO3)
<span class="dim">ISA:</span>          RV64IMAFDC + V (RVV 1.0) + Zb* + Zfh + vector crypto
<span class="dim">Privilege:</span>    M / S / U modes, trap delegation, PMP (16 regions)
<span class="dim">Paging:</span>       Sv39 / Sv48 / Sv57, hardware page-table walker
<span class="dim">Backends:</span>     Out-of-order superscalar · in-order
<span class="dim">Caches:</span>       L1i, L1d, L2, L3, all configurable, non-blocking
<span class="dim">Memory:</span>       Fixed latency · row-buffer DRAM · JEDEC DDR5
<span class="dim">Multi-core:</span>   MESI coherence · crossbar / ring / mesh / torus / hypercube
<span class="dim">Predictors:</span>   Static · GShare · BHT · Tournament · Perceptron · TAGE · TAGE-SC-L
<span class="dim">SoC:</span>          CLINT · PLIC · 16550A UART · VirtIO block · Goldfish RTC
<span class="dim">Validation:</span>   riscv-tests 188/188 · riscv-vector-tests · Linux 6.6

<span class="highlight bold">>> OUT-OF-ORDER BACKEND</span>
<span class="primary">*</span> Physical register files, speculative and committed rename maps
<span class="primary">*</span> Branch checkpoints for recovery
<span class="primary">*</span> CAM-style issue queue, wakeup/select, oldest-first priority
<span class="primary">*</span> Stores issue address and data separately
<span class="primary">*</span> Reorder buffer with precise exceptions
<span class="primary">*</span> Load queue with store-set memory-dependence prediction
<span class="primary">*</span> Store buffer with forwarding · configurable functional units

<span class="highlight bold">>> IN-ORDER BACKEND</span>
Configurable width, scoreboard operand tracking, program-order
issue onto the same functional units. Shares the frontend and the
commit, memory and writeback stages with the O3 backend, so both
run identical workloads and compare directly.

<span class="highlight bold">>> MEMORY SYSTEM</span>
<span class="dim">-</span> <span class="bold">TLBs:</span>        Separate iTLB / dTLB, optional shared L2 TLB
<span class="dim">-</span> <span class="bold">Walker:</span>      PTE reads go through the L1D · Svade or Svadu
<span class="dim">-</span> <span class="bold">Caches:</span>      LRU · PLRU · FIFO · Random · MRU replacement
<span class="dim">-</span> <span class="bold">Inclusion:</span>   Non-inclusive · inclusive · exclusive
<span class="dim">-</span> <span class="bold">MSHRs:</span>       Request coalescing and writeback buffers at every level
<span class="dim">-</span> <span class="bold">Prefetch:</span>    Next-line · stride · stream · tagged (per level)
<span class="dim">-</span> <span class="bold">DRAM:</span>        Row-buffer model or DDR5 with command timing,
               refresh and power-down

<span class="highlight bold">>> BRANCH PREDICTION</span>
<span class="primary">*</span> Seven predictors sharing a BTB, RAS and global history
<span class="primary">*</span> TAGE-SC-L: TAGE, loop predictor, statistical corrector, ITTAGE
<span class="primary">*</span> Defaults to Seznec's 64 KB CBP-5 configuration
<span class="primary">*</span> RAS treats x1 and x5 as link registers, with coroutine swaps

<span class="highlight bold">>> LINUX</span>
Boots Linux 6.6 through OpenSBI to a BusyBox shell on both
backends. Default boot: eight out-of-order cores, 64 KB TAGE-SC-L,
coherent private caches over a mesh, four channels of DDR5-5600.

<span class="highlight bold">>> PYTHON API  (PyO3)</span>
<span class="ls-exec">pip install rvsim</span>

from rvsim import Config, BranchPredictor, Cache, Environment

config = Config(
    width=4,
    branch_predictor=BranchPredictor.Tage(),
    l1d=Cache("32KB", ways=8, latency=1, mshr_count=8),
    l2=Cache("256KB", ways=8, latency=10),
)
result = Environment(binary="qsort.elf", config=config).run()
print(result.stats.query(r"^ipc$|l1d\\.miss_rate"))

<span class="highlight bold">>> ANALYSIS SCRIPTS</span>
<span class="ls-exec">rvsim examples/analysis/branch_predict.py   # all seven predictors</span>
<span class="ls-exec">rvsim examples/analysis/cache_sweep.py      # L1D size vs miss rate</span>
<span class="ls-exec">rvsim examples/analysis/width_scaling.py    # IPC vs width</span>
<span class="ls-exec">rvsim examples/analysis/design_space.py     # width x cache sweep</span>
<span class="ls-exec">rvsim examples/analysis/stall_breakdown.py  # stall cycles by cause</span>
<span class="ls-exec">rvsim examples/analysis/top_down.py         # top-down analysis</span>
<span class="ls-exec">rvsim examples/analysis/o3_inorder.py       # backend comparison</span>
`
        }
    },
];
