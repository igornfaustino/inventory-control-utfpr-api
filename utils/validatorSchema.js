const Joi = require('joi');

const QuotationSchema = {
    _id: Joi.any(),
    requisitionType: Joi.string().required(),
    reference: Joi.string().required(),
    price: Joi.number().optional(),
};

const SupplierSchema = {
    _id: Joi.any(),
    name: Joi.string().required(),
    cnpj: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.object().keys({
        _id: Joi.any(),
        number: Joi.number(),
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
    }).required()
};

const ItemsRequisitionSchema = {
    _id: Joi.any(),
    siorg: Joi.string(),
    __v: Joi.any(),
    description: Joi.string().regex(/^[^%<>^$]+$/).required(),
    justification: Joi.string().regex(/^[^%<>^$]+$/),
    priceJustification: Joi.string().regex(/^[^%<>^$]+$/),
    qtd: Joi.number().required(),
    quotation: Joi.array().items(Joi.object().keys(QuotationSchema)),
    itemSupplier: Joi.object().keys(SupplierSchema),
    date: Joi.date(),
    status: Joi.string()
};


const PurchaseRequisitionSchema = {
    _id: Joi.any(),
    management: Joi.string().required(),
    requisitionDate: Joi.date().required(),
    UGR: Joi.string().required(),
    __v: Joi.any(),
    sector: Joi.string().required(),
    requester: Joi.string().required(),
    requisitionItems: Joi.array().items(Joi.object().keys(ItemsRequisitionSchema)).required()
}

module.exports = {
    QuotationSchema,
    SupplierSchema,
    ItemsRequisitionSchema,
    PurchaseRequisitionSchema
}