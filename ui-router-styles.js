angular.module('ui.router.styles', ['ui.router'])
	.directive('head', [
		'$rootScope',
		'$state',
		'$compile',
		'$interpolate',
		function ($rootScope, $state, $compile, $interpolate) {

			var getStyles = function getStyles (state) {

				var states = {};

				//Check state for styles
				while (state.name!=='') {
					var parent = $state.get('^', state);

					//Initiate our view list
					if (!states[parent.name])
						states[parent.name] = {};

					//Check the templateStyle
					if (state.templateStyle)
						if (!states[parent.name][''])
							states[parent.name][''] = state.templateStyle;

					//Check views
					if (state.views)
						_.forEach(state.views, function (view, key) {
							//Check if we have a style
							if (!view.templateStyle)
								return;

							//Check if we are targeting some parent
							if ((key = key.split('@'))[1]) {
								//Check if we have styles for that parent
								if (!states[key[1]])
									states[key[1]] = {};

								//Place the style on some parent's view
								if (!states[key[1]][key[0]])
									states[key[1]][key[0]] = view.templateStyle;

								return;
							}

							//Place the style on our parent's view
							states[parent.name][key[0]] = view.templateStyle;

						});

					//Continue with the parent
					state = parent;
				}

				//Flatten the list
				var flat = [];
				_.forEach(states, function (views) {
					_.forEach(views, function (style) {
						if (!_.includes(flat, style))
							flat.push(style);
					});
				});

				//Reverse it so we have a proper hierarchy
				flat.reverse();

				return flat;

			};

			return {
				restrict: 'E',
				link: function (scope, elem) {

					scope.templateStyles = [];

					var start = $interpolate.startSymbol(),
					var end = $interpolate.endSymbol();

					var html = '<link rel="stylesheet" ng-repeat="style in templateStyles" ng-href="'+start+'style'+end+'">';
					
					elem.append($compile(html)(scope));

					// Get the parent state
					/*var $$parentState = function(state) {

						//Check if state has a parent property
						if (state.parent)

						// Check if state has explicit parent OR we try guess parent from its name
						var name = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];

						// If we were able to figure out parent name then get this state
						return name && $state.get(name);

					};*/

					$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

						scope.templateStyles = getStyles(toState);

					});

				}
			};

		}
	]);