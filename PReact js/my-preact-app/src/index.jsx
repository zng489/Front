import { h, render } from 'https://esm.sh/preact';


// const App = <h1>Hello Worldddddddddddddddddddddd!</h1>;
// JavasScript
const Index_Variable = h('h1', null, 'Index!!!');

// Inject our app into the DOM
render(Index_Variable, document.getElementById('index'));

