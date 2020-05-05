export function checkResponse(result: any, message: string): boolean {
  if (!result) {
    // TODO: replace with a logging service
    console.log(message);
    return false;
  }

  return true;
}

export function query(document: object): object {
  return {
    ...document,
    active: true
  }
}