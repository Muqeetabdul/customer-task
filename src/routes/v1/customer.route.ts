import express from 'express';
import validate from '../../middlewares/validate.middleware';
import * as customerValidation from '../../validations/customer';
import * as customerController from '../../controllers/customer.controller';


const router = express.Router();

router.route('/')
.post(validate(customerValidation.createCustomer), customerController.createCustomer)
.get(validate(customerValidation.getAllCustomers), customerController.getAllCustomers);

router.route('/:customerId')
.get(validate(customerValidation.getCustomer), customerController.getCustomerById)
.patch(validate(customerValidation.updateCustomer), customerController.updateCustomerById)
.delete(validate(customerValidation.deleteCustomer), customerController.deleteCustomer);


export default router;    

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management and retrieval
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a customer
 *     description: Only admins can create other customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - dateOfBirth
 *               - ipAddress
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               dateOfBirth:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               firstName: fake name
 *               lastName: fake name
 *               email: fake@example.com
 *               dateOfBirth: Month/Day/Year
 *               ipAddress: 127.0.0.1
 *               gender: male
 *               type: Indiviual
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Customers
 *     description: Only admins can retrieve all Customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer
 *     description: Only admins can fetch other Customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/customer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a customer
 *     description: Only admins can update customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               dateOfBirth:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *             example:
 *               firstName: fake name
 *               lastName: fake name
 *               email: fake@example.com
 *               dateOfBirth: Month/Day/Year
 *               ipAddress: 127.0.0.1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a customer
 *     description: Only admins can delete customers.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */