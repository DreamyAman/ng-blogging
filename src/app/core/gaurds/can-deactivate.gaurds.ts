import { CanDeactivateFn } from '@angular/router';
import { EditPost } from '../../features/my-posts/edit-post/edit-post';
import { NewPost } from '../../features/new-post/new-post';

export const unsavedChangesGuard: CanDeactivateFn<EditPost | NewPost> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};