import { ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '@app/shared/dto/base-output.dto';

@ObjectType()
export class DeleteProductOutput extends BaseOutput {}
