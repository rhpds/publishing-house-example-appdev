"""API routes for the Postcard Generator."""

import json
import os
import random

from flask import Blueprint, current_app, jsonify, render_template, request

from app.ai_client import generate_message

bp = Blueprint("postcard", __name__)

_destinations = None


def _load_destinations():
    """Load and cache the destinations list from JSON."""
    global _destinations
    if _destinations is None:
        data_path = os.path.join(current_app.config["DATA_DIR"], "destinations.json")
        with open(data_path, "r", encoding="utf-8") as fh:
            _destinations = json.load(fh)
    return _destinations


@bp.route("/")
def index():
    """Serve the main page."""
    return render_template("index.html")


@bp.route("/api/generate", methods=["POST"])
def generate():
    """Generate a random postcard for the given sender name."""
    body = request.get_json(silent=True) or {}
    sender = body.get("sender", "").strip() or "Anonymous Traveler"

    destinations = _load_destinations()
    dest = random.choice(destinations)

    message = None
    ai_used = False

    if current_app.config["AI_ENABLED"]:
        message = generate_message(dest, sender, current_app.config)
        if message:
            ai_used = True

    if not message:
        message = dest["tagline"]

    return jsonify(
        {
            "destination": {
                "name": dest["name"],
                "country": dest["country"],
                "lat": dest["lat"],
                "lng": dest["lng"],
                "tagline": dest["tagline"],
                "colors": dest["colors"],
            },
            "message": message,
            "sender": sender,
            "ai_generated": ai_used,
        }
    )


@bp.route("/api/destinations")
def list_destinations():
    """Return the full list of available destinations."""
    destinations = _load_destinations()
    return jsonify(destinations)
