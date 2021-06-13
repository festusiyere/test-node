import PDF from '../src/utils/print/pdf';
const { NextFunction, Request, Response } = require('express');
const httpMocks = require('node-mocks-http');

test('generate pdf should return 200', async () => {
    var res = httpMocks.createResponse();
    var invoice = [
        {
            customer: `customer`,
            agent: `UserDocument['_id']`,
            title: `string`,
            description: `string`,
            status: `string`,
            ticketComments: ' [{}]',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];
    const response = await (new PDF(res, invoice).generate());
    expect(response).toBe(200);
});
