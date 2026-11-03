function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function probeUrl(url, timeoutMs = 5000) {
  if (!isValidUrl(url)) {
    return { ok: false, status_code: null, latency_ms: null, error: "Invalid URL" };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return {
      ok: res.ok,
      status_code: res.status,
      latency_ms: Date.now() - start,
      error: null,
    };
  } catch (e) {
    clearTimeout(timer);
    return {
      ok: false,
      status_code: null,
      latency_ms: Date.now() - start,
      error: e?.message || String(e),
    };
  }
}

module.exports = { isValidUrl, probeUrl };
