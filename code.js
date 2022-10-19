const kPackageID="rename.tracks";

function userFunction()
{
	this.interfaces = [Host.Interfaces.IEditTask, Host.Interfaces.IParamObserver]

	this.prepareEdit = function (context)
	{
		// create a parameter list for gui objects
		this.paramList = Host.Classes.createInstance("CCL:ParamList")
		this.paramList.controller = this;

		this.sourceBox = this.paramList.addString("sourceBox");
        this.replaceBox = this.paramList.addString("replaceBox");

		// open the GUI dialog
		Host.GUI.runDialog(Host.GUI.Themes.getTheme(kPackageID),"UserForm", this)

		return Host.Results.kResultOk;
	}

	// -----------------------------------------------------------------

	this.performEdit = function (context)
	{
		var trackList = context.mainTrackList;

        // if ## only strip numbers from track names
        if (this.sourceBox.string.trim() == "##")
        {   
            for (var i = 0; i < trackList.numTracks; i++) 
            {
                var track = trackList.getTrack(i);
                var newname = track.name.toString().replace(/[0-9]/g, '')
                var finalname = newname.replace("-", "").trim();
                context.functions.renameEvent(track, finalname);
            }
            return;
        }

        // iterate tracks and perform text replace
        for (i = 0; i < trackList.numTracks; i++)
        {  
            var track = trackList.getTrack(i);
            
            if (track.name == null || track.name == undefined) { continue; }
            var name = track.name.toString();

            var newname = name.replace(this.sourceBox.string, this.replaceBox.string);
            context.functions.renameEvent(track, newname.toString());
        }
		return Host.Results.kResultOk;
	}
}

// ---------------------------------------------------------------------

// entry function
function createInstance()
{
	return new userFunction();
}