"""Optional AI/MaaS integration for generating personalized postcard messages."""

import logging

import requests

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "You are a creative travel postcard writer. "
    "Write a short, charming postcard message (2-3 sentences) for the given "
    "destination. Be vivid, warm, and playful. Do not use hashtags or emojis. "
    "Address the message to the recipient name provided."
)


def generate_message(destination: dict, sender_name: str, config: dict) -> str | None:
    """Call an OpenAI-compatible chat endpoint to generate a postcard message.

    Returns the generated text, or None on any failure so the caller can
    fall back to the canned tagline.
    """
    endpoint = config.get("AI_ENDPOINT", "").rstrip("/")
    api_key = config.get("AI_API_KEY", "")

    if not endpoint:
        logger.warning("AI endpoint not configured; falling back to tagline")
        return None

    url = f"{endpoint}/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    user_prompt = (
        f"Write a postcard message from {sender_name} visiting "
        f"{destination['name']}, {destination['country']}. "
        f"Inspiration: {destination['tagline']}"
    )

    payload = {
        "messages": [
            {"role": "system", "content": _SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.8,
        "max_tokens": 200,
    }

    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=3)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()
    except requests.exceptions.Timeout:
        logger.warning("AI request timed out")
    except requests.exceptions.RequestException as exc:
        logger.warning("AI request failed: %s", exc)
    except (KeyError, IndexError) as exc:
        logger.warning("Unexpected AI response format: %s", exc)

    return None
