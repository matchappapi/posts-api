import App from './App';
import PostsController from './posts/posts.controller';
 
const app = new App(
  [
    new PostsController(),
  ],
  3002,
  '0.0.0.0'
);
 
app.listen();