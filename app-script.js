function doPost(e) {

  var SHEET_NAME = "Raw Data";

  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret != "YOUR_SECRET") throw new Error("Invalid Secret: " + data.secret);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Sheet '" + SHEET_NAME + "' not found. Please create it.");
    }

    data.submission.forEach((submission) => {
      var newRow = [
        new Date(),                               // A. Timestamp
        data.scoutName,                           // B. Scout Name
        submission.team,                          // C. Team
        submission.match,                         // D. Match
        submission.alliance,                      // E. Alliance
        submission.startPos,                      // F. Starting Position

        // Autonomous
        submission.movedInAuto,                   // G. Moved (Auto)
        submission.intentionallyRemovedAlgaeAuto, // H. Removed Algae (Auto)
        submission.coralScoredL1Auto,             // I. Coral L1 (Auto)
        submission.coralScoredL2Auto,             // J. Coral L2 (Auto)
        submission.coralScoredL3Auto,             // K. Coral L3 (Auto)
        submission.coralScoredL4Auto,             // L. Coral L4 (Auto)
        submission.algaeScoredBargeAuto,          // M. Algae Barge (Auto)
        submission.algaeScoredProcessorAuto,      // N. Algae Processor (Auto)

        // Teleop
        submission.intentionallyRemovedAlgaeTeleop, // O. Removed Algae (Tele)
        submission.pickupLocationTeleop,          // P. Pickup Location (Tele)
        submission.coralScoredL1Tele,             // Q. Coral L1 (Tele)
        submission.coralScoredL2Tele,             // R. Coral L2 (Tele)
        submission.coralScoredL3Tele,             // S. Coral L3 (Tele)
        submission.coralScoredL4Tele,             // T. Coral L4 (Tele)
        submission.algaeScoredBargeTele,          // U. Algae Barge (Tele)
        submission.algaeScoredProcessorTele,      // V. Algae Processor (Tele)
        submission.playedDefenseTeleop,           // W. Played Defense
        submission.robotWasDefended,              // X. Was Defended

        // Endgame
        submission.endPositionEndgame,            // Y. End Position
        submission.died,                          // Z. Died

        // General
        submission.notes                          // AA. Notes
      ];

      sheet.appendRow(newRow);
    })

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    Logger.log(error);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}