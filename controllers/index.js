"use strict";

const { Data, sequelize } = require("../models");

class Test {
  static async getAll(req, res, next) {
    try {
      const data = await sequelize.query(
        `SELECT d.id, d."productID", d.amount, s."name" status, d."transactionDate", d."createBy", concat(date_part('year', "transactionDate"::date)::text,'-',date_part('month', "transactionDate"::date)::text) period FROM "Data" d JOIN "Statuses" s ON d.status = s.status order by period desc;`
      );

      res.status(200).json(data[0]);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await sequelize.query(
        `SELECT "Data"."id", "Data"."productID", "Data"."productName", "Data"."amount", "Data"."customerName", "Data"."status", "Data"."transactionDate", "Data"."createBy", "Data"."createdAt" as "createdOn", "Status"."name" AS "statusName" FROM "Data" AS "Data" LEFT OUTER JOIN "Statuses" AS "Status" ON "Data"."status" = "Status"."status" WHERE "Data"."id" = ${id}`
      );
      if (!data[0].length) throw "DataNotFound";

      res.status(200).json(data[0][0]);
    } catch (err) {
      next(err);
    }
  }
  static async add(req, res, next) {
    try {
      const {
        productID = null,
        productName = null,
        amount = null,
        customerName = null,
        status = null,
        transactionDate = null,
        createBy = null,
      } = req.body;
      let errors = {};

      if (!productID) errors.productID = "ID Product cannot be empty";
      if (!productName) errors.productName = "Product Name cannot be empty";
      if (!amount) errors.amount = "Amount cannot be empty";
      if (!customerName) errors.customerName = "Customer Name cannot be empty";
      // if (status !== 0 || status !== 1)
      //   errors.status = "Status cannot be empty";
      if (!transactionDate)
        errors.transactionDate = "Transaction Date cannot be empty";
      if (!createBy) errors.createBy = "Create By cannot be empty";

      if (Object.keys(errors).length) throw { name: "validationError", errors };

      await Data.create({
        productID,
        productName,
        amount,
        customerName,
        status,
        transactionDate,
        createBy,
      });

      res.status(201).json("Data Successfully Inserted");
    } catch (err) {
      next(err);
    }
  }
  static async edit(req, res, next) {
    try {
      let payload = req.body;
      const id = req.params;

      const data = await Data.findOne({ where: id });

      if (!data) throw "DataNotFound";

      if (payload.transactionDate) {
        let time = new Date(payload.transactionDate).toTimeString().split(" ");
        let day = new Date(payload.transactionDate).toISOString().split("T");
        payload = {
          ...payload,
          transactionDate: `${day[0]} ${time[0]}`,
        };
      }

      const response = await Data.update(
        { ...payload },
        {
          where: {
            id: data.id,
          },
        }
      );

      if (response[0] === 0) throw "UpdateFailed";

      res.status(200).json("Data Successfully Updated");
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Test;
