// DO YOUR MAGIC
const router = require("express").Router();
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
//[GET] /api/cars
router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      next(err);
    });
});

//[GET] /api/cars/:id
router.get("/:id", checkCarId, (req, res, next) => {
  Car.getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      next(err);
    });
});
//[POST] /api/cars
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    const data = req.body;
    Car.create(data)
      .then((newCar) => {
        res.status(200).json(newCar);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.use((err, req, res) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
