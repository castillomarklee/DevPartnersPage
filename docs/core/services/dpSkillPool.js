"use strict";

app.service("DPSkillPool", function () {
  var vm = this;

  vm.skills = {};

  function addSkill(key, label, landingPage) {
    vm.skills[key] = {
      label: label,
      landing: landingPage
    };
  };

  //defined landing pages
  addSkill("aspnet", "ASP.NET", "aspnet");
  addSkill("angularjs", "AngularJS", "angularjs");
  addSkill("reactjs", "ReactJS", "reactjs");
  addSkill("ruby-on-rails", "Ruby on Rails", "ruby-on-rails");
  addSkill("python", "Python", "python");
  addSkill("quality-assurance", "QA", "quality-assurance");
  addSkill("php", "PHP", "php");
  addSkill("laravel", "Laravel", "laravel");
  addSkill("django", "Django", "python");

  //defaults to backend landing page
  addSkill("c#", "C#", "backend");
  addSkill("sql", "SQL", "backend");
  addSkill("mongodb", "MongoDB", "backend");
  addSkill("nodejs", "NodeJS", "backend");
  addSkill("mysql", "MySQL", "backend");
  addSkill("mssql", "MSSQL", "backend");
  addSkill("java", "Java", "backend");

  //defaults to frontend landing page
  addSkill("vuejs", "VueJS", "frontend");
  addSkill("sass", "SASS", "frontend");

  //defaults to mobile landing page
  addSkill("objective-c", "Objective - C", "mobile");
  addSkill("swift", "Swift", "mobile");
  addSkill("ionic", "Ionic", "mobile");
  addSkill("ios", "iOS", "mobile");
  addSkill("android", "Android", "mobile");

  //no landing pages
  addSkill("dreamweaver", "Dreamweaver", "");
  addSkill("photoshop", "Photoshop", "");
  addSkill("adobe-illustrator", "Adobe Illustrator", "");
  addSkill("sketch", "Sketch", "");
  addSkill("project-management", "Project Management", "");
  addSkill("scrum", "Scrum", "");
  addSkill("project-planning", "Project Planning", "");

  return vm; 
});