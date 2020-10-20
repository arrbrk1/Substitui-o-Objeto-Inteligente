#target photoshop
if (app.documents.length > 0) {
    var myDocument = app.activeDocument;
    var theLayer = myDocument.activeLayer;

    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 12;

    if (theLayer.kind != "LayerKind.SMARTOBJECT") {
        alert("A camada selecionada não é um objeto inteligente")
    } else {
        if ($.os.search(/windows/i) != -1) {
            var theFiles = File.openDialog("Selecine os arquivos", "*.psd;*.tif;*.jpg;*.png", true)
        } else {
            var theFiles = File.openDialog("Selecione os arquivos", getFiles, true)
        };
        if (theFiles) {
            for (var m = 0; m < theFiles.length; m++) {
                var png = theFiles[m].name.replace('.png', '')
                
                theLayer = replaceContents(theFiles[m], theLayer);
               
                myDocument.saveAs((new File("C:/Users/ariel.DESKTOP-6GEBQCM/Desktop/teste" + "/" + png + ".jpg")), jpgSaveOptions, true, Extension.UPPERCASE);
            }
        }
    }
};

function getFiles(theFile) {
    if (theFile.name.match(/\.(psd|tif|jpg|png)$/i) != null || theFile.constructor.name == "Folder") {
        return true
    };
};

function replaceContents(newFile, theSO) {
    app.activeDocument.activeLayer = theSO;

    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
};