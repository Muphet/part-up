/**
 * Board model
 *
 * @memberOf Boards
 */
var Board = function(document) {
    _.extend(this, document);
};

/**
 * Create the default set of lanes
 *
 * @memberOf Boards
 */
Board.prototype.createDefaultLaneSet = function() {
    var laneNames = ['Backlog', 'To do', 'Busy', 'Done'];
    var laneIds = [];
    var self = this;

    // Insert default set
    laneNames.forEach(function(laneName) {
        var laneId = Random.id();
        Lanes.insert({
            _id: laneId,
            activities: [],
            board_id: self._id,
            created_at: new Date(),
            name: laneName,
            updated_at: new Date()
        });
        laneIds.push(laneId);
    });

    // Store the lane IDs
    Boards.update(this._id, {$set: {lanes: laneIds}});
};

/**
 * Remove a specific lane from a board
 *
 * @memberOf Boards
 *
 */
Board.prototype.removeLane = function(laneId, laneActivities) {
    var lanes = this.lanes || [];
    var laneIndex = lanes.indexOf(laneId);
    if (laneIndex > -1) {
        lanes = lanes.splice(laneIndex, 1);
    }

    //@TODO set the activities of the removed lane to the first lane

    // Store the updated lane list
    Boards.update(this._id, {$set: {lanes: lanes}});
};

/**
 @namespace Boards
 */
Boards = new Mongo.Collection('boards', {
    transform: function(document) {
        return new Board(document);
    }
});