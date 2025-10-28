import { aj } from "../config/arcjet.js";

/**
 * Arcjet protection middleware.
 * - Skips bot protection if the user is authenticated (protectRoute ran before).
 * - Applies Arcjet rules for other requests.
 */
export const arcjetProtect = async (req, res, next) => {
  try {
    // ✅ If user is authenticated, skip Arcjet bot detection
    if (req.user || (req.auth && req.auth.userId)) {
      return next();
    }

    // Otherwise, apply Arcjet bot & rate limiting rules
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      console.warn("🚫 Arcjet blocked a request:", decision.reason);
      return res.status(403).json({
        error: "Bot access denied",
        message: "Automated requests are not allowed.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    res.status(500).json({ error: "Arcjet protection failed" });
  }
};
