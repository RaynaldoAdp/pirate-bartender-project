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


//Questions
var questions = function(questionInput){
	this.question = questionInput;
}

questions.prototype.render = function(){
	var questionToRender = $(questionTemplate);
	questionToRender.find('.js-questionLabel').text((this.question));
	questionToRender.find('select').attr('id', indexId);
	indexId += 1;
	return questionToRender;
}

function renderQuestionToDom(){
	$('.js-form').append(new questions('Do ye like yer drinks strong?').render());
	$('.js-form').append(new questions('Do ye like it with a salty tang?').render());
	$('.js-form').append(new questions('Are ye a lubber who likes it bitter?').render());
	$('.js-form').append(new questions('Would ye like a bit of sweetness with yer poison?').render());
	$('.js-form').append(new questions('Are ye one for a fruity finish?').render());
	$('.js-form').append('<input type="submit"></input>');
}

//Ingredients
var ingredients = function(ingredientInput){
	this.ingredient = ingredientInput;
}

ingredients.prototype.takeRandomIngredient = function(){
	var randomIndex = Math.floor(Math.random() * 3); 
	var random = this.ingredient[randomIndex];
	return random;
}

//Pantry
var pantry = {
	strong: new ingredients([' Glug of rum', ' slug of whisky', ' splash of gin']),
	salty: new ingredients([' Olive on a stick', ' salt-dusted rim', ' rasher of bacon']),
	bitter: new ingredients([' Shake of bitters', ' splash of tonic', ' twist of lemon peel']),
	sweet: new ingredients([' Sugar cube', ' spoonful of honey', ' splash of cola']),
	fruity: new ingredients([' Slice of orange', ' dash of cassis', ' cherry on top'])
}

//Bartender
var bartender = function(choice){	
	this.strong = choice[0];
	this.salty = choice[1];
	this.bitter = choice[2];
	this.sweet = choice[3];
	this.fruity = choice[4];
}

bartender.prototype.createDrink = function(){
	var drinkRendered = $(drinksTemplate);
	var keys = Object.keys(this);
	var drink = [];
	for(i=0; i<keys.length ; i++){
		if(this[keys[i]] === 'Yes'){
			drink.push(pantry[keys[i]].takeRandomIngredient());
		}
	}
	drinkRendered.find('h3').text((drink));
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
		var captainJack = new bartender(updatePreferences());
		captainJack.createDrink();
	})
}

//Run the functions
$(document).ready(function(){
	renderQuestionToDom();
	submitForm();
})




