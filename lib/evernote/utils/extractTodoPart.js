import removeBlankBetweenTags from './removeBlankBetweenTags';


const extractTodoPart = (content) => {
  let todoContent = removeBlankBetweenTags(content)
  let startTodo = '<div><b>To Do</b></div>';
  let startIndex = todoContent.indexOf(startTodo)
  if (startIndex === -1) {
    startTodo = '<div><span style="font-weight: bold;">To Do</span></div>';
    startIndex = todoContent.indexOf(startTodo);
  }

  if (startIndex === -1) return null;
  todoContent = todoContent.substring(startIndex);

  if (endIndex === -1) return null;
  const endTodo = '<hr />';
  const endIndex = todoContent.indexOf(endTodo);
  todoContent = todoContent.substring(0, endIndex + endTodo.length);

  return todoContent;
}

export default extractTodoPart;
