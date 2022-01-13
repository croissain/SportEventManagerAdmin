
const ScheduleServices = require('../services/ScheduleService');
const TeamServices = require('../services/TeamService');
const MatchService = require('../services/MatchService');

const location = 'SD01';
class ScheduleController {
    showSchedule = async (req, res, next) => {
        let matches = await ScheduleServices.findAllMatch();

        res.render('schedule', {
            matches
        });
    }

    scheduleGenerate = async (req, res, next) => {
        const tournamentId = "GD007";
        const teams = await TeamServices.findAndCountAllTeamsByTournamentId(tournamentId);
        // console.log(teams.rows);

        if (teams.count % 2 === 0) {
            let splitAt = function (i, xs) {
                let a = xs.slice(0, i);
                let b = xs.slice(i, xs.length);
                return [a, b];
            };

            let shuffle = function (xs) {
                return xs.slice(0).sort(function () {
                    return 0.5 - Math.random();
                });
            };

            let zip = function (xs) {
                return xs[0].map(function (_, i) {
                    return xs.map(function (x) { return x[i]; })
                });
            };

            let result = zip(splitAt(teams.rows.length / 2, shuffle(teams.rows)));

            let count = 0;
            let currDate = new Date();

            result.forEach(async (match) => {
                try {
                    let team1_id = match[0].MaDB;
                    let team2_id = match[1].MaDB;

                    // let match_id_count = parseInt(lastestMatch.slice(2)) + 1;
                    count++;
                    let match_id = "TD" + count;

                    let start_time = "7:45 AM";
                    currDate.setDate(currDate.getDate() + 1);
                    let month = currDate.getUTCMonth() + 1;
                    let day = currDate.getUTCDate();
                    let year = currDate.getUTCFullYear();

                    let start_date = year + "-" + month + "-" + day;
                    console.log(match_id, team1_id, team2_id, start_time, start_date);

                    await MatchService.createMatch(match_id, team1_id, team2_id, location, start_time, start_date);
                } catch (err) {
                    console.log(err)
                }
            })
        }
        else if (teams.count % 2 !== 0) {
            let pairs = function (arr) {
                let res = [];
                let l = arr.length;
                for (let i = 0; i < l; ++i)
                    for (let j = i + 1; j < l; ++j)
                        res.push([arr[i], arr[j]]);
                return res;
            }

            let result = pairs(teams.rows);

            let count = 0;
            let currDate = new Date();

            result.forEach(async (match) => {
                try {
                    let team1_id = match[0].MaDB;
                    let team2_id = match[1].MaDB;

                    // let match_id_count = parseInt(lastestMatch.slice(2)) + 1;
                    count++;
                    let match_id = "TD" + count;

                    let start_time = "7:45 AM";
                    currDate.setDate(currDate.getDate() + 1);
                    let month = currDate.getUTCMonth() + 1;
                    let day = currDate.getUTCDate();
                    let year = currDate.getUTCFullYear();

                    let start_date = year + "-" + month + "-" + day;
                    console.log(match_id, team1_id, team2_id, start_time, start_date);

                    await MatchService.createMatch(match_id, team1_id, team2_id, location, start_time, start_date);
                } catch (err) {
                    console.log(err)
                }
            })
        }

        // let matches = await ResultServices.findAllMatch();

        res.redirect('back');
    }

    scheduleEdit = async (req, res, next) => {
        let match_id = req.params.id;
        let match = await ScheduleServices.findMatchById(match_id);

        let teams = await TeamServices.findAllTeams();

        res.render('schedule-edit', {
            match,
            teams
        });
    }
}

module.exports = new ScheduleController;