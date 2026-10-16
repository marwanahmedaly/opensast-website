# OpenSAST: An Evidence-Grounded, Locally Hosted Hybrid Static Analysis System for Python Vulnerabilities

**Report:** Phase-2 Final Project Report  
**Students:**  
Marwan Aly — 25TFGF  
Abdelazez Mohamed Azez — 25FFPW  
Mohamed Mahmoud Reda — 25KQSH  
**Supervisor:** Dr. Bram Adams  
**School:** School of Computing  
**University:** Queen’s University  
**Degree:** Master’s degree  
**Submission date:** 20 October 2026

**Source code:** [https://github.com/marwanahmedaly/opensast](https://github.com/marwanahmedaly/opensast)  
**Project website:** [https://marwanahmedaly.github.io/opensast-website/](https://marwanahmedaly.github.io/opensast-website/)

<a id="abstract"></a>

## Abstract

This thesis investigates local-first, language-model-based static application security testing for four Python weakness classes: path traversal, operating-system command injection, cross-site scripting and SQL injection. OpenSAST combines stock CodeQL, reusable custom suspect queries and template analysis with automatic repository context collection and local Qwen verification. The system is evaluated separately on 31-project and seven-project repository panels and a 293-test four-CWE OWASP Python benchmark. Against stock CodeQL, OpenSAST achieves higher labeled-case recall and F1 in all three evaluations; precision improves in two evaluations and is slightly lower in the 31-project panel. On OWASP, recall increases from 49.1% to 72.8% and F1 from 45.9% to 62.6%. These gains coexist with substantial false-alert burden, missed XSS discovery patterns and high processing cost. Repository findings were initially adjudicated by an AI coding agent; the project author reported subsequent human confirmation, without a formal agreement measurement. All evaluation sets had prior development or investigation exposure, and repository scores cover selected operations rather than exhaustive repository truth. Prompt, CWE-instruction and small-adapter studies did not establish a consistently better replacement. Local CLI, dashboard and GitHub Actions workflows demonstrate product integration. The contribution is an implemented, traceable hybrid system and an empirical account of where its discovery, evidence and verification layers help or fail; independent generalization and practical full-repository performance remain open.

**Keywords:** static application security testing; Python; CodeQL; local language models; vulnerability verification; repository context.

## Acknowledgements

We would like to express our heartfelt gratitude to Eng. Sameh Zaghloul, Chief Technology and Innovation Officer (CTIO) at Fixed Solutions, and Eng. Ahmed Soliman, Security Operations Center (SOC) Manager at Fixed Solutions. Their support means a great deal to all three members of our team, and we deeply appreciate their contribution to our project journey. Completing OpenSAST has been an important part of our academic experience, and we are sincerely grateful to acknowledge their support in this report.

## Table of contents

1\. Introduction ................................ p. 10  
1.1 Background ................................ p. 10  
1.2 Problem statement ................................ p. 11  
1.3 Motivation ................................ p. 11  
1.4 Objectives and research questions ................................ p. 12  
1.5 Scope and boundaries ................................ p. 13  
1.6 Contributions ................................ p. 14  
1.7 Thesis organization ................................ p. 15  
2\. Background and Literature Review ................................ p. 16  
2.1 Static vulnerability analysis ................................ p. 16  
2.1.1 Sources, sinks and propagation ................................ p. 16  
2.1.2 Paths and endpoint suspects ................................ p. 16  
2.1.3 API models, summaries and queries ................................ p. 17  
2.2 The four vulnerability mechanisms ................................ p. 17  
2.3 Analysis tools, representations and result exchange ................................ p. 18  
2.3.1 Scanner combination ................................ p. 18  
2.3.2 SARIF and provenance ................................ p. 18  
2.3.3 Code property graphs and focused evidence ................................ p. 19  
2.4 Language models for verification and adaptation ................................ p. 19  
2.4.1 Prompts and structured decisions ................................ p. 19  
2.4.2 Quantization and adaptation ................................ p. 19  
2.5 Related work ................................ p. 20  
2.5.1 Specifications and static paths: IRIS ................................ p. 20  
2.5.2 Warning review and scanner cooperation ................................ p. 20  
2.5.3 Graph-guided context: LLMxCPG ................................ p. 21  
2.5.4 Demand-driven exploration: RepoAudit ................................ p. 21  
2.5.5 Evaluation quality: PrimeVul and JITVul ................................ p. 21  
2.5.6 Python evaluation artifacts ................................ p. 22  
2.5.7 Repository indexing alternatives ................................ p. 22  
2.6 Research positioning ................................ p. 22  
2.6.1 Comparison of roles and evaluation settings ................................ p. 22  
2.6.2 Gap addressed by this thesis ................................ p. 23  
2.7 Chapter summary ................................ p. 24  
3\. Design and Implementation ................................ p. 25  
3.1 Design evolution and early pilot work ................................ p. 25  
3.1.1 Repository to AST to model assessment ................................ p. 25  
3.1.2 Tool-assisted autonomous investigation ................................ p. 25  
3.1.3 Lessons informing the candidate-first architecture ................................ p. 26  
3.2 Early pilot measurements and design consequences ................................ p. 26  
3.3 Design objectives ................................ p. 28  
3.4 System architecture ................................ p. 29  
3.5 Recall-oriented suspect generation ................................ p. 30  
3.6 Normalization, fusion and provenance ................................ p. 31  
3.7 Automatic repository evidence ................................ p. 31  
3.7.1 Python index ................................ p. 31  
3.7.2 Relationships and framework context ................................ p. 32  
3.7.3 Focused rather than unlimited context ................................ p. 32  
3.7.4 Evidence selection and budget algorithm ................................ p. 32  
3.8 Local verification and decision records ................................ p. 34  
3.9 Output validation and operating reliability ................................ p. 35  
3.10 Local CLI and web prototype ................................ p. 36  
3.11 Logging and reproducibility support ................................ p. 36  
3.12 Implementation boundaries ................................ p. 36  
3.13 Final Git-aware product integration ................................ p. 37  
3.14 Shared visual design system ................................ p. 38  
4\. Evaluation Setup ................................ p. 40  
4.1 Evaluation overview ................................ p. 40  
4.2 Scope and operational definitions ................................ p. 41  
4.3 Evaluation material ................................ p. 43  
4.3.1 Synthetic benchmark ................................ p. 43  
4.3.2 31-project repository evaluation ................................ p. 43  
4.3.3 7-project repository evaluation ................................ p. 43  
4.3.4 OWASP Python benchmark evaluation ................................ p. 44  
4.4 Baselines and comparison arms ................................ p. 44  
4.5 Evidence collection and inference procedure ................................ p. 45  
4.5.1 Recorded configuration and environment ................................ p. 45  
4.6 Ground truth and decision review ................................ p. 47  
4.7 Metrics and uncertainty ................................ p. 47  
4.8 Controlled diagnostics and promotion decisions ................................ p. 48  
4.9 Runtime, reproducibility and threats to validity ................................ p. 49  
5\. Results and Evaluation ................................ p. 50  
5.1 Evaluation overview ................................ p. 50  
5.1.1 One comparison format, three evaluation sets ................................ p. 50  
5.2 RQ1 — Static suspect coverage ................................ p. 51  
5.2.1 Source inventory and ranking workload ................................ p. 52  
5.2.2 Custom suspect queries and historical reverse checks ................................ p. 52  
5.2.3 Earlier scanner and specification experiments ................................ p. 53  
5.3 RQ2 — Verification, detection quality and cost ................................ p. 54  
5.3.1 31-project repository evaluation ................................ p. 54  
5.3.2 7-project repository evaluation ................................ p. 56  
5.3.3 OWASP Python benchmark evaluation ................................ p. 56  
5.3.4 Review of emitted repository alerts ................................ p. 58  
5.3.5 Alternative verifier: Gemma ................................ p. 58  
5.3.6 Runtime and workload boundaries ................................ p. 59  
5.4 RQ3 — Evidence, attribution and output failures ................................ p. 60  
5.5 RQ4 — Model guidance and adaptation ................................ p. 61  
5.5.1 Fine-tuning ................................ p. 61  
5.5.2 Prompt and skill iterations ................................ p. 62  
5.6 RQ5 — Local product and CI acceptance ................................ p. 62  
5.6.1 Verification of the published source release ................................ p. 63  
5.7 Answers across the research questions ................................ p. 63  
6\. Discussion ................................ p. 65  
6.1 Overall assessment ................................ p. 65  
6.2 Interpretation of the final evaluations and release checks ................................ p. 65  
6.3 Interpretation of the research questions ................................ p. 66  
6.3.1 RQ1: Does expanded static analysis improve coverage? ................................ p. 66  
6.3.2 RQ2: How does verification change detection and alert quality? ................................ p. 66  
6.3.3 RQ3: Which evidence failures remain? ................................ p. 67  
6.3.4 Transfer across the detector questions ................................ p. 67  
6.3.5 RQ4: Do instructions or adaptation improve beyond development cases? ................................ p. 67  
6.3.6 RQ5: What practical constraints arise in the local prototype? ................................ p. 68  
6.4 Why many false alerts remain ................................ p. 68  
6.4.1 Incorrect attacker attribution ................................ p. 68  
6.4.2 Incorrect defense interpretation ................................ p. 68  
6.4.3 Judging a nearby operation ................................ p. 69  
6.5 Why additional detail did not reliably help ................................ p. 69  
6.5.1 Evidence completeness and computational cost ................................ p. 69  
6.6 Model choice, fine-tuning and execution stability ................................ p. 70  
6.7 Evaluation quality and uncertainty ................................ p. 71  
6.8 Practical implications ................................ p. 71  
6.9 Directions arising from the discussion ................................ p. 72  
7\. Conclusion and Future Work ................................ p. 73  
7.1 Summary ................................ p. 73  
7.2 Main achievements and objective assessment ................................ p. 74  
7.2.1 Implemented and measured contributions ................................ p. 74  
7.2.2 Answers to the research questions ................................ p. 74  
7.3 Future work ................................ p. 75  
7.3.1 Independent datasets and adjudication ................................ p. 75  
7.3.2 Compact evidence about the consumed value ................................ p. 76  
7.3.3 Semantic validation and conditional decisions ................................ p. 76  
7.3.4 Verification quality and uncertainty ................................ p. 76  
7.3.5 Cost, reuse and incremental correctness ................................ p. 77  
7.3.6 Scope expansion and product assessment ................................ p. 77  
7.4 Closing conclusion ................................ p. 77  
References ................................ p. 79  
Appendices ................................ p. 15  
Appendix A — Experiment chronology and exposure ................................ p. 82  
Appendix B — Scope, revisions, truth and matching ................................ p. 84  
B.1 Repository selection and composition ................................ p. 84  
B.2 Seven-project revisions and case contracts ................................ p. 86  
Appendix C — Rule and query inventories ................................ p. 89  
C.1 Representative endpoint query ................................ p. 89  
Appendix D — Actual evidence packet and saved model decision ................................ p. 90  
D.1 Provenance ................................ p. 90  
D.2 Short evidence excerpt ................................ p. 90  
D.3 Saved response ................................ p. 90  
D.4 Verifier request and decision contract ................................ p. 91  
Appendix E — Detailed results and rejected alternatives ................................ p. 92  
Appendix F — Cost, omissions, operating errors and stability ................................ p. 93  
Appendix G — Fine-tuning pilot ................................ p. 94  
Appendix H — Local prototype and user workflow ................................ p. 95  
Appendix I — Archival provenance and reproduction boundaries ................................ p. 96  
I.1 Electronic evidence identifiers ................................ p. 96  
Appendix J — Final benchmark and product release evidence ................................ p. 97  
Appendix K — Shared design and published-release artifacts ................................ p. 98  
K.1 Design implementation ................................ p. 98  
K.2 Published-release verification ................................ p. 99  
Appendix L — Earlier AST and autonomous-agent research ................................ p. 100  
L.1 Scope and source provenance ................................ p. 100  
L.2 Experiment ledger ................................ p. 100  
L.3 Interpretation rules ................................ p. 101  

## List of figures

Figure 2.1 — illustrative relationships to examine when assessing a candidate. The presence of a validation step does not establish its effectiveness. ................................ p. 16  
Figure 3.1 — Sequence of investigated research approaches. Arrows indicate research progression, not measured accuracy gains. Earlier experiments include vulnerability mechanisms outside the final four-CWE scope. ................................ p. 26  
Figure 3.2 — architecture of the archived candidate-first evaluation family. ................................ p. 29  
Figure 3.3 — Scanning stages and intermediate evidence records. The template companion covers supported template behaviors; accepted model decisions remain reviewable alerts rather than automatically confirmed vulnerabilities. ................................ p. 30  
Figure 3.4 — Archived DSVW SQL-injection candidate walkthrough, dsvw.py:30, revision 7d40f4b7939c901610ed9b85724552d60e7d63fa. The code and explanation are abbreviated visual summaries; the exact packet and response are preserved in Appendix D. ................................ p. 35  
Figure 3.5 — Git-aware scanning and conservative verifier reuse. Changed snapshots retain whole-repository CodeQL analysis; all current findings are reported, with additional new/existing classification for pull requests. The diagram makes no general runtime-speedup claim. ................................ p. 38  
Figure 4.1 — Principal evaluation identities and scoring boundaries. Counts summarize Table 4.1; the cohorts retain their individual configurations and are not pooled. ................................ p. 41  
Figure 5.1 — Precision, recall and F1 on three separate labeled evaluations. Repository panels measure selected operations; OWASP measures official scoped tests. All sets were exposed during development or investigation. ................................ p. 51  
Figure H.1 — logical local deployment components of the prototype. The diagram does not assert separate physical hosts or a completed security assessment. ................................ p. 95  
Figure K.1 — research website visual implementation. Historical experiment summaries are presentation content, not an additional evaluation. ................................ p. 98  
Figure K.2 — credential-free dashboard login rendering. This static visual illustrates design implementation; it does not independently demonstrate an authenticated workflow or accessibility compliance. ................................ p. 99  

## List of tables

Table 1.1 — Objectives and research questions. ................................ p. 13  
Table 1.2 — Scope and boundaries. ................................ p. 13  
Table 2.1 — The four vulnerability mechanisms. ................................ p. 17  
Table 2.2 — Comparison of roles and evaluation settings. ................................ p. 22  
Table 3.1 — Historical exploratory experiments, with measurement boundaries. ................................ p. 27  
Table 3.2 — Evidence ordering and budget behavior in the archived October 8 collector/fitter. ................................ p. 33  
Table 4.1 — evaluation identity and scoring boundaries. All full scans process every emitted eligible candidate; six synthetic controls in the real-project runs are counted separately. ................................ p. 40  
Table 4.2 — Evaluated technology patterns and support boundaries. ................................ p. 42  
Table 4.3 — recorded common configuration. Per-run source/profile hashes and server launch records remain part of the electronic evidence appendix; common settings do not imply identical detector source across the three presented evaluations. ................................ p. 46  
Table 4.4 — Recorded source fingerprints distinguishing the three evaluations; displayed SHA-256 prefixes are 12 characters, with full digests retained in the configuration summary. ................................ p. 46  
Table 5.1 — Primary comparison using labeled-case precision, recall and F1. Repository rows score selected labeled operations; OWASP rows score all official tests in the four-CWE scope. These are not exhaustive repository-wide scores or full-alert precision. ................................ p. 50  
Table 5.2 — Candidate coverage of known vulnerable cases in the three principal evaluations. ................................ p. 51  
Table 5.3 — Custom suspect layer. ................................ p. 53  
Table 5.4 — Supporting confusion counts and discovery-layer scores for the 31-project repository evaluation. The primary two-approach comparison appears in Table 5.1. ................................ p. 54  
Table 5.5 — Supporting per-CWE recall for the 31-project repository evaluation. ................................ p. 55  
Table 5.6 — Review of emitted repository alerts. ................................ p. 55  
Table 5.7 — Supporting confusion counts and discovery-layer scores for the 7-project repository evaluation. The primary comparison appears in Table 5.1. ................................ p. 56  
Table 5.8 — Supporting confusion counts and discovery-layer scores for the OWASP Python benchmark evaluation. The primary comparison appears in Table 5.1. ................................ p. 57  
Table 5.9 — Per-CWE stock/final benchmark comparison. Count tuples are TP/TN/FP/FN; each arm uses the same official scoped tests. ................................ p. 57  
Table 5.10 — Supporting reviewed-alert results. Resolved alert precision is true / (true + false); unknown truth remains visible but is excluded. A matching complete stock alert review is unavailable for the 7-project evaluation. ................................ p. 58  
Table 5.11 — Supporting runtime and workload for the three presented evaluations. ................................ p. 59  
Table 5.12 — Recorded phase-time sums for the 31-project evaluation. ................................ p. 59  
Table 5.13 — Controlled diagnostic populations, settings and paired outcomes. B and V denote the fresh baseline and variant within each study; counts are TP/TN/FP/FN where supplied. These studies are separate from the principal full scans. ................................ p. 60  
Table 5.14 — Outcomes of guidance and adaptation experiments. ................................ p. 61  
Table A.1 — Experiment chronology and exposure. ................................ p. 82  
Table B.1 — The 31-project development inventory and corrected operation-label contributions. ................................ p. 85  
Table B.2 — All 16 snapshots in the seven-project repository evaluation. ................................ p. 87  
Table B.3 — Preconditions for the eight reviewed seven-project advisory cases; repaired counterparts retain the corresponding operation-specific contract. ................................ p. 88  

## Abbreviations

| Abbreviation | Meaning |
|---|---|
| API | Application programming interface |
| AST | Abstract syntax tree |
| CLI | Command-line interface |
| CPG | Code property graph |
| CVE | Common Vulnerabilities and Exposures |
| CWE | Common Weakness Enumeration |
| FN / FP | False negative / false positive |
| GGUF | Model-file format used by the recorded local inference configuration |
| LLM | Large language model |
| LoRA | Low-rank adaptation |
| NF4 | Four-bit NormalFloat |
| ORM | Object-relational mapper |
| QLoRA | Quantized low-rank adaptation |
| SARIF | Static Analysis Results Interchange Format |
| SAST | Static application security testing |
| TN / TP | True negative / true positive |
| XSS | Cross-site scripting |

---

<a id="chapter-01"></a>

# Chapter 1 — Introduction

## 1.1 Background

Static application security testing (SAST) examines application code to identify possible security weaknesses. One approach is to investigate how values reach security-sensitive operations. CodeQL provides Python analyses for local data flow, global data flow and taint propagation, together with configurable sources, sinks and barriers. These mechanisms provide a structured basis for investigating how input influences file access, command execution, web output or database queries [11].

A security decision often requires more than recognizing a sensitive API. The origin of its argument, the authority of the caller, transformations applied to the value, and protections at the point of use can affect whether the behavior is vulnerable. In the repositories investigated for this project, those facts were sometimes distributed across functions, object constructors, framework registrations, storage operations and templates. A short excerpt around a reported line could therefore omit evidence needed to judge the operation. [Project context and evaluation record](#chapter-05).

This thesis focuses on four weakness classes: path traversal, operating-system command injection, cross-site scripting and SQL injection. Their definitions concern failures to constrain paths or to neutralize input in the relevant command, web-output or database context. They provide a concrete scope for studying how an analysis system identifies suspicious operations and distinguishes exploitable behavior from protected or trusted uses [13, 14, 15, 16].

The project investigates using a local large language model (LLM) to review evidence collected around static findings. The model receives a selected operation, its weakness category and relevant repository code, then returns a structured decision. Its role is to assess the supplied evidence and reduce false alerts while retaining vulnerable operations. The experiments evaluate that role explicitly: useful evidence, a valid response and a correct security judgment are separate properties.

The project brief requires both LLM-based analysis and local-first execution. OpenSAST is intended to operate on a user's machine or within a company's infrastructure and network. This requirement shapes the model-serving arrangement and the CLI/dashboard prototype. Keeping processing local addresses where code is handled; deployment security and detector accuracy require their own evidence. [OpenSAST product documentation](../opensast.md).

## 1.2 Problem statement

The central problem is how to build and evaluate a practical Python vulnerability-detection pipeline that combines broad static suspects with reliable evidence-based verification. The project encountered three connected sources of error.

First, a vulnerability can be absent from the candidate inventory. If the static layer does not emit the relevant operation, subsequent context collection and verification have no opportunity to assess it. Candidate coverage therefore places an upper bound on final detection under a candidate-first architecture.

Second, an emitted candidate can lack decisive evidence. An operation may use a value supplied by a distant caller, modified through an object field, read from storage, or constrained by an option or guard. Missing these relationships can prevent the verifier from establishing attacker control or understanding an effective defense.

Third, the verifier can misinterpret available evidence. The observed errors include attributing attacker control to trusted configuration, confusing values from different operations, crediting an ineffective defense, and overlooking relevant protection. Some responses also fail the output or evidence contract, so a raw model judgment does not necessarily become an accepted alert.

These errors interact with cost. Broadening the static inventory gives the verifier more opportunities to detect vulnerabilities, but also more safe operations to reject and more requests to process. The 7-project repository evaluation processed 6,900 candidates over a calendar interval of 24 hours, 25 minutes and 40 seconds, including interruption and recovery. Runtime and alert-review burden must therefore be considered separately from labeled-case accuracy. [7-project evaluation](../../reports/current-seven-20261008/report.md).

The thesis addresses this problem through layer-specific measurements. It distinguishes static candidate coverage, verifier retention, reviewed alert quality and execution cost. This separation helps identify where an improvement occurs and whether it survives evaluation beyond development cases.

## 1.3 Motivation

The project is motivated by the possibility of combining the structured analysis of a static tool with a model's assessment of focused repository evidence. Static analysis can identify operations worth investigating and preserve their locations. Automatic context collection can assemble the code needed to assess them. Verification can then consider the input, use and defenses under an explicit security scope.

A simple illustration shows why these responsibilities matter:

```python
# Illustrative fragment; not an evaluated project finding.
name = request.args["name"]
query = f"SELECT id FROM users WHERE name = '{name}'"
cursor.execute(query)
```

The request expression provides input, interpolation constructs SQL text, and the execution call consumes that text. Reviewing the selected execution call requires knowing how `query` was constructed. A safety assessment would also need to examine any relevant earlier validation and the actual database API contract. The fragment illustrates the evidence relationships; it is not a test result or a complete application.

Traceability is a second motivation. Repository evidence should retain file and line references so a reviewer can inspect the basis of a decision. The system should also preserve omissions, unresolved decisions and operating failures. This makes debugging possible and prevents an apparently clean alert list from concealing incomplete analysis.

A third motivation is practical deployment. A locally hosted CLI and dashboard can organize registered repositories, scan jobs and findings within the user's infrastructure. The project investigates how the detector can be exposed through this prototype while preserving access boundaries and cross-file analysis requirements. Its product assessment remains bounded by documented implementation and testing.

## 1.4 Objectives and research questions

The overall objective is to investigate whether a locally executed hybrid pipeline can improve Python vulnerability detection within a declared scope while controlling false alerts and processing cost. The work aims for reusable behavior across repositories, with explicit reporting of remaining gaps.

The specific objectives are to:

1. Develop reusable static suspect queries for the four selected weakness classes and compare their coverage with stock CodeQL.
2. Collect focused repository evidence automatically, preserving exact code references and recording missing evidence.
3. Evaluate local verification through detections, false alerts, unresolved outcomes, output reliability and runtime.
4. Compare promising changes against reserved or new-project evidence, including failed and rejected experiments.
5. Implement and assess a local CLI/dashboard prototype for project registration, scanning and result review.

The following consolidated research questions reflect the final evaluation structure. They evolved as early experiments exposed candidate, context and operating limitations.

*Table 1.1: Objectives and research questions.*

| Question | Research focus |
|---|---|
| RQ1 | How much do additional scanners and reusable custom rules improve suspect coverage over stock CodeQL? |
| RQ2 | How does local LLM verification change true detections, false alerts, unresolved outcomes, and cost? |
| RQ3 | Which evidence-collection and validation failures contribute to missed or incorrect findings? |
| RQ4 | Do CWE guidance, prompt revisions, skills, or small QLoRA adaptation improve results beyond their development cases? |
| RQ5 | What practical constraints arise when exposing the system as a local CLI/dashboard prototype? |

Transfer to new projects is considered across the detector questions. RQ5 is an engineering assessment; the available work does not establish a validated enterprise-security or usability study. The methods and outcome definitions are developed in [Chapter 4](#chapter-04).

## 1.5 Scope and boundaries

The vulnerability scope is Python behavior associated with the following four CWEs:

*Table 1.2: Scope and boundaries.*

| CWE | Focus |
|---|---|
| CWE-22 | Path traversal |
| CWE-78 | Operating-system command injection |
| CWE-79 | Cross-site scripting |
| CWE-89 | SQL injection |

The technology scope includes ordinary Python relationships and explicitly selected framework and library patterns. Target stacks include Flask with Jinja2 and SQLAlchemy, Django with its template engine and ORM, and FastAPI/Starlette. These are implementation and evaluation priorities. Support depends on the API, pattern, version and evidence available for the particular operation; a framework name does not establish complete coverage of its extensions or integrations. [Framework scope](../framework-support-scope.md), [evaluation policy](../scoped-evaluation-policy.md).

The evaluation distinguishes primary, exploratory and unsupported behavior. Historical scope assumptions remain visible, and difficult eligible cases remain failures. Results are not improved by retrospectively excluding missed cases.

The thesis presents three evaluations: the 31-project repository evaluation, the 7-project repository evaluation and the OWASP Python benchmark evaluation. Each compares stock CodeQL with OpenSAST using labeled-case precision, recall and F1. Repository scores cover selected operations; benchmark scores cover all official tests in the four-CWE scope. Each evaluation retains its recorded configuration, and all sets had prior development or investigation exposure. Earlier experiments remain archived separately.

Processing every emitted candidate establishes coverage of the scanner's output inventory. It does not establish complete ground truth for an entire repository. Because non-alert repository truth is incomplete, exact global TN, FN, recall and F1 are unavailable. The thesis reports labeled-panel metrics and reviewed-alert precision with their respective denominators.

The four-CWE scope also bounds the project's relationship to OWASP security categories. The work does not evaluate complete OWASP Top 10 coverage, every Python framework or universal detection accuracy.

## 1.6 Contributions

The project makes five bounded contributions:

1. **An implemented hybrid Python analysis pipeline and local product prototype.** The later evaluated detector combines stock and custom CodeQL suspects, template analysis, automatic context and local verification. The CLI/dashboard provides project and scan workflows.
2. **Reusable suspect queries and validation records.** The project records query origin cases, API-use checks, negative controls and evaluation outcomes. These support investigation of recurring behaviors across repositories.
3. **Automatic evidence collection and traceable decisions.** The pipeline gathers code around selected operations, retains source coordinates, fits evidence to model budgets and records structured outputs and validation outcomes.
4. **An auditable evaluation history.** The work separates candidate coverage, verifier retention, selected-operation scores, reviewed alert quality, runtime and transfer performance. Corrected labels and rejected experiments remain part of the record.
5. **Empirical analysis of failure mechanisms.** The investigation identifies gaps in discovery, evidence composition, value attribution, defense reasoning, response contracts, execution stability and cost.

The results show why these contributions require careful interpretation. On the corrected development panel of 205 resolved operations, final recall increases from 38.1% for stock CodeQL to 92.9% for the Qwen pipeline. Across reviewed emitted alert clusters, resolved precision decreases from 80.0% to 62.0%. [Development comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md).

In the 7-project repository evaluation, OpenSAST achieves labeled-case precision 80.0%, recall 57.1% and F1 66.7%, compared with stock at 40.0%, 28.6% and 33.3%. Its broader reviewed-alert precision remains 19.1%, so the panel gain does not establish clean production output. These results concern a small previously investigated panel and leave generalization unresolved. [7-project evaluation](../../reports/current-seven-20261008/report.md).

## 1.7 Thesis organization

Chapter 2 introduces static analysis, the four vulnerability mechanisms, local language models and related research. Chapter 3 presents design evolution, early pilot measurements, the final detector architecture and product implementation. Chapter 4 defines the evaluation setup, datasets, scope, comparison arms, labels, metrics and validity boundaries. Chapter 5 organizes results by the five research questions while preserving separate evaluation populations. Chapter 6 interprets those results with references to the relevant sections, tables and figures. Chapter 7 summarizes contributions and future work. Appendices preserve protocols, query inventories, representative evidence and detailed records.

---

<a id="chapter-02"></a>

# Chapter 2 — Background and Literature Review

## 2.1 Static vulnerability analysis

### 2.1.1 Sources, sinks and propagation

Data-flow analysis follows values through program operations. A source identifies a starting point, while a sink identifies a use of interest. Taint tracking additionally follows influence through transformations that do not preserve the original value exactly. For example, input can influence a constructed string even though the string differs from the input. CodeQL supports local analysis within a callable and global analysis across the program, with configurable barriers and additional propagation steps [11].

![Assessment relationships](figures/assessment-relationships.png)

*Figure 2.1: illustrative relationships to examine when assessing a candidate. The presence of a validation step does not establish its effectiveness.*

For this thesis, a security assessment asks whether a less-trusted actor can influence the selected operation under the relevant conditions. A function parameter can be a useful analysis starting point without establishing attacker control. The relationship between analysis sources and security authority therefore requires explicit review.

### 2.1.2 Paths and endpoint suspects

A path finding connects a modeled source and sink through the analysis's propagation rules. An endpoint suspect identifies an operation or argument that merits investigation even when a complete source-to-sink path is unavailable. OpenSAST uses both kinds of candidate in its later design. The endpoint approach creates an opportunity to inspect missing caller or framework context, while also surfacing safe dynamic operations. [Suspect-layer design](../suspect-generation-v2.md).

The project's reviewed cases demonstrate that a surfaced path or operation still needs interpretation of authority, guards and configuration. Consequently, static coverage and confirmed vulnerability detection are measured separately. This is a design and evaluation choice supported by the project's own evidence; it is not a claim that every static analyzer has the same false-positive behavior.

### 2.1.3 API models, summaries and queries

CodeQL's Python library modeling mechanism can describe sources, sinks and propagation through APIs. A summary can relate a call's inputs to its outputs using value-preserving or taint-propagating behavior. These descriptions extend the analysis's understanding of library behavior [12].

Three implementation units should therefore be distinguished. An API model supplies facts about library behavior; a supporting QL module supplies reusable analysis logic; and a runnable query selects findings. Their counts cannot be used interchangeably. In this project, the historical 34-rule inventory counts qualified runnable suspects, while the later main evaluated profile contains 35 queries. Those numbers describe particular archived configurations.

## 2.2 The four vulnerability mechanisms

The four CWEs define the thesis's security scope. CWE-22 concerns paths escaping an intended directory restriction; CWE-78 concerns input affecting operating-system command interpretation; CWE-79 concerns unsafe input in generated web-page content; and CWE-89 concerns input changing SQL-command interpretation. Each requires assessing the actual input and use context [13, 14, 15, 16].

*Table 2.1: The four vulnerability mechanisms.*

| CWE | Security question | Protection to examine | Insufficient shortcut |
|---|---|---|---|
| 22 | Can a less-trusted input escape the intended filesystem boundary? | Effective containment for the actual access, including relevant path-resolution behavior | Treating a joined or absolute path as proof of containment |
| 78 | Can input alter dangerous command interpretation? | Shell handling and the actual executable/interpreter contract | Treating string splitting as command neutralization |
| 79 | Can input become executable browser content in its output context? | Appropriate encoding or sanitization for that context | Treating storage or a safe-marking wrapper as protection |
| 89 | Can input change executed SQL syntax? | Bound data values and appropriate handling of syntax components | Assuming value binding protects separately interpolated identifiers |

Python's subprocess documentation distinguishes calls that invoke a shell from those that pass arguments directly. The command's execution contract must be examined before assigning a weakness category. Executable or option misuse can involve adjacent weaknesses such as argument injection; a broad process suspect is not automatically a confirmed CWE-78 finding. This distinction also matters because some project experiments used a narrower shell-syntax verification criterion [17]. [Project skill evaluation](../../runs/cwe-skills-20261007/final-report.md).

For XSS, protection depends on where a value is inserted: HTML text, attributes, JavaScript and other contexts have different requirements. For SQL, bound values do not generally replace table names, column names or sort-direction syntax; those components require appropriate validation or query design. These distinctions help explain why a generic claim that a value was “escaped” or “parameterized” is insufficient [18, 19].

The table summarizes questions for analysis, rather than providing complete implementation guidance for every operating system, browser, driver or framework. The project's scope policy determines which contracts receive primary evaluation.

## 2.3 Analysis tools, representations and result exchange

### 2.3.1 Scanner combination

The early project combined CodeQL, Semgrep and OpenGrep. Semgrep documents taint rules through source, sink and sanitizer patterns. OpenGrep identifies itself as a Semgrep fork and supports compatible rule sets. Shared ancestry and overlapping rules mean a multi-tool union should not be interpreted as independent votes. Its additional detections and duplicates require measurement [20, 21].

OpenSAST's later main configuration uses stock/custom CodeQL and a template companion. The thesis distinguishes these architectures by run. Current tool documentation establishes concepts and documented capabilities; it does not establish which features were present in an older installed binary or enabled in a particular project experiment.

### 2.3.2 SARIF and provenance

SARIF is an OASIS standard for exchanging static-analysis results. Its format represents tools, rules, results and source locations, providing a common basis for downstream processing [22].

In this project, normalization and fusion preserve aliases to original findings. This allows the evaluation to distinguish stock findings from additional suspects. A common interchange format does not make different scanners' claims equivalent, and merging alerts does not establish independent vulnerability identity. Chapter 4 defines the matching and cluster accounting used in the comparisons.

### 2.3.3 Code property graphs and focused evidence

Joern's code property graph represents program constructs as attributed nodes and their relationships as directed edges. Its representation brings syntax, control-flow and data-flow views together for queries over code [23].

A graph can support selecting code relevant to an operation, but its usefulness depends on the modeled relationships and the traversal used. OpenSAST instead retains exact excerpts from a Python index with candidate-focused relationship collection. Both approaches motivate evaluating whether the selected evidence contains the necessary producer, consumer and protection. A graph representation alone does not establish that a resulting packet is sufficient for a particular decision.

## 2.4 Language models for verification and adaptation

### 2.4.1 Prompts and structured decisions

A verifier prompt defines the selected operation, CWE, evidence and required decision. Detailed instructions can organize the model's task, while structured output can make the answer easier to process. llama.cpp documents grammar-constrained generation and conversion of supported JSON-schema features into output constraints. The request must still communicate the expected task and structure [24].

This thesis separates three properties: a response can be syntactically valid, its references can identify existing evidence, and its security explanation can be correct. The first two provide operating and traceability benefits. They do not establish the third. Unknown decisions also need explicit treatment: insufficient evidence must remain distinguishable from a supported safety conclusion.

Ullah et al.'s SecLLMHolmes study evaluated eight models on 228 scenarios. It reports unstable responses, incorrect reasoning and sensitivity to code changes, including cases where a correct classification has an unreliable explanation. This supports examining explanations and repeated controls alongside verdicts. The evaluated models and scenarios differ from OpenSAST's later local setup, so its findings motivate checks rather than determine this project's measured accuracy [5].

### 2.4.2 Quantization and adaptation

LoRA reduces the parameters trained during adaptation by freezing pretrained weights and learning low-rank updates. QLoRA trains adapters through a frozen four-bit quantized base and introduces memory-saving techniques including NF4. These methods make adaptation more accessible under hardware constraints [9, 10].

Training quantization and inference quantization are separate settings. The project's QLoRA pilot used NF4 during training and evaluated a Q4_0 GGUF base with an adapter. Adapter training success and tensor integrity establish that a training procedure completed; detection improvement requires separate evaluation. The pilot's outcome is presented in Chapter 5.

The project's CWE skills were detailed instruction modules loaded into verifier requests. They did not add autonomous tool use or alter model weights. Their effects therefore belong to prompting evaluation. Neither adaptation nor detailed instructions are treated as an improvement until they retain useful mechanisms and reduce errors beyond their development cases.

## 2.5 Related work

### 2.5.1 Specifications and static paths: IRIS

Li, Dutta and Naik's IRIS combines LLM-derived taint specifications with static analysis and contextual path review. Its ICLR 2025 evaluation uses CWE-Bench-Java: 120 validated Java vulnerabilities. The conference report states that CodeQL detects 27 and IRIS with GPT-4 detects 55. This provides evidence for the hybrid approach in that setting [1].

The author repository distinguishes the paper's v1 implementation from later v2 work. It also records manually extracted CodeQL-format sources and sinks for 50 CVEs. These later artifacts should not be assigned the original paper's scores [25].

IRIS informed OpenSAST's early specification-first experiments. The later endpoint-suspect design changes the division of responsibility by permitting candidates without a complete modeled source. Java CVE detection with GPT-4 and Python operation/alert evaluation with local models remain different tasks; this thesis makes no numerical superiority claim over IRIS.

### 2.5.2 Warning review and scanner cooperation

Vulnhalla's author-maintained implementation runs CodeQL and uses an LLM to classify findings. VulnHunterX documents a pipeline combining scanner outputs, extracted context and verification. These projects establish practical precedents for LLM-assisted warning review. Their current repositories are implementation evidence, not independently reproduced performance baselines for this thesis [27, 28].

Al-Kassar, Compagna and Balzarotti's WHIP investigates cooperation between static tools. It uses tools as oracles to identify interrupted flows and rewrites source to provide alternative paths. Its USENIX Security 2023 study evaluates over 100 PHP projects. The reported gain concerns additional alerts and reviewed discoveries under that procedure [2].

WHIP is relevant to scanner blind spots and complementary coverage. It does not perform the same LLM verification task as OpenSAST. The inference drawn for this project is that candidate omissions merit analysis at the static layer; they cannot be repaired merely by improving a downstream prompt.

### 2.5.3 Graph-guided context: LLMxCPG

Lekssays et al.'s LLMxCPG combines Joern queries, focused slices and a trained vulnerability detector. The paper's evaluation includes function and multi-function samples, with emphasis on memory-related CWEs; its training uses FormAI-v2 and PrimeVul. Its repository exposes query-generation and detection models [3, 26].

The relevant design lesson is selecting relationships around a suspected behavior while reducing irrelevant code. This is a plausible alternative to the project's Python-index approach. However, sample classification and slicing results do not establish performance on OpenSAST's complete Python candidate inventories. No LLMxCPG detector arm was reproduced here.

### 2.5.4 Demand-driven exploration: RepoAudit

Guo et al.'s RepoAudit explores relevant functions on demand, stores analysis facts in agent memory and validates candidate paths. The reviewed January 2025 version investigates null-pointer dereferences, memory leaks and use-after-free across 15 systems. Its initiating sources depend on the property being checked [4].

Its adaptive exploration is relevant to the cost of collecting all possible context in advance. OpenSAST's main evaluated configuration uses prepared evidence packets without model-driven expansion, so the two designs have different operating boundaries. The lesson drawn here is to consider focused exploration as a future alternative, while measuring its missed paths, reasoning errors and cost independently.

### 2.5.5 Evaluation quality: PrimeVul and JITVul

Ding et al.'s PrimeVul study identifies weaknesses in labels, duplication and evaluation practice. Its C/C++ function dataset uses deduplication, chronological splitting and vulnerable/fixed comparisons. The methodological relevance is preventing inflated estimates from noisy labels or closely related examples [6].

Yildiz et al.'s JITVul links target functions to introducing and fixing commits and evaluates interprocedural context and ReAct agents. Its ACL 2025 paper emphasizes paired behavior: aggregate scores can conceal failure to distinguish vulnerable and repaired versions. Its target-selection protocol concerns commit-modified functions, which differs from scanning every emitted suspect in a repository [7].

These studies motivate preserving family exposure, correcting labels symmetrically and examining mechanism retention. Their datasets are not additional OpenSAST evaluation cohorts. Their performance values are not pooled into this project's metrics.

### 2.5.6 Python evaluation artifacts

OWASP BenchmarkPython supplies a runnable Python application and expected results for tool evaluation. Its deliberately constructed cases support defined positive/negative accounting. OpenSAST uses a pinned four-CWE subset; current repository contents are not substituted for the archived benchmark [29].

Pellew and Raza's RealVuln preprint evaluates scanners on intentionally vulnerable Python applications and false-positive traps. Such applications support reviewed mechanism labels, while their educational structure limits production representativeness. The thesis separately discloses development exposure and selected subsets rather than treating the full published benchmark as its own result [8].

PySASTBench's repository links synthetic material and a deposited real-world Python CVE corpus. The dataset is identified through its repository and Zenodo record. OpenSAST's historical targeted evaluation is reported using its own selected cases and procedure [30, 31].

### 2.5.7 Repository indexing alternatives

Graphify documents a queryable repository knowledge graph with syntax-derived and inferred relationships. It was considered during project design, but was not evaluated as a complete detector arm. The current README is evidence of the present tool description, not proof of the exact historical version considered. Its possible contribution concerns repository navigation and evidence selection [32].

## 2.6 Research positioning

### 2.6.1 Comparison of roles and evaluation settings

*Table 2.2: Comparison of roles and evaluation settings.*

| Approach | Primary setting | Candidate or evidence strategy | Model role | Evaluation distinction |
|---|---|---|---|---|
| IRIS | Java CVEs in the original paper | LLM specifications and static paths | Specification inference and contextual filtering | Validated CVE detection; later repository versions separate |
| WHIP | PHP web projects | Tool-guided source transformations | No equivalent LLM-verifier stage | Added static alerts and reviewed discoveries |
| LLMxCPG | Function/multi-function datasets; memory-related focus | CPG queries and slices | Query generation and trained classification | Sample-level results; not this Python alert inventory |
| RepoAudit | Memory/pointer bugs in real systems | On-demand function exploration and memory | Analysis and path validation | Reviewed buggy revisions and discoveries |
| Vulnhalla / VulnHunterX | Implementation projects with documented language support | Static findings and gathered context | Warning classification/verification | No reproduced accuracy comparison in this thesis |
| OpenSAST | Four-CWE Python scope | Stock/custom suspects, templates and exact code evidence | Local verification | Three labeled evaluations; supporting alert review |

The table is a conceptual comparison supported by the sources in Section 2.5. It is not a ranking of detection quality. Model choice, deployment, target language, candidate population and ground-truth unit affect each result.

### 2.6.2 Gap addressed by this thesis

Existing work establishes precedents for hybrid analysis, graph-based evidence and model-assisted review. This thesis contributes a Python-focused implementation and an empirical account of its layers: what becomes a suspect, what evidence is supplied, which decisions survive validation, and what reviewed alerts cost.

The research gap investigated here is whether those layers combine into useful detection on repositories beyond development cases under local execution constraints. Chapter 5 supplies the project's answer, including bounded repository results, practical limits and rejected changes. This positioning does not require claiming that the hybrid architecture is unprecedented or that another system's reported success guarantees success in this setting.

A central inference from the literature and project experience is that evidence selection and evaluation design deserve attention alongside model capability. A larger prompt or more detailed instruction can alter output without establishing correct attribution of the consumed value. Paired revisions, explicit negative examples, review of explanations and separate alert-stream accounting make those failures visible.

## 2.7 Chapter summary

Static models, suspect queries, program representations and local verification provide complementary components for investigating vulnerabilities. The selected CWEs require reasoning about authority, consumption and defenses in their actual domains. Related systems motivate specifications, focused slices, warning review and demand-driven exploration, while evaluation studies emphasize labels, exposure and paired behavior.

These foundations support the evaluation setup in Chapter 4. The thesis evaluates its own archived system through compatible units and documented limitations, preserving the distinction between a promising architectural idea and demonstrated general detection performance.

---

<a id="chapter-03"></a>

# Chapter 3 — Design and Implementation

## 3.1 Design evolution and early pilot work

Before the candidate-first evaluation family, an early pilot within this project investigated AST-based evidence selection and tool-assisted repository investigation. These exploratory experiments used broader vulnerability material, including deserialization and security-control logic flaws. Their scope, models and scoring units differ from the final four-CWE evaluations. They explain design decisions; their measurements do not extend the final detector's declared support or enter its aggregate scores.

### 3.1.1 Repository to AST to model assessment

The first approach parsed Python repositories into functions, classes and statements, then supplied selected original source excerpts to an LLM. Ranking limited the initial workload but could omit callers, argument assignments, configuration and validation. Exhaustive processing addressed omission at the cost of many overlapping contexts, including classes, methods and tests. Later feature dossiers grouped related code and structural facts under an input budget. The change reduced projected request counts, but adequate evidence selection and reliable model assessment remained separate requirements. [AST evaluation record](appendix-artifacts/early-research/ER01.md); [dossier comparison](appendix-artifacts/early-research/ER02.md).

Subsequent retrieval work added structural relations, security-operation evidence, guards, provenance and completeness fallbacks. It measured recovery of labeled code components without running the finding model. Scanner pointers, Joern flow queries and broad AST screening were then investigated as ways to reduce workload. Each selection experiment retained its own coverage and cost measurements. A failure on a security-control logic flaw does not demonstrate that taint analysis is ineffective for the four injection/traversal mechanisms studied in the final system.

### 3.1.2 Tool-assisted autonomous investigation

The second approach allowed the model to choose repository tools, read relevant code, inspect callers and callees, gather evidence and submit a finding. Successive versions introduced security missions, bounded investigations, context compaction, deterministic evidence checks and a critic. They were increasingly structured workflows with autonomous investigation inside a budget, rather than unrestricted agents.

The methodology recorded empty responses, timeouts, malformed tool calls, partial investigations and incomplete proof separately from negative findings. Small vulnerable/fixed development pairs eventually succeeded, but those pairs did not establish general accuracy. Model-serving throughput and available resources constrained larger experiments; context selection, investigation quality and validation also contributed. [early agent session](appendix-artifacts/early-research/ER08.md); [agent architecture and limitations](appendix-artifacts/early-research/ER12.md).

### 3.1.3 Lessons informing the candidate-first architecture

The experiments motivated generating static suspects before expensive model assessment, collecting focused repository evidence around each suspect, and measuring candidate generation, evidence gathering and verification separately. This is a design rationale rather than a controlled proof that the final architecture outperforms every earlier alternative. Figure 3.1 summarizes the sequence; Section 3.2 reports selected historical measurements and Appendix L preserves their provenance.

![Sequence of investigated research approaches](figures/research-journey.png)

*Figure 3.1: Sequence of investigated research approaches. Arrows indicate research progression, not measured accuracy gains. Earlier experiments include vulnerability mechanisms outside the final four-CWE scope.*

## 3.2 Early pilot measurements and design consequences

Table 3.1 summarizes selected experiments from the early pilot within this project. These are historical development measurements and workload projections, not additional observations in the three presented evaluation sets. Vulnerable-region overlap, component recovery, accepted model findings and independent truth adjudication have different meanings. The historical agent's evidence-gate acceptance is not the human confirmation described for the later repository evaluation.

*Table 3.1: Historical exploratory experiments, with measurement boundaries.*

| Attempt | Recorded observation | Measurement boundary and lesson |
|---|---|---|
| Ranked AST excerpts, July 25 | Vulnerable-region overlap in 3/15 repositories | Retrieval overlap only; ranking omitted important code |
| Exhaustive AST projection | 197,604 contexts across 15 repositories | Potential model requests, not a completed inference run |
| Exhaustive Picklescan run, July 26 | 225 contexts; base 919.24 s, direct-JSON adapter 2,386.58 s; target missed by both | One development vulnerability; interfaces differed, so not a clean adaptation comparison |
| Grouped dossier projection and pilot, July 27 | 741 packets per arm; overlap 9/15; 32 actual model calls; strict target detection 0/2 per arm | Projected full workload and small completed pilot are separate |
| Improved retrieval, August 16 | CrossCommitVuln 808/817 required components; RealVuln 491/491 localizable Python findings | Zero finding-model executions; incomplete/acquisition/parse cases separately recorded |
| Large-context transport pilot, August 18 | 12 requests in 1,895 s; nine valid JSON responses | Actual pilot; 46.5 h Airflow-scale estimate was a projection, not a completed scan |
| Broad AST screening, August 27 | Selected-component coverage 809/817; packet reduction 13.44% in eight largest repositories | Coverage and packing studies used different subsets; context expansion limited savings |
| Bounded agent pairs, September 11 | Target detected in Picklescan and Smolagents vulnerable revisions; no finding in fixed counterparts | Two development pairs; investigation budgets differed; not general performance |
| Later Fory agent replay, September 18 | Completed in about 111.5 min; labeled finding emitted; 63/84 slices incomplete | One development repository; accepted finding does not imply complete semantic review |

The AST runs show that exhaustive source coverage did not prevent a target miss. The direct-JSON adapter emitted 47 valid positive decisions, mostly in tests, but none identified the labeled Picklescan mechanism. Dossier organization sharply reduced the projected workload; the small comparison nevertheless failed to produce valid target detections. [AST runs](appendix-artifacts/early-research/ER01.md); [dossier pilot](appendix-artifacts/early-research/ER02.md).

The later retrieval report recovered most labeled components but explicitly executed no finding model. Its RealVuln denominator excludes unavailable repositories and unsupported/localization cases; its complete-repository result remained 20/21 despite full finding-location coverage. Retrieval coverage must therefore not be reported as detection recall. [retrieval report](appendix-artifacts/early-research/ER03.md).

The measured large-context pilot recorded three responses truncated at the output limit. Its full-scale timing estimate assumed the pilot's throughput and output ratio; a shorter-output scenario was untested. Pattern-scanner selection missed code in files without findings, while the Joern litmus missed a denylist/control logic flaw outside ordinary taint-sink modeling. Broad screening improved component coverage, but dependency context expanded the selected code and reduced the runtime benefit. [transport pilot](appendix-artifacts/early-research/ER04.md); [scanner selection](appendix-artifacts/early-research/ER05.md); [Joern experiment](appendix-artifacts/early-research/ER06.md); [broad-screen cost study](appendix-artifacts/early-research/ER07.md).

Early repository agents produced empty final responses or stopped before inspecting necessary code. Later bounded pairs demonstrated that tool-grounded investigation could work on selected cases. A separate Langroid timing study processed 4/61 missions in approximately 14–16 minutes; its 7–8-hour full-run estimate was extrapolated. The later Fory replay completed and recovered the labeled target after generic validation repairs, showing that some earlier misses belonged to the evidence gate rather than model non-detection. However, incomplete slices and weak attacker-provenance evidence remained. [early agent runs](appendix-artifacts/early-research/ER08.md); [paired development runs](appendix-artifacts/early-research/ER09.md); [latency study](appendix-artifacts/early-research/ER10.md); [later replay](appendix-artifacts/early-research/ER11.md).

The last documented early-pilot benchmark entry records an in-progress run after restarting with larger context slots. It supplies no final benchmark accuracy result. Neither that unfinished run nor the two successful development pairs is pooled into the final-system evaluations. Historical reports sometimes use “model calls” for projected contexts or describe runtime estimates as cost; Table 3.1 follows the underlying execution records and distinguishes actual calls from projections.



## 3.3 Design objectives

OpenSAST was designed to investigate Python vulnerabilities through a combination of static suspects, automatically collected repository evidence and local language-model verification. Four objectives guided the design: increase the visibility of security-relevant operations, preserve exact evidence references, reduce false alerts through verification, and keep repository code within the user's infrastructure.

The static layer intentionally allows false positives. Its purpose is to produce reviewable suspects under the four-CWE scope. Requiring every candidate to be a confirmed exploit would move the verification problem into candidate generation and could discard behaviors that existing source or framework models do not cover.

The verifier should judge the selected operation under its actual source, use and defense conditions. When necessary evidence is absent, uncertainty should remain explicit. A successful JSON response and valid references improve operational reliability, but do not establish a correct security judgment.

## 3.4 System architecture

The main evaluated pipeline consists of repository analysis, candidate normalization, context gathering, local inference, response validation and alert recording. The product prototype exposes these capabilities through a CLI and a local web service.

![Archived architecture](figures/archived-architecture.png)

*Figure 3.2: architecture of the archived candidate-first evaluation family.*

The diagram describes the later candidate-first architecture. Earlier source-specification experiments instead used an LLM before CodeQL to identify sources or generate specifications, followed by a verification LLM. The historical two-model role sequence is not assumed to remain in the main configuration. In the October 3 experiment, Gemma and Qwen were alternative verifiers over the same candidates and evidence, rather than sequential judges of each other's output.

Figure 3.3 expands the pipeline into its intermediate records. Candidate provenance is retained during fusion, evidence coordinates remain attached to code excerpts, and decision validation precedes alert recording. Endpoint suspects need not contain a statically established source-to-sink path; subsequent evidence review remains necessary.

![Scanning stages and the records passed between them](figures/pipeline-records.png)

*Figure 3.3: Scanning stages and intermediate evidence records. The template companion covers supported template behaviors; accepted model decisions remain reviewable alerts rather than automatically confirmed vulnerabilities.*

## 3.5 Recall-oriented suspect generation

Stock CodeQL provides the baseline analysis. Custom queries add security-relevant operations and flows for behaviors underrepresented in the baseline. The historical suspect-query inventory contains 34 qualified runnable rules, split across the four CWEs. The later evaluated profile contains 35 queries and revisions to existing queries. Query counts, API model acceptance counts and detected vulnerability counts are distinct quantities.

The query families cover operations such as dynamic filesystem access, shell command construction, HTML-producing APIs, unsafe output wrappers and dynamic SQL execution. Some queries track a flow; others identify dynamic endpoint arguments that require later source and defense review. The template companion adds candidates for supported template behaviors. These suspects are broader than confirmed stock alerts.

This design responds to a practical failure mode: an attacker-controlled source may be absent from a static tool's framework model even when a sensitive operation is present. An endpoint candidate allows the context layer and verifier to examine the surrounding code. The approach still has limitations. Missing sink families, indirect wrappers, dynamic dispatch and unsupported template behavior can prevent candidate emission. Broad queries also increase runtime and noise.

The development and benchmark measurements of these trade-offs are presented in Chapter 5. Query qualification establishes the recorded checks were met; it does not guarantee independent value on every new repository.

## 3.6 Normalization, fusion and provenance

Scanner outputs are converted into common candidate records containing the CWE, rule identity, repository revision, location and available flow or operation information. Fusion groups related outputs and retains scanner aliases so comparison arms can trace a candidate back to original findings.

Provenance is essential for evaluation. Stock credit must come from an original stock finding, while a custom-only candidate remains custom-only. The main comparison uses archived alias membership without crediting stock with detections inferred only from later context. Its common-cluster policy collapses four raw stock findings; this is disclosed in the results because fusion changes alert counts.

Candidate fusion and vulnerability ground-truth matching are different operations. A cluster can contain multiple representations of nearby behavior, while the evaluation separately requires a reviewed operation relationship. Neither two-line clustering nor a shared enclosing function proves that two security claims describe the same vulnerability.

## 3.7 Automatic repository evidence

### 3.7.1 Python index

The Python index provides names, declarations, exact code excerpts and source coordinates. Depending on the selected operation and available code, the collector adds the enclosing function or class, relevant assignments, constructor arguments, callers, use sites and associated guards. Evidence remains tied to its file and line range so the verifier's claims can be checked.

Exact code is valuable because a summary can lose the distinction between a request value and trusted configuration, or between data passed as a SQL parameter and data inserted into SQL syntax. The index supplies syntax and relationships; it cannot resolve every runtime receiver, framework binding or value history.

### 3.7.2 Relationships and framework context

The context implementation was expanded to inspect relationships around a selected operation. Relevant relationships include producers and consumers, callback registrations, storage writers, assignments to object fields, route parameters, parser usage and template rendering. Framework-specific contracts help select the code relevant to supported APIs.

These records require careful wording. A possible call target is a possible relationship, not an established execution path. A registration declaration does not itself mean attacker input is produced at that line. Likewise, a framework import proves availability of a name, not that a value is attacker-controlled.

The diagnostic experiments found both structural and semantic limits. Adding binding information could make the packet more accurate while the LLM continued to cite an import as a source or confuse an unrelated parser. Including more caller code did not uniformly improve detection. Structural packet correctness and model comprehension therefore remain separate properties.

### 3.7.3 Focused rather than unlimited context

A repository may contain far more code than fits in one request. The collector selects evidence relevant to the candidate and the budget fitter measures the resulting prompt using actual model tokenizers. Whole-block omissions are recorded. The evaluated dual-model run used identical packets fitted to both tokenizers.

Removing a candidate cap ensures all emitted suspects are processed. It does not remove the model's context window or make every packet complete. A packet can contain the selected operation while omitting a deeper storage writer or a remote caller. These omissions can change whether the model can establish attacker control or an effective guard.

The main protocol reserves completion space separately from input space. Completion limits affect whether the model can return the requested decision; input limits affect what code it can inspect. These are different operating constraints.


### 3.7.4 Evidence selection and budget algorithm

The following pseudocode summarizes the archived implementation used for the seven-project and OWASP evaluations. It describes the collector and fitter, not a complete execution path proof. The earlier 31-project configuration has different recorded module fingerprints (Table 4.4).

```text
1. Resolve enclosing declarations at source/path/sink/alert locations.
2. Read declarations and uncovered anchor windows (eight lines each side).
3. Add recorded renderer references, dispatch/state/origin evidence.
4. Collect bounded syntactic relationships; preserve uncertainty events.
5. Complete calls cut by a window; resolve requested template contents.
6. Put the exact alert first; prioritize local evidence for long functions.
7. Deduplicate identical file/start/end ranges, keeping the first copy.
8. Apply the character budget and record clipped/omitted evidence.
9. Render and count the complete prompt with both actual tokenizers.
10. Protect minimal complete anchor blocks; remove other blocks from tail.
11. Recount until both token budgets fit, or fail without a model request.
```

For an enclosing function longer than 80 lines, the collector inserts a local window of up to 20 lines on either side of the alert before the full declaration. Its local assignment slice is syntactic assistance, not a replacement for a CodeQL path. Value-origin traversal defaults to depth four. The optional bidirectional call-chain collector has a depth-two bound, but was disabled in these evaluations. Model-driven context expansion was also disabled. These bounds apply to particular relationship searches, not to a guarantee of complete interprocedural coverage.

*Table 3.2: Evidence ordering and budget behavior in the archived October 8 collector/fitter.*

| Stage | Rule | Limitation / recorded outcome |
|---|---|---|
| Anchor priority | Exact reported line first; long-function local window and available local slice next | Nearby context is not a demonstrated attacker-to-sink flow |
| Remaining evidence | Declarations, anchor fallbacks and gathered relationship/template blocks follow implementation order | Identical ranges are removed; overlapping different ranges can remain |
| Character budget | Default 24,000 serialized code characters; retained in insertion order | Can clip a block or long line; original range and truncation flags remain |
| Template reservation | When template expansion exists, initial code receives two-thirds of character budget and expansion the remainder | Missing or ambiguous renderers remain explicit |
| Token budget | Complete rendered instructions and evidence are measured against both tokenizers; 16,384 window minus 400 completion and 64 reserve | The resulting common input allowance is 15,920 tokens; character and token limits are different |
| Protected evidence | Smallest complete supplied block covering each primary/source/sink anchor | If protected evidence and instructions alone exceed the limit, no request is sent |
| Token fitting | Remove unprotected whole blocks in reverse order, then recount actual tokens | Estimates choose removal batches; final acceptance uses actual counts; omissions refresh relationship facts |

The character stage may truncate code inside a retained block; the later token stage removes whole blocks. Consequently, a claim that every retained block is complete would be incorrect. Resolution events and excerpt flags allow the verifier and audit to distinguish these outcomes. The algorithm does not remove candidates to meet time or input limits.

## 3.8 Local verification and decision records

The local verifier receives the candidate CWE, the selected operation and gathered evidence. The request asks for a structured security decision grounded in that packet. The records preserve the verdict, explanation and referenced evidence, together with validation and execution details.

The verifier distinguishes an accepted vulnerability decision, a safe decision, an unknown result and an operating failure. Unknown means the available evidence or reasoning did not establish a supported decision. It is not proof of safety. In alert/no-alert scoring, a positive operation that remains unknown is still missed by the final detector; diagnostic reporting preserves its unknown status to explain that miss.

An effective decision must connect the relevant input to the selected dangerous behavior and assess the defense in the correct domain. For SQL injection, parameter binding can protect data values while failing to protect interpolated identifiers. For XSS, a SQL defense does not establish HTML escaping. For path traversal, path construction must be considered with containment and authority. For commands, shell parsing, argument boundaries and input control affect the claim. These mechanisms motivated later CWE-specific instruction experiments, whose results are reported separately.

Figure 3.4 illustrates an actual saved development candidate at DSVW's SQL execution operation. Its scanner record has no source location or flow path, while the automatically gathered enclosing method includes request parsing and SQL construction. The saved Qwen response cites those evidence blocks and passes response validation. Appendix D preserves the complete packet, saved messages and decision provenance. The example is educational and development-exposed; it does not establish performance on unseen repositories.

![Archived DSVW SQL candidate from suspect to validated model decision](figures/candidate-walkthrough.png)

*Figure 3.4: Archived DSVW SQL-injection candidate walkthrough, dsvw.py:30, revision 7d40f4b7939c901610ed9b85724552d60e7d63fa. The code and explanation are abbreviated visual summaries; the exact packet and response are preserved in Appendix D.*

## 3.9 Output validation and operating reliability

Structured output reduces integration ambiguity. The system validates JSON shape and evidence references before accepting an alert. Invalid category values, incomplete responses, citation errors and generation cutoffs are recorded rather than silently converted into valid labels.

The project investigated earlier response splitting and output-category failures. Later reliability work replayed selected operating failures with bounded output and validation rules. A completed repair experiment returned valid outputs for 36 previously failed cases, while controls checked basic behavior. This shows recovery of that failure set. It does not update the detection scores of the original full-repository runs.

Mechanical validation has a limited role. A coordinate can correctly point to a line that is semantically irrelevant. A perfectly valid JSON response can confidently misidentify trusted data as attacker input. The evidence gate therefore improves traceability and response handling without guaranteeing truth.

## 3.10 Local CLI and web prototype

The product prototype supports registering a Python repository through `opensast init`, requesting scans, viewing projects and findings, and managing review/export operations. A local web dashboard and CLI expose project workflows. Workspaces and membership roles restrict access, while workers use scoped credentials to process queued jobs.

The documented product includes worker status, job leases, cancellation and credential rotation. It is intended to run within a user's or company's infrastructure and network, with no external repository telemetry as a requirement. This is an integration prototype; the project does not establish a completed security certification, SSO/MFA support or exhaustive authorization testing.

The product's changed-scan behavior requires precise description. The first scan is full. Later scans can skip unchanged work or reuse valid unaffected decisions. Changed scans still perform repository-wide CodeQL analysis and fresh context construction because dependencies and flows can cross files. Therefore the implemented behavior is not a changed-files-only whole pipeline, and no general incremental speedup is claimed.

See the [product documentation](../opensast.md) and [product plan](../../plan8.md) for its implementation record. The dashboard's operational status and the archived detector's measured accuracy are separate matters.

## 3.11 Logging and reproducibility support

Run artifacts preserve query profiles, source and model hashes, repository revisions, candidate lists, packet contents, token counts, omissions, raw responses, retries, finish reasons, accepted decisions and timings. These records enabled later debugging and corrected scoring without repeating expensive inference.

Archival provenance has practical limits. A recorded temporary model path can disappear; a source hash cannot reconstruct a source file. The thesis therefore distinguishes traceability from complete independent reproducibility. A durable archive should include the actual evaluated query and source bytes, model availability information, runtime build, dependency environment, requests and scoring artifacts.

## 3.12 Implementation boundaries

The implemented pipeline can produce more useful suspects than stock CodeQL on development cases and can organize evidence for local review. Its boundaries remain unsupported APIs, omitted relationships, incorrect value attribution, ineffective verifier reasoning, unresolved decisions and substantial inference cost. Later prompt, skill and adapter variants are experimental alternatives; rejected variants are not described as part of the main evaluated system.

## 3.13 Final Git-aware product integration

The final product adds `opensast ci` for standalone scans on company runners without dashboard credentials. Git resolves a PR merge-base and records committed, staged, unstaged and untracked changes; the file-hash inventory remains authoritative. Whole-repository CodeQL runs after changed snapshots. Exact evidence/configuration matching and conservative old/new import graphs determine which verifier decisions may be reused. Unchanged snapshots skip both CodeQL and inference.

Base-commit and PR-head caches are separate and locked per project. PR reporting retains every current finding and additionally identifies new and existing positive decisions. Matching tolerates unchanged lines shifting; modified operations and renames conservatively count as new. Removed alerts are not automatically declared fixed. The CI gate blocks new positive decisions and fails incomplete verification; report-only mode retains completeness checks. Company-local source, evidence and caches are not uploaded by the integration. GitHub records workflow status. [CI specification](../github-actions.md).

The supported source distribution bundles the two unchanged guided-question/routing assets and their original license/provenance. This avoids requiring an unavailable historical submodule revision. Asset hashes participate in cache identity. Product acceptance also adds nonzero `scan --wait` exit codes for failed/cancelled jobs or incomplete configured verification, plus an explicit dashboard completeness warning. None of these packaging/status changes modifies suspect queries or model instructions.

Release validation demonstrates selected workflows on Linux and Python 3.12. Windows, enterprise SSO/MFA, production runner isolation and general large-repository incremental performance remain outside demonstrated support.

Figure 3.5 summarizes the implemented cache decisions described in Section 3.13. An unchanged valid snapshot can skip scanning; a changed snapshot still requires whole-repository static analysis and fresh context. Only verifier decisions meeting evidence, configuration and dependency checks are reused. This distinction prevents incremental operation from being confused with analysis restricted to edited lines.

![Git-aware scan and conservative verifier decision reuse](figures/incremental-workflow.png)

*Figure 3.5: Git-aware scanning and conservative verifier reuse. Changed snapshots retain whole-repository CodeQL analysis; all current findings are reported, with additional new/existing classification for pull requests. The diagram makes no general runtime-speedup claim.*

## 3.14 Shared visual design system

The research website, operational dashboard and presentation template share a graphite-and-cyan design system. Sans-serif typography, monospace code references, visible grid boundaries and restrained decoration provide a consistent technical identity. The research website retains the methodology, experiment history and limitations rather than presenting detection results as marketing claims.

A canonical JSON token file defines colors, type stacks, spacing and semantic states. A build script embeds those values in the website and dashboard stylesheets, avoiding external font requests and a runtime design-service dependency. The same website styles support a three-slide presentation template. Figure guidelines specify consistent series labels and colors without changing university-required thesis formatting. [Design specification](../../design-system/README.md), [tokens](../../design-system/tokens.json), [build script](../../scripts/build_design_system.py).

Verdict labels remain explicit: vulnerable findings use red, negative model decisions green, unresolved decisions amber, and system errors purple. Color supplements written status rather than replacing it. The dashboard adds a keyboard skip link; styles preserve visible focus and reduced-motion preferences. These are implemented presentation provisions, not a measured usability improvement or a complete accessibility audit. A negative model verdict remains a decision rather than proof that code is safe.

Appendix K provides selected credential-free visual examples. This visual work changes neither CodeQL queries nor model instructions, and does not establish new detection scores.

---

<a id="chapter-04"></a>

# Chapter 4 — Evaluation Setup

## 4.1 Evaluation overview

This project followed an iterative development and empirical evaluation approach. A Python static analysis pipeline was implemented, its stages were measured, and changes were investigated through controlled comparisons. The aim was to improve detection of security-relevant operations while reducing false alerts and retaining local execution. The aim was not perfect detection across all Python software.

The five research questions define the evaluation: RQ1 asks how additional scanners and reusable rules change suspect coverage; RQ2 asks how local verification changes detections, false alerts, unresolved outcomes and cost; RQ3 asks which evidence-collection and validation failures contribute to errors; RQ4 asks whether CWE guidance, prompt revisions, skills or small QLoRA adaptation improve results beyond development cases; and RQ5 asks what practical constraints arise in the local CLI/dashboard prototype. Transfer to new projects is assessed across the detector questions. These questions require separate measurements. For example, a context collector may include the necessary function while the verifier misinterprets it. Similarly, a verifier cannot detect a vulnerability absent from the scanner's candidate inventory.

The system design and early pilot studies are described in Chapter 3. This chapter defines the evaluated configurations, material, comparison arms and scoring procedures. Historical exploratory measurements remain separate from the three principal evaluations.

The thesis presents three separate evaluations: the 31-project repository evaluation, the 7-project repository evaluation and the OWASP Python benchmark evaluation. Each compares stock CodeQL with OpenSAST using labeled-case precision, recall and F1. Confusion counts, discovery-layer measurements, alert review and runtime are supporting evidence. All three sets had prior development or investigation exposure; they are not independent unseen-project validation. An earlier seven-project scan informed investigation and remains archived, but its scores are not part of the principal comparison. The [evaluation configuration summary](configuration-summary.md) identifies the older 31-project configuration; the other evaluations retain their own recorded source snapshots.

*Table 4.1: evaluation identity and scoring boundaries. All full scans process every emitted eligible candidate; six synthetic controls in the real-project runs are counted separately.*

| Evaluation | Configuration and material | Scoring unit and exposure | Results |
|---|---|---|---|
| 31-project repository evaluation | October 3–4; archived system; 31 projects / 36 snapshots; 2,249 candidates per model | 205 resolved operations: 113 positive / 92 negative; development-exposed; two unknown truths excluded | Section 5.3.1 |
| 7-project repository evaluation | October 8; later source snapshot; seven projects / 16 revisions; 6,900 repository candidates | 14 primary operations: seven positive / seven repaired across six projects; seventh exploratory; previously investigated | Section 5.3.2 |
| OWASP Python benchmark evaluation | October 8–9; pinned BenchmarkPython v0.1; 1,225 candidates | All 293 official four-CWE tests: 114 positive / 179 negative; development-exposed | Section 5.3.3 |

Figure 4.1 separates the three presented evaluation sets. Labeled operations and official benchmark tests define their scoring denominators. Candidate counts describe workload, not the number of vulnerabilities. Repository alert adjudication remains a separate supporting measurement.

![Three evaluation sets, their exposure and scoring units](figures/evaluation-identities.png)

*Figure 4.1: Principal evaluation identities and scoring boundaries. Counts summarize Table 4.1; the cohorts retain their individual configurations and are not pooled.*



## 4.2 Scope and operational definitions

The evaluated vulnerability scope contains CWE-22, CWE-78, CWE-79, and CWE-89. These cover path traversal, operating-system command injection, cross-site scripting, and SQL injection. The project also declares supported native Python behavior, frameworks, libraries and tools. A Python repository is not automatically within every supported contract. The evaluation therefore records whether a case uses supported, exploratory, or unsupported behavior. Scope decisions must be visible and applied consistently to comparison arms.

A **candidate** is a static suspect emitted for review. It may be a tracked flow, a dynamic argument at a security-sensitive operation, or a template-related output. An **accepted alert** in the experimental accounting is a model decision that passes the pipeline contract and is subsequently compared with reviewed ground truth. A **reviewed true alert** is one supported by that adjudication. Neither the query's existence nor the model's confidence establishes exploitability.

A **labeled operation** is a reviewed security-relevant behavior anchored to code and its conditions. Several operations can belong to one advisory. A **repository alert cluster** is a grouping of emitted findings under the run's normalization/fusion policy; it is not necessarily one independent vulnerability. A **benchmark test** is the benchmark's designated positive or negative example. These units are not pooled into a single score.

The scope and label policy are documented in the [research scope](../research_scope.md), [framework scope](../framework-support-scope.md), and [scoped evaluation policy](../scoped-evaluation-policy.md). Some archived development comparisons intentionally preserve earlier supported/exploratory assumptions. They are reported with those assumptions rather than retrospectively narrowing the panel to improve results.

*Table 4.2: Evaluated technology patterns and support boundaries.*

| Technology or mechanism | Evidence-supported status | Evaluation boundary |
|---|---|---|
| Native Python file, process, SQL and generated-HTML operations | Primary patterns; coverage is partial | A candidate must be judged under its actual input, use and defense conditions; missed eligible patterns remain misses |
| Flask routing and response behavior | Primary selected patterns | Isolated checks used Flask 3.1.1 and Werkzeug 3.1.5; this does not certify every historical application version |
| Jinja2 and SQLAlchemy integrations | Partial; scope uncertain unless a pattern has its own evidence | Priority integrations, not blanket framework coverage |
| Django templates, routing and ORM | Partial; scope uncertain unless a pattern has its own evidence | Isolated Django checks do not establish complete stack support |
| FastAPI/Starlette and Django REST Framework | Exploratory integrations | Report separately from demonstrated primary patterns |
| Other required integrations or unknown versions | Exploratory or scope uncertain | An unrelated framework import does not invalidate a native-Python mechanism |

The matrix summarizes the recorded prospective pattern policy, not an automatic scope classifier or a retrospective exclusion rule. Historical panels retain their original assumptions. The isolated native-mechanism checks record CPython 3.12.13 and SQLite 3.53.2; these versions do not reconstruct every evaluated repository environment. [Pattern matrix](../scope-matrix-20261005.md); the same policy is recorded in `config/scope/python-v1.json`.

## 4.3 Evaluation material

### 4.3.1 Synthetic benchmark

The four-CWE OWASP Python benchmark subset contains 293 tests: 114 positives and 179 negatives. It supplies explicit negative labels and a fixed test-level denominator. It is useful for measuring scanner coverage and verifier behavior under its own code distribution. Its structure does not establish representativeness of production repositories.

Early verifier variants were sometimes scored only on surfaced candidates. Those results are reported as candidate-conditioned tests. A positive benchmark example that never became a candidate must remain a false negative in end-to-end benchmark recall. This prevents a successful verifier from hiding scanner omissions.

### 4.3.2 31-project repository evaluation

The main completed development run contains 31 projects and 36 pinned revision snapshots. It processes 2,249 combined candidates per model without a candidate cap. Six synthetic controls are evaluated separately. The corrected audit supplies 205 resolved operation labels: 113 positive and 92 negative, with two unknown truth labels visible but excluded from scored metrics.

This is a development cohort. Several projects informed rule and context work, and educational vulnerable applications contribute many operations. Consequently, its score measures performance on the reviewed panel; it is not an unbiased estimate of performance on arbitrary future repositories. The vulnerable/fixed subset contains nine positive and nine repaired operations across five projects, with five positive operations from SciTokens. These are related observations rather than nine independent advisory families.

The [development protocol](../../runs/suspect-v2-evaluation-20261003/protocol.md), [corrected audit](../../runs/ground-truth-audit-20261004/report.md), and [stock comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md) establish this cohort and its accounting.

### 4.3.3 7-project repository evaluation

This evaluation covers seven projects and 16 pinned vulnerable/fixed snapshots, processing all 6,900 repository candidates with six synthetic controls separate. The primary scored panel contains seven vulnerable and seven repaired operation labels across six projects. Modoboa remains exploratory. The panel was established before predictions and retained through later evaluation rather than selected to favor the final results.

These families had been scanned and investigated earlier. The presented evaluation therefore provides regression evidence on exposed projects, not an unseen-project generalization test. Its purposive selection and small panel also limit representativeness. Existing CodeQL databases were reused; recorded calendar time includes interruption and recovery. Earlier protocol and scan records remain in Appendix A and the evidence archive. [7-project protocol](../../reports/current-seven-20261008/protocol.md).

### 4.3.4 OWASP Python benchmark evaluation

The benchmark evaluation pins BenchmarkPython v0.1 at commit `f1291485808b66e20ddb6b01b10dc71b3df8c8ba`, creates a fresh repository-wide CodeQL database and processes all 1,225 combined four-CWE candidates. All 293 official scoped tests enter test-level scoring; unmatched helpers and other-CWE candidates are reported separately. This benchmark was already used during development, so it is exposed regression evidence. [Benchmark protocol](../../reports/owasp-current-20261008/protocol.md).

## 4.4 Baselines and comparison arms

The principal comparison uses three arms:

1. Stock CodeQL using the archived Python security-extended suite.
2. Stock plus custom queries and template suspects, treating all suspects as alerts for operation-coverage measurement.
3. The same expanded candidate inventory followed by automatic context gathering and the local Qwen verifier.

The second arm exposes the contribution and cost of suspect expansion. The difference between arms two and three exposes verifier retention and rejection. The stock arm receives no LLM. It is the actual archived suite output, not a reconstructed ideal baseline.

All three arms share the same corrected operation labels and matching policy. Stock credit requires membership of an original stock finding in a linked combined candidate's aliases. Operation matching uses reviewed statement/expression ranges and explicit producer/consumer relationships. Nearby code or arbitrary function overlap does not automatically receive credit. These relationships measure operation coverage; they do not independently prove exploit reproduction.

For alert precision, the archived stock findings are mapped to existing common fusion clusters. The comparison records both raw findings and cluster counts. Four of the 77 raw stock findings collapse under the frozen two-line fusion policy, producing 73 common clusters. This detail matters because cluster counts differ from operation counts and advisory counts.

## 4.5 Evidence collection and inference procedure

For each emitted candidate, the context layer builds a focused packet from repository code. Evidence can include the selected operation, enclosing declaration, assignments, constructor arguments, callers, consumers, guards, framework bindings and related templates. Pieces retain file and line references. The collector uses Python syntax and recorded relationships to select relevant code. A possible caller is evidence for analysis, not automatically a proven attacker-to-sink path.

The main dual-model run fits a common packet against both actual model tokenizers, so Gemma and Qwen receive identical message contents. Each request uses a 16,384-token window, a 400-token completion budget and a 64-token reserve. Four requests run concurrently. Temperature is zero and top_p is one. Model-driven context expansion is disabled. Whole-block omissions are recorded; no candidate count cap is applied.

Gemma runs first and Qwen second after scanner completion. The configuration records model hashes, query hashes, requests, raw responses, finish reasons, citations, operational retries and timings. At most one operational retry is permitted per candidate. Unknowns and exhausted failures remain visible rather than silently becoming safe decisions. The [model protocol](../../runs/suspect-v2-evaluation-20261003/model-protocol.json) and [model file record](../../runs/suspect-v2-evaluation-20261003/model-files.json) identify the inference configuration.

The collector was repaired before inference to skip missing AST values in annotation-only assignments. Context was regenerated for every candidate. This operating repair belongs to the evaluated version and is distinguished from later semantic changes.

### 4.5.1 Recorded configuration and environment

The recorded model files are Qwen3-Coder-30B Q4_0 GGUF and Gemma-4-12B Q4_0 GGUF, with Gemma saved under the alias `gemma-current`. These names identify the local files used, not independently verified upstream checkpoint provenance. The three presented evaluations use the same recorded Qwen weight digest. Gemma performs inference only in the archived dual-model development comparison; later Qwen-only evaluations retain joint tokenizer fitting.

*Table 4.3: recorded common configuration. Per-run source/profile hashes and server launch records remain part of the electronic evidence appendix; common settings do not imply identical detector source across the three presented evaluations.*

| Item | Recorded value and evidence boundary |
|---|---|
| Qwen file SHA-256 | `cf9ea0572e8759348ef7f8cd899fbfecba5110929fc1aa620d18bb6d91e62700` |
| Gemma file SHA-256 | `f042924b131a4de4cbc54201eda7113329ea2b8d218226c3f09a892bbddf9125` |
| CodeQL CLI | 2.27.1, corroborated by archived stock SARIF in all three presented evaluations |
| Python query packs | `codeql/python-queries` 1.8.11 and `codeql/python-all` 7.2.6; recorded source commit `6e9f9e38390175c41b99070a423c875f450759ca` |
| Inference executable | CUDA build of `llama-server`; executable path and launch arguments recorded for each run; an immutable server build/version is not established by the launch record alone |
| Serving settings | Four slots; 65,536 total server context / 16,384 per slot; layer split with tensor ratio 1:1; GPU offload; flash attention on; reasoning off |
| Model request | Temperature 0; top_p 1; 400 initial completion tokens; operational retry governed by the run’s own protocol; no candidate cap |
| Evidence fitting | Common messages fitted against actual Qwen and Gemma tokenizers; no model-driven context expansion |
| Hardware identity | Two-GPU serving arrangement recorded; GPU model, CPU model, RAM and driver versions are not established by the cited launch records and are not inferred from the later release |
| Runtime environment | Historical Python version and complete dependency lock are not established by these launch records; later release environment is separate |

The launch records establish the two-GPU arrangement, serving arguments and actual model-file digests. They do not identify a complete historical GPU/CPU/RAM/driver configuration or immutable server build. Present-day hardware and the remaining build directory cannot establish the October evaluation environment retrospectively. Those fields remain unavailable rather than being inferred; the recorded phase and calendar timings must therefore be interpreted within their stated boundaries.

The 31-project protocol identifies the older source configuration. The 7-project and OWASP protocols identify later evaluated source snapshots and tokenizer records. The two repository evaluations reuse CodeQL databases, whereas the final benchmark uses fresh extraction. [31-project model files](../../runs/suspect-v2-evaluation-20261003/model-files.json), [31-project server launch](../../runs/suspect-v2-evaluation-20261003/models/qwen3-coder/server.json), [7-project launch](../../runs/current-seven-20261007/models/qwen3-coder/server.json), [benchmark launch](../../runs/owasp-current-20261008/models/qwen3-coder/server.json).


*Table 4.4: Recorded source fingerprints distinguishing the three evaluations; displayed SHA-256 prefixes are 12 characters, with full digests retained in the configuration summary.*

| Module | 31-project | 7-project | OWASP |
|---|---|---|---|
| context/context_builder.py | 806418e84624 | 9d25c5d33ddc | 9d25c5d33ddc |
| context/relationships.py | dd596d5bc7a8 | 9f07a8dba8a4 | 9f07a8dba8a4 |
| verifier/prompts.py | f9e9e110330f | 317f85430a50 | 317f85430a50 |
| verifier/budget.py | 2e0d3f89f4ff | 2e0d3f89f4ff | 2e0d3f89f4ff |

Matching seven-project/OWASP fingerprints identify the archived collector, relationships, prompt and fitter modules inspected for Section 3.7.4. The 31-project digests differ; sharing a model digest or a 35-query count does not make configurations interchangeable. Query source revisions, extraction reuse and run-specific client behavior remain governed by their own protocols. The published product release is another version, not a substitute for a historical detector snapshot.

## 4.6 Ground truth and decision review

Ground truth draws on benchmark labels, advisories, fixing commits, vulnerable/fixed source comparisons, and explicit review of security mechanisms. A fixing commit is a starting point for investigation. It does not make every suspicious operation in the changed file vulnerable, nor every operation in a repaired repository safe.

The review asks whether the relevant input is attacker-controlled under the stated contract, whether the selected operation consumes it dangerously, and whether the implemented defense is effective for that operation. Conditions such as deployment configuration, optional flags, operator authority and backend behavior are recorded. When the evidence cannot resolve a claim, truth remains unknown.

Labels were corrected during the project. The main thesis comparison uses the later 205-resolved-label audit rather than mixing it with the earlier 207-label panel. Corrections are applied symmetrically to comparison arms. Reviewing saved results under corrected truth is a reanalysis, not another model run.

Repository operation labels and alert truth were initially adjudicated through source inspection by an AI coding agent. The project author reported that subsequent human review confirmed the repository findings. The available confirmation does not identify a reviewer, review date, finding/scan coverage or disagreements. Formal inter-reviewer agreement statistics and item-level review coverage are unavailable; the confirmation is not an independent second-reviewer study. Benchmark test scores use the benchmark-provided labels rather than these repository adjudications.

## 4.7 Metrics and uncertainty

For a fully labeled panel:

- Precision = TP / (TP + FP).
- Recall = TP / (TP + FN).
- F1 = 2TP / (2TP + FP + FN).

TP is a positive label detected as an accepted alert; FP is a negative label incorrectly alerted; FN is a positive label without an accepted alert. For the main detector comparison, TN means a reviewed negative operation with no accepted alert. It does not necessarily mean the verifier explicitly proved the operation safe. Stricter diagnostic studies separately report safe decisions, abstentions and errors.

For reviewed repository alerts, **resolved precision** is true / (true + false), while **adjudication coverage** is (true + false) / total emitted alerts. Unknown truths are excluded from resolved precision and included in coverage accounting. This paired reporting prevents unresolved alerts from disappearing.

The repository review does not enumerate all non-alert operations. Therefore exact whole-repository TN, FN, recall and F1 are unavailable. Combining repository-alert precision with labeled-panel recall would create a mixed-denominator quantity, not measured full-scan F1.

Small positive panels are reported with integer counts. Two detections out of seven are more informative than an unqualified 28.6% general recall claim. Related operations are not treated as independent samples for statistical inference.

## 4.8 Controlled diagnostics and promotion decisions

Later studies isolate particular problems through paired packets, failed-candidate replays, vulnerable/fixed controls, synthetic fixtures, and reserved validations. The recorded variants include output repair, caller/context expansion, binding descriptions, coordinate changes, semantic checks, alternative models, QLoRA, prompt revisions and CWE instruction modules.

A development improvement alone is insufficient for promotion. Experiments inspect lost positive mechanisms, new false alerts, unresolved decisions, unsupported explanations and cost. For example, a prompt with better development scores can be rejected when it loses a stored-XSS control or fails reserved validation. A collector can be retained as a structural repair without a validated accuracy improvement.

Multiple variants and repeated use of development cases create selection risk. The thesis reports unsuccessful experiments and exposure histories; it does not present the best small subset as a general success. A paired output difference is also not automatically attributable to a code change: repeated identical requests sometimes produced different responses under concurrent inference.

## 4.9 Runtime, reproducibility and threats to validity

Runtime is recorded by phase and interpreted under the actual protocol. Development query times reuse existing extraction databases and exclude fresh extraction and model startup. The sum of per-repository inference wall times is not a fresh production end-to-end latency. The 7-project evaluation supplies a calendar interval including interruption and recovery; this is not continuous scan latency. No single per-batch speed is generalized across repository sizes, prompts and hardware.

Artifact records retain pinned revisions, source hashes, query profiles, packet omissions, model identities and result ledgers. These support traceability. Some artifacts originally lived in temporary directories, and hashes do not restore missing bytes. Durable preservation of weights, source snapshots, runtime binaries and dependency environments remains necessary for independent replay.

The principal validity threats are development exposure, small purposive cohorts, repeated related operations, incomplete repository truth, AI-assisted adjudication followed by human review without a formal agreement measurement, conditional configurations, model-training contamination that cannot be excluded, and changes in execution behavior. These limitations determine how the results in Chapter 5 should be interpreted.

---

<a id="chapter-05"></a>

# Chapter 5 — Results and Evaluation

## 5.1 Evaluation overview

The project produced several experiment families rather than one continuously comparable score. Early experiments measured benchmark candidates and verification. Later source discovery exposed scaling problems. Custom suspect queries improved development coverage, followed by full-repository model comparisons and the seven-project regression evaluation. Controlled diagnostics then investigated why context and model changes often failed to generalize.

The three presented evaluations follow the configurations, scoring units and exposure boundaries defined in Chapter 4. All sets had development or investigation exposure. Historical experiments explain design choices and are not pooled with these sets; the [results register](../thesis-results-register.csv) records additional historical anchors and limitations.

### 5.1.1 One comparison format, three evaluation sets

Each presented evaluation compares stock CodeQL with OpenSAST on the same labels using precision, recall and F1. Precision asks how many flagged labeled cases are vulnerable; recall asks how many known vulnerable cases are detected; F1 balances precision and recall. The 31-project set contains 205 resolved operation labels (113 vulnerable, 92 negative; two unknown truths excluded). The 7-project set contains 14 primary operation labels (seven vulnerable, seven repaired) across six of seven projects; the seventh is exploratory. OWASP contains all 293 official four-CWE tests (114 vulnerable, 179 negative). All sets had development or investigation exposure.

*Table 5.1: Primary comparison using labeled-case precision, recall and F1. Repository rows score selected labeled operations; OWASP rows score all official tests in the four-CWE scope. These are not exhaustive repository-wide scores or full-alert precision.*

| Evaluation | Approach | Precision | Recall | F1 |
|---|---|---:|---:|---:|
| 31-project repository evaluation | Stock CodeQL | 97.7% | 38.1% | 54.8% |
| 31-project repository evaluation | OpenSAST | 97.2% | 92.9% | 95.0% |
| 7-project repository evaluation | Stock CodeQL | 40.0% | 28.6% | 33.3% |
| 7-project repository evaluation | OpenSAST | 80.0% | 57.1% | 66.7% |
| OWASP Python benchmark evaluation | Stock CodeQL | 43.1% | 49.1% | 45.9% |
| OWASP Python benchmark evaluation | OpenSAST | 55.0% | 72.8% | 62.6% |

Figure 5.1 uses the same three metrics and approach order as Table 5.1. Every panel retains its own configuration, scoring unit and denominator. Results must not be pooled or interpreted as independent generalization evidence.

![Precision, recall and F1 for the three evaluations](figures/precision-recall-panels.png)

*Figure 5.1: Precision, recall and F1 on three separate labeled evaluations. Repository panels measure selected operations; OWASP measures official scoped tests. All sets were exposed during development or investigation.*



## 5.2 RQ1 — Static suspect coverage

This question concerns whether an eligible vulnerable operation becomes a candidate before model verification. Table 5.2 separates discovery from final accepted decisions. Expanded coverage includes custom queries and supported template analysis; it is not evidence of the model's contribution.

*Table 5.2: Candidate coverage of known vulnerable cases in the three principal evaluations.*

| Evaluation | Known vulnerable cases | Stock surfaced | Expanded discovery surfaced | Expanded discovery recall |
|---|---:|---:|---:|---:|
| 31-project repository evaluation | 113 | 43 | 112 | 99.1% |
| 7-project repository evaluation | 7 | 2 | 6 | 85.7% |
| OWASP Python benchmark evaluation | 114 | 56 | 83 | 72.8% |

These counts use the same operation/test matches as the final matrices below. They distinguish discovery from verifier retention; neither candidate volume nor discovery recall establishes alert precision. The 31-project, seven-project and benchmark results remain separate observations.


### 5.2.1 Source inventory and ranking workload

The source-inventory study examined 24 vulnerable/fixed pairs from 23 repositories, covering 48 revisions. The source inventory contained 1,036,311 sites. Known vulnerable sources were visible in 23 of the 24 pairs, but only two of those 23 appeared within the first 60 candidates; median rank was 1,140. A count cap could therefore hide available evidence. Visibility in an index still did not establish detection. [Layer A report](../../runs/plan6/layer-a-report.md). The offered-source inventory excluded test-source generation; parsing test files did not mean their source sites were offered to the model.

The Python-index portion of Layer B materialized 129,560 eight-candidate batches, producing approximately 2.6 GB of packet material in 32.77 minutes. This did not complete the whole planned Layer B, add CodeQL context hints or run full model inference. The reported 130–134-day model workload was a throughput projection, not elapsed execution. These results showed that classifying a broad source inventory was impractical under the measured setup. Ranking experiments improved some known-source positions, but did not establish measured end-to-end detection or inference savings. [Layer B report](../../runs/plan6/layer-b-python-context-report.md), [ranking report](../../runs/plan6/a2-report-v4.md).

### 5.2.2 Custom suspect queries and historical reverse checks

The historical qualified inventory contains 34 rules: ten for CWE-22, seven for CWE-78, nine for CWE-79 and eight for CWE-89. The stock/custom comparison processed 78 revisions across 49 repositories. It recorded 714 stock findings, 6,487 custom findings and 79 overlapping findings, giving 7,122 unique union suspects. The custom layer added 6,408 suspects beyond stock, and 33 of the 34 rules emitted at least one finding. These counts measure output volume, not confirmed vulnerabilities. [Stock-plus-34 report](../../runs/plan7/stock-vs-34-20260929/report.md).

Reverse checking 31 known vulnerable operations found four through stock, 28 through custom rules and 30 through their union: 96.8% candidate coverage. This development result was valuable evidence of coverage, but did not establish precision across the thousands of suspects. Some labels lacked an external advisory, and operation-level matches did not independently prove the complete vulnerability mechanism. [Reverse validation](../../runs/plan7/stock-vs-34-20260929/reverse-validation.md).

The synthetic benchmark was less favorable. Custom rules alone covered 18 of 114 positives, and stock/custom union covered 63. This is union recall 55.3%, not general recall near 97%. The benchmark and development reverse check contain different structures and exposure histories. [Benchmark comparison](../../runs/plan7/owasp-benchmark-34-20260929/report.md).

*Table 5.3: Custom suspect layer.*

| Four-CWE benchmark arm | TP | TN | FP | FN | Recall |
|---|---:|---:|---:|---:|---:|
| Custom 34 rules | 18 | 172 | 7 | 96 | 15.8% |
| Stock + custom union | 63 | 100 | 79 | 51 | 55.3% |

No LLM verification is included in this table. The later main system uses a 35-query profile, so its inventory is also not identical to the historical 34-rule run.

### 5.2.3 Earlier scanner and specification experiments

The four-CWE OWASP benchmark contains 114 positive and 179 negative tests. The initial recorded stock result was TP56, TN105, FP74 and FN58: precision 43.1%, recall 49.1%, and F1 45.9%. The early B/C/D verifier tests used 145 matched candidates rather than every benchmark test. Variant D obtained recall 100% within that surfaced subset, with precision 56.0% and F1 71.8%. This was not 100% end-to-end benchmark recall. [Early results](../results.md).

The corrected early scanner evaluation produced TP63, TN91, FP88 and FN51, with recall 55.3% and F1 47.5%. Repeated verifier comparisons found the guided-question V2 performed worse overall than V1 in that configuration. Mean V1 F1 was 51.1%, versus 44.1% for V2. [Corrected scanner](../plan2-corrected-stage1.md), [verification](../plan2-corrected-verification.md).

The subsequent XSS-expansion study broadened output handling. On the benchmark, scanner union recall reached 69.3% and final verified recall was 57.0%, with verified precision 47.1% and F1 51.6%. Separate human and generated cohorts behaved differently. The human-cohort verifier obtained precision 54.3%, recall 38.1% and F1 44.8%; PySASTBench targeted verification detected 24 of 70 scoped CVEs and did not establish a full precision measure. These outcomes reinforce the need to report cohorts separately. [Plan 3 progress](../plan3-progress.md).

The source-model → CodeQL → verifier design did not provide a reliable general improvement. The recorded benchmark final result was TP60, TN106, FP73 and FN54, with F1 48.6%. Its frozen 20-CVE test detected none and had 13 operating failures. Later repairs and source oracles were diagnostic experiments, not replacements for that result. A source-oracle study produced paths in 12 of 17 Python pairs, while five still lacked paths. Source knowledge alone did not eliminate flow or sink gaps. [Plan 4 final report](../../reports/plan4-full-results-2026-09-24.md).

## 5.3 RQ2 — Verification, detection quality and cost

The stock/OpenSAST comparison assesses the complete pipeline. The expanded-discovery arm isolates the population supplied for model review; changes from that arm to the verified arm describe downstream retention and filtering. A gain over stock must not be attributed to the LLM alone.

### 5.3.1 31-project repository evaluation

**Supporting confusion counts.**

The completed main run covers 31 projects, 36 pinned snapshots and 2,249 combined candidates per model. Its authoritative corrected panel contains 205 resolved operation labels: 113 positive and 92 negative. Two additional truth labels remain unknown and unscored. The following arms use the same labels and reviewed operation links. [Authoritative comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md).

*Table 5.4: Supporting confusion counts and discovery-layer scores for the 31-project repository evaluation. The primary two-approach comparison appears in Table 5.1.*

| Arm | TP | TN | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Stock CodeQL | 43 | 91 | 1 | 70 | 97.7% | 38.1% | 54.8% |
| Expanded suspects treated as alerts | 112 | 78 | 14 | 1 | 88.9% | 99.1% | 93.7% |
| Expanded suspects + Qwen | 105 | 89 | 3 | 8 | 97.2% | 92.9% | 95.0% |

Expanded analysis surfaced 112 of the 113 positive operations. Qwen retained 105 and lost seven candidate-covered positives. The one scanner miss and seven verifier losses account for the eight final false negatives. On negative labels, the verifier reduced false alerts from 14 suspects to three accepted alerts.

Compared with stock, the complete pipeline detected 62 additional positive operations and retained all 43 stock-detected positives. It removed one stock false alert and introduced three alerts on previously unflagged negative labels. These are substantial gains on the development panel. The table's high precision is limited to its selected labeled operations.

**Supporting per-CWE recall.**

*Table 5.5: Supporting per-CWE recall for the 31-project repository evaluation.*

| CWE | Positive operations | Stock detected | Qwen pipeline detected | Stock recall | Pipeline recall |
|---|---:|---:|---:|---:|---:|
| 22 | 17 | 9 | 13 | 52.9% | 76.5% |
| 78 | 11 | 6 | 10 | 54.5% | 90.9% |
| 79 | 47 | 12 | 44 | 25.5% | 93.6% |
| 89 | 38 | 16 | 38 | 42.1% | 100.0% |

The SQL panel's 100% recall applies to 38 development operations. It does not imply complete SQL-injection detection in unseen Python projects.

**Review of emitted repository alerts.**

The same run's emitted alerts give a different view. The stock arm has 77 raw normalized findings mapped to 73 common fusion clusters. Qwen emits 233 accepted repository alerts. Source review classifies the clusters as follows:

*Table 5.6: Review of emitted repository alerts.*

| Arm | Total alerts/clusters | True | False | Unknown truth | Resolved precision | Review coverage |
|---|---:|---:|---:|---:|---:|---:|
| Stock, common clusters | 73 | 56 | 14 | 3 | 80.0% | 95.9% |
| Qwen pipeline | 233 | 137 | 84 | 12 | 62.0% | 94.8% |

The pipeline produces 81 more reviewed true clusters and 70 more false clusters than stock. These counts are not independent vulnerability totals. The result demonstrates broader useful reporting together with increased review burden. It also explains why 97.2% labeled-panel precision must not be called full-scan precision.

Whole-repository non-alert truth remains incomplete. This table therefore supplies no exact repository-wide TN, FN, recall or F1. Unknown truth remains visible rather than counted as false or safe.

**Vulnerable/fixed subset.**

A smaller development subset contains nine vulnerable and nine repaired operations across five projects. Stock obtains TP1, TN8, FP1 and FN8; Qwen obtains TP8, TN9, FP0 and FN1. Qwen recall is 88.9% and F1 94.1% on that subset. Five positives belong to SciTokens, so the observations are related. A repaired operation being unflagged does not establish that its entire repaired repository contains no vulnerabilities.



### 5.3.2 7-project repository evaluation

The October 8 rerun used the same seven projects and 16 pinned snapshots with the current 35-query profile, fresh automatic evidence and Qwen. It processed all 6,900 repository candidates plus six separate controls. These repositories had already been examined, so this is an exposed regression comparison rather than new evidence of unseen generalization. Earlier records remain in the investigation archive, separate from the principal comparison. [Final repository report](../../reports/current-seven-20261008/report.md).

*Table 5.7: Supporting confusion counts and discovery-layer scores for the 7-project repository evaluation. The primary comparison appears in Table 5.1.*

| Current arm on the same 14-operation primary panel | TP | TN | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Stock CodeQL | 2 | 4 | 3 | 5 | 40.0% | 28.6% | 33.3% |
| Current expanded candidate layer | 6 | 2 | 5 | 1 | 54.5% | 85.7% | 66.7% |
| Current candidates + Qwen | 4 | 6 | 1 | 3 | 80.0% | 57.1% | 66.7% |

The verifier retained four of six candidate-covered positives and removed four of five candidate-layer false positives on repaired operations. Its initial broad review of 131 repository alerts recorded 22 true, 93 false and 16 unknown truths: resolved alert precision 19.1%, with adjudication coverage 87.8%. Thus the primary panel improved while the complete alert stream still had a substantial false-alert burden. A subsequent narrower configuration-contract review of the unknown alerts is supplementary; its conditional labels do not replace the original broad-scope adjudication. [Supplementary review](../../reports/current-seven-20261008/review/deep-review/report.md).

The repository decisions comprise 6,215 NOT_VULNERABLE, 131 VULNERABLE and 554 UNRESOLVED, with no final SYSTEM_ERROR. The six synthetic controls separately produced TP2/TN1/FP3/FN0. Calendar duration from the first smoke request to completion was 24h 25m 40s, including interruption and recovery, with existing CodeQL databases reused. The unconfirmed disappearance of the driver/model and the resumed phase prevent treating this as a clean continuous runtime measurement. Non-alert truth remains incomplete, so full-repository recall and F1 cannot be calculated.

### 5.3.3 OWASP Python benchmark evaluation

The final October 8–9 evaluation processed every fused candidate from OWASP BenchmarkPython v0.1 at commit `f1291485808b66e20ddb6b01b10dc71b3df8c8ba`, scoring all 293 official CWE-22/78/79/89 cases: 114 positives and 179 negatives. This benchmark had appeared in development and is an exposed synthetic regression benchmark. Its exhaustive official scoped labels permit exact test-level TP/TN/FP/FN; those denominators differ from real-repository operation panels and alert adjudication. [Final benchmark report](../../reports/owasp-current-20261008/report.md).

*Table 5.8: Supporting confusion counts and discovery-layer scores for the OWASP Python benchmark evaluation. The primary comparison appears in Table 5.1.*

| Benchmark arm | TP | TN | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Stock CodeQL | 56 | 105 | 74 | 58 | 43.1% | 49.1% | 45.9% |
| Stock + current custom queries | 83 | 62 | 117 | 31 | 41.5% | 72.8% | 52.9% |
| Complete solution with Qwen | 83 | 111 | 68 | 31 | 55.0% | 72.8% | 62.6% |

The expanded layer surfaced 27 additional positive tests relative to stock. Qwen removed 49 of its 117 false-alert tests and retained all 83 detected positive tests. The full arm therefore improved F1 by 16.7 percentage points over stock on this benchmark. This does not imply that verification preserved every individual correct candidate or would do so on new repositories.

*Table 5.9: Per-CWE stock/final benchmark comparison. Count tuples are TP/TN/FP/FN; each arm uses the same official scoped tests.*

| CWE | Arm | TP/TN/FP/FN | Precision | Recall | F1 |
|---|---|---|---|---|---|
| 22 | Stock | 45/38/65/20 | 40.9% | 69.2% | 51.4% |
| 22 | OpenSAST | 65/43/60/0 | 52.0% | 100.0% | 68.4% |
| 78 | Stock | 11/5/2/2 | 84.6% | 84.6% | 84.6% |
| 78 | OpenSAST | 13/2/5/0 | 72.2% | 100.0% | 83.9% |
| 79 | Stock | 0/51/7/31 | 0.0% | 0.0% | 0.0% |
| 79 | OpenSAST | 0/55/3/31 | 0.0% | 0.0% | 0.0% |
| 89 | Stock | 0/11/0/5 | 0.0% | 0.0% | 0.0% |
| 89 | OpenSAST | 5/11/0/0 | 100.0% | 100.0% | 100.0% |

The command-injection trade-off differs from the aggregate result: CWE-78 precision falls from 84.6% to 72.2% and F1 from 84.6% to 83.9%, while recall rises from 84.6% to 100%. Two additional positives cost three additional false-alert tests. This concerns only 13 positive and seven negative command tests, not a general production rate.

All 31 false negatives were XSS positives with no surfaced candidate. This identifies a candidate/sink-modeling gap for the benchmark's output structures; it is not evidence that Qwen rejected 31 supplied positive cases. The remaining path-traversal false alerts show that benchmark recall gains did not solve defense reasoning. CWE-89 has only five positives; its perfect score is bounded by that small exposed sample.

All 1,225 fused candidates were processed: 1,046 negative decisions, 178 positive decisions and one unresolved decision, with no system error. Only 229 candidates matched an official scoped test/CWE; the 996 unmatched candidates mostly concerned other-CWE tests or helpers. Their predictions were not automatically classified using incompatible labels. A separate mapping and scoring implementation reproduced the matrices from saved candidates, final verdicts and official labels. This checks the computation; it is not independent human adjudication of repository alerts. Calendar time was 2h 24m 05s including preparation and interruption/resume. [Mapping audit](../../reports/owasp-current-20261008/mapping-audit.json).

### 5.3.4 Review of emitted repository alerts

Alert review answers a different question: among all emitted groups asking a reviewer to inspect code, how many concern a supported problem? Groups can concern related instances of one underlying vulnerability, and the inventory includes operations outside the selected labeled panel. Thus its counts and precision cannot replace Table 5.1's labeled-case metrics.

*Table 5.10: Supporting reviewed-alert results. Resolved alert precision is true / (true + false); unknown truth remains visible but is excluded. A matching complete stock alert review is unavailable for the 7-project evaluation.*

| Evaluation / arm | Reviewed true alert groups | Reviewed false alert groups | Unknown truth | Resolved alert precision |
|---|---:|---:|---:|---:|
| 31-project repository evaluation / stock | 56 | 14 | 3 | 80.0% |
| 31-project repository evaluation / OpenSAST | 137 | 84 | 12 | 62.0% |
| 7-project repository evaluation / OpenSAST | 22 | 93 | 16 | 19.1% |

A model verdict of VULNERABLE is not ground truth. Candidates, model alerts, reviewed true groups and detected labeled cases are distinct quantities. Supporting confusion counts appear above; runtime and layer analysis follow; exact real-repository-wide recall and F1 remain unavailable without exhaustive non-alert truth.

### 5.3.5 Alternative verifier: Gemma

Under the original audit convention Gemma has TP90, TN86, FP3 and FN23, plus three negative abstentions. Under the principal no-accepted-alert convention those three negative abstentions join TN, giving TP90, TN89, FP3 and FN23. Precision, recall and F1 remain 96.8%, 79.6% and 87.4%. Abstentions remain separately reported operational outcomes; this does not mean the verifier proved those operations safe. Its reviewed alert set contains 119 true, 60 false and one unknown alert, giving resolved precision 66.5%. Gemma therefore retains fewer labeled positives than Qwen but has somewhat higher resolved alert precision in this development run. Neither model dominates every evaluation view. [Corrected audit](../../runs/ground-truth-audit-20261004/report.md).



### 5.3.6 Runtime and workload boundaries

Runtime is supporting evidence rather than part of the primary accuracy comparison. The recorded boundaries differ, so the following intervals are not directly comparable speed benchmarks.

*Table 5.11: Supporting runtime and workload for the three presented evaluations.*

| Evaluation | Recorded duration | Measurement boundary |
|---|---|---|
| 31-project repository evaluation | No comparable full elapsed time | Cached-database phase sums; fresh extraction and model startup excluded; 2,249 candidates per model |
| 7-project repository evaluation | 24h 25m 40s | Calendar interval including interruption and recovery; reused databases; 6,900 repository candidates; controls separate |
| OWASP Python benchmark evaluation | 2h 24m 05s | Calendar interval including fresh extraction and interruption/resume; 1,225 candidates; final scoring excluded |

All emitted eligible candidates were processed, but this does not establish complete vulnerability discovery. An earlier seven-project scan remains archived as part of the exposure and investigation history; its scores are not included in the principal comparison.

*Table 5.12: Recorded phase-time sums for the 31-project evaluation.*

| Recorded main-run phase | Time |
|---|---:|
| Stock query time sum | 6m 18s |
| Custom query time sum | 24m 13s |
| Context construction time sum | 1h 8m 15s |
| Common packet fitting | 6m 53s |
| Qwen repository inference wall-time sum | 6h 9m 8s |

These are recorded phase sums under cached-database conditions. Fresh extraction and model startup are excluded; context and fitting were shared across models. They are not a clean fresh production end-to-end timing measurement.

## 5.4 RQ3 — Evidence, attribution and output failures

Later experiments investigated the remaining problems rather than establishing another uniformly superior system.

*Table 5.13: Controlled diagnostic populations, settings and paired outcomes. B and V denote the fresh baseline and variant within each study; counts are TP/TN/FP/FN where supplied. These studies are separate from the principal full scans.*

| Study / population | Matched settings / change | Measured result and interpretation |
|---|---|---|
| Output repair: 36 prior failures + six controls | 400 initial completion tokens; revised bounded output contract | 36/36 valid responses; controls TP2/TN4. Recovery of selected failures, not a new accuracy score. |
| Semantic checks: 32 known fixtures + eight expected-unknown + six repository controls | 46 requests/arm; 800 initial output tokens, retry allowance 1,600; adds factual records and validator | Known fixtures B13/8/8/3 → V16/2/14/0: recall 13/16 → 16/16; F1 70.3% → 69.6%. The eight expected-unknown fixtures and six repository controls are assessed separately, not pooled into those 32-case counts. |
| Rich coordinates: 23 resolved cases (11 positive, 12 safe) + six expected-unknown | 29 requests/arm; single slot, 800 output tokens; source role + coordinates + qualification | B8/8/4/3 → V11/7/5/0. F1 69.6% → 81.5%, but an additional false alert and unsupported positives violate acceptance criteria. |
| Coordinates only: the same 23 resolved + six expected-unknown cases | 29 requests/arm; single slot, 800 output tokens; format change only | Both 8/8/4/3; F1 69.6%. Mean latency rises from 8.55 to 9.60 seconds in this separate replay. |
| Repeatability: three selected cases, five repetitions per mode | 400 output tokens; 15 sequential + 15 concurrent requests; 15 queued single-slot confirmations | All sequential and single-slot confirmation completions agree within each case. Concurrent F35 changes verdict (three positive, two unknown); other cases vary explanation/citations. Stable incorrect answers remain incorrect. |

The [repeatability study](../../runs/verifier-repeatability-20261006/report.md), [semantic-check study](../../runs/verifier-three-checks-20261005/report.md), [richer-coordinate study](../../runs/verifier-coordinates-panel-20261006/report.md), [coordinate-only study](../../runs/verifier-coordinates-only-20261006/report.md) and [output repair](../../runs/output-repair-20261005/report.md) provide their protocols and denominators. These controlled diagnostics are distinct from the complete repository and benchmark evaluations. Guidance and adaptation outcomes are reported under RQ4 in Section 5.5.

Two recorded examples separate collector and reasoning failures. In stored-value fixture S01, the complete code is vulnerable, but the automatically gathered packet omits the separate POST writer; the supplied-evidence expectation is therefore unknown. The writer was not inserted manually. In F34, the safe HTML option and caller are supplied, but the richer-coordinate variant judges the neighboring unsafe branch and returns a false alert. The first is missing evidence; the second misuses present evidence. Neither example is a new full-repository result.

## 5.5 RQ4 — Model guidance and adaptation

This question evaluates whether prompt changes, detailed CWE instructions or a small adapter improve the verifier sufficiently to replace the evaluated configuration. Each study retains its own cases, model settings and promotion criteria. The smaller studies are not additional observations in the three full-scan evaluations.

*Table 5.14: Outcomes of guidance and adaptation experiments.*

| Experiment | Measured outcome | Decision |
|---|---|---|
| QLoRA pilot | Labeled F1 fell from 66.7% to 46.2%; natural-code alert precision also fell | Evaluated adapter rejected |
| Prompt engineering | Eleven variants over five rounds; a selected variant did not retain its gains in reserved validation | No replacement promoted |
| CWE instruction modules | Current verifier retained 15 of 16 pilot positives, compared with nine for the selected instruction policy | Replacement rejected |

The experiment-specific populations differ. These values describe their respective studies and are not pooled into a new overall score.


### 5.5.1 Fine-tuning

The completed pilot used QLoRA with NF4 quantization and rank-eight adapters on query/value projections. It used 54 examples, of which 14 were real and 40 controlled, split into 50 training and four validation examples. Two epochs produced 26 optimizer updates; Unsloth was not used.

Evaluation processed 270 automatically gathered candidates per arm across nine snapshots from six families. The following confusion counts concern only the **laboratory panel**, containing eight positive cases and two emitted safe controls. Two additional safe controls were not emitted and were excluded under this verifier-only convention, rather than credited as TN. The baseline had TP5, TN0, FP2 and FN3, while the adapter had TP3, TN0, FP2 and FN5; F1 fell from 66.7% to 46.2%. These are not confusion counts for all 270 candidates.

Natural cases were evaluated separately. On Wlc's vulnerable/fixed pair, baseline TP1/TN1 became adapter FN1/TN1: the repaired case remained unflagged, but the positive was lost. Wlc was a validation family, so this is exposed evidence. Mistune's browser-dependent positive remained unresolved and counted as a miss in that exploratory view; its fixed unknown was excluded from TN. Two lxml dependency cases were unscorable because the exact vulnerable dependency operation was not established. These cases do not form an additional pooled primary F1.

Across all reviewed emitted alerts, precision increased from 38.2% to 45.7% while supported true alerts fell from 21 to 16. The natural-code alert subset instead decreased from 21.7% to 18.2%. These alert-review denominators differ from the laboratory confusion panel. The small, largely controlled training set and exposed validation families limit conclusions about fine-tuning generally; the measured adapter was rejected.


### 5.5.2 Prompt and skill iterations

Prompt engineering tested 11 variants over five rounds using 51 development and 219 reserved cases, totaling 1,050 calls. The selected defense-review variant improves development alert precision from 50.0% to 67.9%, but reserved alert precision falls from 21.7% for its fresh baseline to 5.0% for the variant (five true/18 false/two unknown versus one true/19 false/no unknown). Forty-five raw positive variant responses fail the evidence gate and remain unresolved. Both arms use an 800-token output allowance, rather than the principal full-run 400-token initial allowance. The reserved families include prior project exposure, so reserved means held back from this prompt selection, not never investigated. This supports conservative promotion criteria rather than choosing a prompt from its strongest development score.

The skills experiment evaluated detailed CWE instructions injected into the verifier prompt. These were instruction modules, not tool-using agent skills. Three versions were studied, followed by a fresh 70-case pilot containing full small-repository candidates and targeted cases. The 70-case pilot includes a 50-candidate primary census from two complete small repositories: 16 positive, 29 safe and five unknown-truth operations. The current verifier retains 15 positives, while the selected skill policy retains nine. Their primary counts are respectively TP15/TN25/FP0/FN1 and TP9/TN22/FP0/FN7; four versus seven abstentions on known-safe cases are excluded from TN under that study’s convention. These denominators differ from the main no-accepted-alert TN convention. The 20 other pilot candidates are targeted diagnostics rather than complete inventories of their larger projects. The 16 labels represented only three related mechanism groups. The experiment therefore rejected the replacements instead of treating their low false-alert counts as a sufficient success.

## 5.6 RQ5 — Local product and CI acceptance

Product correctness and detection accuracy received separate assessments. October 9 validation exercised actual CLI/dashboard workflows with headless Chromium, workspace roles, worker credentials, result review and export. It found and corrected a six-column/seven-placeholder review insert. Git/CI tests subsequently found and corrected repeated-PR cache loss. A temporary self-hosted runner executed four real GitHub Actions workflows, including an automatic vulnerable PR and repeats with Qwen stopped. The tests asserted expected new-alert gate failures; a green validation job did not mean the vulnerable fixture was clean. [Product validation](../../reports/product-validation-20261009/report.md), [Git/CI checks](../../reports/product-git-ci-validation-20261009/report.md), [GitHub Actions validation](../../reports/product-hosted-actions-validation-20261009/report.md).

Final release acceptance additionally checks an independent source installation, cross-file dependency invalidation, explicit failure outcomes, recovery, cancellation, restart and a safe PR gate. These engineering tests do not provide vulnerability precision/recall. Detailed observations and limitations are recorded in the [release acceptance report](../../reports/release-acceptance-20261009/report.md). No detector tuning or long benchmark rerun is used to turn acceptance success into a new detection score.

### 5.6.1 Verification of the published source release

After the October 9 release commit, a normal fresh clone of the published `v0.1.0` tag was installed without initializing the historical submodule. Its 258 recorded source/configuration file hashes matched the tested source. The package imported from the tagged checkout. A real backend/worker unchanged-snapshot scan reused six of six saved candidate decisions with inference offline; no static analysis or model verification was required for that unchanged snapshot. [Published-release check](../../reports/release-acceptance-20261009/published-release-check.json).

The acceptance environment also recorded 81 passing targeted regression tests. This is a bounded regression suite, not a claim that every repository test or deployment environment was validated. The tag resolves to commit `7a90900ddf6aee9d9047b4d2d88eaa1f41b9c454`, and the Actions template subsequently pinned that immutable commit. A release manifest connects the version to dependencies, source fingerprints, the model identity and acceptance evidence. [Release manifest](../releases/v0.1.0.json), [acceptance report](../../reports/release-acceptance-20261009/report.md).

This follow-up supports reproducibility of the tested source installation and unchanged-snapshot reuse. It does not measure a fresh scan's detection accuracy, changed-repository runtime, cross-repository private-action permission setup or general production reliability. The release check and visual/reporting updates introduce no new TP, FP, TN or FN observations.

## 5.7 Answers across the research questions

The primary comparisons in Table 5.1 show higher labeled-case recall and F1 than stock for the 31-project set, and higher precision, recall and F1 for the 7-project and OWASP sets. These gains remain bounded by prior exposure and differing denominators. Supporting alert review records substantial false-alert burden; OWASP retains 31 vulnerable XSS tests with no candidate. Discovery, verification and cost measurements explain these limits without replacing the primary comparison.

The later experiments improved understanding of failure causes and operating behavior, but did not establish a uniformly better replacement. These findings support a research prototype with useful development coverage and explicit limitations. They do not establish a generally superior production detector or measured full-repository F1.

---

<a id="chapter-06"></a>

# Chapter 6 — Discussion

## 6.1 Overall assessment

OpenSAST integrates reusable static suspects, automatic repository evidence and local verification into a Python SAST pipeline. The principal results in Table 5.1 and Figure 5.1 show higher labeled-case recall and F1 than stock CodeQL in all three presented evaluations. The 31-project precision is slightly lower than stock; the seven-project and OWASP panels have higher precision. These comparisons use each evaluation's own configuration and counting unit (Table 4.1).

The wider alert inventory presents a different trade-off. The 31-project OpenSAST review has lower resolved alert precision than stock, and the seven-project OpenSAST review remains noisy (Table 5.10). All datasets had prior development or investigation exposure. The results therefore support measured gains on the evaluated labels, while independent generalization, consistently low review burden and practical full-repository latency remain unestablished.

The implemented local product and release checks constitute an engineering contribution separate from detection accuracy (Section 5.6). Candidate coverage, accepted model decisions and reviewed alert quality are distinct outcomes; the discussion below interprets each against its evidence.


## 6.2 Interpretation of the final evaluations and release checks

The 7-project repository evaluation gives OpenSAST labeled-case precision 80.0%, recall 57.1% and F1 66.7%, while broader reviewed-alert precision is 19.1%. Those families had already been reviewed, limiting generalization evidence. The OWASP evaluation gives precision 55.0%, recall 72.8% and F1 62.6%, versus stock at 43.1%, 49.1% and 45.9%. All 31 vulnerable XSS tests lacked candidates, and 68 safe scoped tests were flagged (Tables 5.7–5.10). CWE-78 separately trades higher recall for lower precision and slightly lower F1 than stock (Table 5.9), so an aggregate gain does not mean every weakness class improves on every metric. Aggregate improvement therefore coexists with XSS discovery failure and path-defense false alerts.

Product acceptance establishes a different contribution: local installation, review workflows, dependency-aware verifier reuse, failure signaling and GitHub-triggered checks can be demonstrated without claiming exhaustive vulnerability coverage. Packaging and cache defects found during these checks also show why source-level implementation alone is insufficient evidence of a deployable workflow. Repeated unchanged scans are fast; changed scans still pay whole-repository static-analysis cost. These observations establish selected release workflows while retaining the detector limitations described in Sections 5.3.2–5.3.3 and 5.6.

## 6.3 Interpretation of the research questions

### 6.3.1 RQ1: Does expanded static analysis improve coverage?

Yes, within the measured development panel (Table 5.4; historical reverse check in Section 5.2.2). Expanded suspects cover 112 of 113 positive operations versus 43 through stock. The historical reverse check similarly found 30 of 31 known operations through the stock/custom union.

The evidence also limits that answer. The historical 34-query benchmark experiment achieved 55.3% candidate recall (Table 5.3); the later 35-query benchmark evaluation surfaced 83 of 114 positives, or 72.8% (Table 5.8). The seven-project candidate layer surfaced six of seven positives (Table 5.7). These are different configurations and populations, not repeated measurements of one unchanged detector. Broader discovery improves visibility but leaves gaps and increases the safe-operation workload.

The query design's recall-oriented purpose remains appropriate to a layered system. Safe candidates are expected, provided the downstream workload and errors are measured. Broad suspect generation becomes impractical if the verifier cannot distinguish trusted inputs or effective defenses reliably enough.

### 6.3.2 RQ2: How does verification change detection and alert quality?

On the development panel (Table 5.4), Qwen reduces negative-label alerts from 14 expanded suspects to three accepted alerts, while retaining 105 of 112 candidate-covered positives. This is a favorable panel trade-off with seven lost positives.

The full alert review is less favorable (Table 5.10; Section 5.3.4). Qwen produces 137 reviewed true clusters and 84 false clusters; stock produces 56 true and 14 false clusters. The pipeline finds more useful locations while also increasing false-review burden. Its lower resolved precision is therefore compatible with its higher selected-panel F1.

In the 7-project evaluation (Table 5.7), two of six candidate-covered positive operations were lost after verification. The verifier removed four of five false-positive suspects on repaired labels, but broader reviewed-alert precision remained 19.1%. Its benefit therefore depends on candidate distribution and cannot be inferred from panel scores alone.

### 6.3.3 RQ3: Which evidence failures remain?

The diagnostics in Section 5.4 and the worked example in Figure 3.4 identify evidence failures including omitted callers and storage writers, unresolved receiver identities, and incorrect alignment between gathered evidence and the selected operation. Focused relationship collection nevertheless provides useful evidence in particular cases. Callers, constructor arguments, assignments, guards, binding declarations and template consumers can change a security decision. The manual and automatic debugging work explains why a selected sink statement is rarely sufficient by itself.

However, “context collected” does not mean “all decisive evidence present.” Some packets omit deeper writers, receiver identities or relevant callers. Dynamic frameworks and conditional configuration make these gaps difficult to resolve. Wider packets also compete with the token budget and can introduce related but irrelevant code.

The diagnostic studies further show that evidence can be present while the model uses it incorrectly. A model may cite a registration declaration instead of the actual request parser, or treat an import as the source of attacker-controlled data. Consequently, context gathering has both structural limits and a communication problem: the verifier must understand which value and operation each evidence block describes.

### 6.3.4 Transfer across the detector questions

The 7-project evaluation supports a labeled-case advantage over stock on its primary panel, but not a general unseen-project claim. The panel is small and previously investigated, and the broad alert inventory remains noisy. The lower recall than in the 31-project set is compatible with differing contracts and exposure, but the experiment does not isolate a single causal explanation.

The result should not be dismissed because the panel is small. It identifies concrete missed mechanisms and noise that the high development score failed to predict. It should also not be generalized to every Python project. A larger, independently selected cohort would be needed for that claim.

### 6.3.5 RQ4: Do instructions or adaptation improve beyond development cases?

The adaptation and guidance studies in Sections 5.5.1–5.5.2 do not establish a superior replacement. Corrected guided-question tests performed worse overall, the fine-tuning adapter lost positive detections, and promising prompt/skill development results failed reserved or fresh evaluations. Detailed instructions are therefore a plausible method requiring evidence, rather than an achieved general improvement. The later sections explain the mechanisms behind these outcomes.

### 6.3.6 RQ5: What practical constraints arise in the local prototype?

The broad source-labeling approach was not practical under the measured setup: the recorded inventory contained more than a million sites and projected 129,560 batches (Section 5.2.1). Candidate-first review narrows the task but remains expensive. The current seven-project evaluation processed 6,900 repository candidates over 24h 25m 40s, including interruption and recovery; OWASP processed 1,225 candidates over 2h 24m 05s under different preparation and extraction boundaries (Table 5.11). Neither interval is a controlled uninterrupted production-speed benchmark.

The acceptance evidence in Section 5.6 and the reuse design in Figure 3.5 describe local project registration, workspaces, worker jobs and result review. This establishes prototype integration, not validated enterprise security or usability. Changed scans retain repository-wide CodeQL analysis and fresh context; exact decision reuse is narrower than a changed-files-only scan.

A full emitted inventory improves evaluation completeness but increases cost. Runtime improvements must preserve measured candidate and mechanism coverage. Ranking, caching and reuse are promising engineering directions, yet the project has not established a general accuracy-preserving runtime reduction through its ranking experiments or a benchmarked production incremental scan.

## 6.4 Why many false alerts remain

### 6.4.1 Incorrect attacker attribution

A recurring error is assuming that a dynamic value must be attacker-controlled. In real applications, a path, command or SQL fragment may come from trusted deployment configuration, privileged administrative choices or internal constants. Endpoint queries intentionally surface these operations, so the verifier must establish the relevant authority boundary rather than infer it from dynamism.

The error also appears as value confusion. The repository may contain a request parser and a dangerous operation without that parser supplying the selected argument. Citing both is not a supported flow. This is especially difficult where frameworks register callbacks indirectly or storage introduces a time-separated producer and consumer.

### 6.4.2 Incorrect defense interpretation

Security defenses have domains. SQL parameter binding can protect a database value but does not escape that value when it later enters HTML. Terminal escaping is not automatically HTML escaping. Path normalization does not alone establish containment, while an effective containment guard can make a broad path suspect safe.

The reviewed errors include both overlooking valid defenses and crediting ineffective defenses. More detailed instructions sometimes corrected one mechanism while damaging another. A broad instruction to prefer safety can suppress real vulnerabilities; an instruction to assume attacker influence can increase false alerts.

### 6.4.3 Judging a nearby operation

Some responses explain a plausible vulnerability in related code rather than the reported operation. The model may use a writer from another application, a parser from another route, or a consumer that does not receive the selected value. This can create a correct-looking verdict with unsupported reasoning.

Exact references help reveal this error but do not necessarily prevent it. The coordinate experiments improved mechanical attribution without consistently improving security judgments. The project therefore distinguishes citation validity from semantic evidence alignment.

## 6.5 Why additional detail did not reliably help

The experiments tested more context, stronger instructions, semantic checklists, richer coordinates and CWE modules. Several improved a controlled score while adding false alerts or losing reserved positives. In the controlled study summarized in Table 5.13, one semantic-check variant reached 100% recall while greatly increasing false alerts. A coordinate-rich variant recovered positives but introduced unsupported claims. Prompt and skill development winners failed later evaluations.

These outcomes suggest that adding detail is not sufficient. Instructions can alter the model's decision preference without improving its understanding of the actual value flow. Larger packets can supply additional facts while increasing distraction or ambiguity. A truthful relationship description can still be misread as proof of attacker origin.

Changes should therefore be assessed through paired mechanism reviews, reserved families, whole-repository alert samples and operating cost. Aggregate TP counts can hide a lost mechanism if another case is gained. The thesis reports these substitutions rather than calling every aggregate increase an improvement.

### 6.5.1 Evidence completeness and computational cost

The early pilot measurements in Section 3.2 and design progression in Figure 3.1 expose a recurring trade-off. Small excerpts reduced input cost but could exclude the caller, configuration or control needed to establish a security mechanism. Expanding relationships improved evidence recovery, but also repeated code and increased model workload. A complete code inventory is therefore useful infrastructure, not proof that the model received sufficient evidence or judged it correctly.

Exhaustive processing was operationally expensive, yet the completed Picklescan experiment still missed the target. Tool-assisted agents could retrieve additional evidence on demand and eventually succeeded on small development pairs, but introduced serial model turns, timeout recovery, context pressure and incomplete investigations. Available resources were one constraint; missing evidence, premature investigation termination, output handling and proof validation were independent constraints.

These observations support bounded candidate-first assessment as the project's engineering choice. They do not establish that larger hardware alone would solve agent reliability, nor that static candidate generation eliminates context or reasoning errors. The earlier experiments also included deserialization and logic flaws outside the final four-CWE scope, so their failures cannot be used to claim a general ceiling for the final CodeQL layer. The final architecture remains subject to its separately reported coverage, precision and transfer limitations.

## 6.6 Model choice, fine-tuning and execution stability

Qwen and Gemma have different trade-offs in the completed development comparison (Section 5.3.5). Qwen retains more positive operations, while Gemma has higher resolved precision among emitted alerts. Controlled tests also show that superiority can reverse on a small subset. These results do not justify calling one model universally better.

The QLoRA pilot in Section 5.5.1 did not improve the required detection trade-off. It used a small training set dominated by controlled examples, and its labeled recall decreased. This rejects the evaluated adapter, not fine-tuning as a general method. Future training would require broader reviewed mechanisms, independent family-level evaluation, explicit safe examples, unknown handling and reliable model lineage.

The stability diagnostics summarized in Section 5.4 found that repeated byte-identical requests sometimes produced different responses under concurrent inference despite temperature-zero settings. Small sequential replays were more stable in selected tests. The precise runtime cause was not established. These observations mean a paired verdict change cannot automatically be attributed to a collector or prompt edit. Repeated controls and execution-setting records are needed when interpreting small improvements.

## 6.7 Evaluation quality and uncertainty

The original labeled panels and later corrected audit show that evaluation itself required development. Some labels were conditional, some matched the wrong operation, and some relied on framework behavior outside the declared scope. Corrections improved validity but also made older scores incompatible with newer ones.

The project author reported human confirmation after initial AI coding-agent source adjudication. Formal agreement statistics, item-level review coverage and exhaustive exploit reproduction are unavailable. Human review does not make repository truth exhaustive. Unknown truths are preserved, and additional errors may remain among resolved labels. These constraints affect both precision and recall estimates.

Whole-repository negative truth is particularly difficult. Processing every candidate provides a complete emitted inventory, not a complete list of all vulnerabilities and safe operations. Reviewed-alert precision and selected-panel recall must therefore remain separate. The thesis declines to report a measured global F1 rather than filling the gap with a mixed-denominator estimate.

Related operations also inflate apparent sample size. Five development positives can come from one advisory family, while a skills pilot's 16 positive labels represent three mechanism groups. Integer counts and family exposure are needed alongside percentages.

## 6.8 Practical implications

The current system is most defensible as a locally hosted research and review aid. It can expose security-relevant operations missed by a stock baseline and attach repository evidence to a reviewable decision. The prototype CLI and dashboard demonstrate how users could register projects and organize results within their infrastructure.

The measurements do not support replacing stock CodeQL or claiming a dependable general production detector. A local deployment requirement addresses code-location control, but it does not establish authorization security, model accuracy or acceptable scanning latency. These require their own evaluations.

A reviewer should see accepted alerts, unresolved decisions and evidence limitations clearly. Quietly hiding unknowns could make a dashboard appear precise while concealing missed positive operations. Similarly, unaffected-decision reuse must preserve cross-file dependencies and exact decision validity rather than treating every edit as isolated.

## 6.9 Directions arising from the discussion

The unresolved priorities are independent evaluation, alignment of consumed values with their actual producers and defenses, and measured cost reduction. Chapter 7 develops these directions and their required evidence, without treating them as achieved improvements.

---

<a id="chapter-07"></a>

# Chapter 7 — Conclusion and Future Work

## 7.1 Summary

This thesis investigated a locally executed hybrid system for detecting Python vulnerabilities within four weakness classes: path traversal, operating-system command injection, cross-site scripting and SQL injection. The central question was whether static analysis, automatically gathered repository evidence and language-model verification could combine into useful detection while controlling false alerts and processing cost.

The project developed OpenSAST through successive experiments. An early pilot within this project investigated repository-to-AST model assessment and tool-assisted autonomous agents. Retrieval gaps, long processing times and incomplete agent runs motivated a more bounded design. Subsequent work combined scanners and verification, followed by a specification-first architecture and broad source discovery. The later main configuration uses stock CodeQL, reusable custom suspect queries and template analysis to produce candidates. An automatic context layer collects relevant repository code, fits evidence to model budgets and supplies it to a local verifier. Structured output and evidence checks determine which responses become accepted alerts, while preserving safe, unknown and error outcomes. A local CLI/dashboard prototype exposes project registration, scanning and result review.

Across the three separately scored evaluations, OpenSAST has higher labeled-case recall and F1 than stock CodeQL (Table 5.1). The 31-project precision is slightly lower; seven-project and OWASP precision improve. These scores retain different populations and configurations, all previously exposed during development or investigation. The larger repository alert inventories remain substantially noisier than selected-panel precision suggests, and the benchmark misses every positive XSS test. The measurements support bounded detection gains and an explicit account of failures, rather than universal production superiority.

Subsequent studies examined context, response reliability, model behavior, prompting, CWE instructions and a QLoRA adapter. Some changes improved operating behavior or selected development examples, but the evaluated replacements did not establish a consistently better detection trade-off beyond those cases. Their rejection is part of the empirical record.

## 7.2 Main achievements and objective assessment

### 7.2.1 Implemented and measured contributions

The project achieved an integrated hybrid analysis pipeline and a local product prototype. Final release checks exercised selected installation, failure-recovery, CLI/dashboard, conservative verifier-reuse and GitHub Actions workflows. These checks establish operational evidence within the documented scope, rather than a production security certification. It produced reusable suspect queries, automatic evidence packets with source references, structured verification records and artifacts supporting later review. These components provide a concrete system through which the research questions could be investigated.

The evaluation also became more explicit during development. It distinguishes benchmark tests, labeled operations, advisory families, candidates and alert clusters. It records scope assumptions, vulnerable/fixed revisions, corrected labels, unresolved truth, gate failures and operating errors. This separation allowed earlier optimistic interpretations to be checked against broader evidence.

A further contribution is the failure analysis. The project identified scanner omissions, missing evidence relationships, incorrect attacker attribution, misunderstood defenses, selected-operation confusion and response-contract problems. It also observed instability in some repeated concurrent requests. These findings explain why collecting more code or adding more detailed instructions did not uniformly improve outcomes.

The implementation and empirical record do not establish a new formal taint-analysis algorithm or complete Python ecosystem coverage. Their contribution is an implemented, traceable investigation of a particular hybrid approach under declared conditions.

### 7.2.2 Answers to the research questions

**RQ1 — Suspect coverage.** Additional analysis and custom rules improved coverage on the measured development material. The main expanded scanner surfaced 112 of 113 positive operations, compared with 43 through stock. Gains varied across cohorts: the 7-project primary panel surfaced six of seven positives, leaving one scanner miss. Reusable suspect generation was achieved, while reliable coverage across new repositories remains only partially demonstrated.

**RQ2 — Local verification.** Verification removed many alerts on labeled safe suspects in the development panel and retained most surfaced positives. It also lost vulnerable operations and left substantial false alerts in the complete reviewed stream. On the 7-project primary panel, two of six candidate-covered positives were lost. Useful development behavior was demonstrated; a general advantage in detection, precision and cost together was not established.

**RQ3 — Evidence and validation failures.** Layer-specific diagnostics identified both missing context and incorrect interpretation of supplied context. Valid JSON and existing evidence references did not guarantee correct value attribution or security reasoning. The project established a reviewable failure taxonomy, while automatic semantic correctness remains unresolved.

**RQ4 — Guidance and adaptation.** Detailed prompts, CWE instruction modules and the small QLoRA pilot did not establish a superior replacement under their later evaluations. Development gains sometimes accompanied lost mechanisms, additional false alerts or increased uncertainty. These experiments support conservative promotion based on reserved evidence rather than selecting the highest development score.

**RQ5 — Local product constraints.** The CLI/dashboard prototype demonstrates local integration and project workflows. Its first scan is full, while later scans can skip unchanged work or reuse valid decisions. Changed scans retain repository-wide CodeQL analysis and fresh context. Enterprise readiness, comprehensive authorization security, usability and general incremental speedups were not established by this work.

Overall, the implementation and development-detection objectives were achieved within their evaluated boundaries. Generalization, consistently low false-alert burden and practical full-repository runtime remain partially achieved or unestablished objectives. The thesis's conclusions preserve that distinction.

## 7.3 Future work

### 7.3.1 Independent datasets and adjudication

The first priority is a larger evaluation drawn from independent project and advisory families within a declared support scope. Vulnerable and fixed revisions should remain paired, with relevant configuration conditions recorded before predictions. Repositories used to develop rules or prompts should be separated from those used to assess transfer.

The initial AI adjudication received human follow-up confirmation. A future formal independent review should record reviewer identity, per-finding coverage, disagreements and unresolved conditions. Reviewers should inspect the selected mechanism, its authority boundary and relevant defenses, rather than only the model verdict. Isolated behavior checks can supplement source review where feasible. Evaluation should report candidate omissions, retained mechanisms, fixed-case behavior and alert-review burden separately.

A larger cohort should also address the concentration of related observations. Multiple operations from one advisory or cloned example should remain identifiable rather than being treated as independent evidence of generalization. The existing exposed cases can support regression work, but require separate status from new transfer material.

### 7.3.2 Compact evidence about the consumed value

Context work should focus on identifying the actual value consumed by the selected operation. Useful evidence includes its producer, argument binding, transformations, relevant caller conditions and effective protections. Framework registrations, callbacks and persistent storage require relationships that may be absent from a short local excerpt.

The collector should distinguish direct code facts from possible relationships and assumptions. Missing writers, unresolved receivers or omitted guards should be visible to the verifier and reviewer. A compact packet that communicates these distinctions is a research direction requiring paired measurement; collecting more lines alone is not an established solution.

Structural evaluation should check whether the required evidence is present and correctly referenced. Model evaluation should then check whether the explanation uses that evidence correctly. Keeping these assessments separate would make collector gains easier to interpret.

### 7.3.3 Semantic validation and conditional decisions

The existing evidence checks establish response structure and reference validity. Future validation should investigate whether a cited excerpt supports the claimed role: input origin, transfer, dangerous consumption or defense. A source declaration, registration or import should not receive attacker-origin credit solely because it appears in the packet.

Conditional cases also need explicit representation. When a vulnerability depends on an option, caller authority or deployment configuration, the system should preserve that condition and evaluate the relevant alternatives. The correctness of such decisions requires reviewed conditional controls; an unconditional verdict should not conceal the assumptions needed to support it.

### 7.3.4 Verification quality and uncertainty

Further model or prompt changes should be compared on the same candidate inventories and evidence, with reserved vulnerable, safe and insufficient-evidence cases. Evaluation should inspect explanations, retain lost-mechanism records and account for unknown decisions. Fewer alerts alone is insufficient if the change suppresses useful detections.

Additional training would require a larger and more diverse reviewed corpus, explicit defenses and authority boundaries, and independent family-level evaluation. The rejected small adapter does not determine the outcome of a different training study, but it provides a reason to measure retention and noise jointly.

Execution stability also deserves further investigation. Repeated controls under recorded serving settings can help distinguish an implementation effect from response variation. The current observations do not establish the exact cause of concurrent instability, so a causal claim would require a separately designed study.

### 7.3.5 Cost, reuse and incremental correctness

The measured full-repository workload makes cost reduction a practical priority. Future studies could investigate duplicate handling, grouping related candidates and reuse of decisions whose evidence remains valid. Each method should report how many mechanisms are retained or lost, alongside runtime and resource use.

Incremental behavior requires cross-file correctness checks. A caller, helper, configuration or template change can affect an operation in an untouched file. Reuse should therefore account for relevant dependencies and evidence changes. A future benchmark should compare fresh and incremental results under controlled edits before claiming an accuracy-preserving speedup.

Ranking could support time-bounded review, but any cutoff must be evaluated as a coverage trade-off. It should not silently turn a partial scan into a complete evaluation. The project's earlier ranking results did not establish end-to-end detection or time savings.

### 7.3.6 Scope expansion and product assessment

Additional frameworks, integrations and CWEs should receive explicit version and pattern contracts before primary evaluation. Expansion should include vulnerable, repaired, safe and missing-evidence cases, with existing failures retained. A framework's presence in a repository does not establish coverage of every extension or backend.

The local product also needs dedicated assessment of authentication, workspace authorization, worker credentials, queue behavior, cancellation, result access and export. Packaging, deployment configuration and resource scheduling require evaluation within the intended infrastructure. These engineering tasks would provide evidence beyond the present prototype documentation.

## 7.4 Closing conclusion

OpenSAST demonstrates that a locally hosted hybrid pipeline can recover many security-relevant operations missed by a stock baseline on development projects and provide evidence for structured review. Its evaluation also demonstrates substantial remaining limits in transfer, semantic reasoning, false-alert burden and runtime.

The thesis contributes both the implemented system and an account of those limits. It establishes where the approach helped under measured conditions, how its layers failed, and what evidence future improvements would need. Reliable general Python vulnerability detection remains an open objective requiring stronger evaluation and better alignment between the selected operation, its evidence and the verifier's judgment.

---

<a id="section-references"></a>

# References

<a id="ref-01"></a>

[1] Ziyang Li, Saikat Dutta, Mayur Naik, “IRIS: LLM-Assisted Static Analysis for Detecting Security Vulnerabilities,” International Conference on Learning Representations, 2025. [Online]. Available: [Primary source](https://proceedings.iclr.cc/paper_files/paper/2025/hash/582d4e27fa24168f3af1f4582655034b-Abstract-Conference.html).

<a id="ref-02"></a>

[2] Feras Al-Kassar, Luca Compagna, Davide Balzarotti, “WHIP: Improving Static Vulnerability Detection in Web Application by Forcing tools to Collaborate,” 32nd USENIX Security Symposium, pp. 6079–6096, 2023. [Online]. Available: [Primary source](https://www.usenix.org/conference/usenixsecurity23/presentation/al-kassar).

<a id="ref-03"></a>

[3] Ahmed Lekssays, Hamza Mouhcine, Khang Tran, Ting Yu, Issa Khalil, “LLMxCPG: Context-Aware Vulnerability Detection Through Code Property Graph-Guided Large Language Models,” 34th USENIX Security Symposium, pp. 489–507, 2025. [Online]. Available: [Primary source](https://www.usenix.org/conference/usenixsecurity25/presentation/lekssays).

<a id="ref-04"></a>

[4] Jinyao Guo, Chengpeng Wang, Xiangzhe Xu, Zian Su, Xiangyu Zhang, “RepoAudit: An Autonomous LLM-Agent for Repository-Level Code Auditing,” arXiv preprint arXiv:2501.18160v2, 2025, doi: 10.48550/arXiv.2501.18160. [Online]. Available: [Primary source](https://arxiv.org/html/2501.18160v2).

<a id="ref-05"></a>

[5] Saad Ullah, Mingji Han, Saurabh Pujar, Hammond Pearce, Ayse Coskun, Gianluca Stringhini, “LLMs Cannot Reliably Identify and Reason About Security Vulnerabilities (Yet?): A Comprehensive Evaluation, Framework, and Benchmarks,” IEEE Symposium on Security and Privacy, pp. 862–880, 2024, doi: 10.1109/SP54263.2024.00210. [Online]. Available: [Primary source](https://open.bu.edu/items/0ecce1cf-40da-41ae-b0c7-999d83490fb4).

<a id="ref-06"></a>

[6] Yangruibo Ding, Yanjun Fu, Omniyyah Ibrahim, Chawin Sitawarin, Xinyun Chen, Basel Alomair, David Wagner, Baishakhi Ray, Yizheng Chen, “Vulnerability Detection with Code Language Models: How Far Are We?,” arXiv preprint arXiv:2403.18624v2, 2024, doi: 10.48550/arXiv.2403.18624. [Online]. Available: [Primary source](https://arxiv.org/html/2403.18624v2).

<a id="ref-07"></a>

[7] Alperen Yildiz, Sin G. Teo, Yiling Lou, Yebo Feng, Chong Wang, Dinil Mon Divakaran, “Benchmarking LLMs and LLM-based Agents in Practical Vulnerability Detection for Code Repositories,” Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 30848–30865, 2025, doi: 10.18653/v1/2025.acl-long.1490. [Online]. Available: [Primary source](https://aclanthology.org/2025.acl-long.1490/).

<a id="ref-08"></a>

[8] John Pellew, Faizan Raza, “RealVuln: Benchmarking Rule-Based, General-Purpose LLM, and Security-Specialized Scanners on Real-World Code,” arXiv preprint arXiv:2604.13764v1, 2026, doi: 10.48550/arXiv.2604.13764. [Online]. Available: [Primary source](https://arxiv.org/abs/2604.13764).

<a id="ref-09"></a>

[9] Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen, “LoRA: Low-Rank Adaptation of Large Language Models,” arXiv preprint arXiv:2106.09685, 2021, doi: 10.48550/arXiv.2106.09685. [Online]. Available: [Primary source](https://arxiv.org/abs/2106.09685).

<a id="ref-10"></a>

[10] Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer, “QLoRA: Efficient Finetuning of Quantized LLMs,” Advances in Neural Information Processing Systems 36, 2023, doi: 10.52202/075280-0441. [Online]. Available: [Primary source](https://proceedings.neurips.cc/paper_files/paper/2023/hash/1feb87871436031bdc0f2beaa62a049b-Abstract-Conference.html).

<a id="ref-11"></a>

[11] GitHub, “Analyzing data flow in Python,” accessed 2026-10-15. [Online]. Available: [Primary source](https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-python/).

<a id="ref-12"></a>

[12] GitHub, “Customizing Library Models for Python,” accessed 2026-10-15. [Online]. Available: [Primary source](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-python/).

<a id="ref-13"></a>

[13] MITRE, “CWE-22: Improper Limitation of a Pathname to a Restricted Directory (Path Traversal),” accessed 2026-10-15. [Online]. Available: [Primary source](https://cwe.mitre.org/data/definitions/22.html).

<a id="ref-14"></a>

[14] MITRE, “CWE-78: Improper Neutralization of Special Elements used in an OS Command (OS Command Injection),” accessed 2026-10-15. [Online]. Available: [Primary source](https://cwe.mitre.org/data/definitions/78.html).

<a id="ref-15"></a>

[15] MITRE, “CWE-79: Improper Neutralization of Input During Web Page Generation (Cross-site Scripting),” accessed 2026-10-15. [Online]. Available: [Primary source](https://cwe.mitre.org/data/definitions/79.html).

<a id="ref-16"></a>

[16] MITRE, “CWE-89: Improper Neutralization of Special Elements used in an SQL Command (SQL Injection),” accessed 2026-10-15. [Online]. Available: [Primary source](https://cwe.mitre.org/data/definitions/89.html).

<a id="ref-17"></a>

[17] Python Software Foundation, “subprocess — Subprocess management: Security Considerations (Python 3.12),” accessed 2026-10-15. [Online]. Available: [Primary source](https://docs.python.org/3.12/library/subprocess.html#security-considerations).

<a id="ref-18"></a>

[18] OWASP, “Cross Site Scripting Prevention Cheat Sheet,” accessed 2026-10-15. [Online]. Available: [Primary source](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

<a id="ref-19"></a>

[19] OWASP, “SQL Injection Prevention Cheat Sheet,” accessed 2026-10-15. [Online]. Available: [Primary source](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).

<a id="ref-20"></a>

[20] Semgrep, “Taint analysis overview,” accessed 2026-10-15. [Online]. Available: [Primary source](https://docs.semgrep.dev/writing-rules/data-flow/taint-mode/overview).

<a id="ref-21"></a>

[21] OpenGrep maintainers, “OpenGrep repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/opengrep/opengrep).

<a id="ref-22"></a>

[22] OASIS, “Static Analysis Results Interchange Format (SARIF) Version 2.1.0,” OASIS Standard, 27 March 2020. [Online]. Available: [Primary source](https://docs.oasis-open.org/sarif/sarif/v2.1.0/os/sarif-v2.1.0-os.pdf).

<a id="ref-23"></a>

[23] Joern maintainers, “Code Property Graph,” accessed 2026-10-15. [Online]. Available: [Primary source](https://docs.joern.io/code-property-graph/).

<a id="ref-24"></a>

[24] llama.cpp contributors, “llama.cpp grammars documentation,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/ggml-org/llama.cpp/blob/master/grammars/README.md).

<a id="ref-25"></a>

[25] IRIS authors, “IRIS repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/iris-sast/iris).

<a id="ref-26"></a>

[26] LLMxCPG authors, “LLMxCPG repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/qcri/llmxcpg/).

<a id="ref-27"></a>

[27] CyberArk, “Vulnhalla repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/cyberark/Vulnhalla).

<a id="ref-28"></a>

[28] VulnHunterX maintainers, “VulnHunterX repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/vinsoc-cyber/VulnHunterX).

<a id="ref-29"></a>

[29] OWASP Benchmark project, “OWASP Benchmark for Python,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/OWASP-Benchmark/BenchmarkPython).

<a id="ref-30"></a>

[30] PySASTBench maintainers, “PySASTBench repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/Victor725/PySASTBench).

<a id="ref-31"></a>

[31] Zhuohang Liu, Zhi Wang, Haotong Liu, Wanpeng Li, “CVE in Python Programs,” Zenodo dataset, version v1, 2025. [Online]. Available: [Primary source](https://zenodo.org/records/17936545).

<a id="ref-32"></a>

[32] Graphify-Labs, “Graphify repository,” accessed 2026-10-15. [Online]. Available: [Primary source](https://github.com/Graphify-Labs/graphify).

---

<a id="section-appendices"></a>

# Appendices

The appendices provide experiment protocols, query inventories, representative model evidence, detailed results and product validation records. Each experiment retains its recorded configuration, cohort and scoring unit.

<a id="appendix-a"></a>

## Appendix A — Experiment chronology and exposure

The chronology below begins with the scanner-based plans. Earlier July–September repository-to-AST and tool-assisted autonomous-agent experiments are documented in Appendix L and Section 3.2; their measurement units and broader vulnerability scope are kept separate.

*Table A.1: Experiment chronology and exposure.*

| Stage | Investigation | Evidence and evaluation boundary |
|---|---|---|
| Plan 1 | Scanner candidates and early verifier variants | [Historical results](../results.md); candidate-conditioned verifier scores separate from benchmark end-to-end recall |
| Plan 2 | Corrected scanner and repeated prompt comparisons | [Scanner](../plan2-corrected-stage1.md), [verification](../plan2-corrected-verification.md); corrected scanner and verifier results |
| Plan 3 | XSS expansion and distinct evaluation cohorts | [Progress/results](../plan3-progress.md); human, generated and targeted CVE cohorts separate |
| Plan 4 | LLM specifications followed by CodeQL and verification | [Final report](../../reports/plan4-full-results-2026-09-24.md); operating failures and source-oracle tests separate |
| Plan 6 | Source-site visibility, context scale and ranking | [Layer A](../../runs/plan6/layer-a-report.md), [Layer B](../../runs/plan6/layer-b-python-context-report.md), [A2](../../runs/plan6/a2-report-v4.md); projections and prefix reach are not completed detection runs |
| Plan 7 | Reusable broad suspects and benchmark checks | [Stock/custom comparison](../../runs/plan7/stock-vs-34-20260929/report.md), [reverse check](../../runs/plan7/stock-vs-34-20260929/reverse-validation.md), [benchmark](../../runs/plan7/owasp-benchmark-34-20260929/report.md) |
| October 3–4 | Main completed model run and corrected development audit | [Protocol](../../runs/suspect-v2-evaluation-20261003/protocol.md), [comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md); 31 development projects |
| Later diagnostics | Context, output, bindings, coordinates and stability | [Results chapter](#chapter-05), [experiment-document register](appendix-artifacts/experiment-document-register.csv); selected replays do not overwrite full-run scores |
| Adaptation and prompting | QLoRA, prompt engineering and CWE instruction modules | [Adapter](../../runs/python-verifier-finetune-20261006/report.md), [prompts](../../runs/prompt-engineering-20261006/final-report.md), [skills](../../runs/cwe-skills-20261007/final-report.md); rejected replacements retained |
| October 7–8 | Exposed seven-project rescan | [Rescan report](../../reports/current-seven-20261008/report.md); same pinned families, later source configuration |
| October 8–9 | Complete current OWASP evaluation | [Benchmark report](../../reports/owasp-current-20261008/report.md); 293 official four-CWE tests, exposed regression |
| October 9 | Local product, CI and release acceptance | [Product documentation](../opensast.md), [release acceptance](../../reports/release-acceptance-20261009/report.md); engineering checks, not new accuracy observations |

The [results register](../thesis-results-register.csv) identifies reported measurements by cohort, scoring unit, exposure, comparison arm and limitations. Detailed ledgers distinguish related operations and repeated project families. Protocol records describe the procedures; completed results establish the measurements obtained.

<a id="appendix-b"></a>

## Appendix B — Scope, revisions, truth and matching

The thesis concerns CWE-22, CWE-78, CWE-79 and CWE-89 under declared native/framework contracts. Support is assessed by the behavior required for a case, rather than an unrelated import elsewhere in its repository.

- [Framework priorities and limitations](../framework-support-scope.md).
- [Scoped evaluation policy](../scoped-evaluation-policy.md).
- [Prospective tested-pattern matrix](../scope-matrix-20261005.md).
- [Main development repository revisions](../../runs/suspect-v2-evaluation-20261003/repositories.json).
- [Corrected truth and source audit](../../runs/ground-truth-audit-20261004/report.md) and [case manifest](../../runs/ground-truth-audit-20261004/case-manifest.json).
- [Exact development case comparisons](../../runs/stock-vs-current-qwen-audit-20261004/case-comparison.json).

Operation credit uses reviewed ranges and established producer/consumer relationships, not arbitrary nearby lines. The main corrected development panel contains 205 resolved labels plus two unknown truths. The current seven-project primary panel contains seven vulnerable and seven repaired operations; Modoboa is exploratory. Its conditions and revisions are listed below. Detector-panel TN means no accepted alert on a reviewed negative operation, while stricter verifier studies separately exclude negative abstentions.


### B.1 Repository selection and composition

The 31-project panel reuses the already investigated development material rather than drawing a random sample of Python software. It contains 26 deliberately vulnerable applications from the RealVuln development collection and five upstream vulnerable/fixed project families. The latter supply ten revision snapshots. Selection of the inherited development collection is not a population sampling frame, and its original acquisition/exclusion history is not fully reconstructed. The October 3 protocol fixes the reused cohort; the corrected case ledger supplies the labels used here.

In Table B.1, E denotes an educational application and P an upstream paired project. The `realvuln-` archive prefix is omitted only from displayed E project names. Revision prefixes identify pinned snapshots; full commits remain in the electronic inventory. P/N/U denotes positive, negative and unknown operation truth, not model decisions. A dash in the CWE column means the corrected panel contributes no scoped operation label for that scanned project. Candidate counts come from the final inference selection, excluding the six synthetic controls.

*Table B.1: The 31-project development inventory and corrected operation-label contributions.*

| Project | Role | Revision(s) | CWE | P/N/U | Candidates |
|---|---|---|---|---|---|
| damn-vulnerable-flask-application | E | 55f63201 | 78, 79, 89 | 2/4/0 | 12 |
| damn-vulnerable-graphql-application | E | a961308c | 78, 89 | 0/3/0 | 12 |
| djangoat | E | 082c88bf | 22, 78, 79, 89 | 6/5/0 | 62 |
| dsvpwa | E | a06abb30 | 22, 78, 79, 89 | 10/6/0 | 25 |
| dsvw | E | 7d40f4b7 | 22, 78, 79, 89 | 8/3/0 | 8 |
| dvblab | E | 25bdef1e | 89 | 4/2/0 | 4 |
| dvpwa | E | a1d8f89f | — | 0/0/0 | 17 |
| extremely-vulnerable-flask-app | E | d5d88755 | 79, 89 | 3/3/0 | 11 |
| flask-xss | E | 4d6f5002 | 79, 89 | 8/5/0 | 24 |
| insecure-web | E | 5d1b791b | 79, 89 | 3/2/0 | 4 |
| intentionally-vulnerable-python-application | E | 3804a18a | 79, 89 | 1/1/0 | 4 |
| lets-be-bad-guys | E | 7cbf1101 | 22, 79, 89 | 5/4/0 | 7 |
| owasp-web-playground | E | 5e682aca | 79, 89 | 2/5/0 | 59 |
| pygoat | E | 2fb0c600 | 22, 78, 79, 89 | 11/5/0 | 61 |
| python-app | E | a3345226 | 22, 78, 79, 89 | 5/3/1 | 9 |
| python-insecure-app | E | 80b894a2 | 79 | 1/0/0 | 1 |
| pythonssti | E | 76339c27 | 79 | 1/0/0 | 2 |
| threatbyte | E | c4db46f7 | 22, 79, 89 | 4/5/0 | 60 |
| vampi | E | 1713b54b | 89 | 1/2/0 | 2 |
| vfapi | E | f36f177e | 89 | 4/1/0 | 10 |
| vulnerable-api | E | f7797964 | 22, 89 | 1/2/0 | 9 |
| vulnerable-flask-app | E | b6a4f97a | 22, 79, 89 | 1/4/0 | 13 |
| vulnerable-python-apps | E | 6336c77e | 22, 79, 89 | 1/5/0 | 15 |
| vulnerable-tornado-app | E | 7aca8b78 | — | 0/0/0 | 5 |
| vulnpy | E | d1d0f64c | 22, 78, 79, 89 | 17/7/0 | 38 |
| vulpy | E | 5249cc8b | 78, 79, 89 | 5/6/1 | 24 |
| khoj-ai/khoj | P | d55a0028, 94bae478 | 22 | 1/1/0 | 240 |
| masci/banks | P | 3ab65bac, ae351d77 | 22 | 1/1/0 | 78 |
| Project-MONAI/MONAI | P | d18565fb, eccefc57 | 78 | 1/1/0 | 975 |
| django-cms/django-cms | P | 6da78407, d7eeb652 | 79 | 1/1/0 | 383 |
| scitokens/scitokens | P | 66b075c3, e6d14add | 89 | 5/5/0 | 75 |

The educational applications contribute 104 positive, 83 negative and 2 unknown labels. The five paired families contribute 9 positive, 9 negative and 0 unknown labels. Thus the 205 resolved operations should not be interpreted as an equally weighted sample of 31 production applications. The [full development inventory](appendix-artifacts/development-project-inventory.csv) retains original identifiers and complete revision hashes.

Conditional development labels include DSVPWA risk level at least three, VAmPI vulnerable mode, and Djangoat's historical runtime contract. In Djangoat, Python 3's unavailable `file()` binding does not establish a full file-read exploit, although outside-root metadata access remains possible. Vulnpy file-operation labels do not establish that a trigger's return value is exposed in an HTTP response. The five upstream-pair contracts are:

- Khoj: an unrestricted path URL parameter reaches the selected access.
- Banks: a lower-trust caller supplies a prompt name/version; symlink time-of-check/time-of-use behavior is outside the reviewed patch control.
- MONAI: caller/CLI/configuration supplies lower-trust command arguments; the labels do not claim every dataset ID bypasses integer initialization.
- django CMS: editable rendering exposes a lower-trust plugin description or exception through safe-marked HTML; disabling DEBUG does not protect the custom heading.
- SciTokens: lower-trust issuer/key identifiers influence formatted SQL.

Each repaired operation retains its reviewed patch contract. These conditions do not establish that an entire repaired repository is safe.

### B.2 Seven-project revisions and case contracts

The seven-project panel is purposive: eight advisory cases with inspectable public fixes, initially two cases per CWE, across seven upstream projects. Changedetection contributes two advisory pairs. Six projects supply the seven primary vulnerable/fixed operations; Modoboa requires an exploratory Django REST Framework/persistence contract. The current evaluation retains these reviewed locations and conditions after prior investigation, so it is regression evidence. No FastAPI project was selected. Table B.2 enumerates every current snapshot; the full inventory is retained electronically.

*Table B.2: All 16 snapshots in the seven-project repository evaluation.*

| Project | Revision | Arm | CWE | Scope | Candidates |
|---|---|---|---|---|---|
| dgtlmoon/changedetection.io | 3558e9ee | vulnerable | 22 | Primary | 740 |
| dgtlmoon/changedetection.io | 9d38b451 | fixed | 22 | Primary | 740 |
| dep0we/atomic-agents-stack | da861310 | vulnerable | 22 | Primary | 1336 |
| dep0we/atomic-agents-stack | ec474f45 | fixed | 22 | Primary | 1342 |
| intake/intake | 67e03037 | vulnerable | 78 | Primary | 73 |
| intake/intake | d0c0b6b5 | fixed | 78 | Primary | 73 |
| modoboa/modoboa | 82d64bb9 | vulnerable | 78 | Exploratory | 181 |
| modoboa/modoboa | 27a7aa13 | fixed | 78 | Exploratory | 181 |
| dgtlmoon/changedetection.io | 417d57e5 | vulnerable | 79 | Primary | 755 |
| dgtlmoon/changedetection.io | ec7d56f8 | fixed | 79 | Primary | 755 |
| WeblateOrg/wlc | 48df3b57 | vulnerable | 79 | Primary | 19 |
| WeblateOrg/wlc | 0f3e58f6 | fixed | 79 | Primary | 19 |
| langchain-ai/langgraph | 02965fb5 | vulnerable | 89 | Primary | 334 |
| langchain-ai/langgraph | 29724291 | fixed | 89 | Primary | 324 |
| blue-yonder/postgraas_server | bd4f1b88 | vulnerable | 89 | Primary | 14 |
| blue-yonder/postgraas_server | 7cd8d016 | fixed | 89 | Primary | 14 |

*Table B.3: Preconditions for the eight reviewed seven-project advisory cases; repaired counterparts retain the corresponding operation-specific contract.*

| Project | Advisory / pair | Required condition |
|---|---|---|
| dgtlmoon/changedetection.io | GHSA-9jj8-v89v-xjvw | Static resource route enabled; file exists in application package. Impact limited to package files, not arbitrary system files. |
| dep0we/atomic-agents-stack | GHSA-rm43-82j9-r4mj | Optional dashboard service accessible to attacker; same _dashboard/../sentinel input on both revisions. |
| intake/intake | GHSA-37g4-qqqv-7m99 | Catalog YAML is untrusted; source entry accessed using DEFAULT getshell options. Explicit getshell=True remains an authorized-risk mode after the fix. |
| modoboa/modoboa | GHSA-wwv8-cqpr-vx3m | Attacker has Reseller/SuperAdmin domain creation capability; DKIM enabled, writable key directory and generation job. DRF writer integration not certified; separate exploratory scoring. |
| dgtlmoon/changedetection.io | GHSA-8whx-v8qq-pq64 | Valid RSS token available to attacker; RSS enabled. Fix UUID converter rejects markup before handler; sentinel first contains no markup. |
| WeblateOrg/wlc | GHSA-gx2m-mcc2-r4p3 | CLI HTML output selected and opened as HTML in browser; API data attacker-controlled. Terminal-text output is not the affected mode. |
| langchain-ai/langgraph | GHSA-9rwj-6rc7-p77c | Application exposes untrusted filter keys to SqliteSaver.list; no claim all LangGraph deployments do this. Values already bound. Limit parameter is not this vulnerability. |
| blue-yonder/postgraas_server | GHSA-vghm-8cjp-hjw6 | PostgreSQL cluster backend enabled; attacker can submit management create request; specifically db_name value, not arbitrary unrelated delete operation. |

The primary labels total seven vulnerable and seven repaired operations. The two Modoboa labels remain exploratory and outside the primary confusion matrices. These conditions describe source-reviewed mechanisms, not complete historical deployments. [Full seven-project snapshot inventory](appendix-artifacts/seven-project-inventory.csv).

<a id="appendix-c"></a>

## Appendix C — Rule and query inventories

The [historical 34-rule catalogue](appendix-artifacts/historical-34-rules.csv) is exported from the recorded qualified-rule list. It contains ten CWE-22, seven CWE-78, nine CWE-79 and eight CWE-89 rules. Its original query paths identify the historical record; present files at those development paths may have changed.

The [evaluated 35-query catalogue](appendix-artifacts/evaluated-35-queries.csv) identifies each archived runnable query, its CWE tags and recorded source hash. The 35 archived query files match the recorded catalogue hashes. Four supporting `.qll` files are additional source dependencies, not additional runnable queries; their hashes remain in the [profile snapshot](../../runs/suspect-v2-evaluation-20261003/profile-snapshot.json).

Qualified runnable rules, API-model tuples, supporting modules, emitted findings and independently reviewed vulnerabilities are different units. Qualification does not guarantee utility on every new project. Candidate generation is recall-oriented; safe dynamic operations can be intentional suspects.


### C.1 Representative endpoint query

The following is the executable body of the archived `DynamicShutilCopySource.ql` query; metadata is omitted from this printed excerpt. Its exact runnable file and hash are in the evaluated 35-query catalogue.

```ql
import python
import semmle.python.ApiGraphs

from API::CallNode invocation, Expr source
where
  invocation = API::moduleImport("shutil").getMember("copyfile").getACall() and
  source = invocation.getArg(0).asExpr() and
  not source instanceof StringLiteral
select source,
  "Dynamic shutil.copyfile source path; inspect its origin and containment before copying."
```

API-graph resolution identifies `shutil.copyfile`; the query selects a first argument that is not a direct string-literal AST node. It does not prove attacker control, directory escape, reachability or absence of a guard. A name bound to a constant can therefore be a false-positive suspect, while unmodeled wrappers or other copying APIs can be absent. This is the intended division of work: generate a reviewable operation, then collect provenance and protections for verification. It is one concrete query, not a specification of all 35 rules.

<a id="appendix-d"></a>

## Appendix D — Actual evidence packet and saved model decision

### D.1 Provenance

This example is an archived candidate from the completed development run. It concerns an educational DSVW repository candidate at `dsvw.py:30`, CWE-89, revision `7d40f4b7939c901610ed9b85724552d60e7d63fa`. Candidate ID:

`1eeb73bcb13e10846be4952cb3b639b3db25a4f279c34964f580dc2ee427c355`.

Electronic copies:

- [Complete fitted packet](appendix-artifacts/dsvw-example-packet.json).
- [Exact saved message contents](appendix-artifacts/dsvw-example-messages.json).
- [Saved model response](appendix-artifacts/dsvw-example-response.json).
- [Decision/provenance record](appendix-artifacts/dsvw-example-provenance.json).

The copied packet and messages match the hashes in the saved result record. The messages preserve system/user content; they are not a complete HTTP request envelope or server environment. This is an exposed educational example with attack hints elsewhere in the collected function, so it is not independent generalization evidence.

### D.2 Short evidence excerpt

The selected operation appears in evidence block `E54be03637e`:

```python
  30 |                     cursor.execute("SELECT id, username, name, surname FROM users WHERE id=" + params["id"])
```

The enclosing method is supplied in block `E4b0fc34c08`, covering lines 24–81. The displayed packet preserves the input parsing and selected SQL operation within that block. The full evidence is available in the electronic packet; this printed excerpt is not claimed to be the entire model context.

### D.3 Saved response

```json
{
  "candidate_id": "1eeb73bcb13e10846be4952cb3b639b3db25a4f279c34964f580dc2ee427c355",
  "cwe": 89,
  "verdict": "VULNERABLE",
  "source_evidence": ["E4b0fc34c08"],
  "sink_evidence": ["E54be03637e"],
  "sanitizer_evidence": [],
  "explanation": "User input 'params[\"id\"]' is concatenated directly into SQL query string without parameterization.",
  "missing_symbols": []
}
```

The saved final verdict is `VULNERABLE`, with no validation errors for this response. These fields illustrate the archived decision contract. They are not a reconstruction of every constraint in the historical JSON schema. The [historical source-hash manifest](../../runs/suspect-v2-evaluation-20261003/frozen-hashes.json) records implementation fingerprints and is indexed as outside the selected evidence package. Independent replay also requires matching source bytes and runtime. This example adds no detections to the reported counts.


### D.4 Verifier request and decision contract

The request identifies candidate ID, CWE, rule/title and the exact alert location, followed by numbered code blocks with evidence IDs. It includes the CWE-routed guided questions, supplied relationship notes and applicable grounded framework bindings. The instructions ask the verifier to judge only the selected operation, use supplied evidence, establish attacker control and dangerous consumption, and examine a concrete defense. Possible calls, shared names or selected database rows do not by themselves prove an attacker-controlled value.

The output fields are `candidate_id`, `cwe`, `verdict`, `source_evidence`, `sink_evidence`, `sanitizer_evidence`, `explanation` and `missing_symbols`. The raw verdict is VULNERABLE, NOT_VULNERABLE or NEEDS_MORE_CONTEXT. A vulnerable response must support both input origin and dangerous use with supplied evidence; a safe response needs concrete safety evidence. Missing necessary relationships belong in `missing_symbols`, rather than invented code. The October 8 instructions request an explanation under 35 words and JSON without surrounding prose. Schema validation and the evidence gate then determine acceptance; a raw positive can become unresolved if it fails that contract. Operating exceptions remain distinct from security verdicts.

The printed DSVW example preserves its exact saved messages electronically; it is not reconstructed from the current source. The operational collector description in Section 3.7.4 is tied to the later archived snapshot, whose prompt/module fingerprints differ from the 31-project run. Neither a valid schema nor a correct evidence coordinate establishes semantic truth.

<a id="appendix-e"></a>

## Appendix E — Detailed results and rejected alternatives

The [metric register](../thesis-results-register.csv) and the following experiment records provide detailed result accounting:

- [Development case-by-case CSV](../../runs/stock-vs-current-qwen-audit-20261004/case-comparison.csv), [machine-readable metrics](../../runs/stock-vs-current-qwen-audit-20261004/metrics.json), and [full alert comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md).
- [Corrected dual-model audit](../../runs/ground-truth-audit-20261004/report.md).
- [QLoRA arm comparison](../../runs/python-verifier-finetune-20261006/report.md).
- [All recorded prompt rounds and reserved validation](../../runs/prompt-engineering-20261006/final-report.md).
- [CWE instruction iterations, selected policy and fresh pilot](../../runs/cwe-skills-20261007/final-report.md).

The project author reported human confirmation following initial repository adjudication by the AI coding agent. Formal agreement statistics and item-level review coverage are unavailable.

Rejected variants remain visible. Fewer alerts can accompany lost true mechanisms. Candidate-conditioned recall, labeled-panel F1 and reviewed-alert precision are not interchangeable. Full repository-wide non-alert truth remains incomplete; no mixed-denominator F1 is supplied.

<a id="appendix-f"></a>

## Appendix F — Cost, omissions, operating errors and stability

The [development comparison](../../runs/stock-vs-current-qwen-audit-20261004/report.md) records cached-database query times and phase sums. The current seven-project runtime is recorded in Section 5.3.6 and its [completed report](../../reports/current-seven-20261008/report.md). These are distinct timing protocols.

- [Common packet fitting record](../../runs/suspect-v2-evaluation-20261003/packet-fitting.json): packet budgets and omissions.
- [Context timings](../../runs/suspect-v2-evaluation-20261003/context-timings.json) and [repository timings](../../runs/suspect-v2-evaluation-20261003/repository-timings.json).
- [Inference protocol](../../runs/suspect-v2-evaluation-20261003/model-protocol.json): four slots, 16,384-token window, 400-token completion budget, uncapped candidates and disabled context expansion.
- [Selected output-failure recovery](../../runs/output-repair-20261005/report.md): 36 recovered cases, separate from frozen full-run scores.
- [Repeated-request study](../../runs/verifier-repeatability-20261006/report.md): stability observations and their limits.

The current seven-project run retains its 554 unresolved decisions and interrupted execution interval. Sequential stability in selected replay controls does not establish universal determinism or identify the exact cause of concurrent variation.

<a id="appendix-g"></a>

## Appendix G — Fine-tuning pilot

The [QLoRA final report](../../runs/python-verifier-finetune-20261006/report.md) identifies the training setup, integrity checks, evaluation cohorts and rejection decision. The [project training documentation](../python-verifier-finetuning.md) records the broader implementation context.

The completed pilot used 54 reviewed examples: 14 real and 40 controlled, with 50 training and four validation examples. Training used an NF4 base and rank-eight query/value adapters for two epochs. Unsloth was not used. Both inference arms processed 270 candidates using the same frozen packets and Q4_0 base, with one arm adding the adapter.

Failed cache/training attempts were discarded and preserved in the original run record. Successful training integrity checks establish execution integrity, not detection accuracy. The measured adapter was rejected. The base model's original HF/GGUF lineage and validation-family exposure remain disclosed limitations.

<a id="appendix-h"></a>

## Appendix H — Local prototype and user workflow

The [product documentation](../opensast.md) describes the implemented CLI/dashboard workflow and its deployment requirements.

The documented workflow is: authenticate, choose an accessible workspace, run `opensast init` from a Python project root, register the project, and request a scan through the CLI or dashboard. A configured worker processes queued jobs. Users review findings and scan history according to workspace membership and role.

![Local deployment](figures/local-deployment.png)

*Figure H.1: logical local deployment components of the prototype. The diagram does not assert separate physical hosts or a completed security assessment.*

The first scan is full. Changed scans retain repository-wide CodeQL analysis and fresh context, with valid decision reuse where applicable. A changed-files-only full pipeline and measured general incremental speedup are not claimed. Credential-free screenshots in Appendix K illustrate the interface; operational behavior is assessed through the product validation records.

<a id="appendix-i"></a>

## Appendix I — Archival provenance and reproduction boundaries

The [archived configuration record](configuration-summary.md) identifies the main model, query, prompt and context fingerprints. The [profile snapshot](../../runs/suspect-v2-evaluation-20261003/profile-snapshot.json) stores query identifiers and hashes; [frozen hashes](../../runs/suspect-v2-evaluation-20261003/frozen-hashes.json) record the source/input fingerprints.

The original comparison report lists its scoring command:

```bash
python runs/stock-vs-current-qwen-audit-20261004/compare.py
```

The scorer reconstructs the comparison from archived inputs and requires compatible dependencies. A separate archived working copy protects the original result files from being overwritten. Scoring does not perform fresh model inference or define a new detector configuration.

The accompanying opensast-thesis-evidence-submission.zip preserves selected scoring ledgers, protocols, configuration records, calculation code and earlier experimental evidence. Its README explains metric recalculation and reproduction limits. The evidence index gives stable artifact identifiers, original relative paths, SHA-256 hashes and inclusion status. Thesis drafts and editorial working files are omitted; their originals remain archived. This package supports inspection, not a complete historical detector/model replay.

This is an inspection/scoring evidence package, not a complete executable historical replay environment. Recorded hashes cannot recover missing bytes. Some original model paths were temporary, and later working files differ from the archived source manifest. Historical model weights, matching detector/schema/server bytes and full dependency environments must be preserved separately before claiming independent rerun capability. The published source release is a distinct version, not a substitute for older experiment source.

### I.1 Electronic evidence identifiers

[Evidence index](appendix-artifacts/evidence-index.csv) lists stable `EV-` identifiers, original relative paths, hashes and whether each record is included in the selected portable package. [Package manifest](appendix-artifacts/evidence-package-manifest.json) identifies the package contents and their hashes. This appendix’s experiment identifiers distinguish the 31-project repository evaluation (`DEV31`), seven-project repository evaluation (`RESCAN7`) and official benchmark (`OWASP293`). The selected archive is supplied alongside the thesis; it does not imply that every large raw artifact is included.

## Appendix J — Final benchmark and product release evidence

The final benchmark, exposed repository rescan and product release validation are documented in the following records:

- [Current seven-project report](../../reports/current-seven-20261008/report.md) and exact same-panel scores.
- [Complete OWASP report](../../reports/owasp-current-20261008/report.md), [final metrics](../../reports/owasp-current-20261008/metrics-final.json) and a separate-implementation mapping audit.
- [CLI/dashboard validation](../../reports/product-validation-20261009/report.md), [incremental check](../../reports/product-incremental-check-20261009/report.md), [Git/CI regression checks](../../reports/product-git-ci-validation-20261009/report.md) and [real Actions workflows](../../reports/product-hosted-actions-validation-20261009/report.md).
- [Final acceptance report](../../reports/release-acceptance-20261009/report.md), tested dependencies, source fingerprints, scope and failure/recovery records.
- [Release guide](../release.md) and unchanged bundled prompt assets with license/provenance.

The release commit/tag identifies final deployable product code. Older detection measurements retain their own recorded implementation/query/model hashes; packaging and product fixes are not retroactively treated as accuracy improvements. Detailed logs/source snapshots may require separate private archival storage.

<a id="appendix-k"></a>

## Appendix K — Shared design and published-release artifacts

### K.1 Design implementation

- [Shared design specification](../../design-system/README.md): typography, semantic status, figure-series conventions and presentation rules.
- [Canonical tokens](../../design-system/tokens.json) and [token build script](../../scripts/build_design_system.py).

![Research landing page in the shared graphite-and-cyan design](appendix-artifacts/design-landing.png)

*Figure K.1: research website visual implementation. Historical experiment summaries are presentation content, not an additional evaluation.*

![Dashboard login in the shared design](appendix-artifacts/design-dashboard-login.png)

*Figure K.2: credential-free dashboard login rendering. This static visual illustrates design implementation; it does not independently demonstrate an authenticated workflow or accessibility compliance.*

### K.2 Published-release verification

- [Release manifest](../releases/v0.1.0.json).
- [Published-clone verification results](../../reports/release-acceptance-20261009/published-release-check.json).
- [Verification harness](../../reports/release-acceptance-20261009/check_published_release.py).
- [Fresh-clone log](../../reports/release-acceptance-20261009/release-clone.log), [installation log](../../reports/release-acceptance-20261009/release-install.log) and [targeted regression log](../../reports/release-acceptance-20261009/release-regression-tests.log).
- [Immutable Actions template](../examples/opensast-github-actions.yml.example).

The post-publication results identify the tested release rather than changing archived detection scores. Visual assets are selected renders without credentials or private repository findings. The linked logs document engineering validation and remain separate from detection-accuracy measurements.

<a id="appendix-l"></a>

## Appendix L — Earlier AST and autonomous-agent research

### L.1 Scope and source provenance

An early pilot within this project explored broader vulnerability mechanisms before the final four-CWE evaluation family. Its selected Markdown reports are preserved in the electronic evidence package. The [source register](appendix-artifacts/early-research/source-register.json) records each original relative path, preserved copy and SHA-256. These are documentary experiment records; preservation does not constitute an independent rerun or additional human adjudication.

### L.2 Experiment ledger

July 25–27: ranked AST retrieval, exhaustive projection, the 225-context Picklescan run and the bounded dossier pilot. Picklescan used vulnerable revision `1931c2d04eaca8d20597705ff39cab78ba364e4b`. The base/native-tool and adapter/direct-JSON interfaces differ. The 197,604-context and 741-packet totals are projections, while the Picklescan and 32-call dossier pilots actually executed. [ER01: AST records](appendix-artifacts/early-research/ER01.md); [ER02: dossier comparison](appendix-artifacts/early-research/ER02.md).

August 16–18: facts-only retrieval evaluations followed by a large-context serving pilot. The retrieval report records 68 completed CrossCommitVuln cases, two unevaluable cases and one acquisition error; 64/68 completed cases contained every required component. RealVuln acquired 22/26 repositories, with 21 evaluable and 20 complete. Neither retrieval evaluation ran the finding model. The 12-request serving pilot used two A16 replicas and disabled reasoning; its large-repository timing estimates extrapolate measured rates. [ER03: retrieval](appendix-artifacts/early-research/ER03.md); [ER04: serving pilot](appendix-artifacts/early-research/ER04.md).

August 25–28: scanner-pointer selection, Joern flow selection and broad AST screening. Scanner and Joern stages recorded negative gate results. The broad-screen component result merged retained full cases with rerun partial cases; it was not a fresh model-based evaluation. Its packing estimate used a development token approximation. [ER05: scanner pointers](appendix-artifacts/early-research/ER05.md); [ER06: Joern](appendix-artifacts/early-research/ER06.md); [ER07: broad screening](appendix-artifacts/early-research/ER07.md).

September 8–11: repository agents, specialist hunts, bounded missions and paired development retries. Early trials used several Qwen and Gemma configurations; the session ledger retains their differences. Later Picklescan and Smolagents pairs used Gemma with no thinking, one selected mission and concurrency one; the Smolagents vulnerable proof succeeded after a six-step retry rather than the initial four steps. Fixed-side absence of a finding was not always an explicit safe proof. Their recorded pair metrics cannot be generalized to whole repositories. [ER08: session](appendix-artifacts/early-research/ER08.md); [ER09: agent log](appendix-artifacts/early-research/ER09.md); [ER10: latency](appendix-artifacts/early-research/ER10.md); [ER12: architecture](appendix-artifacts/early-research/ER12.md).

September 18–20: the Fory receiver-gate replay completed with Gemma on two GPUs and reasoning disabled. Its labeled `Unpickler.load` finding passed the gate, but unrelated emitted findings were not exhaustively adjudicated and the fixed artifact had an obligation-generation mismatch. Its single-CVE evaluator precision is not adopted as repository-alert precision. Subsequent matched-work comparisons on Fory and MCP Atlassian showed no measured detection improvement. The last OWASP entry remained in progress after context-size errors and a restart; no final score is inferred. [ER11: later agent log](appendix-artifacts/early-research/ER11.md).

### L.3 Interpretation rules

Historical file coverage, vulnerable-region overlap, component recovery and mission disposition are intermediate measurements. Gate acceptance is a pipeline outcome rather than independent truth. Empty, partial, timed-out, unproven and unevaluable outcomes are not safe verdicts. Workload projections are not completed scans. Earlier development examples and broader CWE families remain separate from the final four-CWE benchmarks and operation panels.
