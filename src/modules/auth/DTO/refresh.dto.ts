import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class RefreshDto implements Pick<UserEntity, 'refreshToken'> {
  @ApiProperty({
    description: 'The refresh token of the user',
    examples: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSWd1bW5vdiIsImlhdCI6MTUxNjIzOTAyMn0.fhRab81aDGeIyrQPsQDk5-EoFmX93_ImE4szjSFZE08',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhlbGVuIFNtaXRoIiwiaWF0IjoxNTE2MjM5MDIyfQ.gpUgoLzilOQcnkgQZIZRd1TGlcT6_A0RMz30OwB8z4A',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    ],
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSWd1bW5vdiIsImlhdCI6MTUxNjIzOTAyMn0.fhRab81aDGeIyrQPsQDk5-EoFmX93_ImE4szjSFZE08',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  refreshToken: string;
}
