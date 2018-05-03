const Joi = require('joi');

const PriceSchema = {
    _id: Joi.any(),
    requisitionType: Joi.string().required(),
    reference: Joi.string().required(),
    value: Joi.number().optional(),
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
    description: Joi.string().regex(/^(=?.*[A-Za-z\d$@$!%*?&])$/).required(),
    justification: Joi.string().regex(/^(=?.*[A-Za-z\d$@$!%*?&])$/).required(),
    priceJustification: Joi.string().regex(/^(=?.*[A-Za-z\d$@$!%*?&])$/),
    qtd: Joi.number().required(),
    prices: Joi.array().items(Joi.object().keys(PriceSchema)),
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
    PriceSchema,
    SupplierSchema,
    ItemsRequisitionSchema,
    PurchaseRequisitionSchema
}