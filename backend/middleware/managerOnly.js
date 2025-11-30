module.exports = function managerOnly(req, res, next) {
    if (!req.user || req.user.role !== "manager") {
        return res.status(403).json({ message: "Managers only" });
    }
    next();
};
