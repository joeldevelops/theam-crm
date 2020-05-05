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
    active: true
  }
}