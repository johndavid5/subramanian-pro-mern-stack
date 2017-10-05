var contentNode = document.getElementById('contents');

var sArnieLine = "And do me a favor...don't disturb my friend...he's dead tired...";
//var sArnieLine = "Let off some steam, Bennett!";
//var sArnieLine = "I'll be back, Bennett!";

//var component = <h1 className="arnie">Let off some steam, Bennett!</h1>; // A simple JSX component;
var component = <h1 className="arnie">{sArnieLine}</h1>; // A simple JSX component;
// Or, without using JSX...
//var component = React.createElement('h1', {style: {fontStyle: "italic"}, className: "arnie"}, sArnieLine);

ReactDOM.render(component, contentNode); // Render the component inside the content Node
