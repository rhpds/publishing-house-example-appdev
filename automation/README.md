# OpenShift App Dev Quick Labs - GitOps Automation

Helm-based GitOps automation for provisioning 5 standalone 20-minute labs
about application development on OpenShift, built around a "Postcard Generator"
Flask application.

## Architecture

```
cluster/infra/bootstrap   -> ArgoCD AppProjects + platform bootstrap Application
platform/bootstrap         -> Operator Subscriptions (Dev Spaces, RHDH, OpenShift AI)
tenant/bootstrap           -> Per-tenant resources (namespace, app, Gitea, lab toggles)
tenant/labs/postcard-generator -> Postcard Generator Helm chart (Deployment, Service, Route)
```

**Cluster CI** installs shared infrastructure: Keycloak, Gitea, Pipelines, GitOps,
Dev Spaces, Developer Hub, OpenShift AI, and OCP Console Embed.

**Tenant CIs** (one per lab) provision: a Keycloak user, a dedicated namespace,
Gitea user and repos, Showroom, and lab-specific resources controlled by feature
flags.

## Bootstrap

AgnosticV's `ocp4_workload_gitops_bootstrap` creates an ArgoCD Application
pointing at `cluster/infra/bootstrap/`. That chart creates AppProjects and
spawns the platform bootstrap, which in turn installs operators. Tenant
Applications are created per-user by the AgnosticV tenant workload.

## Helm values injection

| Value | Source |
|---|---|
| `deployer.domain` | Injected by AgnosticV gitops_bootstrap role |
| `deployer.guid` | Injected by AgnosticV gitops_bootstrap role |
| `tenant.name` | Set per tenant CI (matches guid) |
| `tenant.user.name` | Keycloak username for the tenant |

## Lab feature flags

Each tenant can enable lab-specific resources via boolean toggles:

- `labs.pipelines.enabled` -- Tekton pipeline resources
- `labs.gitops.enabled` -- ArgoCD Application for the postcard app
- `labs.ai.enabled` -- OpenShift AI integration secrets
- `labs.devhub.enabled` -- Developer Hub catalog entity
- `labs.devspaces.enabled` -- Dev Spaces workspace resources
