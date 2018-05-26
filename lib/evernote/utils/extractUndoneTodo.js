const extractUndoneTodo = (todoPart) => todoPart.replace(/<li>(<div>)?<en-todo checked="true" +\/>.+?(<\/div>)?<\/li>/gm, '');

export default extractUndoneTodo;
