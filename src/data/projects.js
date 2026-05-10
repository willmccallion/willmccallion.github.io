import { config } from '../config.js';

export const projects = [
    {
        id: "riscv-emulator",
        title: "RISC-V System Emulator",
        image: "assets/rvsim_stats.png",
        link: `https://github.com/${config.github}/rvsim`,
        desc: "Cycle-accurate <span class='highlight'>RV64IMAFDC + V (RVV 1.0)</span> simulator with a full out-of-order superscalar core: physical register file, CAM-style issue queue with wakeup/select, ROB, non-blocking caches with MSHRs, DRAM row-buffer timing, and five branch predictors including TAGE. <span class='highlight'>Sv39 / Sv48 / Sv57</span> virtual memory with hardware page-table walker. Python API for design-space exploration. Passes <span class='highlight'>riscv-tests</span>, <span class='highlight'>riscof</span>, and <span class='highlight'>riscv-vector-tests</span>, and boots Linux to userspace.",
        tags: ["Rust", "Architecture", "Simulation"],
        terminal: {
            name: "rvsim",
            date: "Feb 12",
            size: "224K",
            content: `
<span class="primary bold">PROJECT: RISC-V System Emulator</span>
=======================================
Cycle-accurate RV64IMAFDC + V simulator. Full out-of-order superscalar
pipeline with a composable Python API for architecture research.

<span class="highlight bold">>> OUT-OF-ORDER PIPELINE</span>
<span class="dim">-</span> <span class="bold">Frontend:</span>   Fetch1 → Fetch2 → Decode → Rename (PRF · free list)
<span class="dim">-</span> <span class="bold">Issue:</span>      CAM-style IQ · wakeup/select · speculative load wakeup
<span class="dim">-</span> <span class="bold">FUs:</span>        IntALU ×4 · IntMul · FPU · Branch · Load/Store · VPU
<span class="dim">-</span> <span class="bold">Commit:</span>     ROB · in-order · precise exceptions · mispred recovery

<span class="highlight bold">>> ISA</span>
<span class="primary">*</span> <span class="bold">Base:</span>        RV64IMAFDC
<span class="primary">*</span> <span class="bold">Vector:</span>      RVV 1.0 — integer ALU · FPU · mask · segmented load/store
<span class="primary">*</span>                  reductions · permute · crypto (Zvkn* / Zvks* / Zvkg)
<span class="primary">*</span> <span class="bold">Priv:</span>        M / S / U modes · full CSR set · trap delegation · PMP

<span class="highlight bold">>> MEMORY SYSTEM</span>
<span class="primary">*</span> <span class="bold">Virtual mem:</span> Sv39 / Sv48 / Sv57 · iTLB · dTLB · shared L2 TLB · HW page walker
<span class="primary">*</span> <span class="bold">Caches:</span>     L1i/L1d/L2/L3 · MSHRs · configurable prefetchers
<span class="primary">*</span> <span class="bold">DRAM:</span>       Row-buffer aware timing (tCAS · tRAS · row miss penalty)

<span class="highlight bold">>> BRANCH PREDICTION</span>
Static · GShare · Tournament · Perceptron · TAGE (with loop predictor)

<span class="highlight bold">>> VALIDATION</span>
<span class="dim">-</span> <span class="bold">riscv-tests:</span>          official ISA test suite
<span class="dim">-</span> <span class="bold">riscof:</span>               RISC-V architectural compliance framework
<span class="dim">-</span> <span class="bold">riscv-vector-tests:</span>   RVV correctness suite
<span class="dim">-</span> <span class="bold">Linux:</span>                boots through OpenSBI to a BusyBox shell

<span class="highlight bold">>> PYTHON API</span>
<span class="ls-exec">pip install rvsim</span>
<span class="ls-exec">python scripts/analysis/width_scaling.py --bp TAGE --widths 1 2 4 8</span>
`
        }
    },
];
