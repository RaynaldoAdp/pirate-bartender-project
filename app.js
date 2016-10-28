//Global Templates and variables
var preferences = [];

var indexId = 0;

var questionTemplate = '<div>'+
						'<label class="js-questionLabel"></label>'+
		 					'<select class="js-choice" id="">' +
								'<option value="Yes"> Yes </option>' +
								'<option value="No"> No </option>' +
							'</select>' +
						'</div>';

var drinksTemplate = '<div><h3></h3></div>';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//Questions
var Questions = function(questionInput){
	this.question = questionInput;
}

Questions.prototype.render = function(){
	var questionToRender = $(questionTemplate);
	questionToRender.find('.js-questionLabel').text((this.question));
	questionToRender.find('select').attr('id', indexId);
	indexId += 1;
	return questionToRender;
}

function renderQuestionToDom(){
	var $form = $('.js-form');
	$form.append(new Questions('Do ye like yer drinks strong?').render());
	$form.append(new Questions('Do ye like it with a salty tang?').render());
	$form.append(new Questions('Are ye a lubber who likes it bitter?').render());
	$form.append(new Questions('Would ye like a bit of sweetness with yer poison?').render());
	$form.append(new Questions('Are ye one for a fruity finish?').render());
	$form.append('<input type="submit"></input>');
}

//Ingredients
var Ingredients = function(ingredientInput){
	this.ingredient = ingredientInput;
}

Ingredients.prototype.takeRandomIngredient = function(){
	var randomIndex = Math.floor(Math.random() * 3); 
	var random = this.ingredient[randomIndex];
	return random;
}

//Pantry
var pantry = {
	strong: new Ingredients(['Glug of rum', 'slug of whisky', 'splash of gin']),
	salty: new Ingredients(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']),
	bitter: new Ingredients(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']),
	sweet: new Ingredients(['Sugar cube', 'spoonful of honey', 'splash of cola']),
	fruity: new Ingredients(['Slice of orange', 'dash of cassis', 'cherry on top'])
}

//Bartender
var Bartender = function(preferencesInput){	
	this.order = preferencesInput;
}

Bartender.prototype.createDrink = function(){
	var drink = [];
	for(i=0; i<this.order.length ; i++){
		if(this.order[i] === 'Yes'){
			drink.push(pantry[Object.keys(pantry)[i]].takeRandomIngredient());
		}
	}
	return drink;
}

var Drink = function(drinkCreated){
	this.drink = drinkCreated;
}

Drink.prototype.serve = function(){
	var drinkRendered = $(drinksTemplate);
	var drinkServed = "Old Sea Dog with " + replaceAll(this.drink.toString(), ",", " & ");
	drinkRendered.find('h3').text(drinkServed);
	$('.js-drinks').append(drinkRendered);
}


function updatePreferences(){
	var preferences = [];
	for(i=0; i<5 ; i++){
		preferences.push($('#' + i).val())	
	}
	return preferences;
}

//Event Listener
function submitForm(){
	$('.js-form').submit(function(event){
		event.preventDefault();
		var captainJack = new Bartender(updatePreferences());
		var drinkServed = new Drink(captainJack.createDrink());
		drinkServed.serve();
	})
}

//Run the functions
$(document).ready(function(){
	renderQuestionToDom();
	submitForm();
})




