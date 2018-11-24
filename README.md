## Purpose

Validates a multiple sort query string `+id,-name...` against an array of valid column names.
Returns an array of objects 
`[{column: 'id', direction: 'asc'}, {column: 'name', direction: 'desc'}]` that can be implemented into an objection/knex `QueryBuilder`
to sort rows by multiple columns (see `example-query-builder.js`)
