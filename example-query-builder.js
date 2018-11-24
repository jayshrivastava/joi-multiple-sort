const { QueryBuilder } = require('objection');

class customQueryBuilder extends QueryBuilder {

    /**
     * Applies Multi Sort
     * @param {Array} multiSortArr Array of Sort Objects
     * @return {QueryBuilder} Query Builder
     */
    sort(multiSortArray) {

        return this.modify((queryBuilder) => {

                _.each(multiSortArray, (sortObj) => {

                    queryBuilder.orderBy(sortObj.column, sortObj.direction);
                });
            })
        };
};

module.exports = customQueryBuilder;

// const sortedResults = objectionModel.query().sort()


