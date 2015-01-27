# UI-Router Styles for AngularUI Router

**UI-Router Styles** is a module for assigning styles to views just like you assign a template to a view using by `templateUrl`. Wherever you can use `templateUrl`, you can also use `templateStyle`, so this means both examples will work:

```javascript
//Directly
$stateProvider.state('app', {
	templateUrl: 'app.html',
	templateStyle: 'app.css'
});

//Through views
$stateProvider.state('app.sub', {
	views: {
		'header': {
			templateUrl: 'sub/header.html',
			templateStyle: 'sub/header.css'		
		},
		'body': {
			templateUrl: 'sub/body.html',
			templateStyle: 'sub/body.css'		
		}
	}
});

```

In the example above, if you are at state `app.sub`, both `app` (`app.css`) and `app.sub` (`sub/header.css` and `sub/body.css`) will have their styles available. **UI-Router Styles** also respects targeting with `@` so you can replace a parent's style if you want to:

```javascript
//Make 'app.sub2' replace the style put by 'app'
$stateProvider.state('app.sub2', {
	views: {
		'@app': {
			templateStyle: 'app2.css'		
		}
	}
});

//Make 'app.sub.subber' replace a style put by 'app.sub'
$stateProvider.state('app.sub.subber', {
	views: {
		'header@app.sub': {
			templateStyle: 'app2.css'		
		}
	}
});

```

## Todo

- Write tests.
- Pick a proper license.
- Clean up the code.
- Maybe allow multiple styles with arrays. It feels like you wouldn't need this if you were following best practices.
- Maybe change the property to `styleUrl`. I would make it a breaking change if I decide to do so.
- Make use of [scoped stylesheets](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style#A_scoped_stylesheet) when it becomes a thing in production. The way this module was coded would make a lot of sense when that does happen.