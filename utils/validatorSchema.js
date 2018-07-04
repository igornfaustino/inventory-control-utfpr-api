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
    siorg: Joi.string().allow('').optional(),
    itemType: Joi.string(),
    __v: Joi.any(),
    description: Joi.string().regex(/^[^%<>^$]+$/).required(),
    justification: Joi.string().regex(/^[^%<>^$]+$/),
    priceJustification: Joi.string().regex(/^[^%<>^$]+$/),
    qtd: Joi.number().required(),
    qtdReceived: Joi.number(),
    quotation: Joi.array().items(Joi.object().keys(QuotationSchema)),
    date: Joi.date(),
    status: Joi.string(),
    changeJustification: Joi.string()
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
    date: Joi.any(),
    __v: Joi.any(),
};

const EquipmentSchema = {
    _id: Joi.any(),
    __v: Joi.any(),
    siorg: Joi.string(),
    isPermanent: Joi.any(),
    patrimonyNumber: Joi.any(),
    buyer: Joi.string().required(),
    solicitor: Joi.string().required(),
    description: Joi.string().regex(/^[^%<>^$]+$/).required(),
    origin: Joi.string(),
    equipmentType: Joi.string(),
    equipmentState: Joi.string(),
    locationHistory: Joi.array().items(Joi.any())
};

const StatusSchema = {
    status: Joi.string()
}

const TypeSchema = {
    type: Joi.string()
}

const SectorSchema = {
    sector: Joi.string()
}

const UGRSchema = {
    ugr: Joi.string()
}

const ManagementSchema = {
    management: Joi.string()
}

module.exports = {
    QuotationSchema,
    SupplierSchema,
    ItemsRequisitionSchema,
    PurchaseRequisitionSchema,
    EquipmentSchema,
    EquipmentHitorySchema,
    StatusSchema,
    TypeSchema,
    SectorSchema,
    UGRSchema,
    ManagementSchema
}