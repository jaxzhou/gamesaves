import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/auth/auth.guard';

@Controller('storage')
@ApiTags("Storage")
@UseGuards(AuthGuard)
export class StorageController {}
