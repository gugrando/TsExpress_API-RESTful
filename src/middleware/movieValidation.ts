import { body } from 'express-validator';

export const movieCreationValidation = () => {
    return [
        body('title').isString()
            .withMessage('Title is required')
            .isLength({min: 5})
            .withMessage('Title must be at least 3 characters long'),
        
        body('rating').isNumeric()
            .withMessage('Rating is required')
            .isFloat({min: 0, max: 10})
            .withMessage('Rating must be between 0 and 10'),
        body('description').isString()
            .withMessage('Description is required'),
        body('director').isString()
            .withMessage('Director is required'),
        body('poster').isURL()
            .withMessage('Poster is required'),
    ]
}