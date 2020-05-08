import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../user/user.types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {};

  // Validate that user has roles needed to activate this endpoint
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    // Check the role values that this endpoint was decorated with
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { // If no roles, we can assume thi
      console.error("No roles were specified in the guard for this endpoint.");
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.role);
  }
}

function matchRoles(roles: string[], userRole: string): boolean {
  if (roles.includes(Role.ANY)) {
    return true;
  }
  else if (roles.includes(userRole)) {
    return true;
  }

  return false; // Returning false throws a 403 forbidden error
}