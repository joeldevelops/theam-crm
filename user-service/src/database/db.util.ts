export function fromMongoObject(doc: any): any {
  const valueIsArray = Array.isArray(doc);
  if (valueIsArray) {
    doc.map(element => fromMongoObject(element));
    return doc;
  }
  else {
    if (doc._id) {
      doc.id = doc._id;
      delete doc._id;
    }
    
    if (doc.deleted !== null || doc.deleted !== undefined) {
      delete doc.deleted;
    }

    return doc;
  }
}

export function checkResponse(result: any, message: string): boolean {
  if (!result) {
    console.log(message);
    return false;
  }

  return true;
}

export function query(document: object): object {
  return {
    ...document,
    deleted: false
  }
}