import App from './App';
import PostsController from './posts/posts.controller';
 
const app = new App(
  [
    new PostsController(),
  ],
  4002,
);
 
app.listen();