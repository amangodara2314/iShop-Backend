const { Router } = require("express");
const ColorController = require("../controllers/colors.controller");
const { restrictedToLoggedInUserOnly } = require("../middlewares/auth");

const ColorRouter = Router();

ColorRouter.get("/:id?", (req, res) => {
  new ColorController()
    .read(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

ColorRouter.post("/create", restrictedToLoggedInUserOnly, (req, res) => {
  new ColorController()
    .create(req.body)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

ColorRouter.put("/update/:id", restrictedToLoggedInUserOnly, (req, res) => {
  new ColorController()
    .update(req.params.id, req.body)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

ColorRouter.delete("/delete/:id", restrictedToLoggedInUserOnly, (req, res) => {
  new ColorController()
    .delete(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

ColorRouter.patch(
  "/update-status/:id/:status",
  restrictedToLoggedInUserOnly,
  (req, res) => {
    new ColorController()
      .changeStatus(req.params.id, req.params.status)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = ColorRouter;
