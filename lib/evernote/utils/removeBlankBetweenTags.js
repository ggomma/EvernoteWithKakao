const removeBlankBetweenTags = (content) => content.replace(/> +/g, '>').replace(/ +<\//g, '</');

export default removeBlankBetweenTags;
