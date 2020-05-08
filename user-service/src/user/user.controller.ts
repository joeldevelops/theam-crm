import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User, UserInput, UserUpdates, UserRoleUpdates, Role } from './user.types';
import { Roles } from '../decorator/roles.decorator';
import { RoleGuard } from '../guard/role.guard';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('v1/user')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiTags('user')
  @Roles(Role.ADMIN, Role.SERVICE)
  public async getUsers(
    @Query('companyId') companyId: string
  ): Promise<User[]> {
    return this.userService.getUsers(companyId);
  }
  
  @Get(':id')
  @ApiTags('user')
  @Roles(Role.ADMIN, Role.SERVICE)
  public getUserById(
    @Param('id') id: string,
    @Query('companyId') companyId: string
  ): Promise<User> {
    return this.userService.getUserById(id, companyId);
  }

  @Post()
  @ApiTags('user')
  @Roles(Role.ADMIN, Role.SERVICE)
  public createUser(@Body() body: UserInput): Promise<boolean> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  @ApiTags('user')
  @Roles(Role.ADMIN, Role.SERVICE)
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
  @ApiTags('user')
  @Roles(Role.ADMIN, Role.SERVICE)
  public deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  @Put(':id/role')
  @ApiTags('role')
  @Roles(Role.ADMIN, Role.SERVICE)
  public updateUserRole(
    @Param('id') id: string,
    @Body() body: UserRoleUpdates
  ): Promise<boolean> {
    return this.userService.updateUserPermissions(id, body);
  }
}
