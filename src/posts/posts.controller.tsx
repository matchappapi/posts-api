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
 
  private getAllPosts = async (req: RequestWithUser, res: Response) => {
    console.log("REQ POSTS ===>>> ", req);
    res.send(postsMock);
  }
 
  private createPost = async (req: RequestWithUser, res: Response) => {
    const postData: postDTO = req.body;
    if(req.user) {
      const createdPost:IPost = {
        ...postData,
        authorId: req.user.id,
      };
      postsMock.concat(createdPost);
      res.send(createdPost);
    }
  }

}
 
export default PostsController;