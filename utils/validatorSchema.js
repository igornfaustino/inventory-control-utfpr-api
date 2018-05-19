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
    itemType: Joi.string(),
    __v: Joi.any(),
    description: Joi.string().regex(/^[^%<>^$]+$/).required(),
    justification: Joi.string().regex(/^[^%<>^$]+$/),
    priceJustification: Joi.string().regex(/^[^%<>^$]+$/),
    qtd: Joi.number().required(),
    quotation: Joi.array().items(Joi.object().keys(QuotationSchema)),
    date: Joi.date(),
    status: Joi.string()
};


const PurchaseRequisitionSchema = {
    _id: Joi.any(),
    number: Joi.string(),
    management: Joi.string().required(),
    requisitionDate: Joi.date().required(),
    UGR: Joi.string().required(),
    __v: Joi.any(),
    sector: Joi.string().required(),
    requester: Joi.string().required(),
    requisitionItems: Joi.array().items(Joi.object().keys({
        item: Joi.any(),
        itemSupplier: Joi.any(),
    })).required()
};

const EquipmentHitorySchema = {
    _id: Joi.any(),
    justification: Joi.string().regex(/^[^%<>^$]+$/).required(),
    locationType: Joi.string().required(),
    location: Joi.string().required(),
};

const EquipmentSchema = {
    _id: Joi.any(),
    __v: Joi.any(),
    siorg: Joi.string(),
    buyer: Joi.string().required(),
    solicitor: Joi.string().required(),
    description: Joi.string().regex(/^[^%<>^$]+$/).required(),
    origin: Joi.string(),
    equipmentType: Joi.string(),
    quantity: Joi.number().required(),
    equipmentState: Joi.string(),
    locationHistory: Joi.array().items(Joi.any())
};

module.exports = {
    QuotationSchema,
    SupplierSchema,
    ItemsRequisitionSchema,
    PurchaseRequisitionSchema,
    EquipmentSchema,
    EquipmentHitorySchema
}