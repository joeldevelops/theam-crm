export default function mockCustomerModel(dto: any) {
  this.data = dto;
  this.find = jest.fn((query: any) => this.data);
}