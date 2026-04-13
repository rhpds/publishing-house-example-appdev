# Work Journal

<!-- Experimental: human-readable session log. The manifest is the source of truth. -->
<!-- Add entries in reverse chronological order (newest first). -->
<!-- Format:
## YYYY-MM-DD

### What was done
- Item

### Key decisions
- Decision

### Next up
- Item
-->

## 2026-04-13

### What was done
- Completed intake: gathered requirements, chose Postcard Generator as sample app
- Generated design spec and 5 module outlines (approved by stencell)
- Skipped vetting (no RCARS endpoint) and spec refinement
- Wrote all 5 Showroom lab modules (AsciiDoc) + index, overview, details
- Created Showroom scaffold (site.yml, ui-config.yml, antora.yml, nav.adoc, attributes)
- Built Postcard Generator Flask app (30 destinations, retro UI, Leaflet map, AI/MaaS integration)
- Tested app locally -- fixed JS curly quote bug and map init ordering bug
- Created AgnosticV catalog items on `publishing-house-demo` branch in ~/devel/git/agnosticv:
  - 1 cluster CI (ocp-appdev-quicklabs-cluster)
  - 5 tenant CIs (lab01-devhub through lab05-ai)
- Built GitOps automation: 4 Helm charts (cluster infra, platform operators, tenant bootstrap, app chart)
- Generated automation requirements manifest (approved)

### Key decisions
- App: Postcard Generator (retro travel poster, Leaflet map, AI-enhanced messages)
- Architecture: Sandbox API cluster-tenant, 1 shared OCP 4.21 cluster, 5 separate tenant CIs
- Automation approach: both (Ansible for cluster operators, GitOps for tenant workloads)
- No fictional company scenario -- marketing tone, direct and fun
- OCP version updated to 4.21 per stencell
- 30 concurrent users, 15 worker nodes (medium weight tenants)

### Next up
- Technical editing of all 5 lab modules
- Build and push Postcard Generator container image
- Deploy cluster CI and test a tenant CI end-to-end
- Develop custom workloads for: Dev Spaces operator, Developer Hub + golden path template, OpenShift AI MaaS
- Create Developer Hub Backstage Software Template for Lab 1
- Capture screenshots for image placeholders in lab content
- Code and security review
