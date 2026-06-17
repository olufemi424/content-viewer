## ASCII Components of GPT Generations

Compact block diagrams of the major components and training/inference loops.

### GPT‑1 (2018): Decoder‑only LM
```
[Text] -> [BPE Tokenizer] -> [Token IDs] -> [Token Embeddings] + [Positional Encodings]
             |
      +------v-----------------------------------------------------------+
      |           Repeated N times (Transformer Decoder Block)          |
      |  +----------------+     +-----------------+     +-------------+ |
      |  | Masked Self-   | --> | Add & LayerNorm| --> | Feed-Forward| |
      |  | Attention      |     | (residual)     |     | Network     | |
      |  +----------------+     +-----------------+     +-------------+ |
      +---------------------------------------------------------------+-+
                                                                      |
                                                     +-----------------v-+
                                                     | Linear + Softmax |
                                                     +-------------------+
                                                                 |
                                                           Next-token p(y)
```

### GPT‑2 (2019): Scaled decoder, longer context
```
[WebText] -> [BPE] -> [Embeddings] + [Positional] -> [Deeper/Wider Decoder Stack (N~48)]
                                                -> [Top-k / Top-p Sampling at Inference]
```### GPT‑3 (2020): Few‑shot and In‑Context Learning
```
[Mixed Web/Books/Wiki Corpora] -> [BPE] -> [Large Decoder Stack (~175B params)]
                                             |
                                             v
                               [Context Window ~2k tokens]
                                             |
                    +------------------------+--------------------+
                    | Prompt (task, few-shot examples)           |
                    +------------------------+--------------------+
                                             |
                                      Next-token LM
```

### GPT‑3.5 (2022): Instruction tuning + RLHF
```
[Base GPT-3] --SFT--> [Supervised on Instructions]
     |                         |
     |                         +---> [Reward Model (human prefs)]
     |                                      |
     +-------------- RLHF (PPO) <-----------+
                           |
                     [Aligned Chat Model]
```
### GPT‑4 (2023): Multimodality + Reliability
```
[Text / Images]
     |        \
     |         +--> [Vision Encoder] --+
     v                                 |
[Tokenizer/Embeddings]                 |
     |                                 |
     +----------> [Decoder-Only Transformer (larger, improved)] <------+
                               |                                       |
                               v                                       |
                        [Function Calling / Tools] <---[System/Policy] |
                               |
                         [Linear/Head]
```

### GPT‑4.5 (2024): Throughput + Long Context
```
[Inputs up to ~128k] -> [KV Cache + Speculative Decoding] -> [Stabilized Attention]
                                   |
                             [Lower Latency I/O]
```

### GPT‑5 (2025): Agentic Orchestration
```
+-----------------------------------------------------------------------+
|                         Orchestrator / Planner                        |
+------------------------+------------------+---------------------------+
                         |                  |
                         v                  v
                 [Retriever]          [Tool Router]
                     |                     |
   [Vector DB / Web / Docs]          [Functions | Code | Web | DB | Vision]
                     |                     |
                     +----------+  +-------+
                                v  v
                          [Reasoner / Solver]
                                |
                          [Verifier / Critic]
                                |
                           [Answer / Action]
```
