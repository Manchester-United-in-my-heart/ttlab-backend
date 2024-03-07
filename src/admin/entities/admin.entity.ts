import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  mfa: boolean;

  @Prop({ required: true })
  secret: string;

  @Prop({ required: false })
  qrCodeImageURL?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
