# OpenShift App Dev Quick Labs — Postcard Generator

## Problem Statement

Developers and IT professionals evaluating Red Hat OpenShift need short, self-guided labs that demonstrate the modern application development experience without requiring hours of commitment. The existing "Accelerate New Application Development" lab (Summit 2024) covers the right themes but is too long, tightly coupled, and outdated. There is no modular, booth-friendly content that lets someone pick a single topic — Developer Hub, Dev Spaces, Pipelines, GitOps, or AI — and experience it in 20 minutes with a fun, engaging sample app.

## Target Audience

- **Roles:** Developers, sysadmins, platform engineers, architects, technical decision-makers
- **Experience:** Comfortable with a terminal, understands containers and basic Kubernetes/OpenShift concepts, has basic programming familiarity (not necessarily a software engineer)
- **Context:** Self-service website users and conference booth visitors evaluating OpenShift
- **Tone expectation:** Marketing-grade — accessible, polished, fun. Not training material.

## Learning Objectives

After completing any individual lab, the learner will be able to:

1. Scaffold a new application from a golden path template using Red Hat Developer Hub
2. Modify running application code in real time using OpenShift Dev Spaces with live reload
3. Trigger an automated build-and-deploy pipeline by pushing a code change using OpenShift Pipelines
4. Observe how OpenShift GitOps (ArgoCD) detects and corrects configuration drift in a deployed application
5. Integrate an AI-powered feature into an application by consuming a model-as-a-service endpoint through OpenShift AI

## Content Type

Workshop (5 standalone hands-on labs)

## Products & Technologies

- Red Hat OpenShift Container Platform (4.21+)
- Red Hat Developer Hub (RHDH)
- Red Hat OpenShift Dev Spaces
- Red Hat OpenShift Pipelines (Tekton)
- Red Hat OpenShift GitOps (Argo CD)
- Red Hat OpenShift AI (Model-as-a-Service)
- Gitea (per-user Git repositories)
- Python (Flask) — sample application backend
- Leaflet.js — map rendering (open source, no API key)

## Module Map

| Module | Title | Duration | Star Product |
|--------|-------|----------|--------------|
| 1 | Stamp Your Passport: Scaffold with Developer Hub | 20 min | Red Hat Developer Hub |
| 2 | Rewrite the Postcard: Live Coding with Dev Spaces | 20 min | OpenShift Dev Spaces |
| 3 | Ship It: Build and Deploy with Pipelines | 20 min | OpenShift Pipelines |
| 4 | Steady State: GitOps and Drift Control | 20 min | OpenShift GitOps |
| 5 | Dear AI: Smart Postcards with OpenShift AI | 20 min | OpenShift AI |

## The Sample Application — Postcard Generator

### Concept

A web application that generates stylized digital postcards from destinations around the world. The user selects (or is randomly assigned) a destination, and the app produces a retro travel-poster-style postcard with:

- A colorful, stylized visual design (CSS-driven, retro travel poster aesthetic)
- The destination name and a fun tagline (e.g., "Greetings from Reykjavik — Land of Fire and Ice!")
- An interactive map pinning the destination (Leaflet.js)
- A "From" field with the user's name
- A shareable postcard view

### Why This App

- **Visually engaging:** Retro travel poster style is immediately appealing and screenshot-worthy
- **Simple to build:** Flask backend with a few endpoints, static frontend, curated destination data
- **Fun solo:** Every generation is unique — different destinations, different postcards
- **AI-ready:** The message/tagline generation is a natural upgrade path for the AI lab
- **Corporate safe:** Travel postcards have zero inappropriate content risk
- **Booth-friendly:** "What postcard did you get?" is a natural conversation starter

### Technical Stack

- **Backend:** Python Flask — lightweight, broadly understood, minimal dependencies
- **Frontend:** HTML/CSS/JavaScript served by Flask — no framework complexity
- **Map:** Leaflet.js with OpenStreetMap tiles (free, no API key)
- **Data:** Curated JSON file of ~50 destinations with coordinates, taglines, and color schemes
- **AI (Lab 5):** REST call to MaaS endpoint to generate personalized postcard messages
- **Database:** None required (stateless). Postcards are generated on the fly.

### App Across Labs

| Lab | App State | What Changes |
|-----|-----------|--------------|
| 1 — Developer Hub | Scaffolded and deployed from template | User sees the app running for the first time |
| 2 — Dev Spaces | Running in dev mode | User modifies postcard styling, adds a destination |
| 3 — Pipelines | Code change triggers pipeline | User pushes a change, watches it build and deploy |
| 4 — GitOps | Managed by ArgoCD | User causes drift, watches ArgoCD correct it |
| 5 — AI | Enhanced with MaaS | User switches from canned taglines to AI-generated messages |

## Design Principles

- **Standalone labs:** Each lab works independently. No required ordering. A user at a booth can pick any single lab.
- **Loose narrative thread:** If done in order, the labs tell a story: scaffold → code → build → deploy → enhance. But this is optional.
- **App is the vehicle, not the destination:** The Postcard Generator is engaging enough to hold attention but simple enough that the focus stays on the OpenShift capabilities.
- **Marketing, not training:** Tone is "look how easy and cool this is." Avoid deep-dive explanations. Prioritize wow moments and quick wins.
- **20-minute hard ceiling:** Each lab must be completable in 20 minutes by someone following the instructions at a reasonable pace. If it's tight, cut scope — don't rush the user.
- **Pre-provisioned environments:** Users arrive to a fully configured environment. No cluster setup, no operator installation, no waiting for provisioning.

## Prerequisites

- A provisioned lab environment (provided via RHDP)
- Web browser (Chrome or Firefox recommended)
- Basic familiarity with containers and Kubernetes concepts
- Comfort with a terminal (running commands, reading output)

## Success Criteria

- A booth visitor completes a single lab in under 20 minutes and describes the experience as "fun" or "easy"
- The postcard app produces a visual result that users want to screenshot or share
- Each lab clearly demonstrates the value proposition of its star product
- Content works reliably in a self-service setting with no facilitator present

## Infrastructure Requirements

- Red Hat OpenShift Container Platform 4.21+ (shared cluster)
- Operators installed: Developer Hub, Dev Spaces, Pipelines, GitOps, OpenShift AI
- Gitea instance with per-user repositories (pre-populated with Postcard Generator source)
- Golden path template registered in Developer Hub
- ArgoCD Application CR pre-configured per user (for Lab 4)
- Tekton Pipeline and PipelineRun templates pre-configured (for Lab 3)
- MaaS endpoint accessible from the cluster (for Lab 5)
- Per-user namespaces with appropriate RBAC

## Automation Needed

Yes. AgnosticV cluster-tenant configuration:
- Single shared cluster with per-lab tenant catalog items
- Automation provisions: user namespaces, Gitea repos, RHDH templates, pipeline configurations, ArgoCD applications, Dev Spaces workspaces, and MaaS endpoint credentials (as Secrets)
- Each lab's tenant CI should be independently orderable

## Difficulty Level

Beginner Plus

## Differentiation from Existing Content

| Aspect | Original (acc-new-app-dev) | This Project |
|--------|---------------------------|--------------|
| Duration | 60-90+ minutes (sequential) | 5 × 20 minutes (standalone) |
| App | Quarkus Super Heroes (complex microservices) | Postcard Generator (simple, fun, visual) |
| Coupling | Tightly coupled modules | Loosely connected, any-order |
| Products | Dev Spaces, Tekton, ArgoCD, Kafka, Apicurio | Developer Hub, Dev Spaces, Pipelines, GitOps, AI |
| Audience | Summit attendees with guided facilitation | Self-service website + booth visitors |
| Tone | Technical walkthrough | Marketing — accessible, engaging, polished |
| Currency | Summit 2024 (dated) | Current (OCP 4.17+, latest operators) |
