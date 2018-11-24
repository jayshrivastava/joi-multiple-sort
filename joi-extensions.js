const _ = require('lodash');

exports.sortQueryString = function sortQueryString(Joi) {

    /**
    * @param {string} value Request Query Param on which we invoke Joi.validate()
    * @param {array}  searchableFields col names
    * @returns {array} sort objects parsed from query {column: 'id', direction: 'asc'}
    */
    return {
        name: 'string',
        base: Joi.string(),
        language: {
            sortQueryString: 'Must be correctly formatted `+id,-name`'
        },
        rules: [{
            name: 'sortQueryString',
            params: {
                searchableFields: Joi.array()
            },
            validate(params, value, state, options) {

                const directions = ['asc', 'desc'];

                const sortObjSchema = Joi.object({
                    column: Joi.string().valid(
                        params.searchableFields
                    ),
                    direction:Joi.string().valid(
                        directions
                    )
                });

                let multiSortArray = _.map(value.split(','), (sortSubStr, i) => {

                    let direction = sortSubStr[0];

                    if (direction === '-') {
                        direction = 'desc';
                    } else if (direction === '+') {
                        direction = 'asc';
                    }

                    return {
                        direction: direction,
                        column: sortSubStr.substring(1)
                    };
                });

                _.forEach(multiSortArray, (sortObj) => {

                    Joi.assert(
                        sortObj,
                        sortObjSchema,
                        'Validation Error in Joi.string().sortQuery()'
                    );
                });

                return multiSortArray;
            }
        }]
    };
};
