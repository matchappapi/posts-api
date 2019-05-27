import uuidv1 from 'uuid/v1';
import { IsString } from 'class-validator';

export default class CreatePostDTO {

    @IsString()
    public id: string;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public authorId: string;

    constructor (title:string, description: string, authorId: string) {
        this.id = uuidv1();
        this.title = title;
        this.description = description;
        this.authorId = authorId;
    }

}