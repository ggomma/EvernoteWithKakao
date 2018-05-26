import removeBlankBetweenTags from './removeBlankBetweenTags';


const extractTodoPart = (content) => {
  let todoContent = removeBlankBetweenTags(content)
  let startTodo = '<div><b>To Do</b></div>';
  let startIndex = todoContent.indexOf(startTodo)
  if (startIndex === -1) {
    startTodo = '<div><span style="font-weight: bold;">To Do</span></div>';
    startIndex = todoContent.indexOf(startTodo);
  }
  const endTodo = '<hr />';
  const endIndex = todoContent.indexOf(endTodo);

  if (startIndex === -1 || endIndex === -1) return null;

  todoContent = todoContent.substring(startIndex);
  todoContent = todoContent.substring(0, endIndex + endTodo.length);
  return todoContent;
}
