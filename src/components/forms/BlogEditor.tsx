import React from 'react';
import { usePrompt } from '../../hooks/usePrompt';
import Blog from '../Blog';

interface BlogEditorProps {
  blog: BlogData;
}

// How to handle "Saved" status state? ie--are there any unsaved changes?
// react-router's Prompt/usePrompt were pulled from current release :(
// In lieu of that, a custom "useBeforeUnload" hook might be applicable
// https://codesandbox.io/s/pwrux

// ...Or follow the react-router dev's suggestions, and find non-blocking solution
// (ie, just save the draft in state, maybe displaying that there are unsaved changes)
// but tbh, I think blocking is preferable UX in many cases. That draft state is
// likely going to be considered ephemeral by the user, so a simple warning to
// deal with it in the moment seems like a perfectly acceptable solution.
export default function BlogEditor({ blog }: BlogEditorProps) {
  usePrompt('Are you sure?', true);
  return <Blog data={blog} />;
}
