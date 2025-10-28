import { aj } from "../config/arcjet.js";

// ✅ Custom Arcjet middleware that skips bot blocking for authenticated users
export const arcjetProtect = async (req, res, next) => {
  try {
    // Skip Arcjet protection if request has a valid Clerk user (added by auth.middleware)
    if (req.auth && req.auth.userId) {
      return next();
    }

    // Apply Arcjet rules to other requests
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      console.warn("Arcjet blocked request:", decision.reason);
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
