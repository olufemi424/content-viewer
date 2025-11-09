---
title: "GPT Evolution: High‑Level Overview + ASCII Diagrams"
date: "2025-11-08"
type: "doc"
topic: ["ai","gpt-evolution"]
slug: "gpt-overview-ascii"
keywords: ["GPT","ASCII diagrams","overview","RLHF","agents","long context","function calling"]
---

```
---
title: "GPT Evolution: High‑Level Overview + ASCII Diagrams"
slug: "gpt-overview-ascii"
publish_date: "2025-11-08"
duration_minutes: 6
audience: "Builders who want the big picture fast"
goal: "Provide a concise, visual map of GPT generations with diagrams only"
keywords: ["GPT","ASCII diagrams","overview","RLHF","agents","long context","function calling"]
---
```

## High‑Level Map
```
User Needs → Capabilities → Components → Architecture → Training → Safety
    |            |              |             |           |
    v            v              v             v           v
 Overview   Quick reference   Blocks     Flow diagrams   Details
 (this)                                          (for depth, see 10-consolidated)
```

## Timeline at a Glance
```
2018      2019         2020           2022           2023          2024          2025
GPT-1  →  GPT-2   →    GPT-3    →   GPT-3.5    →    GPT-4    →   GPT-4.5   →   GPT-5
Proof     Zero-         Few-         RLHF/         Multimodal     Long ctx      Agentic
of concept shot         shot         ChatGPT        + reliable     + optimized   planning
```

---

## ASCII Architecture Diagrams (Condensed)

### GPT‑1 (2018): Basic Transformer Decoder
```
Input Text
  ↓
[Tokenization (BPE)]
  ↓
[Token + Position Embeddings]
  ↓
╔═══════════════════════════════════════╗
║    Transformer Decoder Block (×12)    ║
║  • Masked Self‑Attention              ║
║  • Add & LayerNorm                    ║
║  • Feed‑Forward (GELU)                ║
║  • Add & LayerNorm                    ║
╚═══════════════════════════════════════╝
  ↓
[Linear → Vocab] → [Softmax] → Next token
```

Training flow:
```
[BooksCorpus] → [Unsupervised LM (next token)] → [Pretrained Model]
            → [Supervised Fine‑tune] → [Task‑Specific Model]
```

---

### GPT‑2 (2019): Scaled Decoder with Zero‑Shot
```
Input (context: 1024)
  ↓
[Byte‑level BPE] → [Token Emb (1600) + Pos Emb]
  ↓
╔════════════════════════════════╗
║  48 Transformer Decoder Blocks ║
║  • 25 heads, 1600 hidden       ║
║  • 6400 FFN, GELU              ║
╚════════════════════════════════╝
  ↓
[Linear → 50,257] → [Softmax] → [top‑k / top‑p sampling]
```

Zero‑shot pattern:
```
Translate English → French:
sea otter => loutre de mer
cheese    => fromage
calculator =>
```

---

### GPT‑3 (2020): Few‑Shot In‑Context Learning
```
Context Window (2048):
┌─────────────────────────────────────────────────────┐
│ System/Task description (optional)                  │
├─────────────────────────────────────────────────────┤
│ Few‑shot examples                                   │
│ Q: 2+2? A: 4  |  Q: 5+3? A: 8  |  ...               │
├─────────────────────────────────────────────────────┤
│ Query: Q: 12+7?  A:                                 │
└─────────────────────────┬───────────────────────────┘
                          ↓
                   Model generates: 19
```

---

### GPT‑3.5 (2022): Instruction + RLHF Pipeline
```
Stage 1: SFT (Supervised Fine‑Tuning)
GPT‑3 base → High‑quality demos (~13k) → SFT model

Stage 2: Reward Model (RM)
Prompt → 4–9 completions → Humans rank → Train 6B RM

Stage 3: RLHF (PPO)
Policy (from SFT) → Generate → Score by RM − KL → Update → Iterate
Result: Helpful / Harmless / Honest (ChatGPT)
```

---

### GPT‑4 (2023): Multimodal + Function Calling
Text + Vision pipeline:
```
Text Input              Image Input
   ↓                        ↓
[Tokenizer]            [Vision Encoder]
   ↓                        ↓
[Text Emb]             [Image Emb]
       └─────────┬─────────┘
                 ↓
        [Large Transformer Decoder]
                 ↓
            [Output Head]
                 ↓
            Generated Text
```

Function calling flow:
```
User asks → Model emits function call (JSON schema) → System executes tool
  → Returns structured result → Model composes final answer
```

---

### GPT‑4.5 (2024): Long Context Optimization (128k)
```
Dense Attention: O(n²)   →   Optimized Attention (speculated):
• Flash Attention        • Sliding Window (local patterns)
• KV‑cache optimization  • Sparse attention (strategic)
• Speculative decoding   • Cache/compress distant tokens
```

Attention pattern visualization:
```
Dense (all‑to‑all) vs Sparse (strategic) → lower cost with similar utility
```

---

### GPT‑5 (2025): Agentic Orchestration
Full agentic loop:
```
Goal
  ↓
[PLANNER] → [RETRIEVER] ↔ [TOOL ROUTER]
                      ↓          ↓
                 [Knowledge]   [Tools: web, code, DB, vision]
                      ↓          ↓
                   [REASONER/SOLVER]
                      ↓
                   [VERIFIER/CRITIC]
                      ↓
                 Pass?  Yes → Output
                         No → Retry with feedback
```

Self‑verification (consistency across paths/tools):
```
Claim → Multiple reasoning paths / tool checks → Consistency check → Confidence
```

---

## Notes
- This file is a condensed, diagram‑first overview.
- For the full narrative + practical playbook, see: `10-gpt-evolution-consolidated.md`.
