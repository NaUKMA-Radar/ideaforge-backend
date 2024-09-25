import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateUserRoleDto implements Pick<Partial<UserRole>, 'name'> {
  @ApiProperty({
    description: 'The name of the user role',
    examples: ['founder', 'editor', 'menthor'],
    default: 'founder',
  })
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;
}
