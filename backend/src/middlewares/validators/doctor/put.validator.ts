import {body} from 'express-validator';

const validations = [
  body('name')
    .if(body('name').exists())
    .isLength({ min: 1 })
    .withMessage('name need at least one character'),
  body('email').if(body('email').exists()).isEmail().withMessage('Invalid Email Format'),
];

export default validations;