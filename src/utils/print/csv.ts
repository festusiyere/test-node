var { Parser } = require('json2csv');
import { Express, Request, Response } from "express";
import { TicketDocument } from "../../module/ticket/ticket.model";

export default  class CSV {
    ticket:Object;
    res:Response;
    constructor(res :Response, ticket : Object) {
        this.ticket = ticket;
        this.res = res;
    }
    generate() {
        console.log('xxxxxxewewewe');
        const fields = ['title', 'customer.name', 'agent.name', 'description'];
        try {
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(this.ticket);
            this.res.attachment('data.csv');
            this.res.status(200).send(csv);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}
