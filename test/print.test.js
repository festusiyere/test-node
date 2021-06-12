const pdf = require('../src/utils/print/pdf')
const csv = require('../src/utils/print/csv')
const { NextFunction, Request, Response } = require("express");
const httpMocks = require('node-mocks-http')
const { TicketDocument } = require('../src/module/ticket/ticket.model');

test('should throw an error if called without an arg', async () => {

    var res = httpMocks.createResponse()
    var invoice = [{ 
        customer: `customer`,
        agent: `UserDocument['_id']`,
        title: `string`,
        description: `string`,
        status: `string`,
        ticketComments:' [{}]',
        createdAt: new Date(),
        updatedAt: new Date(),
    }]
    expect(new pdf(res,invoice)).then((response)=>{
        expect(response.status).toBe(200)
    });

});

