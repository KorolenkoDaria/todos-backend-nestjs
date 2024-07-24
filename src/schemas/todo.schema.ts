import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false })
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ required: true })
    addedDate: string;

    @Prop({ enum: [0, 1, 2, 3] })
    priority: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);