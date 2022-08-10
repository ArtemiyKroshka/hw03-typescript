import mongoose, { Document } from "mongoose";

const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

interface IContact extends Document {
  name: string
  email: string
  phone: string
  favorite?: boolean
}

const contactsSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "missing required name field"],
  },
  email: {
    type: String,
    required: [true, "missing required email field"],
  },
  phone: {
    type: Number,
    required: [true, "missing required phone field"],
  },
  favorite: {
    type: String,
    default: false,
  },
});

contactsSchema.path("name").validate((value: string) => {
  const re = /[A-Z a-z]\w+/;
  return re.test(String(value));
});

contactsSchema.virtual("strPhone").get(function () {
  return `phone`;
});

contactsSchema.plugin(mongoosePaginate);

const Contact = model<IContact>("contact", contactsSchema);

module.exports = Contact;