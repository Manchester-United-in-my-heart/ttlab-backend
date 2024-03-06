import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  image: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
