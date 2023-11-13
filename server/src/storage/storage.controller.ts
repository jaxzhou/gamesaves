import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('storage')
@ApiTags("Storage")
export class StorageController {}
