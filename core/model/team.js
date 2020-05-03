'use strict'

app.factory('Team', [function() {
  function Team(teamData) {
    if (teamData) {
      this.setData(teamData);
    }
  };

  Team.prototype = {
    setData: function(teamData) {      
      angular.extend(this, teamData);
    }
  };

  return Team;
}]);