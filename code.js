const kPackageID="rename.tracks";

function userFunction()
{
	this.interfaces = [Host.Interfaces.IEditTask, Host.Interfaces.IParamObserver]

	this.prepareEdit = function (context)
	{
		var parameters = context.parameters;

		this.sourceBox = parameters.addString("sourceBox");
        this.replaceBox = parameters.addString("replaceBox");

		// open the GUI dialog
        return context.runDialog ("UserForm", kPackageID);
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

    // -----------------------------------------
	this.paramChanged = function (param)
	{

    }	
}

// ---------------------------------------------------------------------

// entry function
function createInstance()
{
	return new userFunction();
}