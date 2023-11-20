const express = require("express");
const router = express.Router();
const Match = require("../models/matchSchema");
const { default: mongoose } = require("mongoose");

// Get all matches
router.get("/matches", async (req, res) => {
  try {
    const matches = await Match.find();
    return res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new match
router.post("/matches", async (req, res) => {
  const match = new Match({
    teamName1: req.body.teamName1,
    teamName2: req.body.teamName2,
    playing11_first_team: req.body.playing11_first_team,
    playing11_second_team: req.body.playing11_second_team,
    substitutes_first_team: req.body.substitutes_first_team,
    substitutes_second_team: req.body.substitutes_second_team,
    referee: req.body.referee,
    stadiumName: req.body.stadiumName,
    date: req.body.date,
    status: req.body.status,
    goals_first_team: [],
    goals_second_team: [],
    fouls_first_team: [],
    fouls_second_team: [],
    substitutesUsed: [],
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/matches/goals", async (req, res) => {
  const { matchId, team, scorer, assistant, time } = req.body;

  try {
    object_id = new mongoose.Types.ObjectId(matchId);
    const match = await Match.findById(object_id);

    // Add a new goal to the goals array
    if (team === "first") {
      match.goals_first_team.push({ scorer, assistant, time });
      await match.save();
    } else {
      match.goals_second_team.push({ scorer, assistant, time });
      await match.save();
    }

    res.status(201).json({ message: "Goal added successfully", match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/matches/substitue", async (req, res) => {
  const { matchId, team, inn, out, time } = req.body;

  try {
    object_id = new mongoose.Types.ObjectId(matchId);
    const match = await Match.findById(object_id);

    // Add a new goal to the goals array
    if (team === "first") {
      match.substitutesUsed_first_team.push({ inn, out, time });
      await match.save();
    } else {
      match.substitutesUsed_second_team.push({ inn, out, time });
      await match.save();
    }

    res.status(201).json({ message: "Goal added successfully", match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/matches/foul", async (req, res) => {
  const { matchId, commitedby, commitedon, team, time, referee } = req.body;

  try {
    object_id = new mongoose.Types.ObjectId(matchId);
    const match = await Match.findById(object_id);

    // Add a new goal to the goals array
    if (team === "first") {
      match.fouls_first_team.push({ commitedby, commitedon, time, referee });
      await match.save();
    } else {
      match.fouls_second_team.push({ commitedon, commitedby, time, referee });
      await match.save();
    }

    res.status(201).json({ message: "Goal added successfully", match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
