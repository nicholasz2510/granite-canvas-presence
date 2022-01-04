const presence = new Presence({
    clientId: "781431986677612554" //The client ID of the Application created at https://discordapp.com/developers/applications
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    var presenceData: PresenceData = {
        largeImageKey: "canvas-logo",
        startTimestamp: browsingStamp
    };

    if (document.location.hostname == 'graniteschools.instructure.com') {
        if(document.title.startsWith('Survey: ')) {
            presenceData.details = 'Taking a survey:'
            presenceData.state = document.title.replace('Survey: ', '');
        } else if(document.location.pathname.startsWith('/calendar')) {
            presenceData.details = 'Looking at the calendar';
        } else if(document.location.pathname.endsWith('/assignments')) {
            presenceData.details = 'Viewing assignments for:'
            presenceData.state = document.title.replace('Assignments: ', '');
        } else if(document.location.pathname.endsWith('/syllabus')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            presenceData.details = 'Viewing syllabus for:'
            presenceData.state = course;
        } else if(document.location.pathname.endsWith('/grades')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            presenceData.details = 'Viewing grades for:'
            presenceData.state = course;
        } else if(document.location.pathname.includes('/assignments/')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            const title = document.querySelector(".assignment-title .title").textContent.trim();
            presenceData.details = `Viewing ${course} assignment:`
            presenceData.state = title;
        } else if(document.location.pathname.endsWith('/modules')) {
            presenceData.details = 'Viewing modules for:'
            presenceData.state = document.title.replace('Course Modules: ', '');
        } else if(document.location.pathname.includes('/files/')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            const title = document.querySelector("#main #content h2").textContent.trim();
            presenceData.details = `Viewing ${course} file:`
            presenceData.state = title;
        } else if(document.location.pathname.endsWith('/announcements')) {
            presenceData.details = 'Viewing announcements:'
            presenceData.state = document.title.replace('Announcements: ', '');
        } else if(document.location.pathname.includes('/external_tools/')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            presenceData.details = `Viewing ${course} page:`
            presenceData.state = document.title;
        } else if(document.location.pathname.includes('/discussion_topics/')) {
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            const title = document.querySelector(".discussion-title").textContent.trim();
            presenceData.details = `Reading ${course} topic:`
            presenceData.state = title;
        } else if(document.location.pathname.startsWith('/courses/')) {
            presenceData.details = 'Looking at course:'
            const course = document.querySelector('#breadcrumbs li:nth-child(2)').textContent;
            presenceData.state = course;
        } else if(document.location.pathname.startsWith('/conversations')) {
            presenceData.details = 'Looking at the inbox'
        } else if(document.title == 'Dashboard') {
            presenceData.details = 'Looking at the dashboard'
        } else {
            presenceData.details = 'Viewing a page:'
            presenceData.state = document.title;
        }
    }

    if (presenceData.details == null) {
        //This will fire if you do not set presence details
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});