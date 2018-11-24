const { sortQueryString } = require('./joi-extensions');
const BaseJoi = require('joi');

const Joi = BaseJoi.extend(sortQueryString);

const validFields = ['id', 'name'];

const requestSchema = Joi.object({
    sort: Joi.string().sortQueryString(validFields)
});

let validRequestSortParam = {
    sort: '+id,-name'
}

let invalidRequestObj = {
    sort: '+not,-allowed'
}

//  Returned Successfully
let processedRequestParams = requestSchema.validate(validRequestSortParam).value;
console.log(processedRequestParam);

// Throws
let throwsError = requestSchema.validate(invalidRequestObj);




