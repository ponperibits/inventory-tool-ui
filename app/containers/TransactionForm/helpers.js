export const shapeRecords = (records = []) =>
  records.map(({ productId, noOfUnits, ...rest }) => ({
    ...rest,
    noOfUnits,
    productId: {
      ...productId,
      noOfUnits: productId.noOfUnits - noOfUnits,
    },
  }));
