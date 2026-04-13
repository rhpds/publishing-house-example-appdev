# Module 3: Ship It — Build and Deploy with Pipelines

## Brief Overview

You've got a working app and you've made changes to it. Now it's time to ship those changes through a real CI/CD pipeline. In this lab, you'll push a code change to the Postcard Generator's Git repository and watch OpenShift Pipelines (Tekton) automatically pick it up, build a new container image, run tests, and deploy the updated application. The pipeline is already wired up — you just push code and watch it go.

## Audience and Time

- **Target personas:** Developers, DevOps engineers, platform engineers evaluating CI/CD on OpenShift
- **Prerequisites:** The Postcard Generator is deployed in your namespace with a pre-configured Tekton pipeline (pre-provisioned or scaffolded in Lab 1). Comfort with Git basics (commit, push).
- **Estimated duration:** 20 minutes

## What You Will See, Learn, and Do

**See:**
- A Tekton pipeline triggered automatically by a Git push
- Pipeline tasks executing in sequence: clone, build, test, deploy
- The pipeline run visualized in the OpenShift console
- Your code change live in the deployed application

**Learn:**
- How OpenShift Pipelines provides Kubernetes-native CI/CD
- How pipelines are triggered by Git events (webhooks/EventListeners)
- How a standardized pipeline lets developers focus on code while automation handles the rest

**Do:**
- Make a visible code change to the Postcard Generator
- Commit and push the change to Gitea
- Watch the pipeline trigger and execute in the OpenShift console
- Verify the change is live in the running application
- Inspect the pipeline structure and task logs

## Lab Structure

| Section | Title | Duration |
|---------|-------|----------|
| 1 | Make a Code Change | 5 min |
| 2 | Watch the Pipeline Run | 8 min |
| 3 | Verify and Explore | 7 min |

## Detailed Steps

### Section 1: Make a Code Change

1. Open your Gitea instance using the provided URL and sign in with your lab credentials
2. Navigate to your `postcard-generator` repository
3. Open `data/destinations.json` in the Gitea editor (click the file, then click the pencil icon to edit)
4. Add a new destination to the list — make it memorable so you'll recognize it after deployment:
   ```json
   {
     "name": "Tokyo",
     "country": "Japan",
     "lat": 35.6762,
     "lng": 139.6503,
     "tagline": "Greetings from Tokyo — Where Tradition Meets Tomorrow!",
     "colors": {
       "primary": "#c0392b",
       "accent": "#f5b7b1"
     }
   }
   ```
5. Write a commit message (e.g., "Add Tokyo destination") and click "Commit Changes"
6. The commit triggers a webhook to OpenShift Pipelines — the pipeline starts automatically

### Section 2: Watch the Pipeline Run

7. Switch to the OpenShift console and navigate to your project namespace
8. Go to Pipelines in the left menu (Developer perspective)
9. Locate the `postcard-generator` pipeline — a new PipelineRun should be in progress
10. Click into the PipelineRun to see the visual pipeline graph:
    - **git-clone** — fetches the latest code from Gitea
    - **build** — builds the container image using the updated source
    - **test** — runs the application test suite
    - **deploy** — updates the running deployment with the new image
11. Click on individual tasks to view their logs — watch the build compile, tests pass, and the image push to the internal registry
12. Wait for the pipeline to complete — all tasks should show green checkmarks (approximately 3-5 minutes)

### Section 3: Verify and Explore

13. Once the pipeline completes, open the Postcard Generator application via its route
14. Click "Generate Postcard" repeatedly until your new destination (Tokyo) appears — it's now live, shipped through the pipeline
15. Return to the OpenShift console and navigate to the pipeline details
16. Examine the pipeline YAML — note how each task is defined, how they pass results between steps, and how the trigger connects to the Git webhook
17. Check the deployment — note the new container image tag that was produced by the pipeline run
18. Look at the PipelineRun history — you can see all previous runs, their status, and duration

## Key Takeaways

- OpenShift Pipelines automates the build-test-deploy cycle — push code, everything else happens automatically
- Pipelines are Kubernetes-native: defined as YAML, versioned in Git, running as pods on the cluster
- Developers don't need to understand the pipeline internals to benefit from them — the platform team defines the pipeline, developers push code
- A standardized pipeline means every app in the organization ships the same way — consistent, auditable, repeatable

## Infrastructure Notes

- Tekton Pipelines operator must be installed
- A Tekton Pipeline, TriggerTemplate, TriggerBinding, and EventListener must be pre-configured for the Postcard Generator
- The Gitea webhook must be configured to send push events to the EventListener route
- The pipeline must have a ClusterTask or Task for building container images (e.g., buildah)
- An internal image registry or integrated registry must be available for storing built images
- Pipeline service account must have permissions to deploy to the user's namespace
