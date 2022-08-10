import { Request, Response, NextFunction } from "express";

const actions = require("../model/index");
interface IUser extends Document {
  id: number
  name: string
  favorite?: boolean
  email: string
  phone: string
}

interface UserReq extends Request {
  user: IUser,
}


const getAll = async (req: UserReq, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: number = req.user?.id;
    const contacts: Array<IUser> = await actions.listContacts(userId, req.query);
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { contactId } = req.params
    const user = await actions.getContactById(contactId);
    if (user) {
      return res.json({
        status: "succes",
        message: "request contact found",
        code: 200,

        data: {
          user,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const createContact = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const addContacts = await actions.addContact(userId, req.body);
    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "contact created",
      data: {
        addContacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const rmContactById = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { contactId } = req.params
    const result = await actions.removeContact(userId, contactId);
    if (result) {
      return res.json({
        status: "succes",
        code: 200,
        message: "contact has already been deleted",
        data: { result },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        message: `no contact with id ${req.params.contactId} found`,
        data: " Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContactsById = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { contactId } = req.params
    const updatedUser = await actions.updateContact(
      userId,
      Number(contactId),
      req.body
    );

    return res.json({
      status: "succes",
      code: 200,
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateStatusFav = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const { contactId } = req.params
    if (req.body.favorite) {
      const updateStatusContacts = await actions.updateStatusContact(
        id,
        Number(contactId),
        req.body
      );

      return res.status(201).json({
        status: "succes",
        code: 201,
        message: "status updated",
        data: {
          updateStatusContacts,
        },
      });
    } else {
      return res.json({
        status: 400,
        message: "missing field favorite",
      });
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAll,
  getById,
  createContact,
  rmContactById,
  updateContactsById,
  updateStatusFav,
};