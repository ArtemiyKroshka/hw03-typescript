const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
} = require("../../controllers/contacts");


router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", createContact);

router.put("/:contactId", updateContactsById);

router.patch("/:contactId/favorite", updateStatusFav);

router.delete("/:contactId", rmContactById);

module.exports = router;