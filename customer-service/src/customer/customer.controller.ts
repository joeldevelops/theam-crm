import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { Customer, CustomerInput, CustomerUpdates } from './customer.types';

@Controller('v1/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    public async getAllCustomers(
      @Query('companyId') companyId: string
    ): Promise<Customer[]> {
      return this.customerService.getCustomers(companyId);
    }
    
    @Get(':id')
    public getCustomer(
      @Param('id') id: string,
      @Query('companyId') companyId: string
    ): Promise<Customer> {
      return this.customerService.getCustomerById(id, companyId);
    }

    @Post()
    public createCustomer(@Body() body: CustomerInput): Promise<boolean> {
      return this.customerService.createCustomer(body);
    }

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

    @Delete(':id')
    public deleteCustomer(@Param('id') id: string): Promise<boolean> {
      return this.customerService.deleteCustomer(id);
    }
}
