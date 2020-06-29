# The new WIP dashboard

## What is this?
This new dashboard is designed to replace the old dashboard currently available for A Township Tale.

The new dashboard is currently live at http://dash.townshiptale.com

The old dashboard is still live at http://dashboard.townshiptale.com

Eventually, both URL's will point to this new dashboard.

The old dashboard still maintains some functionality that this new one does not, and until the same functionality is available in this project, the old one will still exist.
The code for the old project is available at https://github.com/alta-vr/ATT-Dashboard

## How does it work?
The dashboard is module-based, allowing for each user to set up a custom dashboard to their liking.
Modules can access information about the group, the server, and (if the logged in user has permission), connect directly to the server to subscribe to events, and execute commands.

This allows for simple modules such as live user lists, command inputs, way up to extremely advanced modules utilizing the full power of A Township Tale's command/subscription system.

## Can I contribute?
Absolutely! Pull requests can be made to contribute towards the project. Be sure to contact Joel (via Discord or otherwise) to verify the validity of a feature before embarking upon it. Of course, even if the feature is not valid for the official version of the dashboard, you can run your own version of the dashboard, with any modules you'd like.

## How do I get the project running on my PC?
You'll need to have git and nodejs installed if you do not already.

### Downloading/Installing
Open cmd in your desired directory (you can navigate there in windows explorer, then type `cmd` in the top bar)

Then run the following commands:
`git clone https://github.com/alta-vr/Alta-Dashboard`
`cd Alta-Dashboard`
`npm i`

###Running
Open cmd within the project folder, or open the project in VS Code and run the following in the terminal.
`npm run start:dev`

This will open a hot-loading dev server (most likely at localhost:3000).
You will be able to modify code, save it, and have the website automatically update.

## How to add a module
Within the folder "dashboardModules" you will find the existing modules.
For a barebones module, you can duplicate the "Template.jsx" file.
Of course, you can look at any existing modules for examples of how to do various things.

Be sure to change 'moduleName', otherwise it'll maintain the name 'Template' (or whatever you duplicated).

Finally, to ensure it shows up in the list of available modules, it must be added to the module map.
To do this, open the file at "dashboardModules/core/moduleMap.jsx".
This should be fairly straightforward (just copy the way other modules have done it).

Add to the top section: `import * as <Name> from '../<Name>`;
Add within the export: `<Name>,`

To test your module, simply go to a dashboard and select your newly created module from the dropdown.

## License
This project is under the MIT license (see the license file).
This license only applies to the dashboard code, not any image files included within the project.
