/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
    getStock(id: $id) {
      id
      symbol
      type
      region
      name
      pdp
      plr
      budget
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        type
        region
        name
        pdp
        plr
        budget
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
