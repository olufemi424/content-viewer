## GPT Generations: Major Components (Summary)

### GPT‑1 (2018)
- **Tokenization**: BPE over BooksCorpus.
- **Embeddings**: Token embeddings + absolute positional encodings.
- **Core blocks**: Repeated Transformer decoder blocks (masked self‑attention → Add/LayerNorm → feed‑forward/GELU).
- **Objective**: Next‑token language modeling (causal LM) only.
- **Inference**: Greedy/top‑k; short context (≈512–1024 tokens).
- **Outcome**: Proof that scale + self‑supervision works; limited zero‑shot.

### GPT‑2 (2019)
- **Scale-up**: Deeper/wider decoder (up to ~1.5B params, ~48 layers).
- **Data**: WebText (diverse high‑quality web links).
- **Context**: 1024 tokens.
- **Sampling controls**: Top‑k and nucleus (top‑p) sampling popularized.
- **Outcome**: Stronger zero‑shot generation; coherence improves; drift and hallucinations persist.

### GPT‑3 (2020)
- **Scale**: ~175B parameters; larger, stabilized training.
- **Data mix**: Common Crawl (filtered), Books, Wikipedia, WebText2.
- **Context**: ~2048 tokens.
- **Key capability**: In‑Context Learning (zero/one/few‑shot via prompts—prompt as “program”).
- **Outcome**: Broad task coverage via prompting; prompt brittleness and hallucinations remain.
### GPT‑3.5 (2022)
- **Instruction tuning**: SFT on curated instruction datasets.
- **Alignment**: Reward Model trained on human preferences; RLHF (PPO) to optimize helpfulness/harmlessness.
- **Context options**: 4k and 16k.
- **Outcome**: Much better instruction following and chat stability; still hallucinates under pressure.

### GPT‑4 (2023)
- **Architecture**: Heavily optimized decoder; [Speculation] sparse/MoE features.
- **Multimodality**: Vision inputs via separate encoder aligned to the decoder.
- **Long context**: 8k/32k; stronger attention stability.
- **Ecosystem**: Function calling/tools, system prompts, moderated policies.
- **Outcome**: Marked gains in reasoning, coding, and reliability; non‑trivial cost/latency.

### GPT‑4.5 (2024)
- **Throughput**: KV‑cache optimization, speculative decoding.
- **Context**: Up to ~128k tokens variants.
- **Outcome**: Faster, cheaper, more grounded outputs; better schema adherence.

### GPT‑5 (2025)
- **Agentic orchestration**: Planner → retriever → tool router → solver → verifier.
- **Memory**: Long‑horizon context with learned retrieval and working memory.
- **Training**: SFT → RM → RLHF/RLAIF + process‑based supervision and verifier loops.
- **Outcome**: Plans, checks, and acts with calibrated uncertainty; stronger real‑world task completion.
