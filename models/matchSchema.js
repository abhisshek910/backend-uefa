const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  teamName1: {
    type: String,
    required: true,
  },
  teamName2: {
    type: String,
    required: true,
  },
  playing11_first_team: [String],
  playing11_second_team: [String],
  substitutes_first_team: [String],
  substitutes_second_team: [String],
  referee: String,
  stadiumName: String,
  date: String,
  status: { type: String, enum: ["Played", "Ongoing", "Upcoming"] },
  goals_first_team: [
    {
      scorer: String,
      assistant: String,
      time: String,
    },
  ],
  fouls_first_team: [
    {
      commitedby: String,
      commitedon: String,
      time: String,
      referee: String, // card/no-card + free-kick/penalty
    },
  ],
  goals_second_team: [
    {
      scorer: String,
      assistant: String,
      time: String,
    },
  ],
  fouls_second_team: [
    {
      commitedby: String,
      commitedon: String,
      time: String,
      referee: String, // card/no-card + free-kick/penalty
    },
  ],
  substitutesUsed_first_team: [
    {
      inn: String,
      out: String,
      time: String,
    },
  ],
  substitutesUsed_second_team: [
    {
      inn: String,
      out: String,
      time: String,
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
