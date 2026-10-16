# Evaluation configuration summary

The report presents three principal evaluations in Table 4.1, with results in Sections 5.3.1–5.3.3. Table 3.1 contains early pilot measurements and is not an evaluation-identity table. The 31-project configuration is the October 3–4 archived dual-model run; the seven-project and OWASP evaluations use the later configuration recorded by their own protocols. All retain prior development or investigation exposure.

| Module | 31-project SHA-256 | 7-project SHA-256 | OWASP SHA-256 |
|---|---|---|---|
| context/context_builder.py | 806418e846243c746f67c001c1d033baf7eec07f3a9f696cfe3e76b912f348ac | 9d25c5d33ddce03d38d8bbd209834c5dfa2927465ec44a8c7bc5c302125dfd80 | 9d25c5d33ddce03d38d8bbd209834c5dfa2927465ec44a8c7bc5c302125dfd80 |
| context/relationships.py | dd596d5bc7a812beea4f3868c9ece7999efc5c40815247c6e88d391cc1e1461c | 9f07a8dba8a4537449ed617d0a76fbf62437b17ead12a0c127aa46b177587447 | 9f07a8dba8a4537449ed617d0a76fbf62437b17ead12a0c127aa46b177587447 |
| verifier/prompts.py | f9e9e110330f983208519084429f4bd06e0320032883036bb02e8305e6f48aeb | 317f85430a508b61a01d561375262c7f866cf65ac4eb5df7da26b102d8eb52a6 | 317f85430a508b61a01d561375262c7f866cf65ac4eb5df7da26b102d8eb52a6 |
| verifier/budget.py | 2e0d3f89f4ff7a378322d8994e6c7d60096e67051a66a19eafb09c736c35b8f5 | 2e0d3f89f4ff7a378322d8994e6c7d60096e67051a66a19eafb09c736c35b8f5 | 2e0d3f89f4ff7a378322d8994e6c7d60096e67051a66a19eafb09c736c35b8f5 |

The full recorded model digests and common serving settings are given in Table 4.3. Historical GPU/CPU/RAM/driver identity and a completely reconstructible runtime environment remain unavailable. The preserved older frozen-system.md is an earlier writing/configuration record with historical navigation; its chapter references are not current report navigation. Query, source and experiment ledgers remain unchanged. This summary updates navigation without rewriting those historical records.

Selected October 8 collector, relationship, prompt and fitter source bytes are included under runs/owasp-current-20261008/implementation-snapshot/src/aisast/ in the selected evidence package. Their hashes match the later evaluation fingerprints above. These four inspectable modules are not a complete executable dependency environment or the earlier October 3 source snapshot.
