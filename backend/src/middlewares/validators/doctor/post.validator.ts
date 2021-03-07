import { body } from 'express-validator';

const validations = [
  body('name').exists().withMessage("Missing field 'Name'"),
  body('email').exists().withMessage("Missing field 'Email'"),
  body('phone').exists().withMessage("Missing field 'Phone'"),
  body('adress').exists().withMessage("Missing field 'Adress'"),
  body('speciality').exists().withMessage("Missing field 'Speciality'"),
  body('name')
    .if(body('name').exists())
    .isLength({ min: 1 })
    .withMessage('name need at least one character'),
  body('email').if(body('email').exists()).isEmail().withMessage('Invalid Email Format'),
];

export  default validations