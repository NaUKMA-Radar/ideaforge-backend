import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserRoleDto implements Pick<UserRole, 'name'> {
  @ApiProperty({
    description: 'The name of the user role',
    examples: ['founder', 'editor', 'menthor'],
    default: 'founder',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
