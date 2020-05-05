import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { User, UserInput, UserUpdates } from './user.types';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(
    @Query('companyId') companyId: string
  ): Promise<User[]> {
    return this.userService.getUsers(companyId);
  }
  
  @Get(':id')
  public getUser(
    @Param('id') id: string,
    @Query('companyId') companyId: string
  ): Promise<User> {
    return this.userService.getUserById(id, companyId);
  }

  @Post()
  public createUser(@Body() body: UserInput): Promise<boolean> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdates
  ): Promise<boolean> {
    return this.userService.updateUser(
      id,
      body.companyId,
      body
    );
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
