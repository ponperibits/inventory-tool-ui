export const shapeRecords = (records = []) =>
  records.map(({ productId, noOfUnits, supplierId, ...rest }) => ({
    ...rest,
    noOfUnits,
    productId: {
      ...productId,
      noOfUnits: supplierId
        ? productId.noOfUnits - noOfUnits
        : productId.noOfUnits + noOfUnits,
    },
  }));
