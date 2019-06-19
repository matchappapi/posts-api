import { Router, Request, Response } from 'express';
import validationMiddleware from '../helpers/middlewares/validation-middleware';
import postDTO from './post.dto';
import IPost from './post.interface';
import postsMock from '../helpers/mocks/posts.mock';
import RequestWithUser from "../helpers/interfaces/requestWithUser.inteface";
import authMiddleware from "../helpers/middlewares/auth-middleware";
 
class PostsController {

  public path = '/posts';
  public router = Router();
  
  constructor() {
    this.intializeRoutes();
  }
 
  private intializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.getAllPosts)
    this.router.post(this.path, authMiddleware, validationMiddleware(postDTO), this.createPost);
    this.router.patch(this.path, authMiddleware, validationMiddleware(postDTO, true), this.createPost);
  }
 
  private getAllPosts = async (request: RequestWithUser, response: Response) => {
    response.send(postsMock);
  }
 
  private createPost = async (request: RequestWithUser, response: Response) => {
    const postData: postDTO = request.body;
    if(request.user) {
      const createdPost:IPost = {
        ...postData,
        authorId: request.user.id,
      };
      postsMock.concat(createdPost);
      response.send(createdPost);
    }
  }

}
 
export default PostsController;