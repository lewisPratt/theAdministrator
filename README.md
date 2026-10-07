## Quick Rules
* there are thirteen districts. You are allowed to go to any district above the district that you work in, but you may not enter a district that is lower than your working district. 
* All citizens are allowed to be in District 5 : Housing.
* Citizens need a recreation Pass to spend time in District 8: Nightlife & Vice
* Carrying illegal items will negatively impact a citizens standing in the City. 
* minor infractions are dealt with at the administrators discretion. However, Citizens committing multiple infractions must be dealt with accordingly. 
* |move along|Record Suspicious Activity| Send for re-education|
## To do
* suspicious items being carried when the weather does not call for it. 
* weighting for age depending on where the person is. 
* personalize persons transcript text
* determine  location ident numbers and impact on weighting.
* time of day effects wehther some items are legal to carry (flashlight uring daytime is suspicious)


## Draft readme notes

User stories
* I would like to play a browser based game that is set in a futuristic world
* I would like to learn what this app does and how to play.
* I would like to learn about why this app was made and see other projects by the author
* I would like to contact the author of the app 
* I would like to see my progress in the game.
* I would like to remove data stored locally by the game


Notable features
* Use of React
* Use of Typescript
* focus trapping during tutorial (using inert attribute on root and createPortal to move tutorial/tooltip elements outside of root)
* React routing



## API integration and error handling - Dice Bear Avatar Generator
To add additional character and visual interest, an external API was used to provide unique avatars for the citizens encountered in the course of the game. 
[Dice Bear API](https://www.dicebear.com/) was used to easily generate random avatars to use within the case review section of the site. Each case that is reviwed as part of the gameplay loop, is linked to a fictional Citizen that has been encountered within the city. Adding an avatar to their case notes adds further depth and interest to the experience. 


There are a number of ways to integrate the Dice Bear avatar generation into a project, but i chose to utilize the HTTP api method due to its simplicity and ease of implementation, reducing the need to rely on additional packages in the project.

The Dice Bear API does not need authorization and returns a single item, a URL to the generated avatar image.

Relying on an external API however, means that there is a chance for calls to the API endpoint to fail, resulting in no avatar image being displayed. If this eventuality was not guarded against, it would result in unattractive missing image icons as well as alt text being visible within the UI, ruining the sense of immersion. As API endpoints can experience downtime or, in extreme cases, stop working all together, it is important to have contingencies to manage these eventualities if they arise. 

For this reason, there are 3 separate states that the avatar component can present in.
### No Error
If the Dice Bear endpoint is working as expected and returning and image that can be loaded within the `<img>` tag, the randomly generated avatar will display as desired. 

### API image not loading
If, for whatever reason, the image being provided by the Dice Bear endpoint is not loadable, or the endpoint url is incorrect, the `<img>` element `src` attribute will not be valid, producing an error that can be detected via Javascript and handled. 
Once detected, this error handler will set the image `src` attribute to the url of the default avatar file.

### API image not loading and default avatar not loading
In the unlikely occurence that both the API is unsuccessful at providing an image, as well as the default avatar image file being un-loadable, the error handler will further ensure that the avatar fails gracefully and set css attributes within the avatar component to maintain an acceptable fallback. 

The error handling that has been implemented in using this API should cover all possible points of failure, ensuring that the UX is not negatively impacted by potential issues encountered when relying on external API endpoints.

        <img
        className="avatar"
        src={transcript.avatar} 
        alt="Anonymized Citizen Avatar"
        data-default="" 
        
        onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "default-avatar.webp";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
            e.currentTarget.alt = "";
          }
        }}
      />
   

Above is the image element for a Citizen Avatar. There are a number of notable characteristics to highlight. 
1. the image `src` attribute is set to the Dice Bear image url from the current transcript being processed. 
2. the `data-default` attribute allows the error handler to mark this image as 'having been dealt with' after attempting to set the image `src` to the default avatar url. If this attribute is empty and the initial `src` cannot be loaded, the error handler will attempt to set the `src` to the default avatar url. If `data-default="set"` the error handler will not attempt to set the src again (this loop can occur if both the initial src and the backup, default avatar, are not loadable.)
3. `onError` triggers when an error occurs whilst this element tries to load the `src` it has been provided. 
4. The error handler will attempt to set the default avatar if the primary `src` is un-loadable. if both of these are unsuccessful, it will then apply css styling to the parent container of the image element, serving as a further fallback. Removing the `alt` attribute content removes the missing image icon, however the same information is given by the styles applied by the error handler. 

I created a default avatar image that was in line with the style of the avatars provided by Dice Bear. This was exported as a webp file to ensure small file size and good quality. 

ADD IMAGE

## Citizen Avatars
Each citizens avatar is generated randomly from the Dice Bear API, however, depending on the citizens gender, they access different endpoints. This is in order to generate a realistic representation of each citizen (generating female presenting avatars for females, males presenting avatars for males and either for synths.)
This is achieved within the person class when each citizens data is generated and their gender and behaviour are used to conditionally select which API endpoint their avatar is pulled from. 

    if (gender === "male") {
      if (behaviour.toLowerCase() === "compliant") {
        imageUrl = mensHappyUrl +uuidv4();
      } else if (behaviour.toLowerCase() === "non-compliant") {
        imageUrl = mensAngryUrl +uuidv4();
      } else {
        imageUrl = mensNeutralUrl +uuidv4();
      }
    }
each endpoint url has a seed value at the end, so appending `uuidv4()` to the url ensures that each avatar that is generated is a unique image. 

Filtering the citizens by gender and behaviour allows very customizable control over the appearance of the avatars generated. For instance, compliant male citizens have avatars that include smiling and overall happy expressions combined with male traits, whereas non-compliant male citizens only have avatars that include expressions of sadness or anger and male body traits. 
Removing or adding values in the url used to access the Dice Bear API allows the exclusion or addition of different expressions, hairstyles, head shapes etc. By utilizing this, the avatars that are produced are random, but they also contribute to the mechanics of the game as it is easy to now see whether a citizen in happy, sad or indifferent, which impacts on each citizens weighting. 

* Dynamic content
Throughout the app, I have used dynamic content to create immersion and ensure that the likelihood of receiving the same content is low on repeated playthroughs. Without the use of a back-end system, this has been achieved through constructing JavaScript objects that hold a large number of individual datasets
 that can then be randomly combined to create unique data sets. 
The most significant implementation of this concept is within the person class which constructs each citizen that the user assesses in the transcript review part of the app.
Individual objects that hold possible character names,occupations,carried items, interview locations and citizen flavour text (text within their transcript review that is generated to give an overall description of the citizen) are combined with a randomisation utility function to produce unique citizen interviews on each playthrough. 

* Random content generation
The use of randomisation has been a core concept within the design of the application to ensure that each playthrough feels unique and interesting to the user. 
For simple effects and components that are primarily cosmetic, a simple randomisation utility function such as the below has been used.
Function randomChance(threshold :number) : Boolean{
If(math.floor(math.random()*10)+1 < threshold){
Return true
} Else {
Return false
}
}

## Use of generative ai
As a means of efficiency, generative ai was used to populate js objects that hold large datasets used in content randomisation.
Prompts such as
"Generate a JavaScript array of 100 first names that would fit the theme of a retro futuristic city"
This would result in a dataset with 10000 unique combinations of first and last names.
Similar prompts were used to produce datasets for last names, occupations and locations.

LLMs we're also used as a means of troubleshooting and dissecting new coding concepts that were unfamiliar. 

No LLM generated code snippets or automated deployment models were utilized in the creation, implementation and completion of this project.


## Use of SVG graphics in city map component
Having had very little experience with svg graphics in the past, I was keen to ensure I expanded my knowledge in this area whilst completing this project. Whilst exploring reference images, I came across a number of UIs that featured a wireframe type city map as a focal point and felt this would be a great fit for my app. 
I created the initial wireframe city image in Affinity Designer, saving it as a png file, then created an SVG within my city map component, using the png as a backdrop to the subsequent SVG elements. Using transparent overlays (also created in Affinity Designer) I created 'hotspots' on top of the city image using the <path> element. These hotspots were then targeted by CSS:hover rules to interact with the user when they move their mouse over each hotspot on the map. These hotspots were also given a tab index value of 0 to allow keyboard users to acees this interactivity. Using the value of 0 assigns each element a tab index based on it's position within the DOM. 
Each hotspot was also assigned a tooltip that shows the name of the district it is highlighting. 
I wanted to make the city map feel active and alive, rather than a static image. To do this I decided to implement a scanning effect which sweeps a 'scan line' across the city and simulates scanning of the entire city. 
This was achieved by first drawing a path across my city image in Affinity Designer, then using the path coordinates within my svg to draw an invisible line across the centre (diagnonally) of my city image. I then created a clipPath that was applied to a duplicate of the original city image. This duplicate image has it's brightness adjusted via 
Filter:brightness(2)
And is offset slightly on the X and Y axis. A rectangle is then attached to the clipPath and using the animateMotion feature of the SVG, the rectangle is moved along the path drawn in Affinity Designer, showing as small slice of the duplicate image as it passes over the city. This simulates the scan line having an effect on the brightness and structure of city map image. 
I created text elements within the SVG parent and positioned these to align with the city map. The text elements provide further theming and world building character to the login page and, as they are not part of the city map image, their visual presentation is not impacted by the scan line effect. 
SVGs are self contained and scalable, meaning that the styling of all elements within the SVG are static between the desktop and mobile experience. Without using svg graphics, creating hotspots on top of an image and ensuring it had a consistent presentation both in mobile and desktop viewing, would be overly complicated, inconsistent and essentially ineffective. The combination of ensuring a properly scaled image as well as precisely placed hotspots, would be prohibitively complex and inaccurate due to changing margins and scaling. SVG graphics are the ideal solution for this feature, with the added benefit of providing self contained methods of element animation and styling 


## Use of React packages to enhance UX whilst improving maintainability. 
* lucide icons
* react tooltips
  
## Accessibility
Due to the theme of the app I have made, accessibility, for the most part, was being addressed throughout the project mainly due to my idea that the entire experience should be navigable and playable whilst solely using a keyboard. Many of the computers shown in reference images and films that I explored, such as bladerunner, often don't have a mouse or equivalent connected and much if not all of the navigation and interaction is achieved via the keyboard alone. 
This has meant that from the beginning of my project, I have focussed on ensuring all interactive elements are accessible to both mouse and keyboard, providing visual feedback when an interaction occurs.

## Images
All images have relevant and useful alt text in the event they either cannot be rendered or if a user is utilising a screen reader.
Images have been re-sized to both provide high quality visuals as well as ensure minimal impact on loading. Where image file size savings can be made by converting to webp, this has occurred, however not all images have seen significant file size changes so some remain in their original format (PNG). 



## Content hierarchy
The use of appropriate headings (H1,H2,H3 etc) helps to direct the flow of page content as well as highlight important information to the user. 
Semantic html has been used to divide each component into appropriate sections and organise elements logically and consistently. 

## Fonts
To align with the retro futuristic aesthetic of the game, I chose to utilise a pixelated font for the majority of the body content, combined with a stylised 'scan line effect' font for headings.

Body and paragraph elements utilised 
font-family:'Silkscreen',monospace

## Colour
The retro futuristic aesthetic I decided to utilise for this game allowed me the freedom to be  creative with the colour pallete throughout the app. When researching UI examples and references from films I noticed that most computer systems set in a dystopian, authoritative universe, tended towards a simple high contrast colour scheme that didn't distract from the content. Choosing two primary colours and allowing the use of slightly altered brightnesses of these two colours, ensured that there was a cohesive, thematic and consistent feel to the entire application. The colours I chose as my two primary colours enhance the overall theme of the app and contribute to achieving its purpose. 
My initial concept was to create a simulated computer terminal in a retro futuristic setting. Simulating a system that runs on a low tech computer terminal that only renders two colours (at varying degrees of brightness) helps to further enhance the theming of the app. 
Contrast however is important, particularly when committing to the use of only two colours. For this reason I used ..... To check the contrast value between my two primary colours and the result showed a pass with high contrast at .....
With the use of only two colours, it was also important to ensure that similar/identical elements that appear across different components are styled consistently to ensure that calls to action (CTA) and other important elements are easy to identify and navigate. 

Applying colour to external library components:
The React tooltips package was used to integrate tooltips into the app. As standard the default styling of these tooltips was not in line with the styling applied to the rest of the app. 
In order to style tooltips successfully, the documentation advised that tooltips must have a higher level of specificity in order to successfully apply CSS styling rules. For this reason, all tooltips were given a class of 'custom-tooltip' and placed within the 'main-content' element to ensure that they can be targeted with a higher specificity than their default styling rules. 
#main-content .custom-tooltip{
 CSS rules to apply to tooltips.
}

Lucide icons package
Icons used from the lucide icons package can easily be styled by applying a custom class to them, effecting their colour, size, fill etc.
This package was used to provide icons for CTAs, carriable items and faux loading screens.

## Loading screens
At a number of transition points( moving from one route to another) faux loading screens have been implemented to simulate the use of a desktop terminal. These screens aren't necessary for the function of the application, however they do add to the theming, pacing and world building. They have been achieved through the use of state within the relevant pages and settimeout to change state after a set period of time (2 seconds). This timer, through repeated play tests, feels reasonable in achieving the goal of the loading screen, but does not feel like it slows the pacing detrimentallly. 

## CSS
CSS files were created for each component that represents a 'page' within the app. Only CSS rules that pertain to that component are imported into the component. Some CSS rules are global so have been placed in app.css and imported where necessary. 

## Vite
Vite was used to initially scaffold the project as well as build the user facing content once ready for deployment. 

## Flex box 
Flex box has been used throughout the app to create a responsive and mobile first layout, ensuring content is adequately spaced and aligned for viewing on mobile and desktop. 

## File structure
Due to the nature of developing a React app (often creating large numbers of small self contained components) it has been important to ensure the file structure throughout development has been manageable. Once the project got to a point of over 30 individual components of varying sizes, I decided to prioritise future legibility of the file structure and divide the components into meaningful sub directories that would support easy access during ongoing development. 

## Local storage
Local storage has been used as a means of persisting users game data between sessions. This data stores information on their administrators name, cases reviewed, credits earned and unlocks purchased. As this data is being stored locally, when the user first visits the app, they will be asked if they consent to this process. If they do not, the only effect this will have on the game is data persistence between play sessions (closing or refreshing the tab the game is being played in will reset the game state to being logged out with no saved progress)
Players are able to delete local storage related to the app easily through the profile route. They can also have multiple data sets stored locally by using a different administrator name when logging in.
Local storage has been used in place of a full backend system (database) to allow game progress to persist between gaming sessions. This has been implemented with the full knowledge that this data stored locally is easily located and changed by the user, effectively allowing them to cheat the game. For this reason, the app has been developed from the start as a casual gaming experience for players t