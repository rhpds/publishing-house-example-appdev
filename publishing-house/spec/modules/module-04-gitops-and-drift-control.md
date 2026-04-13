# Module 4: Steady State — GitOps and Drift Control

## Brief Overview

Your Postcard Generator is deployed and running. But what happens when someone makes a manual change on the cluster — scales the pods, tweaks an environment variable, modifies a resource limit? In this lab, you'll see how OpenShift GitOps (Argo CD) keeps your deployed application in sync with its desired state defined in Git. You'll intentionally cause configuration drift, watch Argo CD detect it, and then sync the application back to its correct state. This is how organizations maintain consistency across environments at scale.

## Audience and Time

- **Target personas:** Platform engineers, DevOps engineers, developers interested in deployment management
- **Prerequisites:** The Postcard Generator is deployed in your namespace with an Argo CD Application CR managing it (pre-provisioned or scaffolded in Lab 1). Basic understanding of what "desired state" means in Kubernetes.
- **Estimated duration:** 20 minutes

## What You Will See, Learn, and Do

**See:**
- Argo CD's application dashboard showing sync status and health
- A detailed resource tree mapping every Kubernetes object the app depends on
- Real-time drift detection when the cluster state diverges from Git
- Automatic or manual sync restoring the correct state

**Learn:**
- How GitOps uses Git as the single source of truth for deployment configuration
- How Argo CD continuously monitors for drift between desired and actual state
- Why "the cluster always matches Git" prevents configuration surprises in production

**Do:**
- Explore the Argo CD dashboard and inspect the Postcard Generator's resource tree
- Intentionally cause drift by making manual changes on the cluster
- Observe Argo CD detect the drift and report "OutOfSync" status
- Sync the application to restore the Git-defined state
- Make a legitimate change through Git and watch Argo CD apply it

## Lab Structure

| Section | Title | Duration |
|---------|-------|----------|
| 1 | Explore Argo CD | 5 min |
| 2 | Break It — Cause Drift | 7 min |
| 3 | Fix It — Sync and Verify | 8 min |

## Detailed Steps

### Section 1: Explore Argo CD

1. Open the Argo CD dashboard using the provided URL
2. Sign in using "Log in via OpenShift" with your lab credentials
3. Locate the `postcard-generator` application in the Argo CD dashboard
4. Note the current status: it should show **Synced** and **Healthy** (green)
5. Click into the application to see the resource tree — this is a visual map of every Kubernetes resource that makes up the Postcard Generator: Deployment, Service, Route, ConfigMap, etc.
6. Click on the Deployment node in the tree — examine the details panel showing replicas, image, and current state
7. Note the "Last Sync" timestamp and the Git commit SHA that the deployment matches

### Section 2: Break It — Cause Drift

8. Switch to the OpenShift console (Developer perspective) and navigate to your Postcard Generator's namespace
9. Open the Topology view and click on the Postcard Generator deployment
10. In the Details panel, scale the deployment from 1 pod to 3 pods by clicking the up arrow next to the pod count
11. Wait a moment for the additional pods to start — you now have 3 pods running, but Git says there should be 1
12. Return to the Argo CD dashboard — within a minute, the application status changes from **Synced** to **OutOfSync**
13. Click into the application — Argo CD highlights the Deployment resource in yellow, showing the diff: `spec.replicas` is 3 on the cluster but 1 in Git
14. Click "Diff" on the Deployment to see the exact difference between the cluster state and the Git-defined state — this is how you catch unauthorized or accidental changes

### Section 3: Fix It — Sync and Verify

15. In Argo CD, click "Sync" at the top of the application view
16. In the sync dialog, review what will be changed — the Deployment replicas will be set back to 1
17. Click "Synchronize" to apply the correction
18. Watch the sync progress — Argo CD reverts the Deployment to match Git
19. Switch to the OpenShift console — confirm the pod count is back to 1
20. Now make a legitimate change: open your Gitea instance and navigate to the deployment manifest in the `postcard-generator-deploy` repository
21. Edit the Deployment YAML to add an environment variable: `POSTCARD_GREETING=Wish you were here!`
22. Commit the change
23. Return to Argo CD — the application shows **OutOfSync** again, but this time the diff shows the new environment variable
24. Click "Sync" to apply the Git change — the application updates and the new greeting appears in the Postcard Generator

## Key Takeaways

- GitOps means Git is the single source of truth — what's in Git is what's on the cluster, always
- Argo CD continuously monitors for drift and makes it visible — no more "who changed that?" mysteries
- Manual cluster changes are detected and can be reverted — this prevents configuration surprises
- Legitimate changes flow through Git, creating an audit trail and enabling code review for infrastructure changes

## Infrastructure Notes

- OpenShift GitOps operator must be installed with an Argo CD instance accessible to lab users
- An Argo CD Application CR must be pre-configured pointing to the Postcard Generator's deployment manifests in Gitea
- The deployment manifests must be in a separate repo or directory from the application source (source repo vs. deploy repo pattern)
- Argo CD sync policy should be set to manual (not auto-sync) so the user can observe drift before syncing
- Argo CD must have permissions to manage resources in the user's namespace
