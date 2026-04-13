# Postcard Generator

A web app that generates stylized retro travel postcards from destinations around the world. Enter your name, click generate, and get a unique postcard with an interactive map.

## Run locally

```bash
pip install -r requirements.txt
flask --app app.main:create_app run --port 5000
```

Open http://localhost:5000.

## Run in a container

```bash
podman build -t postcard-generator -f Containerfile .
podman run -p 8080:8080 postcard-generator
```

Open http://localhost:8080.

## AI-generated messages (optional)

Set these environment variables to enable AI-powered postcard messages via an OpenAI-compatible endpoint:

```bash
export POSTCARD_AI_ENABLED=true
export POSTCARD_AI_ENDPOINT=https://your-maas-endpoint.example.com
export POSTCARD_AI_API_KEY=your-api-key
```

The app falls back to curated taglines when AI is disabled or the endpoint is unavailable.

## Dev Spaces

Import this repo into OpenShift Dev Spaces -- the `devfile.yaml` handles the workspace setup automatically.
