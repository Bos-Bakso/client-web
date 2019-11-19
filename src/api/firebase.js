const db = require("@/config/firebase")

const TriggerNotif = db.collection("triggerNotif")
const TriggerRank = db.collection("triggerRank")

module.exports = {
  TriggerNotif,
  TriggerRank
}