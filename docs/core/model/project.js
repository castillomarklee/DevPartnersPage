'use strict'

app.factory('Project', [
  '$http', '$sanitize', '$filter',
  'ResponseValidator', 'AuthService', 'ContractType', 'Numbers', 'BuildTeamService',
  'API', 'CONST_COMMON', 'CONST_TEAM',
  function (
    $http, $sanitize, $filter,
    ResponseValidator, AuthService, ContractType, Numbers, BuildTeamService,
    API, CONST_COMMON, CONST_TEAM) {
    function Project(projectData) {
      if (projectData) {
        this.setData(projectData);
      }
    };

    Project.prototype = {
      setData: function(projectData) {
        angular.extend(this, projectData);
      },
      save: function() {
        this.projectName = $sanitize(this.projectName);
        this.description = $sanitize(this.description);
        if (this.startdate) this.startdate = $filter('date')(this.startdate, 'yyyy-MM-ddTHH:mm:ssZ');
        var project = this;
        if (project.discount > 0 && project.discountedBudget > 0) {
          project.budget = project.discountedBudget;
        }

        return AuthService.getAntiForgeryToken().then(function(response) {
          if (response && response.success) {
            return $http({
              method: 'POST',
              url: API.END_POINT + "/project",
              data: project
            }).then(function(response) {
              if (response && response.data) {
                return {success: true, data: response.data};
              } else if (ResponseValidator.isErrorResponseValid(response)) {
                return {success: false, errorMessage: CONST_COMMON}
              } else {
                return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
              }
            }, function(error) {
              $log.error(error);
              if (ResponseValidator.isErrorResponseValid(error)) {
                return {success: false, errorMessage: error.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
              }
            });
          } else {
            return {success: false, errorMessage: CONST_COMMON.SAVE_PROJECT_FAILED};
          }
        });
      },
      load: function(id) {
        var scope = this;
        return $http.get(API.END_POINT + "/project/" + id).then(function(response) {
          if (ResponseValidator.isValid(response) && response.data.data.project) {
            scope.setData(response.data.data.project);
            return {success: true};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isErrorResponseValid(errorResponse)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GENERIC_ERROR_MESSAGE};
          }
        });
      },
      loadTemplateByType: function(typeId) {
        var _this = this;
        return $http.get(API.END_POINT + "/project", {params: { typeId: typeId }}).then(function(response) {
          if (ResponseValidator.isValid(response)) {
            _this.projectName = response.data.data.projectName;
            _this.description = response.data.data.description;
            _this.timeFrameId = response.data.data.timeFrameId;

            if (_this.teams) {
              _this.teams.length = 0;
            } else {
              _this.teams = [];
            }

            BuildTeamService.addNewTeamToProject(_this, BuildTeamService.defaultTeam);
            BuildTeamService.mapTeamTemplate(_this.teams[0], response.data.data.projectTeamReq);

            return {success: true, data: response.data.data};
          } else if (ResponseValidator.isErrorResponseValid(response)) {
            return {success: false, errorMessage: response.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_PROJECT_TEMPLATE_FAILED};
          }
        }, function(errorResponse) {
          if (ResponseValidator.isErrorResponseValid(errorResponse)) {
            return {success: false, errorMessage: errorResponse.data.error.details};
          } else {
            return {success: false, errorMessage: CONST_COMMON.GET_PROJECT_TEMPLATE_FAILED};
          }
        });
      },
      updateAsQuote: function(referenceCode) {
        this.projectName = $sanitize(this.projectName);
        this.description = $sanitize(this.description);
        if (this.startdate) this.startdate = $filter('date')(this.startdate, 'yyyy-MM-ddTHH:mm:ssZ');
        var project = angular.copy(this);
        var parentProject = this;
        project.teams = null;
        return AuthService.getAntiForgeryToken().then(function(response) {
          if (response && response.success) {
            return $http.put(API.END_POINT + "/project/" + referenceCode, project).then(function(response) {
              if (ResponseValidator.isValid(response)) {
                parentProject.id = response.data.data.projectId;
                return {success: true};
              } else if (ResponseValidator.isErrorResponseValid(response)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_COMMON.UPDATE_QUOTE_PROJECT_FAILED};
              }
            }, function(errorResponse) {
              if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_COMMON.UPDATE_QUOTE_PROJECT_FAILED};
              }
            });
          } else {
            return {success: false, errorMessage: CONST_COMMON.UPDATE_QUOTE_PROJECT_FAILED};
          }
        });
      },
      approve: function(referenceCode) {
        var project = this;
        return AuthService.getAntiForgeryToken().then(function(response) {
          if (response && response.success) {
            return $http.put(API.END_POINT + "/Project/ApproveProject", {referenceCode: referenceCode}).then(function(response) {
              if (ResponseValidator.isValid(response)) {
                project.approved = true;
                return {success: true};
              } else if (ResponseValidator.isErrorResponseValid(response)) {
                return {success: false, errorMessage: response.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_COMMON.APPROVE_QUOTE_FAILED};
              }
            }, function(errorResponse) {
              if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return {success: false, errorMessage: errorResponse.data.error.details};
              } else {
                return {success: false, errorMessage: CONST_COMMON.APPROVE_QUOTE_FAILED};
              }
            });
          } else {
            return {success: false, errorMessage: CONST_COMMON.APPROVE_QUOTE_FAILED};
          }
        });
      },
      applyDiscount: function(discount, isPercentage, noOfDays) {
        if (isPercentage) {
          var noOfMonths = Math.ceil(noOfDays / CONST_TEAM.WORKING_DAYS_PER_MONTH);
          var costPerMonth = this.budget / noOfMonths;
          this.discount = costPerMonth * (discount/100);
        } else {
          this.discount = discount;
        }
        this.discountedBudget = this.budget - this.discount;
      },
      calculateEstimatedCostsByRole: function (role, selectedCurrency, selectedTimeframe, promoCode) {
        if (!role.totalCost) role.totalCost = 0;
        var estimatedCosts = this.budget ? this.budget - role.totalCost : 0;
        var selectedCurrencyExchangeRate = selectedCurrency ? selectedCurrency.rate : 1;
        var noOfDays = selectedTimeframe ? selectedTimeframe.noOfDays : 0;
        var totalHours = ContractType.isFulltime(role.contractTypeId) ? CONST_TEAM.HOURS_PER_DAY * noOfDays : CONST_TEAM.HOURS_PER_DAY_PART_TIME * noOfDays;

        role.totalCost = Numbers.round10(((role.rate ? role.rate : 0) * selectedCurrencyExchangeRate) * role.quantity * totalHours, -2);
        estimatedCosts += role.totalCost;
        this.budget = Numbers.round10(estimatedCosts, -2);
        this.applyDiscount(promoCode.discount, promoCode.isPercentage, noOfDays);

        return role.totalCost;
      },
      calculateEstimatedCostsByTeam: function (team, selectedCurrency, selectedTimeframe, promoCode) {
        var selectedCurrencyExchangeRate = selectedCurrency ? selectedCurrency.rate : 1;
        var noOfDays = selectedTimeframe ? selectedTimeframe.noOfDays : 0;
        var estimatedCosts = 0;
        for (var ri = 0; ri < team.roles.length; ri++) {
          var role = team.roles[ri];
          if (role.roleId !== -1) {
            var totalHours = ContractType.isFulltime(role.contractTypeId) ? CONST_TEAM.HOURS_PER_DAY * noOfDays : CONST_TEAM.HOURS_PER_DAY_PART_TIME * noOfDays;
            role.totalCost = Numbers.round10(((role.rate ? role.rate : 0) * selectedCurrencyExchangeRate) * role.quantity * totalHours, -2);
            estimatedCosts += role.totalCost;
          }
        }
        this.budget += estimatedCosts;
        this.applyDiscount(promoCode.discount, promoCode.isPercentage, noOfDays);
      },
      calculateEstimatedCosts: function (currencies, selectedCurrency, selectedTimeframe, promoCode) {
        if (currencies && this.teams) {
          var selectedCurrencyExchangeRate = selectedCurrency ? selectedCurrency.rate : 1;
          var noOfDays = selectedTimeframe ? selectedTimeframe.noOfDays : 0;
          var estimatedCosts = 0;
          for (var i = 0; i < this.teams.length; i++) {
            for (var ri = 0; ri < this.teams[i].roles.length; ri++) {
              var role = this.teams[i].roles[ri];
              if (role.roleId !== -1) {
                var totalHours = ContractType.isFulltime(role.contractTypeId) ? CONST_TEAM.HOURS_PER_DAY * noOfDays : CONST_TEAM.HOURS_PER_DAY_PART_TIME * noOfDays;
                role.totalCost = Numbers.round10(((role.rate ? role.rate : 0) * selectedCurrencyExchangeRate) * role.quantity * totalHours, -2);
                estimatedCosts += role.totalCost;
              }
            }
          }
          this.budget = Numbers.round10(estimatedCosts, -2);
          this.applyDiscount(promoCode.discount, promoCode.isPercentage, noOfDays);
        }
      }
    };

    return Project;
}]);