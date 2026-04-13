# Module 2: Rewrite the Postcard — Live Coding with Dev Spaces

## Brief Overview

You have a running Postcard Generator on OpenShift. Now you want to change it. In this lab, you'll open the application source code in OpenShift Dev Spaces — a cloud-hosted development environment that runs directly on the cluster. You'll modify the app's styling and add a new destination, then watch your changes appear instantly without rebuilding or redeploying. This isn't about the IDE — it's about how close and fast the integration between your code and the running platform can be.

## Audience and Time

- **Target personas:** Developers, technical evaluators curious about the inner loop experience
- **Prerequisites:** The Postcard Generator is already deployed in your namespace (pre-provisioned or completed Lab 1). Basic comfort with editing code (Python, HTML/CSS).
- **Estimated duration:** 20 minutes

## What You Will See, Learn, and Do

**See:**
- Dev Spaces launching a full development environment from a devfile in seconds
- Code changes reflected in the running application immediately (no rebuild, no redeploy)
- The development environment running on the same cluster as the application

**Learn:**
- How Dev Spaces eliminates "works on my machine" by running dev environments on the cluster
- How devfiles define reproducible, shareable development environments
- How Quarkus/Flask dev mode enables instant feedback during development

**Do:**
- Launch a Dev Spaces workspace from the Postcard Generator's Git repository
- Modify the postcard's visual styling (change colors, update a tagline)
- Add a new destination to the curated destinations list
- Observe changes reflected live in the running app
- Explore the devfile that defines the workspace configuration

## Lab Structure

| Section | Title | Duration |
|---------|-------|----------|
| 1 | Launch Your Workspace | 5 min |
| 2 | Customize a Postcard | 8 min |
| 3 | Add a New Destination | 7 min |

## Detailed Steps

### Section 1: Launch Your Workspace

1. Open OpenShift Dev Spaces using the provided URL
2. Sign in with your lab credentials
3. Create a new workspace by pasting the Postcard Generator Git repo URL (provided in your lab guide)
4. Wait for the workspace to initialize — Dev Spaces pulls the devfile from the repo and builds the environment (this takes about 60 seconds)
5. Once the IDE loads, open a terminal within Dev Spaces
6. Start the application in dev mode:
   ```
   cd postcard-generator
   flask run --debug
   ```
7. When the port-forward notification appears, click "Open in New Tab" to see the app running from your workspace
8. Confirm the Postcard Generator works — generate a postcard to verify

### Section 2: Customize a Postcard

9. In the IDE file explorer, open `static/css/postcards.css`
10. Find the `.postcard-frame` class — this controls the retro border and shadow effect
11. Change the border color from the default to something bold (e.g., `border-color: #e74c3c`)
12. Save the file — do NOT restart the server
13. Switch to the browser tab with the app and refresh — the postcard frame now shows your new color
14. Open `templates/postcard.html` and find the tagline element
15. Change the default tagline format (e.g., add an emoji or change the phrasing style)
16. Save and refresh — the change appears immediately
17. This is the inner loop: code, save, refresh. No container builds. No deployment steps. No waiting.

### Section 3: Add a New Destination

18. Open `data/destinations.json` — this is the curated list of destinations the app pulls from
19. Review the structure of a destination entry: name, coordinates, tagline, and color scheme
20. Add a new destination entry — pick somewhere fun:
    ```json
    {
      "name": "Reykjavik",
      "country": "Iceland",
      "lat": 64.1466,
      "lng": -21.9426,
      "tagline": "Greetings from Reykjavik — Land of Fire and Ice!",
      "colors": {
        "primary": "#1a5276",
        "accent": "#48c9b0"
      }
    }
    ```
21. Save the file
22. In the app, click "Generate Postcard" repeatedly until your new destination appears — it will show up with the coordinates pinned on the map, your tagline, and your chosen colors
23. Briefly open the `devfile.yaml` in the root of the repo — note how it defines the Python runtime, port configuration, and startup commands that made this entire workspace reproducible

## Key Takeaways

- Dev Spaces runs your development environment on the cluster — no local setup, no environment drift
- Live reload means the feedback loop is seconds, not minutes — code, save, see the result
- Devfiles make the development environment as reproducible as a container image
- The developer never left the browser — no local IDE, no local runtime, no local dependencies

## Infrastructure Notes

- Dev Spaces operator must be installed and configured with sufficient workspace quotas
- The Postcard Generator repo must include a devfile.yaml that defines the Python environment and startup commands
- Flask debug mode (or equivalent) must be configured for live reload
- Port forwarding from the Dev Spaces workspace must be enabled
