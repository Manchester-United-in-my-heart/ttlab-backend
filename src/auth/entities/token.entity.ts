import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  refresh_token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
