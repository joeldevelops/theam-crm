import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { User, UserInput, UserUpdates, UserPermissionUpdates } from './user.types';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @Get()
  public async getUsers(
    @Query('companyId') companyId: string
  ): Promise<User[]> {
    return this.userService.getUsers(companyId);
  }
  
  @ApiTags('user')
  @Get(':id')
  public getUserById(
    @Param('id') id: string,
    @Query('companyId') companyId: string
  ): Promise<User> {
    return this.userService.getUserById(id, companyId);
  }

  @ApiTags('user')
  @Post()
  public createUser(@Body() body: UserInput): Promise<boolean> {
    return this.userService.createUser(body);
  }

  @ApiTags('user')
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

  @ApiTags('user')
  @Delete(':id')
  public deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  @ApiTags('permission')
  @Put(':id/permissions')
  public updateUserPermissions(
    @Param('id') id: string,
    @Body() body: UserPermissionUpdates
  ): Promise<boolean> {
    return this.userService.updateUserPermissions(id, body);
  }
}
