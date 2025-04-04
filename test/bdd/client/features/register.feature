@register
Feature: Register
As a new user i would like to register to an account

Scenario: Success register
Given I'm on the registering page
And I enter the username "Badri"
And I enter the email register "Badri@gmail.com"
And I enter the password register "bald123"
When I click on the Sign Up button
Then I will be redirected to the sign in page
And The user is created 

Scenario Outline: Register with an empty input(UserName,Email,Password)
Given I'm on the registering page 
And I enter the username "<UserName>"
And I enter the email register "<Email>"
And I enter the password register "<Password>"
When I click on the Sign Up button
Then I remind in the Register page 
And I have the error message register "<MessageError>"

Examples:
|UserName|Email|Password|MessageError|
| |fori@gmail.com|Fori123|The username is required|
|Sara| |Sara123|The email is required|
|Sara|sara@gmail.com| |The password is required| 


Scenario: Register with existing email
Given I'm on the registering page
And I enter the username "David"
And I enter the email register "david+1743445360176@gmail.com"
And I enter the password register "david123"
When I click on the Sign Up button
Then I remind in the Register page 
And I have the error message register "User Already exists with the same email! Please try again"

Scenario: Register with wrong email format
Given I'm on the registering page
And I enter the username "David"
And I enter the email register "daviduser.com"
And I enter the password register "david123"
When I click on the Sign Up button
Then I remind in the Register page 
And I have the error message register "The email format is invalid"
