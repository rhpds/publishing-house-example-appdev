# Module 1: Stamp Your Passport — Scaffold with Developer Hub

## Brief Overview

Every journey starts somewhere. In this lab, you'll use Red Hat Developer Hub to scaffold the Postcard Generator application from a golden path template — a pre-configured, best-practice starting point that includes the application code, deployment configuration, and CI/CD pipeline definitions. Within minutes, you'll have a running application on OpenShift without writing a single line of code or YAML. The point: this is how organizations enable developers to go from zero to running app in minutes, not days.

## Audience and Time

- **Target personas:** Developers, platform engineers, technical evaluators
- **Prerequisites:** Basic understanding of containers and Kubernetes. Familiarity with the concept of templates/scaffolding is helpful but not required.
- **Estimated duration:** 20 minutes

## What You Will See, Learn, and Do

**See:**
- Red Hat Developer Hub's software catalog and template gallery
- A new application scaffolded, built, and deployed automatically
- The running Postcard Generator producing your first postcard
- The OpenShift developer topology showing your deployed app

**Learn:**
- How golden path templates standardize application creation across an organization
- How Developer Hub integrates with OpenShift to automate the scaffold-to-deploy workflow
- How platform teams create guardrails without slowing developers down

**Do:**
- Browse the Developer Hub software catalog
- Select the Postcard Generator golden path template
- Fill in the scaffolding form (project name, your name, namespace)
- Watch the template create your Git repo, pipeline, and deployment
- Open the running Postcard Generator and generate your first postcard

## Lab Structure

| Section | Title | Duration |
|---------|-------|----------|
| 1 | Explore Developer Hub | 5 min |
| 2 | Scaffold the Postcard Generator | 7 min |
| 3 | Tour Your New App | 8 min |

## Detailed Steps

### Section 1: Explore Developer Hub

1. Open Red Hat Developer Hub in your browser using the provided URL
2. Sign in with your lab credentials
3. Browse the Software Catalog — note the existing components registered (these represent apps already onboarded to the platform)
4. Navigate to the "Create" section to see available templates
5. Locate the "Postcard Generator" golden path template — note the description, tags, and owner information that help developers find the right starting point

### Section 2: Scaffold the Postcard Generator

6. Click "Choose" on the Postcard Generator template
7. Fill in the scaffolding form:
   - **Project name:** `postcard-generator` (or a name of your choice)
   - **Owner:** select your user from the dropdown
   - **Namespace:** your pre-assigned OpenShift namespace
8. Review the summary — note what will be created: a Git repository, a Tekton pipeline, Kubernetes manifests, and an ArgoCD application
9. Click "Create" and watch the progress steps execute:
   - Repository created in Gitea
   - Source code and CI/CD configuration committed
   - OpenShift resources applied
   - Application deployment triggered
10. Once complete, click "Open Component" to see your new app registered in the Developer Hub catalog

### Section 3: Tour Your New App

11. From the component page in Developer Hub, click the "OpenShift" link to view the app in the OpenShift developer topology
12. In the topology view, identify the Postcard Generator deployment, its pod(s), service, and route
13. Click the route URL (or the open-URL icon on the topology node) to open the Postcard Generator in a new tab
14. In the app, enter your name in the "From" field
15. Click "Generate Postcard" — a random destination is selected and a retro-styled postcard appears with a map, tagline, and your name
16. Generate a few more postcards — each one picks a different destination with its own color scheme and tagline
17. Return to the OpenShift console and briefly explore the deployment details: container image, environment variables, resource limits — all set by the golden path template

## Key Takeaways

- Developer Hub eliminates the "blank repo" problem — developers start from a proven template, not from scratch
- Golden path templates encode organizational best practices (CI/CD, security, deployment) into the scaffolding process
- Platform teams control the templates; developers consume them — this is how you scale guardrails without friction
- From "I want a new app" to "here's my running app" took minutes, not a sprint

## Infrastructure Notes

- Developer Hub must have the Postcard Generator template pre-registered
- The template must be configured to create Gitea repos in the user's organization
- The template should trigger an initial pipeline run or ArgoCD sync to deploy the app
- User's namespace must be pre-created with appropriate RBAC
