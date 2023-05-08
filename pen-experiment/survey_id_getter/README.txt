This folder contains the item to hsot a server that collects survey IDs to be used to play the clicker game part of the project.
The server is hosted on Fly.io web service, here is a link to their website
https://fly.io/ In order to deploy this server you would need to create an account with fly.io.


Upon logging in you would want to click on a button that says launch app, you would then want to click on the box that states,
Nodejs or Deploy an ExpresJS Application. From there follow/ start at the part of the guide that states:
"Install Flyctl and Login" and follow the steps from there. When it states "To launch an app on fly, run flyctl launch in the directory with your source code",
this means in your computer terminal, navigate to the location where the folder holding this code is,
specifically you want to navigate to the "survey_id_getter" folder then continue with steps from there.


This program also uses supabase database. In order to use supabase you would need to create an account with supabase at their website found
here : https://supabase.com/docs . Then you would want to go to the dashboard and create a new project giving it any name you want.
After creating a project, you would want to create a new table in the table editor. Just click on create new table, give it any name you want, give
it any description you want and for the columns it is necessary to follow these steps for saving game information:

For the first column make the id with the type of int 8 and click the check box for primary. For the Second column, lable the title called : game_data and set the vlaue type to be
a json with no default value. Now click save. After creating the new table, in the survey_id_getter folder you want
to edit the .env folder and change the supabaseKey and supabaseURL to the ones found in the project settings tab.
the supabaseKey will be changed to the value found in the API tab under the settings of service_role. The supabaseURL
will be the value in the project_Url place. After you changed the supabaseKey and supabaseURL to your own supabase values, you would then go to server.js and whever it
supabase.from('') you would want to change the value in the .from() to the name of your table in your supabase databse.

Keep in mind the supabase aspect of the code msut be done before deploying it through the fly.io instructions.
If you do not want your fly server to be running all the time you can just "undeploy" it through the
terminal command : flyctl apps destroy "name of your app".

Another note to make your qualtrics survey connect to our game you would follow these instructions:
In your Qualtrics Survey, go to the survey flow. In there create an Embeded Data block at the top of your survey blocks.
Then you would create a filed called "Survey Id" and sets its value to ${rand://int/10000:99999} to create the survey Ids.
Then go back to survey builder and create a text and graphic block at the end of your survey. In that block
Make it say something like "Your Id for the game is ${e://Field/Survey%20Id}" where the
${e://Field/Survey%20Id} is the way to display the embeded data that is their ID.
Finally you would click on the question block, click on JavaScript and inside the
addOnReady function you would include this :
	const url = 'https://qualtrics-id-getter.fly.dev/surveyids'; // URL of your Express server API endpoint
    var currentID = parseInt("${e://Field/Survey%20Id}"); //This gets the embeded data from the survey

	const data = {number: currentID};
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error("Sending error is : " +error);
  });

This block of code above sends the survey id to the server that saves it to the supabase database. After this aspect has been complete you can now
deploy the server on fly.

