export default function mockUserModel(dto: any) {
  this.data = dto;
  this.find = (query: any) => this.data;
  this.updateOne = (query: any) => this.data;
  this.save = () => true;
}