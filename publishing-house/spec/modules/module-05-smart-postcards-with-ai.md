# Module 5: Dear AI — Smart Postcards with OpenShift AI

## Brief Overview

The Postcard Generator has been using canned taglines — pre-written, one-size-fits-all greetings. In this lab, you'll upgrade it to generate personalized postcard messages using an AI model served through OpenShift AI's model-as-a-service capability. Instead of "Greetings from Paris!", the app will craft messages tailored to the destination and the sender — dynamic, creative, and different every time. This is how applications consume AI as a service on OpenShift, without needing to train or host a model yourself.

## Audience and Time

- **Target personas:** Developers, architects, anyone curious about integrating AI into applications
- **Prerequisites:** The Postcard Generator is deployed in your namespace (pre-provisioned or completed in a prior lab). Basic understanding of REST APIs.
- **Estimated duration:** 20 minutes

## What You Will See, Learn, and Do

**See:**
- The Postcard Generator producing unique, AI-generated messages for each destination
- OpenShift AI's model serving dashboard showing the available MaaS endpoint
- API calls flowing from the app to the model endpoint and back
- The difference between static content and AI-enhanced content side by side

**Learn:**
- How OpenShift AI provides model-as-a-service — consume AI without managing infrastructure
- How applications integrate with LLM endpoints using standard REST APIs
- How API keys and endpoints are managed as Kubernetes Secrets
- Why AI-as-a-service lowers the barrier to adding intelligence to any application

**Do:**
- Explore the MaaS endpoint available through OpenShift AI
- Enable the AI feature in the Postcard Generator by setting an environment variable
- Observe the app generating personalized postcard messages via the AI model
- Review how the app calls the model endpoint (prompt, API key, response handling)
- Compare static taglines vs. AI-generated messages

## Lab Structure

| Section | Title | Duration |
|---------|-------|----------|
| 1 | Explore OpenShift AI and the MaaS Endpoint | 5 min |
| 2 | Enable AI-Powered Postcards | 8 min |
| 3 | See It in Action | 7 min |

## Detailed Steps

### Section 1: Explore OpenShift AI and the MaaS Endpoint

1. Open the OpenShift AI dashboard using the provided URL (accessible from the OpenShift console's application launcher)
2. Navigate to the Model Serving section — locate the available model endpoint
3. Note the model name, endpoint URL, and the type of model (an LLM capable of text generation)
4. This endpoint is already provisioned and ready to receive requests — no model deployment, GPU configuration, or training required
5. Open the OpenShift console and navigate to your namespace
6. Check Secrets — find the `postcard-ai-config` Secret that contains the MaaS endpoint URL and API key
7. These credentials were provisioned as part of your lab environment — in production, platform teams manage these secrets and inject them into applications that need AI capabilities

### Section 2: Enable AI-Powered Postcards

8. The Postcard Generator app has an AI feature that's disabled by default — it uses canned taglines until told otherwise
9. In the OpenShift console, navigate to your Postcard Generator Deployment
10. Go to the Environment tab (or edit the Deployment YAML)
11. Add the environment variable: `POSTCARD_AI_ENABLED=true`
12. The variable tells the app to call the MaaS endpoint instead of using the canned tagline list
13. Save the change — the deployment rolls out a new pod with the AI feature enabled
14. Wait for the new pod to reach Ready state (a few seconds)

### Section 3: See It in Action

15. Open the Postcard Generator application
16. Enter your name in the "From" field
17. Click "Generate Postcard" — this time, instead of a canned tagline, the app sends a prompt to the AI model: the destination name, country, and a request for a creative, travel-themed postcard greeting
18. The AI model returns a unique message — something like: "Dear friend, the northern lights of Reykjavik are calling your name. Bundle up and bring your sense of wonder — this land of glaciers and geysers has stories only the brave get to hear."
19. Generate several more postcards — each message is different, personalized to the destination
20. Open the application code in Gitea (or Dev Spaces if available) and navigate to the AI integration module:
    - `app/ai_client.py` — the function that calls the MaaS endpoint
    - Review the prompt template: it sends the destination name and asks for a creative postcard message
    - Review how the API key is read from the Kubernetes Secret via an environment variable
    - Review the fallback: if the AI endpoint is unavailable, the app falls back to canned taglines
21. Return to the app and compare: toggle `POSTCARD_AI_ENABLED` back to `false` in the deployment, wait for rollout, and generate a postcard — the difference between a canned tagline and an AI-crafted message is immediately visible

## Key Takeaways

- OpenShift AI's model-as-a-service makes AI consumption simple — no model hosting, no GPU management, no ML expertise required
- Integrating AI into an existing application is a REST API call plus a Kubernetes Secret — not a rewrite
- The fallback pattern (AI when available, static when not) is a production best practice — AI enhances but doesn't break the app
- Platform teams provision the AI endpoint and credentials; developers consume them — the same pattern as a database or message queue

## Infrastructure Notes

- OpenShift AI must be configured with a MaaS-compatible model endpoint (e.g., vLLM, OpenAI-compatible API)
- A Kubernetes Secret (`postcard-ai-config`) must be pre-provisioned in each user namespace with the endpoint URL and API key
- The MaaS endpoint must be accessible from within the cluster (network policies must allow egress)
- The AI model should respond within 2-3 seconds for a good booth experience — test latency before the event
- Rate limiting should be configured to prevent runaway API costs from booth traffic
- The Postcard Generator app must include the `ai_client.py` module and the `POSTCARD_AI_ENABLED` feature toggle
