import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CustomerService } from './customer.service';
import { Customer, CustomerInput, CustomerUpdates } from './customer.types';
import { JwtGuard } from '../guard/jwt.guard';

@Controller('v1/customer')
@ApiTags('customer')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  public async getCustomers(
    @Query('companyId') companyId: string
  ): Promise<Customer[]> {
    return this.customerService.getCustomers(companyId);
  }
  
  @Get(':id')
  public getCustomerById(
    @Param('id') id: string,
    @Query('companyId') companyId: string
  ): Promise<Customer> {
    return this.customerService.getCustomerById(id, companyId);
  }

  @Post()
  public createCustomer(
    @Req() request: any,
    @Body() body: CustomerInput
  ): Promise<boolean> {
    // @ts-ignore ignoring this next line so ts and swagger don't complain
    body.createdBy = request.user.userId;
    return this.customerService.createCustomer(body);
  }

  @Put(':id')
  public updateCustomer(
    @Param('id') id: string,
    @Req() request: any,
    @Body() body: CustomerUpdates
  ): Promise<boolean> {
    // @ts-ignore ignoring this next line so ts and swagger don't complain
    body.updatedBy = request.user.userId;
    // @ts-ignore ignoring this next line so ts and swagger don't complain
    body.updatedAt = new Date();
    return this.customerService.updateCustomer(
      id,
      body.companyId,
      body
    );
  }

  @Delete(':id')
  public deleteCustomer(
    @Param('id') id: string,
    @Req() request: any
  ): Promise<boolean> {
    const updatedBy = request.user.userId;
    return this.customerService.deleteCustomer(id, updatedBy);
  }
}
