import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { Customer, CustomerInput, CustomerUpdates } from './customer.types';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiTags('customer')
  @Get()
  public async getCustomers(
    @Query('companyId') companyId: string
  ): Promise<Customer[]> {
    return this.customerService.getCustomers(companyId);
  }
  
  @ApiTags('customer')
  @Get(':id')
  public getCustomerById(
    @Param('id') id: string,
    @Query('companyId') companyId: string
  ): Promise<Customer> {
    return this.customerService.getCustomerById(id, companyId);
  }

  @ApiTags('customer')
  @Post()
  public createCustomer(@Body() body: CustomerInput): Promise<boolean> {
    return this.customerService.createCustomer(body);
  }

  @ApiTags('customer')
  @Put(':id')
  public updateCustomer(
    @Param('id') id: string,
    @Body() body: CustomerUpdates
  ): Promise<boolean> {
    return this.customerService.updateCustomer(
      id,
      body.companyId,
      body
    );
  }

  @ApiTags('customer')
  @Delete(':id')
  public deleteCustomer(@Param('id') id: string): Promise<boolean> {
    return this.customerService.deleteCustomer(id);
  }
}
