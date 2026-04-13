/**
 * Postcard Generator -- frontend logic
 */
(function () {
  "use strict";

  /* ── DOM refs ───────────────────────────────────────────────── */
  const senderInput   = document.getElementById("sender-name");
  const generateBtn   = document.getElementById("generate-btn");
  const againBtn      = document.getElementById("again-btn");
  const postcardSec   = document.getElementById("postcard-section");
  const postcardVis   = document.getElementById("postcard-visual");
  const elDestination = document.getElementById("postcard-destination");
  const elCountry     = document.getElementById("postcard-country");
  const elMessage     = document.getElementById("postcard-message");
  const elSender      = document.getElementById("postcard-sender");
  const elStamp       = document.getElementById("postcard-stamp");
  const elMapLabel    = document.getElementById("map-label");

  /* ── Leaflet map (lazy-init) ────────────────────────────────── */
  let map = null;
  let marker = null;

  function ensureMap() {
    if (map) return;
    map = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);
  }

  function setMapLocation(lat, lng, label) {
    ensureMap();
    const latlng = [lat, lng];
    map.flyTo(latlng, 6, { duration: 1.5 });

    if (marker) {
      marker.setLatLng(latlng).setPopupContent(label).openPopup();
    } else {
      marker = L.marker(latlng).addTo(map).bindPopup(label).openPopup();
    }
  }

  /* ── Decorative patterns (CSS-only, driven by hue) ──────────── */
  function applyColors(colors) {
    const root = document.documentElement;
    root.style.setProperty("--pc-primary", colors.primary);
    root.style.setProperty("--pc-accent", colors.accent);
    postcardVis.style.background =
      "linear-gradient(135deg, " + colors.primary + " 0%, " + shiftColor(colors.primary, 20) + " 100%)";
  }

  /** Lighten a hex color by a rough amount. */
  function shiftColor(hex, amount) {
    hex = hex.replace("#", "");
    let r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
    let g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
    let b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }

  /* ── API call ───────────────────────────────────────────────── */
  async function generatePostcard() {
    const sender = senderInput.value.trim() || "Anonymous Traveler";

    generateBtn.disabled = true;
    againBtn.disabled = true;
    generateBtn.querySelector(".btn-text").textContent = "Generating...";

    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: sender }),
      });

      if (!resp.ok) throw new Error("Server error " + resp.status);

      const data = await resp.json();
      renderPostcard(data);
    } catch (err) {
      console.error("Generation failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      generateBtn.disabled = false;
      againBtn.disabled = false;
      generateBtn.querySelector(".btn-text").textContent = "Generate Postcard";
    }
  }

  /* ── Render ─────────────────────────────────────────────────── */
  function renderPostcard(data) {
    const dest = data.destination;

    /* colors */
    applyColors(dest.colors);

    /* text */
    elDestination.textContent = dest.name;
    elCountry.textContent = dest.country;
    elMessage.textContent = "\u201C" + data.message + "\u201D";
    elSender.textContent = "With love, " + data.sender;

    /* stamp */
    elStamp.textContent = "AIR MAIL";
    if (data.ai_generated) {
      elStamp.textContent = "AI MAIL";
    }

    /* reveal (must happen before map so the container has dimensions) */
    postcardSec.classList.remove("hidden");

    /* map */
    elMapLabel.textContent = dest.name + ", " + dest.country;
    setMapLocation(dest.lat, dest.lng, dest.name);

    postcardSec.scrollIntoView({ behavior: "smooth", block: "start" });

    /* entrance animation */
    const postcard = document.getElementById("postcard");
    postcard.classList.remove("postcard-enter");
    // force reflow
    void postcard.offsetWidth;
    postcard.classList.add("postcard-enter");
  }

  /* ── Events ─────────────────────────────────────────────────── */
  generateBtn.addEventListener("click", generatePostcard);
  againBtn.addEventListener("click", generatePostcard);

  senderInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") generatePostcard();
  });
})();
