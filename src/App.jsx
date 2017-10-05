const contentNode = document.getElementById('contents');

const continents = ['Africa', 'America', 'Antarctica', 'Asia', 'Australia', 'Europe'];

const s_message = continents.map(c => `Let off some steam, ${c}!`).join(' ');

const component = <p className="arnie">{s_message}</p>; // A simple JSX component;

ReactDOM.render(component, contentNode); // Render the component inside the content Node
