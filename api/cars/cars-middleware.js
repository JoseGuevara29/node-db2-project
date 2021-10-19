const db = require("../../data/db-config");
const vinValidator = require("vin-validator");
const Car = require("./cars-model");

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;

  Car.getById(id)
    .then((car) => {
      if (!car) {
        res
          .status(404)
          .json({ message: `The car with id ${id} is not found ` });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: `The field vin is missing` });
  }
  if (!make) {
    res.status(400).json({ message: `The field make is missing` });
  }
  if (!model) {
    res.status(400).json({ message: `The field model is missing` });
  }
  if (!mileage) {
    res.status(400).json({ message: `The field mileage is missing` });
  }
  next();
  console.log("Passed the checkCarPayload");
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  console.log(vinValidator.validate(vin));
  if (!vinValidator.validate(vin)) {
    res.status(400).json({ message: `Vin ${vin} is invalid` });
  } else {
    next();
    console.log(`${vin} is valid`);
    console.log("Passed the checkVinNumberValid");
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  try {
    const takenVin = await db("cars").where("vin", vin.trim()).first();

    if (takenVin) {
      res.status(400).json({ message: `The Vin ${vin} already exists` });
    } else {
      next();
      console.log("Passed the checkVinNumberUnique");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
