"""Flask application factory and entry point."""

import os
from flask import Flask


def create_app():
    """Create and configure the Flask application."""
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    app = Flask(
        __name__,
        static_folder=os.path.join(base_dir, "static"),
        template_folder=os.path.join(base_dir, "templates"),
    )

    app.config["DATA_DIR"] = os.path.join(base_dir, "data")
    app.config["AI_ENABLED"] = (
        os.environ.get("POSTCARD_AI_ENABLED", "false").lower() == "true"
    )
    app.config["AI_ENDPOINT"] = os.environ.get("POSTCARD_AI_ENDPOINT", "")
    app.config["AI_API_KEY"] = os.environ.get("POSTCARD_AI_API_KEY", "")

    from app.routes import bp

    app.register_blueprint(bp)

    return app


if __name__ == "__main__":
    application = create_app()
    application.run(host="0.0.0.0", port=8080, debug=True)
